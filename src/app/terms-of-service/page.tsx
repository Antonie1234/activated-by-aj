import GoldDivider from '@/components/GoldDivider';
import LogoWatermark from '@/components/LogoWatermark';

export const metadata = {
  title: 'Terms of Service | Activated',
  description: 'Terms of Service for Activated coaching and digital services.',
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

export default function TermsOfService() {
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
            TERMS OF SERVICE
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
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the services offered by Activated (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a racquet sport coaching, lifestyle, and digital services brand based in Sydney, New South Wales, Australia. By booking, engaging, or using our services, you (&ldquo;you&rdquo;, &ldquo;the Client&rdquo;) agree to be bound by these Terms. Please read them carefully.
          </p>
          <div style={{ width: '36px', height: '2px', background: '#C8A951', marginBottom: '40px' }} />

          <Section heading="1. Services">
            <p>Activated provides the following services:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-white">Coaching Services:</strong> personal and group coaching sessions in tennis, padel, pickleball, beach sports, fitness and conditioning, and related racquet sports.</li>
              <li><strong className="text-white">Programs and Plans:</strong> custom training programs, conditioning plans, and nutrition guidance delivered digitally or in-person.</li>
              <li><strong className="text-white">Digital Services:</strong> custom website design and development for small businesses, personal brands, and startups.</li>
            </ul>
            <p>All services are subject to availability and may be updated at any time with reasonable notice.</p>
          </Section>

          <Section heading="2. Bookings and Scheduling">
            <p>Coaching sessions and programs must be booked in advance through our contact form, email, or direct communication with AJ. Bookings are confirmed only once we have provided written confirmation.</p>
            <p>Session times, locations, and formats are agreed upon at the time of booking. We reserve the right to reschedule a session in exceptional circumstances (such as illness or force majeure) and will provide as much notice as possible.</p>
            <p>For digital services projects, a written agreement or scope of work document will be provided before commencement. Work begins only after the Client has confirmed and signed off on the agreed scope.</p>
          </Section>

          <Section heading="3. Payment">
            <p>Payment terms will be confirmed at the time of booking. For coaching sessions, payment is typically required prior to or at the time of each session unless a package arrangement has been agreed in advance.</p>
            <p>For digital services projects, payment is structured according to the agreed milestones or schedule set out in the project agreement. A deposit is typically required before work commences.</p>
            <p>We accept payment via the methods specified at the time of booking. All prices are in Australian Dollars (AUD) unless otherwise stated. Goods and Services Tax (GST) may apply where applicable.</p>
            <p>Invoices not paid by their due date may incur a late payment fee or may result in services being paused until payment is received.</p>
          </Section>

          <Section heading="4. Cancellation Policy">
            <p><strong className="text-white">Coaching sessions:</strong> We require a minimum of 24 hours&rsquo; notice to cancel or reschedule a session. Cancellations made with less than 24 hours&rsquo; notice may be charged at the full session rate. No-shows will be charged in full.</p>
            <p><strong className="text-white">Packages and programs:</strong> Packages and pre-paid programs are non-refundable once commenced. If exceptional circumstances prevent you from completing a package, please contact us and we will consider your situation on a case-by-case basis.</p>
            <p><strong className="text-white">Digital services projects:</strong> If you wish to cancel a project after it has commenced, you will be invoiced for all work completed up to the date of cancellation. The deposit is non-refundable.</p>
            <p>We reserve the right to cancel a booking at our discretion in the event of unsafe conditions, force majeure, or other circumstances beyond our reasonable control. In such cases, we will endeavour to offer a reschedule or, where a reschedule is not possible, a full refund of any amount paid.</p>
          </Section>

          <Section heading="5. Client Responsibilities">
            <p>By engaging our services, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Provide accurate information about your health, fitness level, and any injuries or conditions that may affect your participation in coaching activities.</li>
              <li>Arrive on time for booked sessions and notify us as soon as possible if you are running late.</li>
              <li>Conduct yourself respectfully toward AJ and other participants at all times.</li>
              <li>Participate at your own risk in physical activities, acknowledging that coaching sessions involve physical exertion.</li>
              <li>For digital services: provide timely feedback, content, and approvals to keep the project on schedule.</li>
            </ul>
          </Section>

          <Section heading="6. Health and Safety">
            <p>You acknowledge that participation in physical coaching sessions involves inherent risks of injury. You confirm that you are physically capable of participating and that you have no medical condition that would make participation unsafe without medical clearance.</p>
            <p>We strongly recommend consulting a medical professional before commencing any new exercise program. If you experience pain, discomfort, or illness during a session, notify AJ immediately and discontinue the activity.</p>
          </Section>

          <Section heading="7. Limitation of Liability">
            <p>To the maximum extent permitted by applicable law, Activated and its representatives will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our services.</p>
            <p>Our total liability to you in respect of any claim arising out of or in connection with these Terms or the services will not exceed the amount you have paid to us in the 30 days preceding the event giving rise to the claim.</p>
            <p>Nothing in these Terms excludes or limits liability that cannot be excluded or limited under Australian consumer protection law, including the <em>Australian Consumer Law</em> (Schedule 2 of the <em>Competition and Consumer Act 2010</em> (Cth)).</p>
          </Section>

          <Section heading="8. Intellectual Property">
            <p><strong className="text-white">Our content:</strong> All content on the Activated website, including text, images, videos, logos, and branding, is owned by or licensed to Activated. You may not reproduce, distribute, or use our content without prior written permission.</p>
            <p><strong className="text-white">Training programs:</strong> Custom training programs, plans, and materials we create for you are provided for your personal use only. You may not distribute, resell, or publish these materials without our written consent.</p>
            <p><strong className="text-white">Digital services deliverables:</strong> Upon receipt of full payment, ownership of the final website design and code created for you is transferred to you. We retain the right to display the work in our portfolio unless you expressly request otherwise in writing.</p>
          </Section>

          <Section heading="9. Photography and Media">
            <p>We may occasionally photograph or record coaching sessions for use on our website or social media. We will always seek your consent before publishing any image or video in which you are identifiable. You may withdraw consent at any time by contacting us.</p>
          </Section>

          <Section heading="10. Termination">
            <p>We reserve the right to terminate or suspend our services to you at any time if you breach these Terms, engage in unsafe or disrespectful behaviour, or if circumstances arise that make it impractical to continue.</p>
            <p>You may discontinue use of our services at any time, subject to the cancellation policy in clause 4.</p>
          </Section>

          <Section heading="11. Governing Law and Jurisdiction">
            <p>These Terms are governed by the laws of New South Wales, Australia. Any disputes arising under or in connection with these Terms will be subject to the exclusive jurisdiction of the courts of New South Wales, Australia.</p>
          </Section>

          <Section heading="12. Changes to These Terms">
            <p>We may update these Terms from time to time. Any changes will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Continued use of our services after changes have been published constitutes your acceptance of the revised Terms.</p>
          </Section>

          <Section heading="13. Contact Us">
            <p>For any questions about these Terms, please contact us at:</p>
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
