import { defineConfig } from '@pandacss/dev'
import { amber, black, gray, white } from '@/theme/colors'
import { recipes, slotRecipes } from '@/theme/recipes'
import { shadows } from '@/theme/shadows'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: 'styled-system',

  // The jsx framework you are using
  jsxFramework: 'react',

  // Park UI specific configuration
  globalCss: {
    extend: {
      html: {
        colorPalette: 'amber',
      },
    },
  },
  theme: {
    extend: {
      recipes,
      slotRecipes,
      semanticTokens: {
        colors: {
          amber,
          gray,
        },
        radii: {
          l1: { value: '{radii.xs}' },
          l2: { value: '{radii.sm}' },
          l3: { value: '{radii.md}' },
        },
        shadows,
      },
      tokens: {
        colors: {
          black,
          white,
        },
      },
    },
  },
  conditions: {
    extend: {
      light: ':root &, .light &',
    },
  },
  hooks: {
    'preset:resolved': ({ utils, preset, name }) => {
      if (name === '@pandacss/preset-panda') {
        return utils.omit(preset, ['theme.tokens.colors', 'theme.semanticTokens.colors'])
      }
      return preset
    },
  },
})
