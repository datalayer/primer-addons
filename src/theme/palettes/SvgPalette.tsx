/*
 * Copyright (c) 2021-2024 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Shared SVG palette types, theme-aware colour resolution, and reusable
 * gradient / grid definitions consumed by SVG illustrations.
 */

import {
  datalayerColors,
  spatialColors,
  lovelyColors,
  matrixColors,
  earthColors,
} from '../colors';
import {
  getBrightPalette,
  type ThemeVariant,
} from '../themeRegistry';
import { useThemeStore } from '../useThemeStore';

export interface SvgPalette {
  bg: string;
  bgPanel: string;
  bgAlt: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  pop: string;
  spark: string;
  blaze: string;
  surge: string;
  flame: string;
  gold: string;
  textLight: string;
  textMuted: string;
  isLight: boolean;
}

const dlBrightDark = getBrightPalette('datalayer');
const dlBrightLight = getBrightPalette('datalayer', 'light');
const spBrightDark = getBrightPalette('spatial');
const spBrightLight = getBrightPalette('spatial', 'light');
const lvBrightDark = getBrightPalette('lovely');
const lvBrightLight = getBrightPalette('lovely', 'light');
const mxBrightDark = getBrightPalette('matrix');
const mxBrightLight = getBrightPalette('matrix', 'light');
const eaBrightDark = getBrightPalette('earth');
const eaBrightLight = getBrightPalette('earth', 'light');

