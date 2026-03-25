import Link from 'next/link';

const testimonials = [
  {
    name: 'Henry Leung',
    initials: 'HL',
    service: 'Tennis Coaching',
    quote:
      "Training with AJ has been a game-changer for my tennis journey. From day one, he recognized my strengths and weaknesses and crafted a lesson plan tailored specifically to my goals. Every session is intense, focused, and designed to push me beyond what I thought I was capable of. AJ doesn't settle for mediocrity — he challenges me to dig deeper, work harder, and play smarter. Thanks to his dedication and personalized approach, I've seen dramatic improvements in my technique, endurance, and mental toughness. I couldn't ask for a better mentor on and off the court!",
    rating: 5,
  },
  {
    name: 'Sharlene Robbins',
    initials: 'SR',
    photo: '/sharlene-testimonial.jpg',
    service: 'Pickleball Coaching',
    quote:
      "AJ has been a perfect coach for me as someone who has never played Pickleball. He is incredibly patient and explains things clearly, making it easy to understand. His drills are challenging but fun, and they've helped me improve my game. I also appreciate how AJ takes the time to tailor the lesson to enhance my progress. He is always punctual, prepared, and communicative. I highly recommend AJ to anyone looking to improve their skills and have fun while doing it. I'm now addicted to Pickleball!",
    rating: 5,
  },
  {
    name: 'Lauren Beckage',
    initials: 'LB',
    photo: '/georgia-testimonial.jpg',
    service: 'Pickleball Coaching',
    quote:
      "AJ is a wonderfully patient and encouraging coach. As someone with MS, I really appreciate how he breaks things down, repeats instructions without fuss, and respects mobility challenges. He makes learning fun, keeps us laughing, and creates a truly inclusive space. I'd highly recommend him to anyone with or without a disability wanting to give pickleball a go!",
    rating: 5,
  },
  {
    name: 'Paul',
    initials: 'P',
    photo: '/paul-testimonial.jpg',
    service: 'Padel Coaching',
    quote:
      "AJ is a truly outstanding tennis coach. His patient, thoughtful teaching style and ability to connect through clear, encouraging instruction have made every session something our son genuinely looks forward to. We've seen real progress — not just in his skills, but in his confidence and love for the game. After working with several coaches, we feel incredibly grateful to have found AJ and hope to continue with him for many years to come.",
    rating: 5,
  },
  {
    name: 'Juan',
    initials: 'J',
    photo: '/juan-testimonial.jpg',
    service: 'Beach Tennis',
    quote:
      "I've had the opportunity to take both group and private tennis lessons with AJ, and I can confidently say he's one of the most insightful and detail-oriented coaches I've worked with. His experience clearly shows in the way he breaks down not just technique, but also the tactical side of the game. Thanks to his coaching, I've made real progress — who knows, maybe one day I'll finally beat him in his own Beat the Coach drill!",
    rating: 5,
  },
  {
    name: 'Callum',
    initials: 'C',
    service: 'Fitness & Conditioning',
    quote:
      "I started training with AJ as a complete beginner with no real fitness base. Over just one term, the progress has been nothing short of incredible. AJ has a sharp eye for individual strengths and weaknesses and tailored every session to suit my specific goals and lifestyle. Thanks to his guidance, my strength, endurance and confidence have all improved dramatically. AJ is an exceptional coach who makes training both effective and enjoyable. Highly recommend for anyone at any level looking to see real results fast!",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--brand-gold)' }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'var(--brand-gold)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            Real Results
          </p>
          <div className="gold-divider mx-auto mb-6" />
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            TESTIMONIALS
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what the Activated by AJ community has to say.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS GRID ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="card p-8 flex flex-col"
                style={{ background: 'var(--surface)' }}
              >
                {/* Name + avatar at top */}
                <div className="flex items-center gap-4 mb-4">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                      style={{ objectPosition: t.name === 'Lauren Beckage' ? 'top center' : 'center' }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black"
                      style={{ background: 'var(--brand-gold)', color: '#000' }}
                    >
                      {t.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <div
                      className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
                      style={{
                        background: 'rgba(26,111,212,0.15)',
                        color: 'var(--brand-blue-light)',
                        border: '1px solid rgba(26,111,212,0.25)',
                      }}
                    >
                      {t.service}
                    </div>
                  </div>
                </div>
                {/* Stars */}
                <StarRating count={t.rating} />
                {/* Quote */}
                <div className="text-3xl mt-4 mb-3" style={{ color: 'var(--brand-gold)', opacity: 0.5 }}>&ldquo;</div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6" style={{ color: 'var(--brand-gold)' }}>⚡</div>
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            READY TO WRITE YOUR OWN STORY?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Join the Activated by AJ community and start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Book Your Session
            </Link>
            <Link href="/pricing" className="btn-outline">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
