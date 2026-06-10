import { moderateScale } from "react-native-size-matters";

export const colors = {
  // Core UI Colors
  background: "#EFF9FF", // A very light, airy sky blue
  card: "#FFFFFF",       // Clean, crisp white for modals and cards
  text: "#4A3F35",       // A deep, warm brown, softer than black
  subtext: "#8A7463",    // A lighter, friendly brown for secondary text

  // Brand & Action Colors
  primary: "#2ECC71",    // Vibrant, grassy green for positive actions (e.g., Feed button)
  accent: "#FF6B6B",     // A playful, energetic red from the ball and bandana
  secondary: "#FFD166",  // A bright, sunny yellow for rewards, coins, and highlights

  // UI Element Colors
  border: "#DDEAF2",     // A soft, subtle border color to complement the background
  statBarBackground: "#E0E0E0", // A neutral background for the stat bars
};

// ─── Font Families ──────────────────────────────────────────────────────────
export const fontFamily = {
  heading: "LuckiestGuy-Regular",
  body: "Baloo2-Regular",
  bodyBold: "Baloo2-Bold",
};

// ─── Semantic Font Sizes (pre-scaled) ────────────────────────────────────
export const fontSize = {
  small:      moderateScale(12),  // For tiny text, like version numbers in settings
  body:       moderateScale(14),  // Standard text for descriptions or instructions
  statLabel:  moderateScale(15),  // For the labels above the stat bars (Hunger, etc.)
  button:     moderateScale(16),  // For the main action button text (Feed, Play)
  title:      moderateScale(20),  // For screen titles (e.g., "Settings") or modal titles
  heading:    moderateScale(28),  // For large on-screen headings (e.g., "My Pet")
  display:    moderateScale(48),  // For large numbers like the coin count
};


// ─── Exporting the Final Theme Object & Types ───────────────────────────────
export const theme = {
  colors: colors,
  fontFamily: fontFamily,
  fontSize: fontSize,
};

export type ThemeColors   = typeof colors;
export type ThemeFontSize = typeof fontSize;
export type ThemeFontFamily = typeof fontFamily;