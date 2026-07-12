import type { TshirtLayerId, TshirtLayerTransform } from './tshirtLayerAssets';
import { DEFAULT_TSHIRT_LAYER_TRANSFORM } from './tshirtLayerAssets';
import type { SleeveSide } from '../lib/tshirtSvgUtils';

/** Sleeve asset ids under src/assets/tshirts/T-shirt sleeves/ */
export const TSHIRT_SLEEVE_ASSET_IDS = {
  artwork1: 'T-shirt sleeves/Untitled_Artwork-1',
  artwork2: 'T-shirt sleeves/Untitled_Artwork-2',
  artwork3: 'T-shirt sleeves/Untitled_Artwork-3',
  artwork4: 'T-shirt sleeves/Untitled_Artwork-4',
  artwork5: 'T-shirt sleeves/Untitled_Artwork-5',
  artwork6: 'T-shirt sleeves/Untitled_Artwork-6',
  artwork7: 'T-shirt sleeves/Untitled_Artwork-7',
} as const;

/** Cuff (sleeve hem) asset ids under src/assets/tshirts/T-shirt sleeve hem/ */
export const TSHIRT_HEM_ASSET_IDS = {
  artwork1: 'T-shirt sleeve hem/Untitled_Artwork-1',
  artwork2: 'T-shirt sleeve hem/Untitled_Artwork-2',
} as const;

export const TSHIRT_DEFAULT_HEM_ASSET_ID = TSHIRT_HEM_ASSET_IDS.artwork1;

const DEFAULT_CUFF_SIZE = {
  scale: 1,
  scaleX: 1,
  scaleY: 1,
} as const;

export interface TshirtCuffAlignAdjust {
  x?: number;
  y?: number;
}

export interface TshirtCuffSideDefaults {
  align?: TshirtCuffAlignAdjust;
  rotation?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  x?: number;
  y?: number;
  transform?: Partial<TshirtLayerTransform>;
}

export interface TshirtCuffDefaults {
  left?: TshirtCuffSideDefaults;
  right?: TshirtCuffSideDefaults;
  both?: TshirtCuffSideDefaults;
}

/** Composite lookup key: `${sleeveAssetId}::${hemAssetId}` */
export function tshirtCuffPairKey(sleeveAssetId: string, hemAssetId: string): string {
  return `${sleeveAssetId}::${hemAssetId}`;
}

function cuffSide(
  align: { x: number; y: number },
  overrides: Partial<TshirtCuffSideDefaults> = {},
): TshirtCuffSideDefaults {
  return {
    align,
    rotation: 0,
    ...DEFAULT_CUFF_SIZE,
    x: 0,
    y: 0,
    ...overrides,
  };
}

function cuffSideTransform(sideDefaults?: TshirtCuffSideDefaults): Partial<TshirtLayerTransform> {
  if (!sideDefaults) return {};

  const scale = sideDefaults.scale ?? sideDefaults.transform?.scale;
  const scaleX = sideDefaults.scaleX ?? sideDefaults.transform?.scaleX;
  const scaleY = sideDefaults.scaleY ?? sideDefaults.transform?.scaleY;

  return {
    ...(sideDefaults.x != null ? { x: sideDefaults.x } : {}),
    ...(sideDefaults.y != null ? { y: sideDefaults.y } : {}),
    ...(sideDefaults.rotation != null ? { rotation: sideDefaults.rotation } : {}),
    ...(scale != null ? { scale } : {}),
    ...(scaleX != null ? { scaleX } : {}),
    ...(scaleY != null ? { scaleY } : {}),
    ...sideDefaults.transform,
  };
}

const S1 = TSHIRT_SLEEVE_ASSET_IDS.artwork1;
const S2 = TSHIRT_SLEEVE_ASSET_IDS.artwork2;
const S3 = TSHIRT_SLEEVE_ASSET_IDS.artwork3;
const S4 = TSHIRT_SLEEVE_ASSET_IDS.artwork4;
const S5 = TSHIRT_SLEEVE_ASSET_IDS.artwork5;
const S6 = TSHIRT_SLEEVE_ASSET_IDS.artwork6;
const S7 = TSHIRT_SLEEVE_ASSET_IDS.artwork7;
const H1 = TSHIRT_HEM_ASSET_IDS.artwork1;
const H2 = TSHIRT_HEM_ASSET_IDS.artwork2;

/**
 * Defaults for every sleeve style × cuff style pair (7 sleeves × 2 cuffs = 14 entries).
 *
 * Edit per pair and per side: `align`, `rotation`, `scale` / `scaleX` / `scaleY`, `x`, `y`.
 * Measured `align` values are the starting placement; tune from there in the builder or here.
 */
