# Typography Reference

All typography tokens are defined in `src/constants/theme.ts`. You MUST use these instead of hardcoded values.

## Font Family (`FontFamily`)

The app uses `DMSans` as its core font family. Always import `FontFamily` from `src/constants/theme.ts`. Do not use `fontWeight` numbers directly when you can use the mapped `FontFamily`.

| Key        | Font Name           | Weight Equivalent | Use Case |
|------------|---------------------|-------------------|----------|
| `regular`  | DMSans-Regular      | 400 | Standard body text, descriptions |
| `medium`   | DMSans-Medium       | 500 | Buttons, secondary headings |
| `semibold` | DMSans-SemiBold     | 600 | Emphasized text, sub-headers |
| `bold`     | DMSans-Bold         | 700 | Primary Headers, titles |
| `heavy`    | DMSans-ExtraBold    | 800 | Hero text, major stats |

*(Note: If strictly necessary, `FontWeight` can provide numeric equivalents: "400", "500", "600", "700", "800")*

## Font Size (`FontSize`)

Always import `FontSize` from `src/constants/theme.ts`.

| Key       | Size | Use Case |
|-----------|------|----------|
| `xs`      | 11   | Microcopy, metadata, small tags |
| `sm`      | 13   | Secondary text, captions |
| `md`      | 15   | Standard body text |
| `lg`      | 17   | Important body text, primary buttons |
| `xl`      | 20   | Sub-headers, section titles |
| `xxl`     | 24   | Main headers, page titles |
| `xxxl`    | 32   | Large emphasize numbers/text |
| `display` | 40   | Hero section headings |

### Typography Usage Example:

```tsx
import { FontFamily, FontSize } from "@/src/constants/theme";
import { useThemeColors } from "@/src/hooks/useThemeColors";

export const Title = ({ text }: { text: string }) => {
  const colors = useThemeColors();
  
  return (
    <Text style={{ 
      fontFamily: FontFamily.bold, 
      fontSize: FontSize.xxl, 
      color: colors.text 
    }}>
      {text}
    </Text>
  );
};
```
