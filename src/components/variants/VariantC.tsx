import Story from "../story/Story";
import type { VariantProps } from "../../lib/types";

/**
 * Variant C — "linen" · editorial minimal.
 * Skin + tone live in src/data/story.ts; the shared story shell is <Story>.
 */
export default function VariantC({ onConfirm }: VariantProps = {}) {
  return <Story variant="C" onConfirm={onConfirm} />;
}
