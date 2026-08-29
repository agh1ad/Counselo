import { forwardRef, type ComponentPropsWithoutRef } from "react";

type StaticMotionDivProps = ComponentPropsWithoutRef<"div"> & {
  initial?: unknown;
  animate?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
  transition?: unknown;
  variants?: unknown;
  exit?: unknown;
  layout?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  whileFocus?: unknown;
};

/**
 * Zero-runtime-motion replacement used only by the two jurisdiction picker
 * pages. Those pages intentionally set `initial={false}` and animate/viewport
 * targets to the element's normal resting state, so Framer Motion does not
 * produce a visible transition there. Rendering a plain div preserves the
 * exact final DOM/CSS appearance while removing the animation runtime from the
 * landing-page chunk.
 */
const MotionDiv = forwardRef<HTMLDivElement, StaticMotionDivProps>(
  (
    {
      initial: _initial,
      animate: _animate,
      whileInView: _whileInView,
      viewport: _viewport,
      transition: _transition,
      variants: _variants,
      exit: _exit,
      layout: _layout,
      whileHover: _whileHover,
      whileTap: _whileTap,
      whileFocus: _whileFocus,
      children,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  ),
);

MotionDiv.displayName = "StaticMotionDiv";

export const motion = {
  div: MotionDiv,
} as const;
