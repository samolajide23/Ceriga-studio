import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { MarketingShell } from '../components/marketing/MarketingShell';
import { MarketingFaq } from '../components/marketing/MarketingFaq';
import { HomeTechpackPreview } from '../components/marketing/HomeTechpackPreview';
import { products } from '../data/products';
import { tokens } from '../lib/designTokens';

export function Home() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="px-[max(1.25rem,env(safe-area-inset-left))] pb-16 pt-14 pr-[max(1.25rem,env(safe-area-inset-right))] sm:pb-20 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="relative mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0 max-w-xl">
            <p className="mb-4 text-[14px] font-medium text-ceriga-accent">
              Precision manufacturing software
            </p>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ceriga-text">
              Build your garment.
              <br />
              <span className="text-ceriga-muted">Ship a factory-ready tech pack.</span>
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ceriga-muted">
              Configure every detail visually, export professional PDFs, and run packaging-only jobs when you
              do not need a full style spec.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/signup" className="inline-flex items-center justify-center gap-2">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/how-it-works">How it works</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ceriga-separator pt-10">
              {[
                ['500+', 'Tech packs exported'],
                ['48h', 'Average first review'],
                ['12+', 'Garment types'],
              ].map(([val, label]) => (
                <div key={val}>
                  <div className="font-display text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight text-ceriga-text">
                    {val}
                  </div>
                  <div className="mt-1 text-[12px] text-ceriga-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HomeTechpackPreview compact />
          </div>
        </div>
      </section>

      {/* Deep links */}
      <section className="border-y border-ceriga-separator bg-ceriga-surface px-[max(1.25rem,env(safe-area-inset-left))] py-16 pr-[max(1.25rem,env(safe-area-inset-right))] lg:px-8">
        <div className="mx-auto grid max-w-[1080px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              to: '/features',
              title: 'Features',
              body: 'Live preview, measurements, prints, packaging mode, and exports built for real factories.',
            },
            {
              to: '/how-it-works',
              title: 'How it works',
              body: 'Three workflows: full tech pack, packaging-only, or upload-and-order manufacturing.',
            },
            {
              to: '/pricing',
              title: 'Pricing',
              body: 'Pay per tech pack export, or subscribe for monthly download allowances.',
            },
            {
              to: '/#faq',
              title: 'FAQ',
              body: 'Quick answers on drafts, exports, packaging-only mode, and billing.',
            },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group rounded-2xl border border-ceriga-border bg-ceriga-elevated/50 p-6 transition-all duration-200 hover:border-ceriga-border-strong hover:bg-ceriga-elevated"
            >
              <h2 className="flex items-center justify-between font-display text-[17px] font-semibold text-ceriga-text">
                {card.title}
                <ArrowUpRight className="h-4 w-4 text-ceriga-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ceriga-accent" />
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ceriga-muted">{card.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-ceriga-accent">
                Learn more
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <MarketingFaq
        id="faq"
        title="Frequently asked questions"
        items={[
          {
            q: 'How does the studio process work?',
            a: 'Pick a blueprint from the catalog (or open packaging-only from Studio), walk the guided steps — measurements, fabric, construction, prints, labels — then review and export or continue to delivery. You can revisit any completed step from the step strip while drafts autosave.',
          },
          {
            q: 'What is packaging-only mode?',
            a: 'A path that skips garment selection so you can design polybags and neck labels on their own canvases. Use it when branding ships before your apparel styles are locked.',
          },
          {
            q: 'How does pricing work?',
            a: 'Each tech pack PDF download is paid: either €29 per export without a plan, or included in a monthly allowance on Studio (10), Scale (30), or Business (100) — with lower overage rates on higher tiers. See the pricing page for the full comparison.',
          },
          {
            q: 'Will my drafts be saved?',
            a: 'Yes. Work is saved as you go in the builder so you can close the tab and return from Dashboard or Drafts without losing progress.',
          },
          {
            q: 'What do manufacturers get?',
            a: 'A structured PDF-style handoff with visuals, measurement tables, material notes, and print zones laid out the way factories expect — so quoting and sampling need fewer back-and-forth threads.',
          },
        ]}
        className="border-t border-ceriga-separator bg-ceriga-bg"
      />

      {/* Catalog preview */}
      <section className="px-[max(1.25rem,env(safe-area-inset-left))] py-16 pr-[max(1.25rem,env(safe-area-inset-right))] lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1080px]">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[14px] font-medium text-ceriga-accent">Catalog</p>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ceriga-text">
                Popular garment blueprints
              </h2>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link to="/signup" className="inline-flex items-center gap-1.5">
                Open studio
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[440px]:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ceriga-separator bg-ceriga-surface px-[max(1.25rem,env(safe-area-inset-left))] py-20 pr-[max(1.25rem,env(safe-area-inset-right))] lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[600px] text-center">
          <p className="mb-3 text-[14px] font-medium text-ceriga-accent">Proof over promises</p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-ceriga-text">
            See the output quality
          </h2>
          <p className="mx-auto mt-4 max-w-[460px] text-[17px] leading-relaxed text-ceriga-muted">
            Download a sample tech pack to review layout, callouts, and measurement tables — the same
            structure your manufacturers receive.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-8 border-ceriga-border-strong bg-ceriga-elevated hover:bg-ceriga-elevated-2"
          >
            <a href="#" className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download sample
            </a>
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`overflow-hidden rounded-2xl border bg-ceriga-elevated/40 transition-all duration-200 ${
        hovered ? 'border-ceriga-border-strong shadow-[var(--ceriga-shadow-md)]' : 'border-ceriga-border'
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-ceriga-bg">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-500 ${hovered ? 'scale-[1.03]' : 'scale-100'}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ceriga-elevated/80" />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-ceriga-text backdrop-blur-md">
          {product.garmentType}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-[15px] font-semibold text-ceriga-text">{product.name}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ceriga-muted">
          Guided builder for measurements, materials, and construction.
        </p>
        <Link
          to="/signup"
          className={`mt-4 flex items-center justify-center gap-1 rounded-full py-2.5 text-[13px] font-medium transition-colors ${
            hovered
              ? 'bg-ceriga-accent text-white'
              : 'bg-ceriga-elevated text-ceriga-muted hover:text-ceriga-text'
          }`}
        >
          Configure in studio
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
