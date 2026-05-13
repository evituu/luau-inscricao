import { useEffect, useState } from "react";

const SECTION_IDS = ["topo", "evento", "contagem", "inscricao"] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function NavMobile() {
  const [activeId, setActiveId] = useState<string>("topo");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActiveId(hit.target.id);
      },
      {
        rootMargin: "-38% 0px -38% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const btn = (id: string, icon: string, label: string) => {
    const isActive = activeId === id;
    return (
      <button
        key={id}
        type="button"
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        onClick={() => {
          scrollToSection(id);
          setActiveId(id);
        }}
        className={
          isActive
            ? "bg-primary/20 text-primary rounded-full p-3 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all active:scale-90 hover:bg-white/10 min-h-[48px] min-w-[48px]"
            : "text-on-surface-variant rounded-full p-3 flex items-center justify-center transition-all active:scale-90 hover:bg-white/10 min-h-[48px] min-w-[48px]"
        }
      >
        <span
          className="material-symbols-outlined text-[26px]"
          style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {icon}
        </span>
      </button>
    );
  };

  return (
    <nav
      className="md:hidden bg-surface-container-lowest/30 backdrop-blur-2xl fixed bottom-0 left-0 right-0 rounded-t-xl z-50 border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex justify-around items-center min-h-16 w-full max-w-md mx-auto mb-4 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="Navegação principal"
    >
      {btn("topo", "home", "Início")}
      {btn("evento", "event", "Evento")}
      {btn("contagem", "timer", "Contagem")}
      {btn("inscricao", "person_add", "Inscrição")}
    </nav>
  );
}
