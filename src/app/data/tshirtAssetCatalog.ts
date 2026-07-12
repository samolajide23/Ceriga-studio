import type { TshirtLayerId } from './tshirtLayerAssets';

/** Folder names under src/assets/tshirts — one active asset each in the preview. */
export const TSHIRT_CATEGORY_ORDER = [
  'T-shirt Base',
  'T-shirt sleeves',
  'neckline',
  'T-shirt sleeve hem',
  'T-shirt bottom sleeve',
  'T-shirts plackets & opening',
  'T-shirt zips',
  'T-shirt zip pulls',
] as const;

export type TshirtCategoryId = (typeof TSHIRT_CATEGORY_ORDER)[number];

export const TSHIRT_NONE = '__none__';

export interface TshirtAsset {
  /** `{category}/{fileName}` e.g. neckline/Untitled_Artwork-1 */
  id: string;
  category: TshirtCategoryId;
  fileName: string;
  displayName: string;
  svgRaw: string;
}

const svgModules = import.meta.glob('../../assets/tshirts/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseGlobPath(globPath: string): { category: TshirtCategoryId; fileName: string } | null {
  const normalized = globPath.replace(/\\/g, '/');
  const match = normalized.match(/\/tshirts\/([^/]+)\/([^/]+\.svg)$/i);
  if (!match) return null;
  return { category: match[1] as TshirtCategoryId, fileName: match[2] };
}

export function fileNameToDisplayName(fileName: string): string {
  return fileName.replace(/\.svg$/i, '');
}

const ALL_ASSETS: TshirtAsset[] = Object.entries(svgModules)
  .map(([path, svgRaw]) => {
    const parsed = parseGlobPath(path);
    if (!parsed) return null;
    const { category, fileName } = parsed;
    return {
      id: `${category}/${fileNameToDisplayName(fileName)}`,
      category,
      fileName,
      displayName: fileNameToDisplayName(fileName),
      svgRaw,
    };
  })
  .filter((a): a is TshirtAsset => a !== null)
  .sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.displayName.localeCompare(b.displayName, undefined, { numeric: true });
  });

const byCategory = new Map<TshirtCategoryId, TshirtAsset[]>();
for (const cat of TSHIRT_CATEGORY_ORDER) {
  byCategory.set(cat, []);
}
for (const asset of ALL_ASSETS) {
  const list = byCategory.get(asset.category);
  if (list) list.push(asset);
}

export function getTshirtAssets(category: TshirtCategoryId): TshirtAsset[] {
  return byCategory.get(category) ?? [];
}

export function getTshirtAsset(assetId: string): TshirtAsset | undefined {
  return ALL_ASSETS.find((a) => a.id === assetId);
}

export function getDefaultTshirtSelection(): Record<TshirtCategoryId, string> {
  const selection = {} as Record<TshirtCategoryId, string>;
  for (const category of TSHIRT_CATEGORY_ORDER) {
    const assets = getTshirtAssets(category);
    selection[category] =
      category === 'T-shirt zips' || category === 'T-shirt zip pulls' || category === 'T-shirts plackets & opening'
        ? TSHIRT_NONE
        : assets[0]?.id ?? TSHIRT_NONE;
  }
  return selection;
}

/** Builder steps → asset folder(s) shown in the side panel. */
export function getTshirtCategoriesForStep(step: number): TshirtCategoryId[] {
  switch (step) {
    case 2:
      return ['T-shirt Base'];
    case 3:
      return ['neckline'];
    case 4:
      return ['T-shirt sleeves'];
    case 5:
      return ['T-shirt bottom sleeve', 'T-shirt sleeve hem'];
    case 6:
      return ['T-shirt zips', 'T-shirt zip pulls', 'T-shirts plackets & opening'];
    default:
      return [];
  }
}

export const TSHIRT_CATEGORY_LAYER_ID: Record<TshirtCategoryId, TshirtLayerId> = {
  'T-shirt Base': 'base',
  'T-shirt sleeves': 'sleeves',
  neckline: 'neck',
  'T-shirt sleeve hem': 'sleeveHem',
  'T-shirt bottom sleeve': 'bodyHem',
  'T-shirts plackets & opening': 'placket',
  'T-shirt zips': 'zip',
  'T-shirt zip pulls': 'zipPull',
};

