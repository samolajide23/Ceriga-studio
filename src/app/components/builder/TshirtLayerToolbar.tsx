import { RotateCcw, X } from 'lucide-react';
import { cn } from '../ui/utils';
import type { TshirtLayerId } from '../../data/tshirtLayerAssets';

const LAYER_LABELS: Record<TshirtLayerId, string> = {
  fill: 'Fill',
  base: 'Base',
  sleeves: 'Sleeves',
  sleeveLeft: 'Left sleeve',
  sleeveRight: 'Right sleeve',
  neck: 'Neckline',
  sleeveHem: 'Sleeve hem',
  sleeveHemLeft: 'Left cuff',
  sleeveHemRight: 'Right cuff',
  bodyHem: 'Body hem',
  placket: 'Placket',
  zip: 'Zip',
  zipPull: 'Zip pull',
};

export function tshirtLayerDisplayName(id: TshirtLayerId): string {
  return LAYER_LABELS[id] ?? id;
}

export function TshirtLayerToolbar({
  selectedLayerId,
  selectedAssetName,
  onResetTransform,
  onClearSelection,
  className,
}: {
  selectedLayerId: TshirtLayerId | null;
  selectedAssetName?: string;
  onResetTransform: () => void;
  onClearSelection: () => void;
  className?: string;
}) {
  const hasSelection = Boolean(selectedLayerId);

  return (
    <div
      role="status"
      aria-label="Selected garment part"
      className={cn(
        'flex items-center gap-2 rounded-2xl border border-white/12 bg-black/60 px-3 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl',
        className,
      )}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <span className="min-w-0 truncate text-[10px] font-semibold text-white/90 sm:text-[11px]">
        {hasSelection ? (
          <>
            {tshirtLayerDisplayName(selectedLayerId!)}
            {selectedAssetName ? (
              <span className="ml-1 font-normal text-white/45">({selectedAssetName})</span>
            ) : null}
          </>
        ) : (
          <span className="text-white/40">Click a part to select</span>
        )}
      </span>

      {hasSelection ? (
        <>
          <div className="h-3.5 w-px shrink-0 bg-white/15" />

          <button
            type="button"
            title="Reset position & scale"
            onClick={onResetTransform}
            className="builder-focus flex shrink-0 items-center gap-1 text-[9px] font-semibold text-white/50 transition hover:text-white sm:text-[10px]"
          >
            <RotateCcw className="h-3 w-3" strokeWidth={2} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            aria-label="Deselect"
            onClick={onClearSelection}
            className="builder-focus -mr-0.5 shrink-0 text-white/35 transition hover:text-white"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </>
      ) : null}
    </div>
  );
}
