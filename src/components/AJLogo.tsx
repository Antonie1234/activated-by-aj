export default function AJLogo({ height = 40 }: { height?: number }) {
  return (
    <svg
      height={height}
      viewBox="0 0 148 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Activated by AJ"
      style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.35))' }}
    >
      {/* "A" mark */}
      <polygon
        points="18,32 26,32 30,20 34,32 42,32 30,8"
        fill="#C9A84C"
      />
      <polygon
        points="24,26 36,26 34,20 26,20"
        fill="#0a0a0a"
      />

      {/* Wordmark */}
      <text
        x="50"
        y="27"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="14"
        letterSpacing="0.5"
        fill="white"
      >
        ACTIVATED
      </text>
      <text
        x="50"
        y="38"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="9"
        letterSpacing="3"
        fill="#C9A84C"
      >
        BY AJ
      </text>
    </svg>
  );
}
