/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `Box`'s style props as CSS: Primer's scales, Primer's variables with no
 * fallback, responsive values and pseudo states as rules of one class — and
 * every variable it can emit set by the theme provider, in every theme.
 */

import { describe, expect, it } from 'vitest';
import { BOX_EMITTED_VARS, boxClassOf, getBoxCss, resolveBoxValue } from '../Box';
import { themeConfigs } from '../../../theme/themeRegistry';
import { primerBaseVars } from '../../../theme/css/primerBaseVars';
import { typographyVars } from '../../../theme/DatalayerThemeProvider';

const css = (style: Record<string, unknown>) => {
  const box = boxClassOf(style);
  return box ? box.rules.join('\n').split(box.className).join('X') : '';
};

describe('a value', () => {
  it('indexes Primer\'s scales, in pixels past their end', () => {
    expect(resolveBoxValue('space', 3)).toBe('16px');
    expect(resolveBoxValue('space', 20)).toBe('20px');
    expect(resolveBoxValue('signedSpace', -2)).toBe('-8px');
    expect(resolveBoxValue('fontSize', 1)).toBe('14px');
    expect(resolveBoxValue('radius', 2)).toBe('6px');
    expect(resolveBoxValue('radius', 12)).toBe('12px');
    expect(resolveBoxValue('size', 800)).toBe('800px');
    expect(resolveBoxValue('size', 'large')).toBe('1012px');
    expect(resolveBoxValue('unitless', 1)).toBe('1');
  });

  it('is a token\'s variable, alone', () => {
    expect(resolveBoxValue('color', 'canvas.subtle')).toBe('var(--bgColor-muted)');
    expect(resolveBoxValue('color', 'border.default')).toBe('var(--borderColor-default)');
    expect(resolveBoxValue('color', 'fg.muted')).toBe('var(--fgColor-muted)');
    expect(resolveBoxValue('shadow', 'shadow.medium')).toBe('var(--shadow-resting-medium)');
    expect(resolveBoxValue('radius', 'large')).toBe('var(--borderRadius-large)');
    expect(resolveBoxValue('radius', 'card')).toBe('var(--theme-radius-card)');
    expect(resolveBoxValue('fontWeight', 'semibold')).toBe('var(--base-text-weight-medium)');
    expect(resolveBoxValue('fontWeight', 'bold')).toBe('var(--base-text-weight-semibold)');
    expect(resolveBoxValue('font', 'mono')).toBe('var(--fontStack-monospace)');
  });

  it('is CSS as written when it is not a token', () => {
    expect(resolveBoxValue('color', '#fff')).toBe('#fff');
    expect(resolveBoxValue('color', 'var(--fgColor-accent)')).toBe('var(--fgColor-accent)');
    expect(resolveBoxValue('radius', '50%')).toBe('50%');
  });
});

describe('a style', () => {
  it('is one class of declarations', () => {
    expect(css({ display: 'flex', p: 3, bg: 'canvas.default', border: '1px solid', borderColor: 'border.default' })).toBe(
      '.X{display:flex;padding:16px;background-color:var(--bgColor-default);border:1px solid;border-color:var(--borderColor-default)}',
    );
    expect(css({ px: 2 })).toBe('.X{padding-left:8px;padding-right:8px}');
  });

  it('is nothing when it sets nothing', () => {
    expect(boxClassOf({})).toBeUndefined();
    expect(boxClassOf({ display: undefined, p: null, m: false })).toBeUndefined();
  });

  it('is one rule per breakpoint for a responsive value', () => {
    expect(css({ gridTemplateColumns: ['minmax(0, 1fr)', null, 'repeat(3, minmax(0, 1fr))'] })).toBe(
      [
        '.X{grid-template-columns:minmax(0, 1fr)}',
        '@media screen and (min-width: 768px){.X{grid-template-columns:repeat(3, minmax(0, 1fr))}}',
      ].join('\n'),
    );
  });

  it('draws its states after its base', () => {
    expect(css({ bg: 'canvas.default', hover: { bg: 'canvas.subtle' }, focusVisible: { outline: '2px solid' } })).toBe(
      [
        '.X{background-color:var(--bgColor-default)}',
        '.X:hover{background-color:var(--bgColor-muted)}',
        '.X:focus-visible{outline:2px solid}',
      ].join('\n'),
    );
    expect(css({ reducedMotion: { transition: 'none' } })).toBe(
      '@media (prefers-reduced-motion: reduce){.X{transition:none}}',
    );
  });

  it('shares a class with an equal style', () => {
    const one = boxClassOf({ p: 2, m: 1 });
    const two = boxClassOf({ p: 2, m: 1 });
    expect(one).toBe(two);
    expect(boxClassOf({ p: 2 })?.className).not.toBe(one?.className);
    expect(getBoxCss()).toContain(`.${one?.className}{padding:8px;margin:4px}`);
  });

  it('never emits a fallback', () => {
    const style = { bg: 'neutral.muted', color: 'fg.muted', borderColor: 'accent.muted', boxShadow: 'shadow.large', borderRadius: 'full' };
    expect(css(style)).not.toMatch(/var\([^)]*,/);
  });
});

