import themeJson from "./theme.json";
import { PaletteColorOptions, PaletteOptions } from "@mui/material/styles";

type ColorFamily = Record<string, string>;

type AllColors = Record<string, ColorFamily>;

// Load all colors from theme JSON
const allColors: AllColors = { ...themeJson["material/colors"] };

// Function to resolve color values in an object if they are strings
function resolveColors(data: Record<string, string | object>): Record<string, string | object> {
  if (typeof data !== "object" || data === null) return data; // Return non-object data as is

  const resolvedData: Record<string, string | object> = {};

  for (let [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      // Check if value matches pattern like colorFamily[shade]
      const match = value.match(/^(.+?)\[(\d+|A\d+)\]$/);
      if (match) {
        const [_, colorFamily, shade] = match;
        
        // Replace color reference with hex code if available
        resolvedData[key] =
          allColors[colorFamily] && allColors[colorFamily][shade]
            ? allColors[colorFamily][shade]
            : value;
      } else {
        resolvedData[key] = value; // Keep original value if not a color reference
      }
    } else {
      resolvedData[key] = value; // Keep non-string values as is
    }
  }

  return resolvedData;
}

// Map resolved colors to the palette
export const palette: PaletteOptions = {
  ...allColors,
  primary: resolveColors(themeJson.colorSchemes.light.palette.primary) as PaletteColorOptions,
  secondary: resolveColors(themeJson.colorSchemes.light.palette.secondary) as PaletteColorOptions,
  error: resolveColors(themeJson.colorSchemes.light.palette.error) as PaletteColorOptions,
  warning: resolveColors(themeJson.colorSchemes.light.palette.warning) as PaletteColorOptions,
  info: resolveColors(themeJson.colorSchemes.light.palette.info) as PaletteColorOptions,
  success: resolveColors(themeJson.colorSchemes.light.palette.success) as PaletteColorOptions,
};