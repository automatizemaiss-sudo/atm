"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ei810I8DVskRhcmNk5bcrox4oE6x97_X7vq1QTO8oNvutH1_4LVoWN7D3-eU2T8fnV4-TZ6rj?gv=true";
const OPEN_BOOKING_EVENT = "atm:open-booking";

export function BookingButton({ className, children }: { className: string; children: ReactNode }) {
  return <button className={className} type="button" onClick={() => window.dispatchEvent(new Event(OPEN_BOOKING_EVENT))}>{children}</button>;
}

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_BOOKING_EVENT, show);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="booking-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <section className="booking-modal__panel" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
        <header className="booking-modal__head">
          <div><span className="kicker">AGENDE SUA CONVERSA</span><h2 id="booking-modal-title">Escolha um horário</h2></div>
          <button ref={closeButton} type="button" className="booking-modal__close" aria-label="Fechar agenda" onClick={() => setOpen(false)}>×</button>
        </header>
        <iframe src={BOOKING_URL} title="Agenda de reuniões ATM+" />
        <a className="booking-modal__external" href={BOOKING_URL} target="_blank" rel="noreferrer">Abrir agendamento em uma nova aba ↗</a>
      </section>
    </div>
  );
}
