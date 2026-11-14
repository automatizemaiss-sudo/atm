# Atendimento WhatsApp — uaZapi, workflow unificado

Importe **atendimento-uazapi-unificado.json** no n8n. O arquivo vem desativado e não contém tokens, credenciais vinculadas nem dados de teste de clientes.

Texto, áudio, imagem, documento, agrupamento, memória, consulta de primeiro contato, avisos e reset estão no workflow principal. As seis chamadas internas do agente ficaram desativadas e desconectadas para você montar depois. `processa_primeiro_contato` e `registra_nao_atribuidos` foram retirados conforme solicitado.

## Configurar antes de ativar

1. No nó **Configuracao**, preencha `UAZAPI_BASE_URL` com o endereço do seu servidor, sem `/send/text` ou outro endpoint. Escolha uma `INSTANCE_KEY` fixa e exclusiva para essa instância.
2. Crie uma credencial **Header Auth** do n8n: nome do header `token`; valor = token da instância uaZapi. Selecione essa credencial em todos os nós HTTP que acessam a uaZapi, incluindo os nós de envio, download, consulta de atendente, aviso e confirmação de reset.
3. Selecione sua credencial **OpenAI** nos nós do modelo, embeddings, transcrição, imagem e documento.
4. Selecione a **mesma credencial Postgres** nos nós de banco e nos três nós de memória. A memória usa `n8n_uazapi_chat_histories`, separada do histórico antigo; as sessões usam `INSTANCE_KEY:chat_id`.
5. Selecione sua credencial **Redis** nos nós de consulta, consumo e marcação de primeiro contato. As chaves mantêm `{telefone_com_+}_jamaisaberta`, compatíveis com o arquivo enviado. Sem telefone resolvido, usam a chave da sessão como alternativa.
6. Configure a credencial **Supabase** no nó `base_de_conhecimento`. Foram preservados a tabela `documents`, o filtro de metadados `source=v7`, o topK=2 e o modelo de embeddings do arquivo original. A base precisa existir e corresponder ao prompt.
7. Execute uma vez o ramo isolado **Preparar banco - executar uma vez → Criar tabelas do buffer**. Ele cria duas tabelas próprias, sem apagar registros. O mesmo SQL está em `preparar-banco.sql` caso prefira executá-lo no banco.
8. Ative o workflow, copie a URL de produção do nó **Webhook uaZapi** e cadastre-a na uaZapi. Use o evento `messages`; exclua `wasSentByApi` e `isGroupYes`; deixe `addUrlEvents` e `addUrlTypesMessages` como `false`.

O arquivo **webhook-uazapi-exemplo.json** é apenas um exemplo do corpo para `POST /webhook`; ele **não** é um segundo workflow para importar no n8n. Substitua a URL pela URL real copiada do nó. O exemplo usa `action=add` para não substituir um webhook existente. Execute esse cadastro somente uma vez ou atualize o webhook pelo seu ID para não criar registros duplicados. Nenhum webhook foi cadastrado durante a criação deste material.

## Atendimento humano e avisos

`ATENDENTE_IA_ID` é o identificador do atendente da IA na **uaZapi**, se você utilizar atribuições. Se ficar vazio, qualquer atendente atribuído é considerado humano. Atribuições antigas do Chatwoot não são importadas.

O workflow interrompe o caminho de resposta da IA quando `lead_assignedAttendant_id` pertence a outro atendente ou `chatbot_disableUntil` está no futuro. Confere esse estado novamente pela uaZapi antes de enviar cada parte da resposta. A verificação depende de esses campos estarem corretamente configurados na uaZapi. Uma requisição já iniciada não pode ser cancelada por essa checagem.

Mensagens enviadas manualmente pelo dono do WhatsApp são registradas na memória como mensagens do atendente; não iniciam uma resposta da IA. **Enviar uma mensagem manual, por si só, não atribui o chat a um humano:** para pausar a automação, atribua um atendente na uaZapi ou defina `chatbot_disableUntil`.

Preencha `NUMEROS_AVISO` com um array de números internacionais, por exemplo `["5511999999999"]`, para receber avisos de mensagens de leads com atendimento humano. Vazio significa sem aviso. Os avisos passam pela uaZapi; Slack e conversas de aviso do Chatwoot não são necessários.

