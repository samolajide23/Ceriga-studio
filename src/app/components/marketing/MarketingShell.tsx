import { ReactNode, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';

const nav = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
] as const;

export function MarketingShell({
  children,
  mainClassName = '',
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-ceriga-bg text-ceriga-text">
      <header
        className="sticky top-0 z-50 border-b border-ceriga-separator bg-ceriga-bg/80 backdrop-blur-xl backdrop-saturate-150"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="mx-auto flex h-12 max-w-[1080px] items-center justify-between gap-4 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:h-[52px] lg:px-8">
          <Link
            to="/"
            className="shrink-0 font-display text-[17px] font-semibold tracking-tight text-ceriga-text"
          >
            Ceriga Studio
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Button asChild variant="ghost" size="sm" className="text-ceriga-muted">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup" className="inline-flex items-center gap-1.5">
                Get started
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button asChild size="sm">
              <Link to="/studio">Studio</Link>
            </Button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full bg-ceriga-elevated text-ceriga-text transition-colors hover:bg-ceriga-elevated-2"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="top"
          className="h-auto max-h-[min(90dvh,640px)] w-full max-w-none gap-0 rounded-none border-x-0 border-t-0 border-b border-ceriga-border bg-ceriga-surface p-0 text-ceriga-text shadow-[var(--ceriga-shadow-lg)] [&>button.absolute]:hidden"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>

          <div className="flex items-center justify-between gap-3 border-b border-ceriga-separator px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
            <Link
              to="/"
              className="font-display text-[17px] font-semibold tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              Ceriga Studio
            </Link>
            <SheetClose asChild>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-full bg-ceriga-elevated text-ceriga-text transition-colors hover:bg-ceriga-elevated-2"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </SheetClose>
          </div>

          <nav className="flex flex-col gap-1 px-5 py-6">
            {nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="rounded-xl px-3 py-3.5 text-[17px] font-medium text-ceriga-text transition-colors hover:bg-white/[0.04]"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-ceriga-separator px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <Button asChild variant="outline" className="h-11 w-full">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Log in
              </Link>
            </Button>
            <Button asChild className="h-11 w-full">
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Get started
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <main className={mainClassName}>{children}</main>

      <footer className="border-t border-ceriga-separator bg-ceriga-bg px-[max(1.25rem,env(safe-area-inset-left))] py-14 pr-[max(1.25rem,env(safe-area-inset-right))] lg:px-8">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-3 font-display text-[15px] font-semibold tracking-tight">
                Ceriga Studio
              </div>
              <p className="max-w-[280px] text-[14px] leading-relaxed text-ceriga-muted">
                Factory-ready tech packs, packaging artwork, and production workflows for apparel teams.
              </p>
            </div>
            <div>
              <div className="mb-3 text-[12px] font-medium text-ceriga-subtle">Product</div>
              <div className="flex flex-col gap-2.5">
                <Link to="/features" className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text">
                  Features
                </Link>
                <Link to="/how-it-works" className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text">
                  How it works
                </Link>
                <Link to="/pricing" className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text">
                  Pricing
                </Link>
              </div>
            </div>
            <div>
              <div className="mb-3 text-[12px] font-medium text-ceriga-subtle">Account</div>
              <div className="flex flex-col gap-2.5">
                <Link to="/login" className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text">
                  Log in
                </Link>
                <Link to="/signup" className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text">
                  Sign up
                </Link>
              </div>
            </div>
            <div>
              <div className="mb-3 text-[12px] font-medium text-ceriga-subtle">Legal</div>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text">
                  Terms
                </a>
                <a href="#" className="text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text">
                  Privacy
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-ceriga-separator pt-8 text-[12px] text-ceriga-subtle sm:flex-row sm:items-center sm:justify-between">
            <span>Copyright © 2026 Ceriga Studio. All rights reserved.</span>
            <span className="text-ceriga-muted">Built for production teams.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function MarketingPageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-ceriga-separator px-[max(1.25rem,env(safe-area-inset-left))] py-14 pr-[max(1.25rem,env(safe-area-inset-right))] lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[680px] text-center">
        <p className="mb-4 text-[14px] font-medium text-ceriga-accent">{eyebrow}</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.08] tracking-tight text-ceriga-text">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-relaxed text-ceriga-muted">{subtitle}</p>
      </div>
    </div>
  );
}
