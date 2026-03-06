# Theme Tokens Reference

All design tokens are defined in `src/constants/theme.ts`. You MUST use these instead of hardcoded values.

## Colors (`ThemeColors`)

The app supports dynamic Light and Dark modes. Always access colors via the `useThemeColors` hook in functional components.

**Palette Overview:**
- **Primary (Purple)**: `primary` (#ce82ff), `primaryLight` (#e0adff), `primaryDark` (#b852ff), `primaryShadow` (#9c2bff)
- **Accent (Green)**: `accent` (#58CC02), `accentLight` (#78D930)
- **Backgrounds**: `background`, `surface`, `surfaceLight`, `surfaceShadow`, `card`
- **Text**: `text`, `textSecondary`, `textMuted`, `textInverse`
- **Semantic**: `success`, `successShadow`, `warning`, `error`, `info`
- **Borders**: `border`, `borderLight`
- **Misc**: `white`, `black`, `transparent`, `overlay` (rgba)
- **Navigation/Progress**: `tabBarBg`, `tabBarActive`, `progressBg`, `progressFill`
- **Prep Compass**: `prepBackground`, `prepAccent`, `prepCard`

### Usage Example:
```tsx
import { useThemeColors } from "@/src/hooks/useThemeColors";

export const MyComponent = () => {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.surface }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
};
```

## Spacing (`Spacing`)

Always import `Spacing` from `src/constants/theme.ts`.

| Key       | Value |
|-----------|-------|
| `xs`      | 4     |
| `sm`      | 8     |
| `md`      | 12    |
| `lg`      | 16    |
| `xl`      | 20    |
| `xxl`     | 24    |
| `xxxl`    | 32    |
| `huge`    | 48    |
| `massive` | 64    |

## Border Radius (`BorderRadius`)

Always import `BorderRadius` from `src/constants/theme.ts`.

| Key       | Value | Use Case            |
|-----------|-------|---------------------|
| `sm`      | 8     | Small tags, inputs  |
| `md`      | 12    | Standard cards      |
| `lg`      | 16    | Large cards, modals |
| `xl`      | 24    | Banners, highlights |
| `xxl`     | 48    | Large rounded areas |
| `full`    | 9999  | Circles, pills      |
