// material-ui
import { createTheme } from "@mui/material/styles";

// third-party
import { presetPalettes } from "@ant-design/colors";

// project import
import ThemeOption from "./theme";

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export default function Palette(mode, presetColor) {
  const colors = presetPalettes;

  colors.primary = {
    lighter: "#e6f7ff", // Blue-1
    100: "#bae7ff", // Blue-2
    200: "#91d5ff", // Blue-3
    light: "#69c0ff", // Blue-4
    400: "#40a9ff", // Blue-5
    main: "#1890ff", // Blue-6
    dark: "#096dd9", // Blue-7
    700: "#0050b3", // Blue-8
    darker: "#003a8c", // Blue-9
    900: "#002766" // Blue-10
  };

  colors.secondary = {
    lighter: "#fafafa", // Grey-1
    100: "#f5f5f5", // Grey-2
    200: "#f0f0f0", // Grey-3
    light: "#d9d9d9", // Grey-4
    400: "#bfbfbf", // Grey-5
    main: "#8c8c8c", // Grey-6
    600: "#595959", // Grey-7
    dark: "#262626", // Grey-8
    800: "#141414", // Grey-9
    darker: "#000000", // Grey-10
    A100: "#ffffff", // Grey-A1
    A200: "#434343", // Grey-A2
    A300: "#1f1f1f" // Grey-A3
  };

  colors.other = {
    A100: "#f9f0ff", // A100
    A200: "#d3adf7", // A200
    A300: "#722ed1" // A300
  };

  colors.success = {
    lighter: "#f6ffed", // Green-1
    light: "#95de64", // Green-4
    main: "#52c41a", // Green-6
    dark: "#237804", // Green-8
    darker: "#092b00" // Green-10
  };

  colors.error = {
    lighter: "#fff1f0", // Red-1
    light: "#ff7875", // Red-4
    main: "#f5222d", // Red-6
    dark: "#a8071a", // Red-8
    darker: "#5c0011" // Red-10
  };

  colors.warning = {
    lighter: "#fffbe6", // Gold-1
    light: "#ffd666", // Gold-4
    main: "#faad14", // Gold-6
    dark: "#ad6800", // Gold-8
    darker: "#613400" // Gold-10
  };

  const paletteColor = ThemeOption(colors, presetColor, mode);

  return createTheme({
    palette: {
      mode,
      ...paletteColor,
      other: colors.other
    }
  });
}
