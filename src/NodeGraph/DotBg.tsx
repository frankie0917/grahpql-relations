import React from 'react';

export const DotBg = ({ size = 2, color = '#ccc', spacing = 20 }) => {
  return (
    <g>
      <pattern
        id="circle-pattern"
        width={size + spacing}
        height={size + spacing}
        patternUnits="userSpaceOnUse"
      >
        <circle cx={size} cy={size} r={size} fill={color} />
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#circle-pattern)"
      />
    </g>
  );
};