const palettes: Record<ThemeVariant, { light: SvgPalette; dark: SvgPalette }> = {
  datalayer: {
    light: {
      bg: '#f6f8fa',
      bgPanel: '#ffffff',
      bgAlt: '#f0f3f6',
      primary: datalayerColors.greenBrand,
      secondary: datalayerColors.greenText,
      accent: datalayerColors.greenBright,
      glow: dlBrightLight.glow,
      pop: dlBrightLight.pop,
      spark: dlBrightLight.spark,
      blaze: dlBrightLight.blaze,
      surge: dlBrightLight.surge,
      flame: dlBrightLight.flame,
      gold: dlBrightLight.gold,
      textLight: '#1f2328',
      textMuted: '#656d76',
      isLight: true,
    },
    dark: {
      bg: '#0d1117',
      bgPanel: '#161b22',
      bgAlt: '#1c2128',
      primary: datalayerColors.greenAccent,
      secondary: datalayerColors.greenBrand,
      accent: datalayerColors.greenBright,
      glow: dlBrightDark.glow,
      pop: dlBrightDark.pop,
      spark: dlBrightDark.spark,
      blaze: dlBrightDark.blaze,
      surge: dlBrightDark.surge,
      flame: dlBrightDark.flame,
      gold: dlBrightDark.gold,
      textLight: '#f0f6fc',
      textMuted: '#8b949e',
      isLight: false,
    },
  },
  spatial: {
    light: {
      bg: '#f0f2ff',
      bgPanel: '#ffffff',
      bgAlt: '#eef2ff',
      primary: spatialColors.indigoBrand,
      secondary: spatialColors.indigoText,
      accent: spatialColors.indigoBright,
      glow: spBrightLight.glow,
      pop: spBrightLight.pop,
      spark: spBrightLight.spark,
      blaze: spBrightLight.blaze,
      surge: spBrightLight.surge,
      flame: spBrightLight.flame,
      gold: spBrightLight.gold,
      textLight: '#1E1E3F',
      textMuted: spatialColors.gray,
      isLight: true,
    },
    dark: {
      bg: spatialColors.black,
      bgPanel: '#111827',
      bgAlt: '#1E293B',
      primary: spatialColors.indigoAccent,
      secondary: spatialColors.indigoBrand,
      accent: spatialColors.indigoBright,
      glow: spBrightDark.glow,
      pop: spBrightDark.pop,
      spark: spBrightDark.spark,
      blaze: spBrightDark.blaze,
      surge: spBrightDark.surge,
      flame: spBrightDark.flame,
      gold: spBrightDark.gold,
      textLight: '#E0E7FF',
      textMuted: '#94A3B8',
      isLight: false,
    },
  },
  lovely: {
    light: {
      bg: '#fff5f7',
      bgPanel: '#ffffff',
      bgAlt: lovelyColors.roseTint,
      primary: lovelyColors.roseBrand,
      secondary: lovelyColors.roseText,
      accent: lovelyColors.roseBright,
      glow: lvBrightLight.glow,
      pop: lvBrightLight.pop,
      spark: lvBrightLight.spark,
      blaze: lvBrightLight.blaze,
      surge: lvBrightLight.surge,
      flame: lvBrightLight.flame,
      gold: lvBrightLight.gold,
      textLight: '#2D1B28',
      textMuted: lovelyColors.gray,
      isLight: true,
    },
    dark: {
      bg: lovelyColors.black,
      bgPanel: '#250E1D',
      bgAlt: '#3D1530',
      primary: lovelyColors.roseAccent,
      secondary: lovelyColors.roseBrand,
      accent: lovelyColors.roseBright,
      glow: lvBrightDark.glow,
      pop: lvBrightDark.pop,
      spark: lvBrightDark.spark,
      blaze: lvBrightDark.blaze,
      surge: lvBrightDark.surge,
      flame: lvBrightDark.flame,
      gold: lvBrightDark.gold,
      textLight: '#FCE7F3',
      textMuted: '#D4A5BD',
      isLight: false,
    },
  },
  matrix: {
    light: {
      bg: '#f0fff0',
      bgPanel: '#ffffff',
      bgAlt: matrixColors.greenTint,
      primary: matrixColors.greenBrand,
      secondary: matrixColors.greenText,
      accent: matrixColors.greenAccent,
      glow: mxBrightLight.glow,
      pop: mxBrightLight.pop,
      spark: mxBrightLight.spark,
      blaze: mxBrightLight.blaze,
      surge: mxBrightLight.surge,
      flame: mxBrightLight.flame,
      gold: mxBrightLight.gold,
      textLight: '#0A2E1A',
      textMuted: matrixColors.gray,
      isLight: true,
    },
    dark: {
      bg: matrixColors.black,
      bgPanel: '#0A1F0A',
      bgAlt: '#122812',
      primary: matrixColors.greenPhosphor,
      secondary: matrixColors.greenGlow,
      accent: matrixColors.greenGlow,
      glow: mxBrightDark.glow,
      pop: mxBrightDark.pop,
      spark: mxBrightDark.spark,
      blaze: mxBrightDark.blaze,
      surge: mxBrightDark.surge,
      flame: mxBrightDark.flame,
      gold: mxBrightDark.gold,
      textLight: '#C8E6C9',
      textMuted: '#66BB6A',
      isLight: false,
    },
  },
  earth: {
    light: {
      bg: '#F0F5FA',
      bgPanel: '#ffffff',
      bgAlt: earthColors.oceanTint,
      primary: earthColors.oceanBrand,
      secondary: earthColors.oceanText,
      accent: earthColors.oceanAccent,
      glow: eaBrightLight.glow,
      pop: eaBrightLight.pop,
      spark: eaBrightLight.spark,
      blaze: eaBrightLight.blaze,
      surge: eaBrightLight.surge,
      flame: eaBrightLight.flame,
      gold: eaBrightLight.gold,
      textLight: '#1A2332',
      textMuted: earthColors.gray,
      isLight: true,
    },
    dark: {
      bg: earthColors.black,
      bgPanel: '#0E1D30',
      bgAlt: '#132840',
      primary: earthColors.oceanAccent,
      secondary: earthColors.oceanBrand,
      accent: earthColors.oceanBright,
      glow: eaBrightDark.glow,
      pop: eaBrightDark.pop,
      spark: eaBrightDark.spark,
      blaze: eaBrightDark.blaze,
      surge: eaBrightDark.surge,
      flame: eaBrightDark.flame,
      gold: eaBrightDark.gold,
      textLight: '#D4E4DC',
      textMuted: '#8A9BA8',
      isLight: false,
    },
  },
};

export function getSvgPalette(
  theme: ThemeVariant = 'datalayer',
  colorMode: 'light' | 'dark' | 'auto' = 'auto',
): SvgPalette {
  const mode: 'light' | 'dark' =
    colorMode === 'auto'
      ? typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : colorMode;
  return palettes[theme]?.[mode] ?? palettes.datalayer.dark;
}

