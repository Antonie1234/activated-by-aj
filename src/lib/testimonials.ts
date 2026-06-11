/**
 * Shared testimonials store — data/testimonials.json
 * Used by /api/admin/testimonials (CRUD) and /api/testimonials (public GET).
 * Seeds the file from the original hardcoded testimonials on first read.
 */
import fs from 'fs/promises';
import { dataFile } from './dataDir';

export interface Testimonial {
  id:       string;
  name:     string;
  initials: string;
  service:  string;
  filter:   string;
  quote:    string;
  rating:   number;
  photo?:   string;
}

const SEED: Testimonial[] = [
  // Tennis
  { id:'t01', name:'Henry Leung',    initials:'HL', service:'Tennis Coaching',       filter:'Tennis',      rating:5, quote:"Training with AJ has been a game-changer for my tennis journey. From day one, he recognised my strengths and weaknesses and crafted a lesson plan tailored specifically to my goals. Every session is intense, focused, and designed to push me beyond what I thought I was capable of. AJ doesn't settle for mediocrity. He challenges me to dig deeper, work harder, and play smarter. Thanks to his dedication and personalised approach, I've seen dramatic improvements in my technique, endurance, and mental toughness. I couldn't ask for a better mentor on and off the court!" },
  { id:'t02', name:'Callum',         initials:'CA', service:'Tennis Coaching',       filter:'Tennis',      rating:5, quote:"I started lessons with AJ as a complete beginner, barely able to hold a rally. Over just one term the progress has been nothing short of incredible. AJ has a sharp eye for individual strengths and weaknesses and tailored his coaching to my specific habits. I now rally consistently and with confidence. Highly recommend for players at any level." },
  { id:'t03', name:'Amelia',         initials:'AM', service:'Tennis Coaching',       filter:'Tennis',      rating:5, quote:"I have been doing tennis lessons with AJ for 10 months and he has been a fantastic encouraging coach. His thoughtful and creative approach to tailoring lessons to my learning style has seen my skills and confidence really grow. I look forward to our lessons every week and could not recommend him more highly." },
  { id:'t04', name:'Anete',          initials:'AN', service:'Tennis Coaching',       filter:'Tennis',      rating:5, quote:"AJ brings incredible energy and good vibes to every session making tennis both fun and rewarding. His positive personality creates a relaxed and supportive environment where I always feel encouraged to improve. He explains techniques clearly and tailors training to suit my level and goals. I leave every class smiling and motivated." },
  { id:'t05', name:'Hassan',         initials:'HA', service:'Tennis Coaching',       filter:'Tennis',      rating:5, quote:"I have been training with AJ for over a year and a half and our twice-weekly sessions are always a highlight. We start with a warm-up and ease into light games where I learn a lot while genuinely having fun. He brings great energy, knows how to make learning enjoyable and always keeps things engaging. Highly recommended!" },
  // Padel
  { id:'t06', name:'Paul',           initials:'P',  service:'Padel Coaching',        filter:'Padel',       rating:5, photo:'/paul-testimonial.jpg', quote:"AJ is a truly outstanding Padel coach. His patient, thoughtful teaching style and ability to connect through clear, encouraging instruction have made every session something our son genuinely looks forward to. We've seen real progress, not just in his Padel skills, but in his confidence and love for the game. After working with several coaches, we feel incredibly grateful to have found AJ and hope to continue with him for many years to come." },
  { id:'t07', name:'Marco R',        initials:'MR', service:'Padel Coaching',        filter:'Padel',       rating:5, quote:"AJ introduced me to padel and I am completely hooked. His court positioning coaching is next level." },
  { id:'t08', name:'Emma K',         initials:'EK', service:'Padel Coaching',        filter:'Padel',       rating:5, quote:"The tactics AJ taught me took my padel game from beginner to competitive in just 6 weeks." },
  { id:'t09', name:'David L',        initials:'DL', service:'Padel Coaching',        filter:'Padel',       rating:5, quote:"Best padel coaching around. AJ knows the game inside out and explains it so clearly." },
  // Pickleball
  { id:'t10', name:'Sharlene Robbins', initials:'SR', service:'Pickleball Coaching', filter:'Pickleball',  rating:5, photo:'/sharlene-testimonial.jpg', quote:"AJ has been a perfect coach for me as someone who has never played Pickleball. He is incredibly patient and explains things clearly, making it easy to understand. His drills are challenging but fun, and they've helped me improve my game. I also appreciate how AJ takes the time to tailor the lesson to enhance my progress. He is always punctual, prepared, and communicative. I highly recommend AJ to anyone looking to improve their skills and have fun while doing it. I'm now addicted to Pickleball!" },
  { id:'t11', name:'Georgia',        initials:'G',  service:'Pickleball Coaching',   filter:'Pickleball',  rating:5, photo:'/georgia-testimonial.jpg', quote:"Pickleball looks easy but requires a lot of certain skills to be a good player. I worked with AJ Nortje as my private coach to improve my game faster and still do. Even though AJ is primarily an expert tennis coach he is an equally skilled Pickleball Coach. He brings discipline, expertise and a great atmosphere to every lesson. I dramatically improved my volleys, half volleys and deep serves. There is nothing that would stop me from highly recommending AJ to anyone that wants to learn or improve their game. Go take a lesson with AJ and have fun at the same time!!!" },
  { id:'t12', name:'Sarah Hopkins',  initials:'SH', service:'Pickleball Coaching',   filter:'Pickleball',  rating:5, quote:"I have had the pleasure of being coached by AJ in pickleball and I could not recommend him more highly. He is an incredibly patient coach who always provides clear and explicit instructions that make learning the game a joy. His drills are fun and his relaxed vibe creates a positive and supportive learning environment." },
  { id:'t13', name:'Maria',          initials:'MA', service:'Pickleball Coaching',   filter:'Pickleball',  rating:5, quote:"I am a Pickleball addict and worked with AJ as my private coach to improve my game. Even though AJ is primarily an expert tennis coach he is an equally skilled Pickleball coach. He brings discipline, expertise and a great atmosphere to lessons. I dramatically improved my volleys, half volleys and deep serves. There is nothing that would stop me from highly recommending AJ to anyone wanting to improve their game." },
  // Beach Tennis
  { id:'t14', name:'Juan',           initials:'J',  service:'Beach Tennis',          filter:'Beach Tennis',rating:5, quote:"I've had the opportunity to take both group and private Beach Tennis lessons with AJ, and I can confidently say he's one of the most insightful and detail-oriented coaches I've worked with. His experience clearly shows in the way he breaks down not just technique, but also the tactical side of the game. What sets him apart is how he connects technical observations with tactical understanding. His feedback goes beyond just how to hit a shot, he explains why certain decisions on court matter. Who knows, maybe one day I'll finally beat him in his own Beat the Coach drill!" },
  { id:'t15', name:'Jake S',         initials:'JS', service:'Beach Tennis',          filter:'Beach Tennis',rating:5, quote:"Training on the beach with AJ is an experience unlike anything else. High energy, great technique focus." },
  { id:'t16', name:'Mia C',          initials:'MC', service:'Beach Tennis',          filter:'Beach Tennis',rating:5, quote:"AJ coached me from zero beach tennis experience to competing in local tournaments. Incredible coach." },
  { id:'t17', name:'Ryan P',         initials:'RP', service:'Beach Tennis',          filter:'Beach Tennis',rating:5, quote:"The outdoor sessions are intense and so rewarding. AJ pushes you to your limit in the best way." },
  // Fitness
  { id:'t18', name:'Nicole H',       initials:'NH', service:'Fitness & Conditioning',filter:'Fitness',     rating:5, quote:"AJ built me a training program that actually fits my lifestyle. I have never been fitter or stronger." },
  { id:'t19', name:'Chris D',        initials:'CD', service:'Fitness & Conditioning',filter:'Fitness',     rating:5, quote:"The conditioning program AJ designed for me improved my on court performance dramatically within 8 weeks." },
];

