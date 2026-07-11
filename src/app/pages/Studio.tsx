import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';
import { FileStack, FileInput, Package, Factory, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DEFAULT_TECHPACK_SPEC_PRODUCT_ID } from '../data/products';

const workflows: {
  title: string;
  description: string;
  to: string;
  state?: { builderFlow: string };
  icon: LucideIcon;
}[] = [
  {
    title: 'Tech pack (spec only)',
    description:
      'Upload artwork first, then fill measurements and construction. For factories that only need a spec.',
    to: `/builder/${DEFAULT_TECHPACK_SPEC_PRODUCT_ID}?flow=techpack-spec`,
    state: { builderFlow: 'techpack-spec' },
    icon: FileInput,
  },
  {
    title: 'Design tech pack',
    description:
      'Full builder: measurements, fabric and colour, prints on garment, labels, and export.',
    to: '/catalog',
    icon: FileStack,
  },
  {
    title: 'Design packaging',
    description:
      'Polybags, labels, and artwork on a focused canvas — then straight to delivery.',
    to: '/packaging',
    icon: Package,
  },
  {
    title: 'Order from manufacturers',
    description:
      'Upload your existing tech pack, add quantity and dates, and continue to delivery.',
    to: '/studio/manufacturer',
    icon: Factory,
  },
];

export function Studio() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-ceriga-bg">
      <div className="border-b border-ceriga-separator px-[max(1.25rem,env(safe-area-inset-left))] py-8 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6 md:px-8">
        <p className="mb-2 text-[14px] font-medium text-ceriga-accent">Workflows</p>
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-tight text-ceriga-text">
          Studio
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ceriga-muted">
          Start a tech pack, packaging-only job, or a manufacturing order — all from one place.
        </p>
      </div>

      <div className="px-[max(1.25rem,env(safe-area-inset-left))] py-8 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {workflows.map(({ title, description, to, state, icon: Icon }) => (
            <Link
              key={title}
              to={to}
              state={state}
              className="group flex flex-col rounded-2xl border border-ceriga-border bg-ceriga-surface p-6 transition-all duration-200 hover:border-ceriga-border-strong hover:bg-ceriga-elevated/60"
            >
              <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-ceriga-accent-muted text-ceriga-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-2 font-display text-[17px] font-semibold text-ceriga-text">{title}</h2>
              <p className="mb-6 flex-1 text-[14px] leading-relaxed text-ceriga-muted">{description}</p>
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ceriga-accent">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-ceriga-border bg-ceriga-surface px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] leading-relaxed text-ceriga-muted sm:max-w-md">
            New to Ceriga? Browse the catalog for garment templates, or jump into packaging if you only need bags and labels.
          </p>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/catalog">Browse catalog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
