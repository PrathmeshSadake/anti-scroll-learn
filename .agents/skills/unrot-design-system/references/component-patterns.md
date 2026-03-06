# Component Patterns Reference

This project uses modern functional React Native components with strict typing.

## Basic Component Structure

Always define an `interface` for your props. Export the functional component directly.

```tsx
import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { Spacing, BorderRadius, FontSize, FontFamily } from '@/src/constants/theme';

interface MyCardProps {
  title: string;
  description?: string;
  style?: ViewStyle;
}

export function MyCard({ title, description, style }: MyCardProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }, style]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      )}
    </View>
  );
}

// Static styling with StyleSheet
const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.lg,
    marginBottom: Spacing.xs,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
  },
});
```

## Pattern: Dynamic Styling

Since colors are dynamic (Light/Dark mode) accessed via hooks, DO NOT put colors in `StyleSheet.create`. Put layout, spacing, typography, and structure in `StyleSheet`, and apply colors inline or in dynamic style arrays.

```tsx
// ❌ BAD: Putting dynamic colors in static stylesheets
const styles = StyleSheet.create({
  box: { backgroundColor: '#fff' }
});

// ✅ GOOD: Merging static styles and dynamic colors
<View style={[styles.box, { backgroundColor: colors.surface }]} />
```

## Pattern: Component Variants

If a component has multiple visual variants, use a `Record` dictionary to map the variant string to specific `ViewStyle` or `TextStyle` objects that utilize `colors`.

```tsx
const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.border },
  ghost: { backgroundColor: colors.transparent },
  danger: { backgroundColor: colors.error },
};

// Application
<TouchableOpacity style={[styles.base, variantStyles[variant], style]}>
```
