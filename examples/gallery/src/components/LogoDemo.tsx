import {
  AI,
  AI2,
  Box,
  DatalayerLogo,
  DatalayerLogoText,
  DatalayerText,
  DatalayerTextAI,
  DI,
  useThemeStore,
} from '@datalayer/primer-addons';

export function LogoDemo() {
  const { theme, colorMode } = useThemeStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <DatalayerLogo variant={theme} colorMode={colorMode} />
      <DatalayerText />
      <DatalayerLogoText variant={theme} colorMode={colorMode} />
      <DatalayerTextAI variant={theme} colorMode={colorMode} />
      <AI variant={theme} colorMode={colorMode} />
      <AI2 variant={theme} colorMode={colorMode} />
      <DI variant={theme} colorMode={colorMode} />
    </Box>
  );
}
