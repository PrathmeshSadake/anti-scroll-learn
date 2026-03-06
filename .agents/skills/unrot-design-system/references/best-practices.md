# Best Practices Reference

When generating or modifying components for `unrot.co`, strictly adhere to these best practices:

## 1. Absolute Imports for Core Paths
Always use the `@/src` path alias for absolute internal imports.
```typescript
// ❌ BAD
import { Spacing } from "../../constants/theme";

// ✅ GOOD
import { Spacing } from "@/src/constants/theme";
```

## 2. No Magic Numbers
Never hardcode layout values, font sizes, or border radii.
```typescript
// ❌ BAD
padding: 16,
borderRadius: 8,
fontSize: 14,

// ✅ GOOD
padding: Spacing.lg,
borderRadius: BorderRadius.sm,
fontSize: FontSize.md,
```

## 3. Extending Native Props
If you are building a wrapper around a base React Native component like `TextInput` or `TouchableOpacity`, extend their native props using `Omit` to prevent conflicting custom styles:
```typescript
interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}
```

## 4. Component Exports
Always use named exports rather than default exports for React components to ensure predictable import behavior.
```typescript
// ❌ BAD
export default function MyComponent() {}

// ✅ GOOD
export function MyComponent() {}
```

## 5. Touchables
When making something interactive, default to `TouchableOpacity` with `activeOpacity={0.8}`, unless a specific `Pressable` with hover/feedback states is required.

## 6. Null checks & Optional chaining
If a prop is optional, provide a sensible default or conditionally render it wrapper safely. E.g., `{icon && <Icon name={icon} />}`.
