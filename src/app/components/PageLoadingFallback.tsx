import { cn } from './ui/utils';

export function PageLoadingFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex min-h-dvh flex-col items-center justify-center gap-4 bg-ceriga-bg px-6',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ceriga-border border-t-ceriga-accent" />
      <p className="text-[14px] text-ceriga-muted">Loading…</p>
    </div>
  );
}
