---
name: unrot-design-system
description: Generates React Native / Expo components and pages using the unrot.co design system.
---

# Component Generator Skill

This skill provides the structure and instructions required to build perfectly-themed components for the `unrot.co` project.

## Core Directives

1. **Always use the central theme constants**:
   You must NEVER hardcode colors, spacing values, font sizes, font families, or border radii. All design tokens must be pulled from `src/constants/theme.ts`.

2. **Colors and Theming**:
   - The app uses light and dark modes dynamically.
   - You MUST use the `useThemeColors` hook to access colors inside functional components.
   ```typescript
   import { useThemeColors } from "@/src/hooks/useThemeColors";
   // inside component
   const colors = useThemeColors();
   // <View style={{ backgroundColor: colors.surface }}>
   ```

3. **Typography**:
   - Standard text must use the defined `FontFamily` strings.
   - Standard typography weight choices: `regular`, `medium`, `semibold`, `bold`, `heavy`.
   - All text sizes must use the `FontSize` object.
   ```typescript
   import { FontFamily, FontSize, Colors } from "@/src/constants/theme";
   // <Text style={{ fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: colors.text }}>
   ```

4. **Spacing & Layout**:
   - Padding, margins, and gaps must use the `Spacing` object from the theme.
   - Example keys: `xs` (4), `sm` (8), `md` (12), `lg` (16), `xl` (20), `xxl` (24), `xxxl` (32), `huge` (48), `massive` (64).
   ```typescript
   import { Spacing } from "@/src/constants/theme";
   // <View style={{ padding: Spacing.lg, gap: Spacing.md }}>
   ```

5. **Border Radius & Shapes**:
   - Use the `BorderRadius` object.
   - Keys: `sm` (8), `md` (12), `lg` (16), `xl` (24), `xxl` (48), `full` (9999).
   ```typescript
   import { BorderRadius } from "@/src/constants/theme";
   // <View style={{ borderRadius: BorderRadius.xl }}>
   ```

## References

Before generating components, review the exact token maps provided in:
- `references/theme-guidelines.md`
- `references/animations.md`
- `references/best-practices.md`
- `references/component-patterns.md`
- `references/theme-tokens.md`
- `references/typography.md`

## Required Output Format

By default, generate components as HTML and instead of a tsx directory, create them in `iterations/html/<component name>`.

If the user explicitly wants to generate TSX, ensure it is written in TypeScript (`.tsx`) and correctly typed for React Native / Expo, using standard components like `View`, `Text`, `TouchableOpacity`, `Pressable`, etc. When doing so, the generated files must be added in `iterations/tsx/<component name>`.
