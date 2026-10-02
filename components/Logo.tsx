/** Olympiad emblem: laurel wreath around a torch whose flame holds a water drop. */
export default function Logo({ size = 160, className = "" }: { size?: number; className?: string }) {
  const leaves = Array.from({ length: 7 }, (_, i) => {
    // Leaves follow an arc on the left side; the right branch is mirrored.
    const angle = 115 + i * 19;
    const rad = (angle * Math.PI) / 180;
    const x = 100 + 70 * Math.cos(rad);
    const y = 108 - 70 * Math.sin(rad);
    return { x, y, rotate: -angle + 90 + 35 };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Sustainable Olympiad logo"
    >
      <circle cx="100" cy="100" r="96" fill="#12244a" stroke="#f2b632" strokeWidth="4" />

      <g fill="#3fae49">
        {leaves.map((l, i) => (
          <g key={i}>
            <ellipse cx={l.x} cy={l.y} rx="7" ry="15" transform={`rotate(${l.rotate} ${l.x} ${l.y})`} />
            <ellipse
              cx={200 - l.x}
              cy={l.y}
              rx="7"
              ry="15"
              transform={`rotate(${-l.rotate} ${200 - l.x} ${l.y})`}
            />
          </g>
        ))}
      </g>
      <path d="M58 166 Q100 186 142 166" stroke="#3fae49" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Torch */}
      <path d="M86 112 H114 L106 168 H94 Z" fill="#f2b632" />
      <rect x="82" y="102" width="36" height="12" rx="3" fill="#f2b632" />
      <rect x="86" y="126" width="28" height="4" fill="#12244a" opacity="0.35" />

      {/* Flame */}
      <path d="M100 30 C116 50 128 66 124 84 C121 96 112 102 100 102 C88 102 79 96 76 84 C72 66 86 54 100 30 Z" fill="#e03a3e" />
      <path d="M100 48 C110 62 116 72 114 84 C112 93 107 98 100 98 C93 98 88 93 86 84 C84 72 92 62 100 48 Z" fill="#f2b632" />

      {/* Water drop */}
      <path d="M100 60 C100 60 89 75 89 83 A11 11 0 0 0 111 83 C111 75 100 60 100 60 Z" fill="#2f9be0" />
      <ellipse cx="96" cy="82" rx="2.5" ry="4" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}
