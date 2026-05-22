export default function LogoWatermark({ size = 800, opacity = 0.12 }: { size?: number; opacity?: number }) {
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
        style={{ opacity }}
        aria-hidden="true"
      >
        <polygon points="18,32 26,32 30,20 34,32 42,32 30,8" fill="#E8F4FD" />
        <polygon points="24,26 36,26 34,20 26,20" fill="#0a0a0a" />
      </svg>
    </div>
  );
}
