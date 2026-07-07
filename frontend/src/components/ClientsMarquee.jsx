/*import { useClients } from "../hooks/useClients";

export default function ClientsMarquee() {
  const { clients } = useClients();

  if (!clients.length) return null;

  // Duplicate the list so the CSS animation can loop seamlessly at -50%.
  const looped = [...clients, ...clients];

  return (
    <section className="border-y border-ink/10 bg-ink py-8">
      <p className="mb-5 text-center font-mono text-xs uppercase tracking-widest text-paper/50">
        Trusted by 30+ growing brands & creators
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-16">
          {looped.map((client, i) => (
            <span
              key={`${client.id}-${i}`}
              className="whitespace-nowrap font-display text-2xl italic text-paper/40"
            >
              {client.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}*/
