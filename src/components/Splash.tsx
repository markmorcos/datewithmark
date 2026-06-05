/**
 * Shown for the brief moment between mount and the platform returning this
 * device's variant. Theme-neutral (matches the page `theme-color`) so it
 * doesn't bias toward any one concept.
 */
export default function Splash() {
  return (
    <div class="flex min-h-screen w-full items-center justify-center bg-[#e7d0c4]">
      <div
        class="h-10 w-10 animate-pulse rounded-full bg-[#f26b5e]"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
