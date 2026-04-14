'use client';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27713325218"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 1000,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'var(--brand-gold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.47.648 4.786 1.78 6.792L2 30l7.42-1.742A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="#0D1B2A"
        />
        <path
          d="M22.6 19.8c-.3-.15-1.76-.868-2.033-.967-.273-.1-.472-.15-.67.15-.2.3-.77.967-.944 1.166-.173.2-.347.223-.647.074-.3-.15-1.267-.466-2.413-1.487-.892-.794-1.494-1.774-1.669-2.074-.174-.3-.018-.462.13-.61.134-.133.3-.347.45-.52.15-.174.2-.3.3-.5.1-.2.05-.374-.025-.523-.074-.15-.67-1.613-.918-2.208-.242-.58-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.2 0-.523.074-.797.374-.273.3-1.043 1.02-1.043 2.484 0 1.463 1.068 2.877 1.218 3.077.15.2 2.1 3.2 5.087 4.488.712.307 1.267.49 1.7.628.714.226 1.365.194 1.879.118.573-.085 1.76-.72 2.008-1.415.247-.694.247-1.29.173-1.415-.074-.124-.273-.2-.573-.348z"
          fill="var(--brand-gold)"
        />
      </svg>
    </a>
  );
}
