import Story from "../story/Story";
import type { VariantProps } from "../../lib/types";

/**
 * Variant B — "midnight" · neon playful.
 * Skin + tone live in src/data/story.ts; the shared story shell is <Story>.
 */
export default function VariantB({ onConfirm }: VariantProps = {}) {
  return <Story variant="B" onConfirm={onConfirm} />;
}
