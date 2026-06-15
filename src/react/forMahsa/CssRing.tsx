/** @jsxImportSource react */

// Pure-SVG faceted diamond seated in a gold band — no WebGL, no three.js.
// The 3D life comes from a gentle CSS perspective wobble on the whole ring
// (see `.dwm-ring` in global.css) plus twinkling sparkles. Each facet is a flat
// polygon with its own gradient, shaded for a consistent upper-left light
// source so it reads as a cut stone rather than a flat blob.
export default function CssRing() {
  const sparkles = [
    { left: "20%", top: "20%", d: "0s", s: 15 },
    { left: "78%", top: "24%", d: "0.7s", s: 19 },
    { left: "30%", top: "60%", d: "1.2s", s: 12 },
    { left: "70%", top: "66%", d: "0.4s", s: 16 },
    { left: "52%", top: "10%", d: "0.95s", s: 21 },
  ];
  return (
    <div className="dwm-ring-stage">
      <div className="dwm-ring">
        <svg viewBox="0 0 200 230" width="210" height="242" aria-hidden="true">
          <defs>
            <linearGradient id="gWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fcdcec" />
            </linearGradient>
            <linearGradient id="gLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdeef6" />
              <stop offset="100%" stopColor="#f4c0da" />
            </linearGradient>
            <linearGradient id="gMed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f6b9d2" />
              <stop offset="100%" stopColor="#e88bb0" />
            </linearGradient>
            <linearGradient id="gDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e98fb2" />
              <stop offset="100%" stopColor="#d2628d" />
            </linearGradient>
            <linearGradient id="gDeep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d8709a" />
              <stop offset="100%" stopColor="#be4f7d" />
            </linearGradient>
            <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="0.3">
              <stop offset="0%" stopColor="#f3d98a" />
              <stop offset="32%" stopColor="#fff6da" />
              <stop offset="52%" stopColor="#c1922c" />
              <stop offset="76%" stopColor="#f3d98a" />
              <stop offset="100%" stopColor="#9c6f22" />
            </linearGradient>
            <filter id="gemShadow" x="-40%" y="-20%" width="180%" height="160%">
              <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#E8527E" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Gold band — drawn first so the stone sits in front of it */}
          <ellipse
            cx="100" cy="207" rx="58" ry="15"
            fill="none" stroke="url(#gGold)" strokeWidth="12"
          />
          <ellipse
            cx="100" cy="207" rx="58" ry="15"
            fill="none" stroke="#fff7e0" strokeOpacity="0.35" strokeWidth="2.5"
          />

          {/* Diamond facets */}
          <g filter="url(#gemShadow)" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.8" strokeLinejoin="round">
            {/* crown */}
            <polygon points="66,22 64,78 28,78" fill="url(#gLight)" />
            <polygon points="66,22 134,22 136,78 64,78" fill="url(#gWhite)" />
            <polygon points="134,22 172,78 136,78" fill="url(#gDeep)" />
            {/* pavilion */}
            <polygon points="28,78 64,78 100,200" fill="url(#gMed)" />
            <polygon points="64,78 100,78 100,200" fill="url(#gLight)" />
            <polygon points="100,78 136,78 100,200" fill="url(#gDark)" />
            <polygon points="136,78 172,78 100,200" fill="url(#gDeep)" />
          </g>

          {/* brilliance lines — thin highlights that catch the eye */}
          <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1">
            <line x1="64" y1="78" x2="66" y2="22" />
            <line x1="136" y1="78" x2="134" y2="22" />
            <line x1="100" y1="78" x2="100" y2="200" />
          </g>
        </svg>
      </div>
      {sparkles.map((sp, i) => (
        <span
          key={i}
          className="dwm-spark"
          style={{ left: sp.left, top: sp.top, fontSize: sp.s, animationDelay: sp.d }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
