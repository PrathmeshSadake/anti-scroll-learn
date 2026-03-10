# Unrot

Unrot is an app designed to replace mindless scrolling with micro-learning habits! To learn Generative AI with fun and engaging content. By engaging users with bite-sized Gen AI content, Unrot transforms digital consumption into a productive and enriching experience.

## Unrot App Features

### 1. Interactive AI Learning & Courses
- **Structured Syllabus:** Access a comprehensive curriculum broken down into topics, subtopics, and individual lessons.
- **Progress Tracking:** Visual representation of your learning journey with circular progress indicators, completion badges, and milestone tracking.
- **Rich Lesson Content:** Engage with customized course content tailored to your skill level.

### 2. Practice & Application Modes
Test your knowledge with multiple interactive practice modes:
- **Match:** Connect AI terms (e.g., "Token" or "Hallucination") to their correct definitions.
- **Spot Error:** Critically evaluate AI outputs to identify hallucinations or incorrect responses.
- **Predict:** Guess how an AI model will respond to specific prompts.
- **Scenario Analysis:** Apply prompt engineering and AI concepts to practical, real-world business scenarios.

### 3. AI Interview Simulator
- **Role-Based Practice:** Simulate job interviews for various roles.
- **Diverse Question Types:** Practice with Multiple Choice Questions (MCQs), Flashcards, Fill-in-the-Blanks, and Short Answer formats.
- **Performance Analytics:** Receive AI-driven feedback and visualize your strengths and weaknesses using interactive Radar Charts.

### 5. AI News Feed
- **Stay Updated:** An integrated news feed keeps users informed on the latest developments, breakthroughs, and trends in the Artificial Intelligence industry.

### 6. Personalized Onboarding
- **Tailored Experience:** A custom onboarding flow assesses user goals and current knowledge to personalize the learning curriculum from day one.

### 7. User Authentication & Profiles
- **Secure Access:** Powered by Clerk, enabling fast, secure sign-ups, logins, and session management.
- **Profile Customization:** Manage your personal details, learning preferences, and app settings through dedicated profile and settings screens.

---


## Design System & Theming

This project uses the **unrot.co design system**. When building components, you must adhere strictly to the following theme directives:

### 1. Central Theme Constants
NEVER hardcode colors, spacing values, font sizes, font families, or border radii. All design tokens **must** be pulled from `src/constants/theme.ts`.

### 2. Colors and Theming (Dark/Light Mode)
- The app supports dynamic light and dark modes.
- ALWAYS use the `useThemeColors` hook to access colors inside functional components:
  ```typescript
  import { useThemeColors } from "@/src/hooks/useThemeColors";
  const colors = useThemeColors();
  // <View style={{ backgroundColor: colors.surface }}>
  ```

### 3. Typography
- Standard text must use the defined `FontFamily` strings.
- Standard weights: `regular`, `medium`, `semibold`, `bold`, `heavy`.
- All text sizes must use the `FontSize` object:
  ```typescript
  import { FontFamily, FontSize } from "@/src/constants/theme";
  // <Text style={{ fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: colors.text }}>
  ```

### 4. Spacing & Layout
- Padding, margins, and gaps must use the `Spacing` object.
- Example keys: `xs` (4), `sm` (8), `md` (12), `lg` (16), `xl` (20), `xxl` (24), `xxxl` (32), `huge` (48), `massive` (64).
  ```typescript
  import { Spacing } from "@/src/constants/theme";
  // <View style={{ padding: Spacing.lg, gap: Spacing.md }}>
  ```

### 5. Border Radius & Shapes
- Use the `BorderRadius` object.
- Keys: `sm` (8), `md` (12), `lg` (16), `xl` (24), `xxl` (48), `full` (9999).
  ```typescript
  import { BorderRadius } from "@/src/constants/theme";
  // <View style={{ borderRadius: BorderRadius.xl }}>
  ```

## 🤖 Agent Instructions (unrot-design-system Skill)

Agents generating components for this repository **must** follow these instructions:

1. **Review Theme Guidelines**: Before generating components, review the token maps provided in `references/`:
   - `theme-guidelines.md`
   - `animations.md`
   - `best-practices.md`
   - `component-patterns.md`
   - `theme-tokens.md`
   - `typography.md`
   - Do not use any emojis while creating components
   - You can find demo data in `src/data/` which contains demo data for lessons, modules, quizzes, and news.

2. **Required Output Format**:
   - **HTML (Default)**: Generate components as HTML by default. Create them in `iterations/html/<component name>` instead of using a `tsx` directory.
   - **TSX (Opt-in)**: If the user explicitly requests TSX, ensure it is written in TypeScript (`.tsx`) and correctly typed for React Native / Expo (using `View`, `Text`, `TouchableOpacity`, `Pressable`, etc.). Place these files in `iterations/tsx/<component name>`.

---
*Built with focus and continuous learning in mind.*
