export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer
      aria-label="Informações finais do Luau Chamas e Estrelas"
      className="border-t border-white/10 bg-surface-dim/80 px-gutter pt-10 pb-32 md:pb-10"
    >
      {/* No mobile, o padding inferior evita sobreposição com a NavMobile fixa. */}
      <div className="mx-auto flex max-w-container-max flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div className="max-w-md">
          <p className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary">
            Luau Edição 2026
          </p>
          <h2 className="mt-2 font-headline-lg-mobile text-headline-lg-mobile text-primary">
            Chamas &amp; Estrelas
          </h2>
        </div>

        <div className="flex flex-col items-center gap-5 md:items-end">
          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:justify-end">
              <li>
                <a
                  className="font-body-md text-body-md text-on-surface-variant underline-offset-4 transition-colors hover:text-primary hover:underline"
                  href="#evento"
                >
                  Sobre o evento
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-on-surface-variant underline-offset-4 transition-colors hover:text-primary hover:underline"
                  href="#contagem"
                >
                  Contagem
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-on-surface-variant underline-offset-4 transition-colors hover:text-primary hover:underline"
                  href="#inscricao"
                >
                  Inscrição
                </a>
              </li>
            </ul>
          </nav>

          <p className="font-body-md text-body-md text-on-surface-variant">
            © {anoAtual} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
