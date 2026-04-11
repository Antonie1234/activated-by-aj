'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';

const testimonials = [
  // Tennis
  {
    name: 'Henry Leung',
    initials: 'HL',
    service: 'Tennis Coaching',
    filter: 'Tennis',
    quote:
      "Training with AJ has been a game-changer for my tennis journey. From day one, he recognised my strengths and weaknesses and crafted a lesson plan tailored specifically to my goals. Every session is intense, focused, and designed to push me beyond what I thought I was capable of. AJ doesn't settle for mediocrity. He challenges me to dig deeper, work harder, and play smarter. Thanks to his dedication and personalised approach, I've seen dramatic improvements in my technique, endurance, and mental toughness. I couldn't ask for a better mentor on and off the court!",
    rating: 5,
  },
  {
    name: 'Callum',
    initials: 'CA',
    service: 'Tennis Coaching',
    filter: 'Tennis',
    quote:
      "I started lessons with AJ as a complete beginner, barely able to hold a rally. Over just one term the progress has been nothing short of incredible. AJ has a sharp eye for individual strengths and weaknesses and tailored his coaching to my specific habits. I now rally consistently and with confidence. Highly recommend for players at any level.",
    rating: 5,
  },
  {
    name: 'Amelia',
    initials: 'AM',
    service: 'Tennis Coaching',
    filter: 'Tennis',
    quote:
      "I have been doing tennis lessons with AJ for 10 months and he has been a fantastic encouraging coach. His thoughtful and creative approach to tailoring lessons to my learning style has seen my skills and confidence really grow. I look forward to our lessons every week and could not recommend him more highly.",
    rating: 5,
  },
  {
    name: 'Anete',
    initials: 'AN',
    service: 'Tennis Coaching',
    filter: 'Tennis',
    quote:
      "AJ brings incredible energy and good vibes to every session making tennis both fun and rewarding. His positive personality creates a relaxed and supportive environment where I always feel encouraged to improve. He explains techniques clearly and tailors training to suit my level and goals. I leave every class smiling and motivated.",
    rating: 5,
  },
  {
    name: 'Hassan',
    initials: 'HA',
    service: 'Tennis Coaching',
    filter: 'Tennis',
    quote:
      "I have been training with AJ for over a year and a half and our twice-weekly sessions are always a highlight. We start with a warm-up and ease into light games where I learn a lot while genuinely having fun. He brings great energy, knows how to make learning enjoyable and always keeps things engaging. Highly recommended!",
    rating: 5,
  },
  // Padel
  {
    name: 'Paul',
    initials: 'P',
    photo: '/paul-testimonial.jpg',
    service: 'Padel Coaching',
    filter: 'Padel',
    quote:
      "AJ is a truly outstanding Padel coach. His patient, thoughtful teaching style and ability to connect through clear, encouraging instruction have made every session something our son genuinely looks forward to. We've seen real progress, not just in his Padel skills, but in his confidence and love for the game. After working with several coaches, we feel incredibly grateful to have found AJ and hope to continue with him for many years to come.",
    rating: 5,
  },
  {
    name: 'Marco R',
    initials: 'MR',
    service: 'Padel Coaching',
    filter: 'Padel',
    quote:
      "AJ introduced me to padel and I am completely hooked. His court positioning coaching is next level.",
    rating: 5,
  },
  {
    name: 'Emma K',
    initials: 'EK',
    service: 'Padel Coaching',
    filter: 'Padel',
    quote:
      "The tactics AJ taught me took my padel game from beginner to competitive in just 6 weeks.",
    rating: 5,
  },
  {
    name: 'David L',
    initials: 'DL',
    service: 'Padel Coaching',
    filter: 'Padel',
    quote:
      "Best padel coaching in Sydney. AJ knows the game inside out and explains it so clearly.",
    rating: 5,
  },
  // Pickleball
  {
    name: 'Sharlene Robbins',
    initials: 'SR',
    photo: '/sharlene-testimonial.jpg',
    service: 'Pickleball Coaching',
    filter: 'Pickleball',
    quote:
      "AJ has been a perfect coach for me as someone who has never played Pickleball. He is incredibly patient and explains things clearly, making it easy to understand. His drills are challenging but fun, and they've helped me improve my game. I also appreciate how AJ takes the time to tailor the lesson to enhance my progress. He is always punctual, prepared, and communicative. I highly recommend AJ to anyone looking to improve their skills and have fun while doing it. I'm now addicted to Pickleball!",
    rating: 5,
  },
  {
    name: 'Georgia',
    initials: 'G',
    photo: '/georgia-testimonial.jpg',
    service: 'Pickleball Coaching',
    filter: 'Pickleball',
    quote:
      "Pickleball looks easy but requires a lot of certain skills to be a good player. I worked with AJ Nortje as my private coach to improve my game faster and still do. Even though AJ is primarily an expert tennis coach he is an equally skilled Pickleball Coach. He brings discipline, expertise and a great atmosphere to every lesson. I dramatically improved my volleys, half volleys and deep serves. There is nothing that would stop me from highly recommending AJ to anyone that wants to learn or improve their game. Go take a lesson with AJ and have fun at the same time!!!",
    rating: 5,
  },
  {
    name: 'Sarah Hopkins',
    initials: 'SH',
    service: 'Pickleball Coaching',
    filter: 'Pickleball',
    quote:
      "I have had the pleasure of being coached by AJ in pickleball and I could not recommend him more highly. He is an incredibly patient coach who always provides clear and explicit instructions that make learning the game a joy. His drills are fun and his relaxed vibe creates a positive and supportive learning environment.",
    rating: 5,
  },
  {
    name: 'Maria',
    initials: 'MA',
    service: 'Pickleball Coaching',
    filter: 'Pickleball',
    quote:
      "I am a Pickleball addict and worked with AJ as my private coach to improve my game. Even though AJ is primarily an expert tennis coach he is an equally skilled Pickleball coach. He brings discipline, expertise and a great atmosphere to lessons. I dramatically improved my volleys, half volleys and deep serves. There is nothing that would stop me from highly recommending AJ to anyone wanting to improve their game.",
    rating: 5,
  },
  // Beach Tennis
  {
    name: 'Juan',
    initials: 'J',
    service: 'Beach Tennis',
    filter: 'Beach Tennis',
    quote:
      "I've had the opportunity to take both group and private Beach Tennis lessons with AJ, and I can confidently say he's one of the most insightful and detail-oriented coaches I've worked with. His experience clearly shows in the way he breaks down not just technique, but also the tactical side of the game. What sets him apart is how he connects technical observations with tactical understanding. His feedback goes beyond just how to hit a shot, he explains why certain decisions on court matter. Who knows, maybe one day I'll finally beat him in his own Beat the Coach drill!",
    rating: 5,
  },
  {
    name: 'Jake S',
    initials: 'JS',
    service: 'Beach Tennis',
    filter: 'Beach Tennis',
    quote:
      "Training on the beach with AJ is an experience unlike anything else. High energy, great technique focus.",
    rating: 5,
  },
  {
    name: 'Mia C',
    initials: 'MC',
    service: 'Beach Tennis',
    filter: 'Beach Tennis',
    quote:
      "AJ coached me from zero beach tennis experience to competing in local tournaments. Incredible coach.",
    rating: 5,
  },
  {
    name: 'Ryan P',
    initials: 'RP',
    service: 'Beach Tennis',
    filter: 'Beach Tennis',
    quote:
      "The outdoor sessions are intense and so rewarding. AJ pushes you to your limit in the best way.",
    rating: 5,
  },
  // Fitness
  {
    name: 'Nicole H',
    initials: 'NH',
    service: 'Fitness & Conditioning',
    filter: 'Fitness',
    quote:
      "AJ built me a training program that actually fits my lifestyle. I have never been fitter or stronger.",
    rating: 5,
  },
  {
    name: 'Chris D',
    initials: 'CD',
    service: 'Fitness & Conditioning',
    filter: 'Fitness',
    quote:
      "The conditioning program AJ designed for me improved my on court performance dramatically within 8 weeks.",
    rating: 5,
  },
];