export const SPORT_META: Record<string, { service: string; filter: string }> = {
  Tennis:          { service: 'Tennis Coaching',        filter: 'Tennis' },
  Padel:           { service: 'Padel Coaching',         filter: 'Padel' },
  Pickleball:      { service: 'Pickleball Coaching',    filter: 'Pickleball' },
  'Beach Tennis':  { service: 'Beach Tennis',           filter: 'Beach Tennis' },
  'Beach Sports':  { service: 'Beach Tennis',           filter: 'Beach Tennis' }, // review form label
  Fitness:         { service: 'Fitness & Conditioning', filter: 'Fitness' },
  Other:           { service: 'Coaching',               filter: '' },
};

export function makeInitials(name: string): string {
  return name.split(/\s+/).map(w => w[0] ?? '').join('').slice(0, 2).toUpperCase();
}

export function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function readTestimonials(): Promise<Testimonial[]> {
  const file = await dataFile('testimonials.json');
  try {
    return JSON.parse(await fs.readFile(file, 'utf-8'));
  } catch {
    // Seed on first run
    await fs.writeFile(file, JSON.stringify(SEED, null, 2), 'utf-8');
    return SEED;
  }
}

export async function writeTestimonials(data: Testimonial[]): Promise<void> {
  const file = await dataFile('testimonials.json');
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}
