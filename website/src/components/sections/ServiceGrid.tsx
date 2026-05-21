type Service = {
  title: string;
  body: string;
};

type Props = {
  services: readonly Service[];
  columns?: 2 | 3;
  variant?: "card" | "split";
};

export function ServiceGrid({ services, columns = 3, variant = "card" }: Props) {
  const colClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className={`grid grid-cols-1 ${colClass} gap-px bg-border-taupe border border-border-taupe rounded-lg overflow-hidden`}>
        {services.map((service) => (
          <article
            key={service.title}
            className={`bg-surface p-10 md:p-12 hover:bg-surface-ivory transition-colors duration-500 flex flex-col gap-4 ${
              variant === "split" ? "md:gap-6" : ""
            }`}
          >
            <h3 className="font-display text-headline-md text-primary">{service.title}</h3>
            <p className="font-body text-body-md text-muted-text leading-relaxed">{service.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
