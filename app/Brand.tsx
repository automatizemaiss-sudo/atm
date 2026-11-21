export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand--light" : ""}`} aria-label="ATM+">
      <span className="brand-lines" aria-hidden="true"><i /><i /><i /></span>
      <b>atm</b><em>+</em>
    </span>
  );
}