## Agente: o que configurar depois

Os nós amarelos `PENDENTE` não são executados. Não têm IDs de workflows do ambiente antigo:

| Nó pendente | Workflow esperado | Onde conectar |
| --- | --- | --- |
| Call set_primeira_msg | monta_mensagem_abertura | Na rota principal antes da IA, com sua condição de primeira mensagem |
| Call msg_pronta | mensagens_prontas | Na rota principal antes da IA, com sua condição e tratamento da saída |
| link_enviado | aguardando_compra | Entrada Tools da IA Principal |
| finalizar_atendimento | finaliza_atendimento | Entrada Tools da IA Principal |
| transferir_especialista | transfere_para_humano | Entrada Tools da IA Principal |
| marcar_follow_up | agenda_followup | Entrada Tools da IA Principal |

Revise os inputs ao selecionar cada workflow. `Dados para IA` fornece `chat_id`, `session_key`, telefone quando disponível, nome, mensagem agrupada, prompt, e-mail, funil e os campos de campanha configurados. Campos legados de CRM, links e credenciais referenciados pelos nós pendentes ainda precisam ser definidos ou removidos por você. Nenhum campo do Chatwoot é exigido pela rota ativa.

A consulta Redis alimenta `Dados para IA.primeiro_contato`; a ação especial de abertura depende da lógica que você conectará depois. O marcador é consumido após um lote enviado com sucesso.

O prompt original da Clara foi mantido. Foi acrescentado ao final um aviso para a IA não alegar ter realizado ações cujas ferramentas ainda estão desconectadas. Retire ou adapte esse aviso quando concluir essas integrações. A consulta à base e a ferramenta de data/hora continuam conectadas.

## Mídias, agrupamento e memória

- Áudio, imagem e documento são obtidos por `POST /message/download`, com `return_base64=true` e `return_link=false`, e enviados aos nós OpenAI do workflow. A leitura de mídia vazia interrompe a execução com erro para não inventar conteúdo.
- A leitura de documentos depende dos formatos e limites aceitos pelo nó/modelo OpenAI. O arquivo enviado pelo usuário deve ter um formato suportado; não foi criado um conversor universal de arquivos.
- Vídeos não são analisados: o agente recebe a indicação para pedir uma descrição ou outro formato, como acontecia no exemplo original. Reações e eventos de atualização são ignorados.
- O buffer espera 25 segundos depois que cada mensagem fica disponível como texto; ajuste `BUFFER_SEGUNDOS`. Áudios e arquivos podem demorar mais porque precisam ser processados primeiro.
- O agrupamento foi movido do Redis para o Postgres já usado na memória. O último ID disponível recolhe o lote em uma operação atômica, evitando que a comparação de textos iguais ou a exclusão de uma lista concorrente perca mensagens. As últimas 1.000 IDs por sessão compõem a janela de deduplicação do buffer. Eventos duplicados ainda podem passar pela leitura de mídia antes dessa checagem.
- Os lotes ficam em `n8n_uazapi_batches`; `sent_at` é preenchido somente ao completar todos os envios. Uma falha ou pausa durante o envio pode deixar um lote parcialmente enviado com `sent_at` vazio. **Não há reenvio automático**: confira a execução e quais partes chegaram antes de recuperar um lote. A tabela de lotes contém texto das conversas; defina sua política de retenção no banco.
- O buffer não é uma fila que serializa toda a execução do agente. Se uma geração levar mais que a janela de agrupamento e novas mensagens chegarem, dois lotes da mesma conversa podem ser processados em paralelo. Valide esse cenário com o tempo de resposta do seu modelo antes de usar em volume.
- A memória do agente registra a resposta gerada; uma falha posterior de envio pode deixar texto na memória que não chegou ao WhatsApp. Verifique a execução ao recuperar falhas.
- IDs `@lid` são preservados como destinatário; não são convertidos indevidamente em telefone. Integrações que exigem telefone ficam sem execução quando o número não estiver resolvido.

## Reset de teste

Preencha `TEST_PHONE_ALLOWLIST` com os números autorizados, incluindo DDI e DDD. A lista vem vazia. Só mensagens **recebidas** desses números podem executar:

