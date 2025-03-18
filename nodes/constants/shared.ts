/**
 * Defines valid aspect ratio values as a TypeScript union type
 * This ensures type safety and easier refactoring when adding/removing options
 */
export type AspectRatioOption = '16:9' | '21:9' | '1:1' | '9:16' | '4:3' | '3:4';

/**
 * Common aspect ratio options used across different image generation services
 */
export const ASPECT_RATIO_OPTIONS = [
  { name: '16:9 (Landscape)', value: '16:9' as AspectRatioOption },
  { name: '21:9 (Widescreen)', value: '21:9' as AspectRatioOption },
  { name: '1:1 (Square)', value: '1:1' as AspectRatioOption },
  { name: '9:16 (Portrait)', value: '9:16' as AspectRatioOption },
  { name: '4:3', value: '4:3' as AspectRatioOption },
  { name: '3:4', value: '3:4' as AspectRatioOption },
];