const filters = ['All', 'Tennis', 'Pickleball', 'Padel', 'Beach Tennis', 'Fitness'];

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
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? testimonials
      : testimonials.filter((t) => t.filter === activeFilter);

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

      <GoldDivider />

      {/* ── FILTER BAR ── */}
      <section style={{ background: 'var(--background)', paddingBottom: '0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center pb-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={
                  activeFilter === f
                    ? { background: 'var(--brand-gold)', color: '#0a0a0a', boxShadow: '0 4px 16px rgba(240,180,41,0.3)' }
                    : {
                        background: 'var(--surface)',
                        color: 'var(--brand-blue-light)',
                        border: '1px solid var(--border)',
                      }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── TESTIMONIALS GRID ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No testimonials for this filter yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <div
                  key={`${t.name}-${t.filter}`}
                  className="card card-gold flex flex-col overflow-hidden"
                  style={{ background: 'var(--surface)' }}
                >
                  {/* Gold top accent line */}
                  <div style={{ height: 3, background: 'linear-gradient(90deg, var(--brand-gold), var(--brand-gold-light))', flexShrink: 0 }} />
                  <div className="p-8 flex flex-col flex-1">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-4 mb-4">
                    {t.photo ? (
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="rounded-full flex-shrink-0 object-cover"
                        style={{ width: 64, height: 64, objectPosition: t.name === 'Georgia' ? 'top center' : 'center' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 64, height: 64, borderRadius: '50%',
                          background: '#0D1B2A',
                          border: '2px solid #C9A84C',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ color: '#C9A84C', fontSize: '1.2rem', fontWeight: 'bold' }}>{t.initials}</span>
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
                  <StarRating count={t.rating} />
                  <div className="text-3xl mt-4 mb-3" style={{ color: 'var(--brand-gold)', opacity: 0.5 }}>&ldquo;</div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <GoldDivider />

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