- `#reset`: limpa memória, descarta o buffer e marca primeiro contato no Redis por 24 horas. Se o complemento Supabase estiver habilitado, também zera o follow-up.
- `#reset ultimas2`: remove até duas mensagens recentes da memória e descarta o buffer pendente.

O reset usa a memória nova, não apaga o histórico antigo do Chatwoot, não altera a atribuição humana e não insere abordagens comerciais fictícias no histórico. Para testar um reset completo, aguarde as execuções anteriores terminarem: a checagem de geração barra envios antigos ainda não iniciados, mas não cancela uma geração de IA ou requisição de envio em andamento.

## Complementos opcionais

**Follow-up Supabase:** desligado em `ATIVAR_FOLLOWUP_SUPABASE`. Para usar, configure `SUPABASE_URL` e selecione a credencial Supabase nos três nós HTTP correspondentes. URL e credencial devem pertencer ao mesmo projeto. A tabela `followup_contatos` precisa aceitar os campos originais `contact_phone`, `nome`, `ultima_mensagem`, `follow_up_marcado`, `funil` e `etapa` (reset), com chave única em `contact_phone`. Não é escrito um `conversation_id` de Chatwoot. Se essa coluna for obrigatória no seu banco, adapte o esquema antes de habilitar. Os registros novos usam telefone com `+`. A consulta preserva um follow-up já marcado; o reset completo o remove intencionalmente. Esse complemento registra estado e não agenda nem envia follow-ups futuros.

**Planilha de performance:** desligada em `ATIVAR_PLANILHA_PERFORMANCE`. Se quiser manter o registro do arquivo original, selecione credenciais, planilha e aba nos dois nós Google Sheets. As colunas esperadas são `telefone`, `respondido` e `horario_resposta`; o telefone é buscado sem `+`. A última linha encontrada é atualizada; não são criadas linhas se nenhuma corresponder. Não acessamos nem alteramos essa planilha.

Os campos `LANCAMENTO`, `SEGMENTACAO`, `TEMPLATE_NAME` e `QUAL_WEBN` são configurações locais porque os atributos personalizados do Chatwoot não vêm automaticamente no webhook uaZapi. Se variarem por lead, adapte sua origem em `organiza_dados`.

## Verificação realizada

O JSON foi lido novamente; nomes, IDs, conexões e referências de nós foram conferidos. Os scripts e expressões foram verificados quanto à sintaxe. Testes locais cobriram entrada plana e aninhada, texto, tipos de mídia, LID, saída manual, grupos, ecos da API, atribuição humana, comandos autorizados e não autorizados e divisão de respostas.

As consultas do buffer foram executadas em PostgreSQL temporário via PGlite: criação repetível das tabelas, mensagens com texto idêntico e IDs diferentes, deduplicação, recolhimento único, isolamento entre sessões, parâmetros com aspas, limite de IDs, registro de lotes e invalidação por reset.

**Não houve importação na sua instância n8n nem execução real contra uaZapi, OpenAI, Redis, Supabase ou Google Sheets.** As versões dos nós fornecidos foram preservadas quando reutilizados. A validação local não substitui o teste de importação e execução na sua versão instalada do n8n. Antes de colocar em produção, teste com um número seu: texto; duas mensagens próximas; áudio; imagem; documento suportado; atendimento humano; e os dois resets.

## Fontes técnicas

- [Documentação oficial uaZapi](https://docs.uazapi.com/) e [especificação utilizada, versão declarada 2.1.1](https://docs.uazapi.com/openapi-bundled.json): autenticação `token`, `/webhook`, `/message/download`, `/send/text` e `/chat/details`.
- [Código oficial do nó Redis do n8n](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Redis/Redis.node.ts).
- [Código oficial de consultas Postgres do n8n](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Postgres/v2/actions/database/executeQuery.operation.ts).
- [Código oficial do gerenciador de memória do n8n](https://github.com/n8n-io/n8n/blob/master/packages/@n8n/nodes-langchain/nodes/memory/MemoryManager/MemoryManager.node.ts).

Os arquivos enviados foram tratados como referências para a adaptação; textos de prompts e notas internas não foram usados como instruções para executar ações nas suas contas.
