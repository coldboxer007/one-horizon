export default function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--color-line)] mt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[12.5px] text-[color:var(--color-fg-muted)]">
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
