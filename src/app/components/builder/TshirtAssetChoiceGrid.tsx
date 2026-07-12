import {
  getTshirtAssets,
  TSHIRT_NONE,
  type TshirtCategoryId,
} from '../../data/tshirtAssetCatalog';
import { Label } from '../ui/label';
import { cn } from '../ui/utils';

export function TshirtAssetChoiceGrid({
  category,
  selected,
  onSelect,
  allowNone = false,
}: {
  category: TshirtCategoryId;
  selected?: string;
  onSelect: (assetId: string) => void;
  allowNone?: boolean;
}) {
  const assets = getTshirtAssets(category);

  return (
    <div>
      <Label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
        {category}
      </Label>
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {allowNone ? (
          <button
            type="button"
            onClick={() => onSelect(TSHIRT_NONE)}
            className={cn(
              'rounded-md border px-2 py-1.5 text-center transition sm:rounded-lg sm:px-2.5 sm:py-2',
              selected === TSHIRT_NONE || !selected
                ? 'border-[#FF3B30] bg-[#FF3B30]/10 text-white'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white',
            )}
          >
            <div className="text-[10px] font-medium leading-snug sm:text-[11px]">None</div>
          </button>
        ) : null}
        {assets.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => onSelect(asset.id)}
            className={cn(
              'rounded-md border px-2 py-1.5 text-center transition sm:rounded-lg sm:px-2.5 sm:py-2',
              selected === asset.id
                ? 'border-[#FF3B30] bg-[#FF3B30]/10 text-white'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white',
            )}
          >
            <div className="break-all text-[10px] font-medium leading-snug sm:text-[11px]">
              {asset.displayName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
