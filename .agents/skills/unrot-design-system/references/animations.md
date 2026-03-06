# Animations Reference

This project utilizes both standard React Native `Animated` API and `react-native-reanimated` for smooth, performant animations.

## 1. `react-native-reanimated` (Preferred for Mount/Unmount & Layout)

Use Reanimated's layout animations (e.g., `FadeIn`, `FadeInRight`, `FadeInDown`, etc.) for elements that enter or leave the screen.

```tsx
import Animated, { FadeIn, FadeInRight, SlideInUp } from "react-native-reanimated";

export const StaggeredList = () => (
  <View>
    <Animated.View entering={FadeIn.duration(300)}>
      <Text>Title</Text>
    </Animated.View>
    
    <Animated.View entering={FadeInRight.delay(100)}>
      <Text>Subtitle</Text>
    </Animated.View>
  </View>
);
```

## 2. React Native `Animated` API (For standard continuous/interactive animations)

Use standard React Native `Animated` when building simple loops or sequences (e.g., pulsing loops, floating animations).

**Key things to remember:**
- Always set `useNativeDriver: true` (only supported for `opacity` and `transform` properties).
- Setup animation values with `useRef(new Animated.Value(0)).current`.
- Combine animations with `Animated.sequence`, `Animated.parallel`, and `Animated.loop`.

### Example: Floating Animation
```tsx
import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FloatingElement = () => {
  const yAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(yAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(yAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY: yAnim }] }}>
      <Text>Floating</Text>
    </Animated.View>
  );
};
```
