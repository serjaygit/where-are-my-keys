import { PROCESS_DATA } from "@/config/bts-process.data";

export default function ProductionNotes() {
  return (
    <section
      aria-label="Film production notes"
      className="mx-auto grid max-w-6xl gap-7 py-8 sm:grid-cols-3 sm:gap-10 sm:py-10"
    >
      {PROCESS_DATA.map((item) => (
        <article key={item.heading}>
          <h3 className="mb-2 font-serif text-sm uppercase tracking-[.12em] text-primary">
            {item.heading}
          </h3>
          <p className="leading-relaxed text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </section>
  );
}
