export default function Hero() {
  return (
    <section
      id="topo"
      className="relative w-full min-h-[795px] flex flex-col items-center justify-center px-margin-mobile py-section-gap overflow-hidden bg-surface-dim scroll-mt-20"
    >
      <img
        src="/foto_ceu_lua.png"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.65] pointer-events-none select-none"
        decoding="async"
      />

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-surface-dim/75 via-[#0B152A]/45 to-surface-dim/90 pointer-events-none"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto gap-stack-md mt-10">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-headline-xl text-headline-xl text-primary glow-text leading-none tracking-tight">
            LUAU
          </h2>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-widest uppercase">
            Chamas & Estrelas
          </h3>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mt-4 leading-relaxed">
          Uma noite de boas energias, música, risadas e momentos incríveis sob a luz do luar
        </p>

        {/* Info Pills */}
        <div
          id="evento"
          className="flex flex-wrap justify-center gap-stack-sm mt-8 w-full scroll-mt-28"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
            <span className="font-label-sm text-label-sm text-primary uppercase">30 de Maio</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-primary text-sm">schedule</span>
            <span className="font-label-sm text-label-sm text-primary uppercase">17 Horas</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 w-full sm:w-auto justify-center mt-2 sm:mt-0">
            <span className="material-symbols-outlined text-primary text-sm">location_on</span>
            <span className="font-label-sm text-label-sm text-primary uppercase">Chácara de Daluz</span>
          </div>
        </div>
      </div>
    </section>
  );
}
