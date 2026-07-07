import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFaqs } from "../hooks/useFaqs";




export default function FaqSection() {
  const { faqs } = useFaqs();
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <span className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold tracking-[0.25em] text-white/100">
              FAQS
            </span>
      </div>

      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
              >
                <span className="font-display text-base text-ink sm:text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-ink/50 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && <p className="pb-5 text-sm text-ink/65">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