describe('an sx', () => {
  const sx = (value: object) => {
    const box = boxClassOf({}, value);
    return box ? box.rules.join('\n').split(box.className).join('X') : '';
  };

  it('reads its keys as the props do, and CSS as written for the rest', () => {
    expect(sx({ p: 2, bg: 'canvas.subtle', WebkitLineClamp: 2, marginBlockEnd: 4, '--x': 1 })).toBe(
      '.X{padding:8px;background-color:var(--bgColor-muted);-webkit-line-clamp:2;margin-block-end:4px;--x:1}',
    );
  });

  it('nests its selectors under the class', () => {
    expect(sx({ '&:hover': { color: 'fg.default' }, ':focus-visible': { outline: 'none' }, '& svg, & img': { opacity: 0.5 }, label: { mt: 2 } })).toBe(
      [
        '.X:hover{color:var(--fgColor-default)}',
        '.X:focus-visible{outline:none}',
        '.X svg,.X img{opacity:0.5}',
        '.X label{margin-top:8px}',
      ].join('\n'),
    );
  });

  it('wraps a media block and keeps a keyframes global', () => {
    expect(sx({ '@media (max-width: 768px)': { p: [1, 2] }, '@keyframes spin': { from: { transform: 'rotate(0)' }, to: { transform: 'rotate(1turn)' } } })).toBe(
      [
        '@media (max-width: 768px){.X{padding:4px}}',
        '@media (max-width: 768px){@media screen and (min-width: 544px){.X{padding:8px}}}',
        '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(1turn)}}',
      ].join('\n'),
    );
  });

  it('comes after the props, so it wins where both speak', () => {
    expect(css({ p: 1 }) + '|' + sx({ p: 2 })).toBe('.X{padding:4px}|.X{padding:8px}');
    const both = boxClassOf({ p: 1 }, { p: 2 });
    expect(both?.rules.map(rule => rule.split(both.className).join('X'))).toEqual(['.X{padding:4px}', '.X{padding:8px}']);
  });
});

describe('the variables Box emits', () => {
  for (const [name, config] of Object.entries(themeConfigs)) {
    for (const mode of ['light', 'dark'] as const) {
      it(`are all set by the ${name} theme in ${mode} mode`, () => {
        const set = new Set(
          Object.keys({ ...typographyVars, ...primerBaseVars[mode], ...(config.themeStyles[mode] as object) }),
        );
        expect(BOX_EMITTED_VARS.filter(name => !set.has(name))).toEqual([]);
      });
    }
  }

  it('give the loop theme its hairline on Primer\'s default border', () => {
    const light = themeConfigs.loop.themeStyles.light as Record<string, string>;
    expect(light['--borderColor-default']).toBe(light['--loop-hairline']);
    expect(light['--borderRadius-large']).toBe(light['--loop-radius-card']);
  });
});
