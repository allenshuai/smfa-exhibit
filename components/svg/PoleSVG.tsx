export default function PoleSVG() {
  return (
    <g id="Pole">
      {/* Middle rope */}
      <g id="Pole_Middle">
        <path
          d="M94.88,530.82c32.25,8.31,64.97,15.68,97.91,20.3,28.45,4.11,57.56,6.56,86.31,7.05,62.07,1.3,124.17-6.71,184.47-21.28,8.17-1.96,16.3-4.03,24.45-6.08-14.96,7.8-30.54,14.43-46.48,20.09-110.72,39.21-241.65,33.35-346.66-20.09h0Z"
          fill="#ec1e5a"
        />
      </g>

      {/* Left pole */}
      <g id="Pole_Left">
        <circle cx="94.88" cy="530.82" r="18.24" fill="#6c584c" />
        <rect x="72.82" y="667.3" width="44.13" height="16.47" rx="6.04" ry="6.04" fill="#6c584c" />
        <rect x="88.95" y="530.82" width="11.86" height="144.72" rx="4.35" ry="4.35" fill="#6c584c" />
      </g>

      {/* Right pole */}
      <g id="Pole_Right">
        <circle cx="488.03" cy="530.82" r="18.24" fill="#6c584c" />
        <rect x="465.96" y="667.3" width="44.13" height="16.47" rx="6.04" ry="6.04" fill="#6c584c" />
        <rect x="482.1" y="530.82" width="11.86" height="144.72" rx="4.35" ry="4.35" fill="#6c584c" />
      </g>
    </g>
  );
}
