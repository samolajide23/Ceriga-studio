import { ChevronDown } from 'lucide-react';
import { cn } from '../ui/utils';

export function MarketingFaq({
  id,
  eyebrow = 'FAQ',
  title,
  items,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  items: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'px-[max(1.25rem,env(safe-area-inset-left))] py-16 pr-[max(1.25rem,env(safe-area-inset-right))] lg:px-8 lg:py-24',
        className,
      )}
    >
      <div className="mx-auto max-w-[680px]">
        <p className="text-[14px] font-medium text-ceriga-accent">{eyebrow}</p>
        <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ceriga-text">
          {title}
        </h2>
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-ceriga-border bg-ceriga-surface transition-colors open:border-ceriga-border-strong"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-ceriga-text sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                <span className="pr-2">{item.q}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-ceriga-subtle transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-ceriga-separator px-5 pb-5 sm:px-6">
                <p className="pt-4 text-[15px] leading-relaxed text-ceriga-muted">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