export function useSvgPalette(): SvgPalette {
  const { colorMode, theme } = useThemeStore();
  return getSvgPalette(theme, colorMode);
}

/** @deprecated Use `useSvgPalette` instead. */
export const useBlogSvgPalette = useSvgPalette;

export const LightBoostFilter = () => (
  <filter id="svgLightBoost" colorInterpolationFilters="sRGB">
    <feComponentTransfer>
      <feFuncA type="gamma" exponent="0.45" amplitude="1" offset="0" />
    </feComponentTransfer>
  </filter>
);

export const SharedDefs = ({ p }: { p: SvgPalette }) => (
  <defs>
    <LightBoostFilter />
    <linearGradient id="fadeGreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={p.primary} stopOpacity="0.7" />
      <stop offset="100%" stopColor={p.secondary} stopOpacity="0" />
    </linearGradient>
    <linearGradient id="fadeGreenH" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={p.primary} stopOpacity="0.5" />
      <stop offset="50%" stopColor={p.secondary} stopOpacity="0.25" />
      <stop offset="100%" stopColor={p.secondary} stopOpacity="0" />
    </linearGradient>
    <linearGradient id="fadeBright" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={p.accent} stopOpacity="0.4" />
      <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
    </linearGradient>
    <linearGradient id="fadeVivid" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={p.glow} stopOpacity="0.8" />
      <stop offset="50%" stopColor={p.pop} stopOpacity="0.5" />
      <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
    </linearGradient>
    <linearGradient id="fadeVividH" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={p.glow} stopOpacity="0.6" />
      <stop offset="100%" stopColor={p.pop} stopOpacity="0.15" />
    </linearGradient>
    <radialGradient id="glowGreen">
      <stop offset="0%" stopColor={p.primary} stopOpacity="0.6" />
      <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowBright">
      <stop offset="0%" stopColor={p.accent} stopOpacity="0.45" />
      <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowVivid">
      <stop offset="0%" stopColor={p.glow} stopOpacity="0.7" />
      <stop offset="60%" stopColor={p.glow} stopOpacity="0.2" />
      <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowPop">
      <stop offset="0%" stopColor={p.pop} stopOpacity="0.65" />
      <stop offset="60%" stopColor={p.pop} stopOpacity="0.15" />
      <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowSpark">
      <stop offset="0%" stopColor={p.spark} stopOpacity="0.6" />
      <stop offset="60%" stopColor={p.spark} stopOpacity="0.15" />
      <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowBlaze">
      <stop offset="0%" stopColor={p.blaze} stopOpacity="0.7" />
      <stop offset="55%" stopColor={p.blaze} stopOpacity="0.2" />
      <stop offset="100%" stopColor={p.blaze} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowSurge">
      <stop offset="0%" stopColor={p.surge} stopOpacity="0.7" />
      <stop offset="55%" stopColor={p.surge} stopOpacity="0.2" />
      <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowFlame">
      <stop offset="0%" stopColor={p.flame} stopOpacity="0.7" />
      <stop offset="55%" stopColor={p.flame} stopOpacity="0.2" />
      <stop offset="100%" stopColor={p.flame} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowGold">
      <stop offset="0%" stopColor={p.gold} stopOpacity="0.7" />
      <stop offset="55%" stopColor={p.gold} stopOpacity="0.2" />
      <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
    </radialGradient>
    <linearGradient id="fadeBlazeToSurge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={p.blaze} stopOpacity="0.7" />
      <stop offset="50%" stopColor={p.spark} stopOpacity="0.3" />
      <stop offset="100%" stopColor={p.surge} stopOpacity="0.7" />
    </linearGradient>
    <pattern id="gridDots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.7" fill={p.primary} opacity="0.06" />
    </pattern>
  </defs>
);

export const svgLightFilter = (p: SvgPalette) =>
  p.isLight ? 'url(#svgLightBoost)' : undefined;

export const BgGrid = ({ w = 800, h = 400 }: { w?: number; h?: number }) => (
  <rect width={w} height={h} fill="url(#gridDots)" />
);
