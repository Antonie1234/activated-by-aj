import GoldDivider from '@/components/GoldDivider';
import LogoWatermark from '@/components/LogoWatermark';

export const metadata = {
  title: 'Privacy Policy | Activated',
  description: 'Privacy Policy for Activated — how we collect, use, and protect your personal information.',
};

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="text-lg font-black uppercase mb-4"
        style={{ color: '#C8A951', letterSpacing: '0.04em' }}
      >
        {heading}
      </h2>
      <div className="space-y-4 text-gray-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: '#0D1B2A' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'var(--brand-gold)' }}
        />
        <LogoWatermark size={560} opacity={0.05} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 1 }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C8A951' }}>
            Legal
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
            PRIVACY POLICY
          </h1>
          <p className="text-gray-500 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      <GoldDivider />

      {/* ── CONTENT ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Intro */}
          <p className="text-gray-300 leading-relaxed mb-10">
            Activated (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a racquet sport coaching, lifestyle, and digital services brand based in Sydney, New South Wales, Australia. We are committed to protecting your personal information and handling it responsibly in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
          </p>
          <div style={{ width: '36px', height: '2px', background: '#C8A951', marginBottom: '40px' }} />

          <Section heading="1. What Information We Collect">
            <p>We collect personal information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Your name and contact details (email address, phone number)</li>
              <li>Information about the services you are interested in</li>
              <li>Messages and enquiries you send through our contact form</li>
              <li>Reviews and testimonials you choose to submit</li>
              <li>Payment information (processed securely by third-party payment providers — we do not store card details)</li>
            </ul>
            <p>We may also collect non-identifying technical information automatically when you visit our website, such as your device type, browser, referring URL, and pages viewed.</p>
          </Section>

          <Section heading="2. How We Collect Information">
            <p>We collect personal information directly from you when you:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Complete and submit a contact or booking form on our website</li>
              <li>Send us an email or direct message on social media</li>
              <li>Submit a review or testimonial</li>
              <li>Book or attend a coaching session or program</li>
            </ul>
            <p>We do not collect information from third parties without your knowledge or consent.</p>
          </Section>

          <Section heading="3. Why We Collect Your Information">
            <p>We collect your personal information to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Respond to your enquiries and booking requests</li>
              <li>Deliver coaching services and programs you have engaged us for</li>
              <li>Process and confirm bookings and payments</li>
              <li>Communicate important information about your sessions or services</li>
              <li>Improve our services and website experience</li>
              <li>Comply with our legal obligations</li>
            </ul>
            <p>We will not collect personal information that is not reasonably necessary for one of these purposes.</p>
          </Section>

          <Section heading="4. How We Use and Disclose Your Information">
            <p>We use your personal information only for the purposes for which it was collected. We do not sell, rent, or trade your personal information to any third party.</p>
            <p>We may disclose your information to trusted service providers who assist us in operating our website and delivering services (for example, email service providers, web hosting services). These parties are contractually bound to keep your information confidential and secure.</p>
            <p>We may also disclose personal information where required or authorised by law, such as in response to a court order or government authority request.</p>
          </Section>

          <Section heading="5. Direct Marketing">
            <p>We may occasionally send you information about our services, updates, or promotions if you have consented to receive such communications. You may opt out of marketing communications at any time by contacting us at the email address below or by following the unsubscribe link in any email.</p>
          </Section>

          <Section heading="6. Reviews and Testimonials">
            <p>When you submit a review through our website, we collect your name, email address, and review content. Your email address is never displayed publicly. Your name and review may be published on our website after moderation, and only with your consent (implied by your submission).</p>
            <p>If you would like your review removed after publication, please contact us and we will action your request promptly.</p>
          </Section>

          <Section heading="7. Third-Party Services">
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently.</p>
            <p>We use the following third-party services which may collect data according to their own privacy policies:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Google Fonts — for typography</li>
              <li>Vercel / hosting providers — for website delivery</li>
            </ul>
          </Section>

          <Section heading="8. Cookies">
            <p>Our website may use cookies and similar technologies to enhance your browsing experience and collect anonymous usage statistics. Cookies do not identify you personally.</p>
            <p>You can configure your browser to refuse cookies. Doing so may affect the functionality of some parts of the website.</p>
          </Section>

          <Section heading="9. Data Security">
            <p>We take reasonable steps to protect the personal information we hold from misuse, interference, loss, and unauthorised access, modification, or disclosure. These steps include secure HTTPS transmission, restricted access to data files, and regular security reviews.</p>
            <p>While we take all reasonable precautions, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.</p>
          </Section>

          <Section heading="10. Data Retention">
            <p>We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, or as required by law. When personal information is no longer needed, we will securely delete or de-identify it.</p>
          </Section>

          <Section heading="11. Accessing and Correcting Your Information">
            <p>Under the Australian Privacy Principles, you have the right to access personal information we hold about you and to request corrections if that information is inaccurate, incomplete, or out of date.</p>
            <p>To make an access or correction request, please contact us at the email address below. We will respond within a reasonable time (ordinarily within 30 days). We may need to verify your identity before fulfilling your request.</p>
          </Section>

          <Section heading="12. Complaints">
            <p>If you believe we have breached the Australian Privacy Principles or mishandled your personal information, please contact us first so we can attempt to resolve the matter directly.</p>
            <p>If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#C8A951' }}>www.oaic.gov.au</a>.</p>
          </Section>

          <Section heading="13. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy periodically.</p>
          </Section>

          <Section heading="14. Contact Us">
            <p>For any privacy-related enquiries, access requests, or complaints, please contact us at:</p>
            <p>
              <strong className="text-white">Activated</strong><br />
              Sydney, New South Wales, Australia<br />
              Email:{' '}
              <a
                href="mailto:activatedbookingsbyaj@gmail.com"
                className="underline"
                style={{ color: '#C8A951' }}
              >
                activatedbookingsbyaj@gmail.com
              </a>
            </p>
          </Section>

        </div>
      </section>
    </>
  );
}