export const TSHIRT_CATEGORY_Z_INDEX: Record<TshirtCategoryId, number> = {
  'T-shirt sleeves': 0,
  'T-shirt Base': 20,
  neckline: 30,
  'T-shirt sleeve hem': 40,
  'T-shirt bottom sleeve': 50,
  'T-shirts plackets & opening': 55,
  'T-shirt zips': 60,
  'T-shirt zip pulls': 70,
};

export function tshirtLayerForBuilderStep(step: number): TshirtLayerId | null {
  const cats = getTshirtCategoriesForStep(step);
  return cats[0] ? TSHIRT_CATEGORY_LAYER_ID[cats[0]] : null;
}

/** Builder sidebar step for a preview layer (split ids map to their parent step). */
export function tshirtBuilderStepForLayerId(id: TshirtLayerId): number | null {
  switch (id) {
    case 'base':
    case 'fill':
      return 2;
    case 'neck':
      return 3;
    case 'sleeves':
    case 'sleeveLeft':
    case 'sleeveRight':
      return 4;
    case 'sleeveHem':
    case 'sleeveHemLeft':
    case 'sleeveHemRight':
    case 'bodyHem':
      return 5;
    case 'placket':
    case 'zip':
    case 'zipPull':
      return 6;
    default:
      return null;
  }
}

/** Human-readable label for the draggable preview layer on a builder step. */
export function tshirtLayerLabelForStep(step: number): string | null {
  const cats = getTshirtCategoriesForStep(step);
  return cats[0] ?? null;
}

export type TshirtAssetSelection = Partial<Record<TshirtCategoryId, string>>;

export interface ResolveTshirtLayersInput {
  selection: TshirtAssetSelection;
  neckTrimColor?: string;
  sleeveTrimColor?: string;
  pocketTrimColor?: string;
}

export interface ResolvedTshirtLayer {
  id: TshirtLayerId;
  category: TshirtCategoryId;
  assetId: string;
  displayName: string;
  svgRaw: string;
  kind: 'solid' | 'detail';
  tint?: string;
  zIndex: number;
}

function trimForCategory(
  category: TshirtCategoryId,
  input: ResolveTshirtLayersInput,
): string | undefined {
  if (category === 'neckline') return input.neckTrimColor;
  if (category === 'T-shirt sleeve hem') return input.sleeveTrimColor;
  if (
    category === 'T-shirt zips' ||
    category === 'T-shirt zip pulls' ||
    category === 'T-shirts plackets & opening'
  ) {
    return input.pocketTrimColor;
  }
  return undefined;
}

/** Exactly one rendered layer per category (skipped when selection is none / empty). */
export function resolveTshirtLayers(input: ResolveTshirtLayersInput): ResolvedTshirtLayer[] {
  const layers: ResolvedTshirtLayer[] = [];

  for (const category of TSHIRT_CATEGORY_ORDER) {
    const assetId = input.selection[category];
    if (!assetId || assetId === TSHIRT_NONE) continue;

    const asset = getTshirtAsset(assetId);
    if (!asset) continue;

    const isDetail =
      category === 'T-shirt zips' ||
      category === 'T-shirt zip pulls';

    layers.push({
      id: TSHIRT_CATEGORY_LAYER_ID[category],
      category,
      assetId: asset.id,
      displayName: asset.displayName,
      svgRaw: asset.svgRaw,
      kind: isDetail ? 'detail' : 'solid',
      tint: trimForCategory(category, input),
      zIndex: TSHIRT_CATEGORY_Z_INDEX[category],
    });
  }

  return layers.sort((a, b) => a.zIndex - b.zIndex);
}

export function getSelectionLabel(selection: TshirtAssetSelection, category: TshirtCategoryId): string {
  const id = selection[category];
  if (!id || id === TSHIRT_NONE) return 'None';
  return getTshirtAsset(id)?.displayName ?? id.split('/').pop() ?? 'None';
}
