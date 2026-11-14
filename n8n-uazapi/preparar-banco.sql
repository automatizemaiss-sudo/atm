CREATE TABLE IF NOT EXISTS public.n8n_uazapi_buffer (
 session_key text PRIMARY KEY, pending jsonb NOT NULL DEFAULT '[]'::jsonb,
 seen_ids text[] NOT NULL DEFAULT ARRAY[]::text[], last_id text NOT NULL DEFAULT '',
 generation bigint NOT NULL DEFAULT 0, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.n8n_uazapi_batches (
 execution_id text PRIMARY KEY, session_key text NOT NULL, generation bigint NOT NULL,
 messages jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), sent_at timestamptz
);