export const TSHIRT_CUFF_DEFAULTS: Record<string, TshirtCuffDefaults> = {
  // ── Sleeve 1 ──────────────────────────────────────────────────────────────
  [tshirtCuffPairKey(S1, H1)]: {
    left: cuffSide({ x: 40, y: 120 }, { rotation: -25, scaleX: 0.75, scaleY: 0.75 }),
    right: cuffSide({ x: -40, y: 120 }, { rotation: 25, scaleX: 0.75, scaleY: 0.75 }),
  },
  [tshirtCuffPairKey(S1, H2)]: {
    left: cuffSide({ x: 59.6, y: 239.3 }),
    right: cuffSide({ x: -59.6, y: 239.7 }),
  },

  // ── Sleeve 2 ──────────────────────────────────────────────────────────────
  [tshirtCuffPairKey(S2, H1)]: {
    left: cuffSide({ x: 47.1, y: 263.8 }),
    right: cuffSide({ x: -47.1, y: 264.1 }),
  },
  [tshirtCuffPairKey(S2, H2)]: {
    left: cuffSide({ x: 32.4, y: 261.4 }),
    right: cuffSide({ x: -32.4, y: 261.8 }),
  },

  // ── Sleeve 3 ──────────────────────────────────────────────────────────────
  [tshirtCuffPairKey(S3, H1)]: {
    left: cuffSide({ x: 52.6, y: 426.7 }),
    right: cuffSide({ x: -52.6, y: 427 }),
  },
  [tshirtCuffPairKey(S3, H2)]: {
    left: cuffSide({ x: 37.9, y: 424.3 }),
    right: cuffSide({ x: -37.9, y: 424.7 }),
  },

  // ── Sleeve 4 ──────────────────────────────────────────────────────────────
  [tshirtCuffPairKey(S4, H1)]: {
    left: cuffSide({ x: -31.1, y: 312.6 }),
    right: cuffSide({ x: 31, y: 313 }),
  },
  [tshirtCuffPairKey(S4, H2)]: {
    left: cuffSide({ x: -45.8, y: 310.2 }),
    right: cuffSide({ x: 45.7, y: 310.7 }),
  },

  // ── Sleeve 5 ──────────────────────────────────────────────────────────────
  [tshirtCuffPairKey(S5, H1)]: {
    left: cuffSide({ x: 4.1, y: 1023.2 }),
    right: cuffSide({ x: -4.1, y: 1023.5 }),
  },
  [tshirtCuffPairKey(S5, H2)]: {
    left: cuffSide({ x: -10.6, y: 1020.7 }),
    right: cuffSide({ x: 10.6, y: 1021.2 }),
  },

  // ── Sleeve 6 ──────────────────────────────────────────────────────────────
  [tshirtCuffPairKey(S6, H1)]: {
    left: cuffSide({ x: 54.3, y: 1008 }),
    right: cuffSide({ x: -54.3, y: 1008.3 }),
  },
  [tshirtCuffPairKey(S6, H2)]: {
    left: cuffSide({ x: 39.6, y: 1005.6 }),
    right: cuffSide({ x: -39.6, y: 1006.1 }),
  },

  // ── Sleeve 7 ──────────────────────────────────────────────────────────────
  [tshirtCuffPairKey(S7, H1)]: {
    left: cuffSide({ x: 52.2, y: 996.4 }),
    right: cuffSide({ x: -52.2, y: 996.7 }),
  },
  [tshirtCuffPairKey(S7, H2)]: {
    left: cuffSide({ x: 37.5, y: 994 }),
    right: cuffSide({ x: -37.5, y: 994.5 }),
  },
};

function cuffSideDefaults(
  config: TshirtCuffDefaults | undefined,
  side: SleeveSide,
): TshirtCuffSideDefaults | undefined {
  if (!config) return undefined;
  return side === 'left' ? (config.left ?? config.both) : (config.right ?? config.both);
}

export function resolveTshirtCuffDefaults(
  sleeveAssetId: string | undefined,
  hemAssetId?: string | undefined,
): TshirtCuffDefaults | undefined {
  if (!sleeveAssetId) return undefined;
  if (hemAssetId) {
    const pair = TSHIRT_CUFF_DEFAULTS[tshirtCuffPairKey(sleeveAssetId, hemAssetId)];
    if (pair) return pair;
  }
  return TSHIRT_CUFF_DEFAULTS[sleeveAssetId];
}

export function resolveCuffAlignOffset(
  autoAlign: { x: number; y: number },
  sleeveAssetId: string | undefined,
  hemAssetId: string | undefined,
  side: SleeveSide,
): { x: number; y: number } {
  const sideDefaults = cuffSideDefaults(
    resolveTshirtCuffDefaults(sleeveAssetId, hemAssetId),
    side,
  );
  const align = sideDefaults?.align;
  if (align?.x != null && align?.y != null) {
    return { x: align.x, y: align.y };
  }
  return {
    x: autoAlign.x + (align?.x ?? 0),
    y: autoAlign.y + (align?.y ?? 0),
  };
}

export function mergeCuffSideTransform(
  side: SleeveSide,
  sleeveAssetId: string | undefined,
  hemAssetId: string | undefined,
  userTransforms?: Partial<Record<TshirtLayerId, TshirtLayerTransform>>,
): TshirtLayerTransform {
  const sideId = side === 'left' ? 'sleeveHemLeft' : 'sleeveHemRight';
  const sideDefaults = cuffSideDefaults(
    resolveTshirtCuffDefaults(sleeveAssetId, hemAssetId),
    side,
  );

  return {
    ...DEFAULT_TSHIRT_LAYER_TRANSFORM,
    ...cuffSideTransform(sideDefaults),
    ...userTransforms?.sleeveHem,
    ...userTransforms?.[sideId],
  };
}
