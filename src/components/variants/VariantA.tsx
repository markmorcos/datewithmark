import Story from "../story/Story";
import type { VariantProps } from "../../lib/types";

/**
 * Variant A — "sunset" · warm romantic.
 * Skin + tone live in src/data/story.ts; the shared story shell is <Story>.
 */
export default function VariantA({ onConfirm }: VariantProps = {}) {
  return <Story variant="A" onConfirm={onConfirm} />;
}
