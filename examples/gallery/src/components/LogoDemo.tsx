import {
  Box,
  DatalayerLogo,
  DatalayerLogoText,
  DatalayerText,
  DatalayerTextAI,
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
    </Box>
  );
}
