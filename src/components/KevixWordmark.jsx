import React from 'react';

/**
 * KevixWordmark
 * Custom precision geometric cyber-techwear logotype
 * Matches the reference CARNAGE luxury aesthetic with 3-bar floating 'E',
 * aerodynamic angled stencil cuts, and bold architectural balance.
 */
export function KevixWordmark({ 
  mode = "full", // "full" (KEVIX CLOTHING), "condensed" (KEVIXCLOTHING), "short" (KEVIX)
  className = "w-auto h-5 sm:h-6",
  fill = "currentColor"
}) {
  if (mode === "short") {
    return (
      <svg 
        viewBox="0 0 384 100" 
        className={className} 
        fill={fill} 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KEVIX"
      >
        <g>
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z M 28,50 L 56,0 L 78,0 L 39,58 Z M 36,44 L 78,100 L 54,100 L 26,55 Z" transform="translate(0, 0)" />
        <path d="M 0,0 L 72,0 L 72,21 L 14,21 Z M 0,39.5 L 68,39.5 L 68,60.5 L 0,60.5 Z M 14,79 L 72,79 L 72,100 L 0,100 Z" transform="translate(89, 0)" />
        <path d="M 0,0 L 22,0 L 42,76 L 62,0 L 84,0 L 53,100 L 31,100 Z" transform="translate(174, 0)" />
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z" transform="translate(271, 0)" />
        <path d="M 0,0 L 21,0 L 80,100 L 59,100 Z M 59,0 L 80,0 L 48,49 L 41,39 Z M 31,59 L 0,100 L 21,100 L 39,70 Z" transform="translate(304, 0)" />
        </g>
      </svg>
    );
  }

  if (mode === "condensed") {
    return (
      <svg 
        viewBox="0 0 1024 100" 
        className={className} 
        fill={fill} 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KEVIXCLOTHING"
      >
        <g>
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z M 28,50 L 56,0 L 78,0 L 39,58 Z M 36,44 L 78,100 L 54,100 L 26,55 Z" transform="translate(0, 0)" />
        <path d="M 0,0 L 72,0 L 72,21 L 14,21 Z M 0,39.5 L 68,39.5 L 68,60.5 L 0,60.5 Z M 14,79 L 72,79 L 72,100 L 0,100 Z" transform="translate(87, 0)" />
        <path d="M 0,0 L 22,0 L 42,76 L 62,0 L 84,0 L 53,100 L 31,100 Z" transform="translate(170, 0)" />
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z" transform="translate(265, 0)" />
        <path d="M 0,0 L 21,0 L 80,100 L 59,100 Z M 59,0 L 80,0 L 48,49 L 41,39 Z M 31,59 L 0,100 L 21,100 L 39,70 Z" transform="translate(296, 0)" />
        <path d="M 78,0 C 35,0 0,22 0,50 C 0,78 35,100 78,100 L 78,79 C 45,79 21,66 21,50 C 21,34 45,21 78,21 Z" transform="translate(387, 0)" />
        <path d="M 0,0 L 20,0 L 20,79 L 68,79 L 68,100 L 0,100 Z" transform="translate(476, 0)" />
        <path d="M 41,0 C 18,0 0,22 0,50 C 0,78 18,100 41,100 C 64,100 82,78 82,50 C 82,22 64,0 41,0 Z M 41,21 C 53,21 61,34 61,50 C 61,66 53,79 41,79 C 29,79 21,66 21,50 C 21,34 29,21 41,21 Z" transform="translate(555, 0)" />
        <path d="M 0,0 L 76,0 L 76,21 L 48,21 L 48,100 L 28,100 L 28,21 L 0,21 Z" transform="translate(648, 0)" />
        <path d="M 0,0 L 20,0 L 20,39.5 L 56,39.5 L 56,0 L 76,0 L 76,100 L 56,100 L 56,60.5 L 20,60.5 L 20,100 L 0,100 Z" transform="translate(735, 0)" />
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z" transform="translate(822, 0)" />
        <path d="M 0,0 L 21,0 L 21,26 L 59,90 L 59,0 L 80,0 L 80,100 L 59,100 L 21,37 L 21,100 L 0,100 Z" transform="translate(853, 0)" />
        <path d="M 78,0 C 35,0 0,22 0,50 C 0,78 35,100 78,100 L 80,100 L 80,48 L 42,48 L 42,69 L 59,69 L 59,79 C 46,79 21,66 21,50 C 21,34 45,21 78,21 Z" transform="translate(944, 0)" />
        </g>
      </svg>
    );
  }

  // Default: full ("KEVIX CLOTHING")
  return (
    <svg 
      viewBox="0 0 1097 100" 
      className={className} 
      fill={fill} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KEVIX CLOTHING"
    >
      <g>
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z M 28,50 L 56,0 L 78,0 L 39,58 Z M 36,44 L 78,100 L 54,100 L 26,55 Z" transform="translate(0, 0)" />
        <path d="M 0,0 L 72,0 L 72,21 L 14,21 Z M 0,39.5 L 68,39.5 L 68,60.5 L 0,60.5 Z M 14,79 L 72,79 L 72,100 L 0,100 Z" transform="translate(89, 0)" />
        <path d="M 0,0 L 22,0 L 42,76 L 62,0 L 84,0 L 53,100 L 31,100 Z" transform="translate(174, 0)" />
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z" transform="translate(271, 0)" />
        <path d="M 0,0 L 21,0 L 80,100 L 59,100 Z M 59,0 L 80,0 L 48,49 L 41,39 Z M 31,59 L 0,100 L 21,100 L 39,70 Z" transform="translate(304, 0)" />
        <path d="M 78,0 C 35,0 0,22 0,50 C 0,78 35,100 78,100 L 78,79 C 45,79 21,66 21,50 C 21,34 45,21 78,21 Z" transform="translate(446, 0)" />
        <path d="M 0,0 L 20,0 L 20,79 L 68,79 L 68,100 L 0,100 Z" transform="translate(537, 0)" />
        <path d="M 41,0 C 18,0 0,22 0,50 C 0,78 18,100 41,100 C 64,100 82,78 82,50 C 82,22 64,0 41,0 Z M 41,21 C 53,21 61,34 61,50 C 61,66 53,79 41,79 C 29,79 21,66 21,50 C 21,34 29,21 41,21 Z" transform="translate(618, 0)" />
        <path d="M 0,0 L 76,0 L 76,21 L 48,21 L 48,100 L 28,100 L 28,21 L 0,21 Z" transform="translate(713, 0)" />
        <path d="M 0,0 L 20,0 L 20,39.5 L 56,39.5 L 56,0 L 76,0 L 76,100 L 56,100 L 56,60.5 L 20,60.5 L 20,100 L 0,100 Z" transform="translate(802, 0)" />
        <path d="M 0,0 L 20,0 L 20,100 L 0,100 Z" transform="translate(891, 0)" />
        <path d="M 0,0 L 21,0 L 21,26 L 59,90 L 59,0 L 80,0 L 80,100 L 59,100 L 21,37 L 21,100 L 0,100 Z" transform="translate(924, 0)" />
        <path d="M 78,0 C 35,0 0,22 0,50 C 0,78 35,100 78,100 L 80,100 L 80,48 L 42,48 L 42,69 L 59,69 L 59,79 C 46,79 21,66 21,50 C 21,34 45,21 78,21 Z" transform="translate(1017, 0)" />
      </g>
    </svg>
  );
}
