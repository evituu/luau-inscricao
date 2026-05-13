import { useEffect, useState } from "react";

const EVENTO = new Date("2026-05-30T17:00:00");

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
}

function calcular(): TimeLeft {
  const diff = EVENTO.getTime() - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0 };
  return {
    dias:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
  };
}

interface BlocoProps {
  valor: number;
  label: string;
}

function Bloco({ valor, label }: BlocoProps) {
  return (
    <div className="bg-surface-dim rounded-xl p-4 flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
      <span className="font-headline-lg text-headline-lg text-primary glow-text">
        {String(valor).padStart(2, "0")}
      </span>
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
        {label}
      </span>
    </div>
  );
}

export default function ContagemRegressiva() {
  const [tempo, setTempo] = useState<TimeLeft>(calcular);

  useEffect(() => {
    const id = setInterval(() => setTempo(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="contagem"
      className="w-full bg-white py-section-gap px-margin-mobile relative z-20 -mt-10 scroll-mt-20"
    >
      <div className="max-w-container-max mx-auto flex flex-col items-center gap-stack-md">
        <h3 className="font-headline-lg-mobile font-extrabold text-6xl text-headline-lg-mobile text-surface-dim text-center mb-6">
          A CONTAGEM COMEÇOU!
        </h3>
        <div className="flex gap-4 justify-center">
          <Bloco valor={tempo.dias}    label="Dias"    />
          <Bloco valor={tempo.horas}   label="Horas"   />
          <Bloco valor={tempo.minutos} label="Minutos" />
        </div>
      </div>
    </section>
  );
}
