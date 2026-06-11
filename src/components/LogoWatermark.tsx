export default function LogoWatermark({ size = 800, opacity = 0.12 }: { size?: number; opacity?: number }) {
  // Floor at 8% so the brand mark stays visible as a design element everywhere
  const effectiveOpacity = Math.max(opacity, 0.08);
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="18 8 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: effectiveOpacity }}
        aria-hidden="true"
      >
        <polygon points="18,32 26,32 30,20 34,32 42,32 30,8" fill="#4A7FA5" />
        <polygon points="24,26 36,26 34,20 26,20" fill="#0a0a0a" />
      </svg>
    </div>
  );
}
