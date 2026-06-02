/**
 * Module-level scroll state — updated by the DOM, read by R3F useFrame.
 * Using a plain object (not React state) so R3F can read it every frame
 * without triggering re-renders.
 */
export const scrollState = {
  /** 0 → 1  (top → bottom of page) */
  progress: 0,
  /** pixels/frame velocity */
  velocity: 0,
  _prevY: 0,
};
