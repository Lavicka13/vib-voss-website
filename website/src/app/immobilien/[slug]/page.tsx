type Params = Promise<{ slug: string }>;

export default async function ImmobilieDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
        Immobilie: {slug}
      </h1>
      <p className="font-body text-body-lg text-muted-text mt-8">
        [Skelett — Inhalt in Welle 2]
      </p>
    </div>
  );
}
