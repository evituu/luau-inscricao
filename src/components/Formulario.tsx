import { useEffect, useRef, useState, type FormEvent } from "react";
import { fireMarshmallowConfetti } from "../confettiMarshmallow";

interface Campos {
  nome: string;
  email: string;
  telefone: string;
}

interface Erros {
  nome?: string;
  email?: string;
  telefone?: string;
}

/** Pelo menos 3 caracteres que não sejam espaço em branco */
function nomeTemCaracteresUteisMinimos(nome: string): boolean {
  return nome.replace(/\s/g, "").length >= 3;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function emailValido(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/** Só dígitos, entre 10 e 11 (padrão BR com DDD) */
function telefoneDigitosValidos(telefone: string): boolean {
  const d = telefone.replace(/\D/g, "");
  return d.length >= 10 && d.length <= 11;
}

/** Formata como (DD) NNNN-NNNN ou (DD) NNNNN-NNNN */
function formatarTelefoneBR(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const dd = d.slice(0, 2);
  const rest = d.slice(2);
  if (d.length <= 6) return `(${dd}) ${rest}`;
  if (d.length <= 10) {
    return `(${dd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  }
  return `(${dd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

function validar(campos: Campos): Erros {
  const erros: Erros = {};

  if (!nomeTemCaracteresUteisMinimos(campos.nome)) {
    erros.nome = "Informe pelo menos 3 letras ou números (espaços não contam).";
  }

  if (!campos.email.trim()) {
    erros.email = "Informe seu e-mail.";
  } else if (!emailValido(campos.email)) {
    erros.email = "Digite um e-mail válido (ex.: nome@email.com).";
  }

  const digitos = campos.telefone.replace(/\D/g, "");
  if (digitos.length === 0) {
    erros.telefone = "Informe o telefone com DDD.";
  } else if (!telefoneDigitosValidos(campos.telefone)) {
    erros.telefone = "Use (DDD) número com ao menos 10 dígitos no total.";
  }

  return erros;
}

const INPUT_FLOAT_BASE =
  "block w-full bg-transparent border-0 border-b py-3 px-0 text-primary font-body-md text-body-md transition-colors peer outline-none focus:outline-none focus-visible:outline-none focus:ring-0";

const LABEL_FLOAT =
  "pointer-events-none absolute left-0 top-3 z-20 origin-[0] text-on-surface-variant transition-all duration-300 font-body-md text-body-md " +
  "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 " +
  "peer-focus:-translate-y-[2.5rem] peer-focus:scale-75 peer-focus:text-primary " +
  "peer-[:not(:placeholder-shown)]:-translate-y-[2.5rem] peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-primary";

export default function Formulario() {
  const [campos, setCampos] = useState<Campos>({ nome: "", email: "", telefone: "" });
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enviado) return;
    const t = window.setTimeout(() => {
      fireMarshmallowConfetti(cardRef.current);
    }, 80);
    return () => window.clearTimeout(t);
  }, [enviado]);

  const atualizar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErros((prev) => ({ ...prev, [name]: undefined }));

    if (name === "telefone") {
      setCampos((prev) => ({ ...prev, telefone: formatarTelefoneBR(value) }));
      return;
    }

    setCampos((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const novosErros = validar(campos);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setCarregando(true);
    await new Promise((res) => setTimeout(res, 1200));
    setCarregando(false);
    setEnviado(true);
  };

  const borda = (campo: keyof Erros) =>
    erros[campo] ? "border-error focus:border-error" : "border-outline focus:border-primary";

  return (
    <section
      className="w-full py-section-gap px-margin-mobile relative z-20 scroll-mt-20"
      id="inscricao"
    >
      <div ref={cardRef} className="max-w-md mx-auto glass-card rounded-2xl p-8 border border-white/10">
        {!enviado ? (
          <div className="text-center mb-8">
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">
              Garanta sua Presença!
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Vagas limitadas para uma experiência exclusiva.
            </p>
          </div>
        ) : null}

        {enviado ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              Presença confirmada!
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Te vemos no Luau, {campos.nome.trim().split(/\s+/)[0]}!
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-stack-md" onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div>
              <div className="relative">
                <input
                  className={`${INPUT_FLOAT_BASE} ${borda("nome")}`}
                  id="nome"
                  name="nome"
                  placeholder=" "
                  type="text"
                  autoComplete="name"
                  value={campos.nome}
                  onChange={atualizar}
                  aria-invalid={Boolean(erros.nome)}
                  aria-describedby={erros.nome ? "erro-nome" : undefined}
                />
                <label className={LABEL_FLOAT} htmlFor="nome">
                  Nome Completo
                </label>
              </div>
              {erros.nome ? (
                <p id="erro-nome" className="mt-2 text-sm text-error" role="alert">
                  {erros.nome}
                </p>
              ) : null}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <input
                  className={`${INPUT_FLOAT_BASE} ${borda("email")}`}
                  id="email"
                  name="email"
                  placeholder=" "
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={campos.email}
                  onChange={atualizar}
                  aria-invalid={Boolean(erros.email)}
                  aria-describedby={erros.email ? "erro-email" : undefined}
                />
                <label className={LABEL_FLOAT} htmlFor="email">
                  E-mail
                </label>
              </div>
              {erros.email ? (
                <p id="erro-email" className="mt-2 text-sm text-error" role="alert">
                  {erros.email}
                </p>
              ) : null}
            </div>

            {/* Telefone */}
            <div>
              <div className="relative">
                <input
                  className={`${INPUT_FLOAT_BASE} ${borda("telefone")}`}
                  id="telefone"
                  name="telefone"
                  placeholder=" "
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={campos.telefone}
                  onChange={atualizar}
                  aria-invalid={Boolean(erros.telefone)}
                  aria-describedby={erros.telefone ? "erro-telefone" : undefined}
                />
                <label className={LABEL_FLOAT} htmlFor="telefone">
                  Telefone / WhatsApp
                </label>
              </div>
              {erros.telefone ? (
                <p id="erro-telefone" className="mt-2 text-sm text-error" role="alert">
                  {erros.telefone}
                </p>
              ) : null}
            </div>

            <button
              className="w-full bg-primary text-surface-dim font-label-lg text-label-lg uppercase py-4 rounded-full glow-button hover:bg-primary/90 transition-all active:scale-95 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={carregando}
            >
              {carregando ? "Enviando…" : "Enviar Inscrição"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
