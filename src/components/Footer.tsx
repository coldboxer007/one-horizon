export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* End card: the page closes on the horizon it opened with. Sun and
          wordmark rise over the planet's edge as the footer scrolls in. */}
      <div
        aria-hidden
        className="horizon-end pointer-events-none select-none relative h-[clamp(240px,34vw,500px)]"
      >
        <div className="horizon-end__sun" />
        <div className="horizon-end__word font-[family-name:var(--font-display)] font-bold leading-[0.85] tracking-[-0.04em] whitespace-nowrap text-[clamp(3.4rem,12.5vw,11.5rem)]">
          1 HORIZON
        </div>
        <div className="horizon-end__planet" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[12.5px] text-[color:var(--color-fg-muted)]">
        <div className="flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)]" />
          <span className="font-[family-name:var(--font-display)] text-white tracking-tight">
            1 Horizon
          </span>
          <span>— Systems in Motion</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Tayyab Khan · Sahil Tanna · Kumar Nikunj Sinha</span>
          <span className="text-[color:var(--color-fg-faint)]">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
