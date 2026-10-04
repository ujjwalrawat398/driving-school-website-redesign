export const site = {
  name: "Apex Drive Academy",
  short: "Apex Drive",
  legal: "Apex Drive Academy Ltd",
  tagline: "Pass faster. Drive for life.",
  description:
    "DVSA-approved driving school delivering structured, confidence-first manual and automatic lessons, intensive courses and Pass Plus across Berkshire, Surrey and West London.",
  phone: "0118 214 9930",
  phoneHref: "tel:+441182149930",
  whatsapp: "07700 900 118",
  email: "bookings@apexdrive.academy",
  address: {
    line1: "Unit 4, Crescent Business Park",
    line2: "Reading, RG1 5SZ",
  },
  hours: [
    { label: "Mon – Fri", value: "07:00 – 20:00" },
    { label: "Saturday", value: "07:00 – 18:00" },
    { label: "Sunday", value: "08:00 – 16:00" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
  established: 2009,
  stats: [
    { value: 16, suffix: "+", label: "Years on the road" },
    { value: 12400, suffix: "+", label: "Lessons delivered" },
    { value: 93, suffix: "%", label: "First-time pass rate" },
    { value: 4.9, suffix: "/5", label: "From 1,180 reviews", decimals: 1 },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Lessons", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Instructors", href: "/instructors" },
  { label: "Areas", href: "/areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "Advice", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const videos = {
  hero: {
    src: "https://videos.pexels.com/video-files/15330792/15330792-uhd_3840_1620_24fps.mp4",
    poster: "/images/hero-car.jpg",
  },
  reel: {
    src: "https://videos.pexels.com/video-files/15341118/15341118-uhd_3840_1620_24fps.mp4",
    poster:
      "https://images.pexels.com/photos/13992748/pexels-photo-13992748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
};

export type ServiceSeed = {
  slug: string;
  title: string;
  short: string;
  description: string;
  price: number;
  unit: string;
  durationMinutes: number;
  level: string;
  transmission: string;
  icon: string;
  features: string[];
  outcomes: string[];
  sortOrder: number;
};

export const services: ServiceSeed[] = [
  {
    slug: "beginner-lessons",
    title: "Beginner Lessons",
    short: "Cockpit drill to quiet roads — a calm, structured first 10 hours.",
    description:
      "Every new driver starts with our onboarding session: cockpit drill, controls, moving off and stopping on quiet estate roads. You'll get a printed progress card and a private online tracker so you always know what comes next.",
    price: 38,
    unit: "per hour",
    durationMinutes: 60,
    level: "Beginner",
    transmission: "Manual & Automatic",
    icon: "seedling",
    features: [
      "Cockpit drill and controls mastery",
      "Moving off, stopping and clutch control",
      "Turning left and right into minor roads",
      "Online progress tracker shared with you",
      "Free theory test pro account",
    ],
    outcomes: [
      "Confidently move off and stop on a gradient",
      "Steer with precision using pull-push technique",
      "Understand the MSM routine before every junction",
    ],
    sortOrder: 1,
  },
  {
    slug: "intensive-course",
    title: "Intensive Courses",
    short: "Licence in 1–4 weeks with a guaranteed test date at the end.",
    description:
      "Our semi-intensive and full intensive programmes compress 30–45 hours of training into a focused block with the same instructor throughout. We book the practical test, plan the route and run a full mock on the final day.",
    price: 34,
    unit: "per hour (block rate)",
    durationMinutes: 480,
    level: "All levels",
    transmission: "Manual & Automatic",
    icon: "bolt",
    features: [
      "20, 30 or 45 hour blocks",
      "Same instructor for the whole course",
      "Practical test booked for you",
      "Full mock test on the final day",
      "Hotel pick-up options for residential courses",
    ],
    outcomes: [
      "Test-ready in as little as 7 days",
      "Consistent rhythm instead of weekly gaps",
      "Huge savings versus pay-as-you-go",
    ],
    sortOrder: 2,
  },
  {
    slug: "refresher-lessons",
    title: "Refresher Lessons",
    short: "For licensed drivers rebuilding confidence after a break.",
    description:
      "Returning after an accident, a licence lapse or ten years off the road? We audit your driving in a relaxed first hour, then focus only on what needs work — usually roundabouts, dual carriageways and parking.",
    price: 42,
    unit: "per hour",
    durationMinutes: 90,
    level: "Licensed drivers",
    transmission: "Manual & Automatic",
    icon: "refresh",
    features: [
      "Personal driving audit and action plan",
      "Motorway and dual carriageway exposure",
      "Multi-storey and reverse bay parking",
      "Night and poor-weather sessions",
      "Nervous and anxious driver specialists",
    ],
    outcomes: [
      "Drive on any road class without dread",
      "Independent parking in tight urban spaces",
      "A written confidence report after 5 hours",
    ],
    sortOrder: 3,
  },
  {
    slug: "pass-plus",
    title: "Pass Plus",
    short: "Six DVSA modules that cut insurance premiums by up to 30%.",
    description:
      "Pass Plus is a structured six-module course covering town, all-weather, rural roads, night, dual carriageways and motorways. Most insurers recognise the certificate — and it makes you a genuinely safer driver.",
    price: 240,
    unit: "full course (6h)",
    durationMinutes: 360,
    level: "Post-test",
    transmission: "Manual & Automatic",
    icon: "shield",
    features: [
      "Six DVSA syllabus modules",
      "Certificate posted to your insurer",
      "Genuine motorway driving with guidance",
      "Night driving and low-visibility coaching",
      "Insurance discount documentation",
    ],
    outcomes: [
      "Up to 30% off first-year insurance",
      "Motorway competence before you need it",
      "Verified Pass Plus certificate",
    ],
    sortOrder: 4,
  },
  {
    slug: "mock-test",
    title: "Mock Test Package",
    short: "A real examiner-style test with a full debrief and mark sheet.",
    description:
      "We replicate the DVSA test exactly: 40 minutes, show-me/tell-me questions, one manoeuvre and independent driving. You get the same marking sheet the examiner uses, plus a prioritised fix list.",
    price: 65,
    unit: "per session",
    durationMinutes: 90,
    level: "Test ready",
    transmission: "Manual & Automatic",
    icon: "clipboard",
    features: [
      "Examiner-style marking sheet",
      "Sat-nav independent driving section",
      "All four manoeuvres practised",
      "Immediate recorded debrief",
      "Test-day route familiarisation",
    ],
    outcomes: [
      "Know exactly what the examiner looks for",
      "Remove the fear of the unknown",
      "A shortlist of habits to fix before test day",
    ],
    sortOrder: 5,
  },
  {
    slug: "automatic-lessons",
    title: "Automatic Lessons",
    short: "Learn in a smooth EV automatic — no clutch, faster progress.",
    description:
      "Automatic removes the clutch curve so most learners reach test standard 20% faster. Our automatic fleet includes hybrid and fully electric cars so you're future-proofed for the 2030 switch.",
    price: 40,
    unit: "per hour",
    durationMinutes: 60,
    level: "Beginner to advanced",
    transmission: "Automatic only",
    icon: "spark",
    features: [
      "Hybrid and EV tuition cars",
      "Regenerative braking coaching",
      "Charging and range planning",
      "Ideal for anxious learners",
      "Test taken in the same car you learn in",
    ],
    outcomes: [
      "Fewer hours to test standard",
      "Zero stalling stress",
      "Ready for an electric future",
    ],
    sortOrder: 6,
  },
  {
    slug: "motorway-training",
    title: "Motorway & Rural Training",
    short: "Smart motorways, slip roads and single-track country lanes.",
    description:
      "Motorway driving is statistically the safest but the most intimidating. We cover slip-road matching, lane discipline, smart motorway signals, plus rural passing places and tractor awareness.",
    price: 45,
    unit: "per hour",
    durationMinutes: 120,
    level: "Intermediate +",
    transmission: "Manual & Automatic",
    icon: "road",
    features: [
      "M4 and M25 smart motorway sessions",
      "Slip-road speed matching drills",
      "Rural passing places and blind bends",
      "Fatigue and journey planning",
      "Dashcam review of your drive",
    ],
    outcomes: [
      "Join a motorway at 70mph without panic",
      "Handle single-track roads with confidence",
      "Plan long journeys like a professional",
    ],
    sortOrder: 7,
  },
  {
    slug: "instructor-training",
    title: "ADI Instructor Training",
    short: "ORDIT-registered path to a new career as a driving instructor.",
    description:
      "Train to become an Approved Driving Instructor with our ORDIT-registered programme: Part 1 theory, Part 2 driving ability and Part 3 instructional ability, plus a franchise placement on qualification.",
    price: 1650,
    unit: "full programme",
    durationMinutes: 90,
    level: "Career change",
    transmission: "Manual",
    icon: "badge",
    features: [
      "All three DVSA parts supported",
      "In-car Part 3 role-play practice",
      "DBS and CRB application help",
      "Guaranteed franchise interview",
      "Pay-as-you-train funding options",
    ],
    outcomes: [
      "A recognised, portable professional qualification",
      "Flexible self-employed income",
      "Start earning within 6 months",
    ],
    sortOrder: 8,
  },
];

export const pricingPlans = [
  {
    name: "Pay As You Go",
    price: 38,
    unit: "/hour",
    summary: "Perfect for topping up between tests or easing back in.",
    features: [
      "Single hourly lessons",
      "Manual or automatic",
      "Free online progress tracker",
      "No contract, no notice period",
      "Home, work or college pick-up",
    ],
    cta: "Book a lesson",
    featured: false,
  },
  {
    name: "Fast Pass 10",
    price: 350,
    unit: "10 hours",
    summary: "Our most popular block — save £30 and lock your weekly slot.",
    features: [
      "10 hours for the price of 9",
      "Same instructor, same slot each week",
      "Theory test pro included",
      "Free test-day car hire (1h)",
      "Priority WhatsApp support",
    ],
    cta: "Reserve block",
    featured: true,
  },
  {
    name: "Intensive 30",
    price: 1020,
    unit: "30 hours",
    summary: "One to four weeks from beginner to test-ready.",
    features: [
      "30 hours over 1–4 weeks",
      "Practical test fee included",
      "Two full mock tests",
      "Highway Code digital pack",
      "Pass Protect retest cover",
    ],
    cta: "Start intensive",
    featured: false,
  },
];

export type InstructorSeed = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  adiNumber: string;
  transmission: string;
  specialisms: string[];
  rating: number;
  reviews: number;
  years: number;
  areas: string[];
};

export const instructors: InstructorSeed[] = [
  {
    name: "Daniel Okonkwo",
    role: "Senior Instructor & ORDIT Trainer",
    bio: "Former HGV trainer turned car instructor, Daniel specialises in nervous learners and intensive courses. He has signed off more than 1,400 practical tests.",
    imageUrl:
      "https://images.pexels.com/photos/14391923/pexels-photo-14391923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    adiNumber: "ADI 448210",
    transmission: "Manual",
    specialisms: ["Nervous learners", "Intensive", "ADI training"],
    rating: 5,
    reviews: 312,
    years: 14,
    areas: ["Reading", "Wokingham", "Bracknell"],
  },
  {
    name: "Priya Raman",
    role: "Automatic & EV Specialist",
    bio: "Priya teaches exclusively in our electric automatic fleet. Calm, methodical and endlessly patient — she's the instructor people ask for by name.",
    imageUrl:
      "https://images.pexels.com/photos/8727530/pexels-photo-8727530.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    adiNumber: "ADI 551903",
    transmission: "Automatic",
    specialisms: ["Automatic", "EV", "Anxious learners"],
    rating: 5,
    reviews: 268,
    years: 9,
    areas: ["Reading", "Maidenhead", "Slough"],
  },
  {
    name: "Gareth Ellis",
    role: "Lead Instructor, Surrey",
    bio: "Gareth spent a decade as a fleet driver trainer for the NHS. Expect precision, structure and a very dry sense of humour on roundabouts.",
    imageUrl:
      "https://images.pexels.com/photos/7514883/pexels-photo-7514883.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    adiNumber: "ADI 402118",
    transmission: "Manual",
    specialisms: ["Motorway", "Fleet", "Refresher"],
    rating: 4.9,
    reviews: 197,
    years: 11,
    areas: ["Woking", "Guildford", "Camberley"],
  },
  {
    name: "Sofia Almeida",
    role: "Intensive Course Lead",
    bio: "Sofia runs our 1–4 week intensive programmes. She's obsessive about route planning and will have you driving test routes before you know they're test routes.",
    imageUrl:
      "https://images.pexels.com/photos/36593090/pexels-photo-36593090.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    adiNumber: "ADI 563774",
    transmission: "Manual & Automatic",
    specialisms: ["Intensive", "Mock tests", "Test routes"],
    rating: 5,
    reviews: 241,
    years: 8,
    areas: ["Reading", "Basingstoke", "Newbury"],
  },
  {
    name: "Marcus Bennett",
    role: "Pass Plus Coordinator",
    bio: "Marcus handles motorway, night and all-weather modules. If you've just passed and the M25 scares you, he's the one to call.",
    imageUrl:
      "https://images.pexels.com/photos/5931195/pexels-photo-5931195.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    adiNumber: "ADI 487221",
    transmission: "Manual & Automatic",
    specialisms: ["Pass Plus", "Motorway", "Night driving"],
    rating: 4.8,
    reviews: 158,
    years: 6,
    areas: ["Slough", "Uxbridge", "Hounslow"],
  },
  {
    name: "Elaine Hughes",
    role: "Senior Instructor, West London",
    bio: "Elaine returned to teaching after 20 years in road safety education. She is brilliant with mature learners and anyone returning after a long break.",
    imageUrl:
      "https://images.pexels.com/photos/8727416/pexels-photo-8727416.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    adiNumber: "ADI 390552",
    transmission: "Automatic",
    specialisms: ["Mature learners", "Refresher", "Parking"],
    rating: 4.9,
    reviews: 204,
    years: 12,
    areas: ["Hounslow", "Richmond", "Uxbridge"],
  },
];

export type TestimonialSeed = {
  name: string;
  location: string;
  rating: number;
  quote: string;
  service: string;
  instructor: string;
};

export const testimonials: TestimonialSeed[] = [
  {
    name: "Hannah W.",
    location: "Reading",
    rating: 5,
    quote:
      "I failed twice with another school and had almost given up. Priya rebuilt everything from scratch in nine hours and I passed with three minors. She never once made me feel stupid.",
    service: "Automatic Lessons",
    instructor: "Priya Raman",
  },
  {
    name: "Jordan A.",
    location: "Slough",
    rating: 5,
    quote:
      "Did the 30-hour intensive over two weeks while on annual leave. Test booked, mock test on day nine, passed on day twelve. Genuinely the most efficient money I've spent.",
    service: "Intensive Course",
    instructor: "Sofia Almeida",
  },
  {
    name: "Michael D.",
    location: "Guildford",
    rating: 5,
    quote:
      "I'm 46 and hadn't driven since my test in 2001. Gareth was unbelievably patient. Three refresher hours on roundabouts and the A3 and I was back to normal.",
    service: "Refresher Lessons",
    instructor: "Gareth Ellis",
  },
  {
    name: "Aisha K.",
    location: "Wokingham",
    rating: 5,
    quote:
      "The online progress tracker was the thing that made the difference — I could see exactly what was left to cover before test. No wasted lessons padding things out.",
    service: "Beginner Lessons",
    instructor: "Daniel Okonkwo",
  },
  {
    name: "Tom R.",
    location: "Uxbridge",
    rating: 5,
    quote:
      "Passed first time with zero faults. The mock test with the real DVSA mark sheet meant nothing on the day surprised me. Worth every penny.",
    service: "Mock Test Package",
    instructor: "Marcus Bennett",
  },
  {
    name: "Sandra L.",
    location: "Maidenhead",
    rating: 5,
    quote:
      "My daughter has severe anxiety and two schools refused to teach her. Elaine took her from tears to a full licence in five months. I cannot thank this team enough.",
    service: "Automatic Lessons",
    instructor: "Elaine Hughes",
  },
  {
    name: "Dev P.",
    location: "Basingstoke",
    rating: 4,
    quote:
      "Brilliant instruction, only reason it's four stars is my instructor changed halfway through because I moved house. Handover was handled really well though.",
    service: "Beginner Lessons",
    instructor: "Sofia Almeida",
  },
  {
    name: "Chloe M.",
    location: "Newbury",
    rating: 5,
    quote:
      "Pass Plus saved me £410 on my first year of insurance as a 19-year-old. The motorway module alone was worth it — I'd never have done that on my own.",
    service: "Pass Plus",
    instructor: "Marcus Bennett",
  },
];

export const faqs = [
  {
    category: "Getting started",
    question: "How many lessons will I actually need?",
    answer:
      "The DVSA says the average is around 45 hours of professional tuition plus 22 hours of private practice. Our learners average 34 hours because every lesson is structured against the DVSA syllabus and tracked online. Complete beginners usually reach test standard in 28–38 hours with us.",
  },
  {
    category: "Getting started",
    question: "Do I need my provisional licence before booking?",
    answer:
      "You can book at any time, but you must hold a valid UK provisional licence before you drive on a public road. Apply online at GOV.UK — it usually arrives within a week and costs £34.",
  },
  {
    category: "Getting started",
    question: "Should I learn manual or automatic?",
    answer:
      "Learn manual if you want the flexibility to drive both. Choose automatic if you're anxious about clutch control or you only plan to drive an EV — most of our automatic learners reach test standard around 20% faster. Note that an automatic licence doesn't cover manual cars.",
  },
  {
    category: "Lessons & cars",
    question: "Can I choose my instructor?",
    answer:
      "Yes. Every profile on our Instructors page shows specialisms, rating and the areas they cover. If you don't get on with your instructor for any reason, we'll reassign you with no awkward conversation and no charge.",
  },
  {
    category: "Lessons & cars",
    question: "What car will I learn in?",
    answer:
      "A modern, fully insured dual-control car — currently Ford Fiesta and Volkswagen Golf for manual, and the Kia Niro EV for automatic. All are under four years old, air-conditioned and cleaned between lessons.",
  },
  {
    category: "Lessons & cars",
    question: "Do you pick me up from home or work?",
    answer:
      "Yes — anywhere within our coverage area including homes, workplaces, sixth forms, colleges and train stations. Just tell us at booking and we'll plan the route around it.",
  },
  {
    category: "Tests & pricing",
    question: "Do you book the theory and practical tests for me?",
    answer:
      "We book the practical test for you on every intensive and 10-hour block booking at no extra charge. For pay-as-you-go we'll walk you through booking it yourself, or do it for you for a £15 admin fee.",
  },
  {
    category: "Tests & pricing",
    question: "What happens if I fail my test?",
    answer:
      "You'll get a written action plan the same day, targeted hours on the faults marked, and we'll rebook your test. Pass Protect customers get the retest fee and 5 hours of remedial training covered.",
  },
  {
    category: "Tests & pricing",
    question: "Is there a cancellation charge?",
    answer:
      "Lessons can be moved or cancelled free of charge with 48 hours' notice. Inside 48 hours we charge 50%, and inside 12 hours the full lesson is payable — our instructors are booked and paid for that time.",
  },
  {
    category: "Tests & pricing",
    question: "Do you offer refunds on unused block hours?",
    answer:
      "Yes. Unused block hours are refundable at the block rate you paid at any point in the first 12 months. No small print, no admin fee.",
  },
];

export const coverageAreas = [
  { town: "Reading", postcode: "RG1–RG6", testCentre: true, note: "Our HQ and largest instructor team." },
  { town: "Wokingham", postcode: "RG40–RG41", testCentre: true, note: "Quiet estate roads ideal for hour one." },
  { town: "Bracknell", postcode: "RG12, RG42", testCentre: false, note: "Dual carriageway and roundabout training." },
  { town: "Maidenhead", postcode: "SL6", testCentre: true, note: "Automatic and EV lessons daily." },
  { town: "Slough", postcode: "SL1–SL3", testCentre: true, note: "High-traffic urban routes." },
  { town: "Windsor", postcode: "SL4", testCentre: false, note: "Tourist traffic and narrow streets." },
  { town: "Basingstoke", postcode: "RG21–RG24", testCentre: true, note: "Intensive course hub." },
  { town: "Newbury", postcode: "RG14, RG19", testCentre: false, note: "Rural and country lane modules." },
  { town: "Woking", postcode: "GU21–GU23", testCentre: true, note: "Surrey team base." },
  { town: "Guildford", postcode: "GU1–GU4", testCentre: true, note: "A3 and motorway exposure." },
  { town: "Camberley", postcode: "GU15, GU16", testCentre: false, note: "Pass Plus motorway routes." },
  { town: "Hounslow", postcode: "TW3–TW7", testCentre: true, note: "West London test routes." },
  { town: "Richmond", postcode: "TW9, TW10", testCentre: false, note: "Park and riverside manoeuvres." },
  { town: "Uxbridge", postcode: "UB8, UB9", testCentre: true, note: "Night driving modules." },
];

export const processSteps = [
  {
    step: "01",
    title: "Free 15-minute consult",
    body: "We call you, assess your experience and goals, and recommend the shortest realistic route to your licence.",
  },
  {
    step: "02",
    title: "Matched with your instructor",
    body: "You're paired by personality, transmission and postcode — not whoever happens to be free on Tuesday.",
  },
  {
    step: "03",
    title: "Structured, tracked lessons",
    body: "Every hour maps to the DVSA syllabus. You watch your own progress card fill up after each drive.",
  },
  {
    step: "04",
    title: "Mock test, then the real one",
    body: "A full examiner-style mock, a prioritised fix list, and your test in the car you trained in.",
  },
];

export const differentiators = [
  {
    title: "DVSA Grade A instructors only",
    body: "Every instructor on our roster holds a Grade A standards check. No trainees, no pink-badge licence holders teaching you unsupervised.",
    icon: "badge",
  },
  {
    title: "You see your own progress data",
    body: "A live online card tracks all 27 DVSA competencies after every lesson. No padding, no mystery about what's left.",
    icon: "chart",
  },
  {
    title: "Pass Protect included",
    body: "On blocks of 10 hours or more, your retest fee and five remedial hours are covered if the worst happens.",
    icon: "shield",
  },
  {
    title: "Nervous-driver specialists",
    body: "Over a third of our learners come to us with driving anxiety. Our instructors are trained in graded exposure techniques.",
    icon: "heart",
  },
  {
    title: "Modern dual-control fleet",
    body: "Cars under four years old, all with dual controls, air-con and cameras so you can review your drive afterwards.",
    icon: "car",
  },
  {
    title: "Zero cancellation markup",
    body: "48 hours' notice to move a lesson, free. Refunds on unused block hours at any time, no admin fee.",
    icon: "calendar",
  },
];

export type PostSeed = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  author: string;
  coverImage: string;
};

export const posts: PostSeed[] = [
  {
    slug: "how-many-driving-lessons-do-i-really-need",
    title: "How many driving lessons do you really need?",
    excerpt:
      "The DVSA average is 45 hours. Our learners pass in 34. Here's exactly where the difference comes from — and how to cut your own number.",
    body: `The DVSA's own research puts the average newly qualified driver at around 45 hours of professional tuition plus 22 hours of private practice. That number scares people. It shouldn't, because it hides an enormous spread.\n\n**Where the hours actually go**\nMost of the spread isn't talent — it's structure. Unstructured lessons drift: you drive around, the instructor chats, an hour disappears. Structured lessons open with a two-minute recap of the last competency, work a single new skill, and close with a written record. Learners on a structured programme consistently reach test standard in 30–36 hours.\n\n**Three ways to cut your total**\n1. Learn the theory first. Learners who arrive with a theory pass take an average of six fewer practical hours, because we aren't explaining what a sign means mid-manoeuvre.\n2. Take two-hour lessons. You spend less of each lesson in the warm-up, and complex skills like roundabouts need continuous time.\n3. Practice privately if you can, but only the things you've been taught. Practising a bad habit for ten hours costs you three hours of correction.\n\n**The honest breakdown**\nHours 1–6: controls, moving off, basic junctions. Hours 7–18: crossroads, traffic lights, roundabouts, emerging skills. Hours 19–28: manoeuvres, independent driving, rural and dual carriageways. Hours 29–36: test routes, mock tests, polish.\n\nIf you're beyond hour 40 with no test date in sight, ask your instructor for your progress card. If they can't produce one, that's your answer.`,
    category: "Learning to drive",
    readMinutes: 6,
    publishedAt: "2026-01-18",
    author: "Daniel Okonkwo",
    coverImage:
      "https://images.pexels.com/photos/6817037/pexels-photo-6817037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    slug: "show-me-tell-me-questions-2026",
    title: "Every 2026 show me, tell me question (and the short answers)",
    excerpt:
      "You'll get one of each at the start of your test. Here are all the combinations you could be asked, with the answers examiners accept.",
    body: `Your practical test opens with the "tell me" question before you drive, and one "show me" question while you're driving. Get one wrong and it's a minor fault — not a fail — but it sets the tone for the next 40 minutes.\n\n**The 14 tell me questions**\nTyres: check for a minimum 1.6mm tread across the central three-quarters of the breadth and around the entire circumference, and no cuts or bulges.\nBrakes: press the pedal before moving off — it shouldn't feel spongy or slack, and the car shouldn't pull to one side.\nHeadlights and tyres work together with the rest of your lights: operate the switch and walk round, or explain you'd use reflections.\nPower steering: if the steering becomes heavy the system may not be working. Before starting a journey two checks — gentle pressure on the wheel as you start the engine should result in a slight movement, and the wheel shouldn't suddenly become light.\n\n**The 7 show me questions**\nThese are asked on the move: demist the rear screen, operate the windscreen washer and wipers, switch on dipped headlights, set the rear fog light, sound the horn, use the horn... and the one that catches people out — turning on the heated rear window while looking at the road.\n\n**The real trick**\nDo all seven show me actions in your own car before test day, while driving, until you can find every switch without looking down. Muscle memory beats memory.`,
    category: "Test day",
    readMinutes: 5,
    publishedAt: "2026-01-09",
    author: "Gareth Ellis",
    coverImage:
      "https://images.pexels.com/photos/3791193/pexels-photo-3791193.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    slug: "roundabout-anxiety-fix",
    title: "Roundabout anxiety: a five-step fix that actually works",
    excerpt:
      "Spiral lanes, multi-lane monsters and the M4 junction 11 mega-roundabout. A graded approach to the most feared road feature in Berkshire.",
    body: `Ask any learner in Berkshire what they fear and it's roundabouts. Not motorways, not parallel parking — roundabouts. Specifically the multi-lane ones with spiral markings where the lane you're in quietly becomes the wrong lane.\n\n**Step one: static reading**\nWe park up and read the roundabout before we drive it. Approach, lane discipline, exit. You cannot process a spiral marking and steer at the same time until you've read it standing still.\n\n**Step two: quiet roundabouts at quiet times**\nSunday at 8am. Single-lane roundabouts, ten circuits, left exits only. Build the rhythm: mirror, signal, position, speed, look — MSPSL every single time.\n\n**Step three: add straight ahead and right**\nSame roundabout, now three exit options. This is where lane discipline starts to matter, and where you learn that a late signal is worse than no signal.\n\n**Step four: spiral markings**\nNow the big ones. Rule of thumb: if the markings are spiral, follow the paint, not your instinct. The paint is always right.\n\n**Step five: busy hours**\nOnly at the end, and only when the first four steps are automatic. Confidence built on a foundation of reading and routine survives contact with the school run. Confidence built by "just going for it" doesn't.\n\nMost nervous learners need three two-hour sessions on this ladder. It works.`,
    category: "Confidence",
    readMinutes: 7,
    publishedAt: "2025-12-21",
    author: "Priya Raman",
    coverImage:
      "https://images.pexels.com/photos/10802497/pexels-photo-10802497.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    slug: "manual-or-automatic-2030",
    title: "Manual or automatic in 2026? An honest answer",
    excerpt:
      "With EVs taking over and the 2030 deadline approaching, is a manual licence still worth the extra hours?",
    body: `Every week someone asks whether learning manual is still worth it. The honest answer is: it depends what you'll drive in the next five years.\n\n**The case for automatic**\nYou'll reach test standard in fewer hours — our data says around 20% fewer. There's no stalling, no clutch anxiety, and no hill-start dread. And the car you'll most likely buy next is probably automatic: EVs have no gearbox at all.\n\n**The case for manual**\nA manual licence covers both. If you might drive a van for work, borrow a mate's car, or hire something abroad, you need it. Manual cars are also cheaper to buy second-hand today.\n\n**What we actually recommend**\nIf you're under 25 and anxious about the clutch, learn automatic. Pass faster, build confidence, then do a short manual conversion later if you need it — that conversion is usually 6–10 hours rather than 34.\n\nIf you're career-minded about vans, trades or driving abroad, learn manual.\n\n**The thing people forget**\nYour licence category isn't a trophy. Nobody has ever asked to see whether you passed in a manual or an automatic — they've only asked whether you can drive safely.`,
    category: "Learning to drive",
    readMinutes: 4,
    publishedAt: "2025-12-04",
    author: "Sofia Almeida",
    coverImage:
      "https://images.pexels.com/photos/5320413/pexels-photo-5320413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    slug: "first-motorway-drive-after-passing",
    title: "Your first motorway drive after passing",
    excerpt:
      "Statistically the safest roads in Britain, emotionally the scariest. Here's the briefing we give every Pass Plus pupil before the slip road.",
    body: `Motorways are Britain's safest roads per mile travelled and its most feared. The gap is entirely about unfamiliarity — you can't learn them on L-plates unless you're with an instructor, so most new drivers meet the M4 alone.\n\n**Before you join**\nPlan your route and know your junction numbers. Fatigue and last-second lane changes cause more motorway incidents than speed. Check tyres, fuel, and screen wash.\n\n**The slip road**\nThe single most important skill: match the speed of the traffic in lane one by the top of the slip road. Joining at 40mph into 70mph traffic is dangerous. Use the full length of the slip — that's what it's for.\n\n**Lane discipline**\nLane one is for cruising. Move right only to overtake, then move back. Never undertake. Keep a two-second gap in the dry, four in the wet.\n\n**Smart motorways**\nA red X over a lane means that lane is closed — get out of it immediately. It's an offence to drive in it and there are cameras. If the hard shoulder is being used as a running lane, treat it as a normal lane.\n\n**If it goes wrong**\nGet left, get your hazards on, get behind the barrier if there is one, and call for help. Never stand between your car and the traffic.\n\nOur Pass Plus motorway module covers all of this with an instructor beside you. It's the cheapest confidence you'll ever buy.`,
    category: "Pass Plus",
    readMinutes: 6,
    publishedAt: "2025-11-16",
    author: "Marcus Bennett",
    coverImage:
      "https://images.pexels.com/photos/12421058/pexels-photo-12421058.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

export type GalleryItemSeed = {
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  caption: string;
};

export const galleryItems: GalleryItemSeed[] = [
  { type: "image", src: "/images/hero-car.jpg", title: "The Apex tuition fleet", caption: "Dual-control Fiesta and Golf, detailed between every lesson." },
  { type: "image", src: "/images/in-car-lesson.jpg", title: "In-car coaching", caption: "Real-time guidance with dual controls for total safety." },
  { type: "image", src: "/images/pass-celebration.jpg", title: "Pass day", caption: "1,180 passes and counting across Berkshire and Surrey." },
  { type: "image", src: "/images/instructor-team.jpg", title: "The Grade A team", caption: "Six DVSA Grade A instructors, one standard." },
  {
    type: "image",
    src: "https://images.pexels.com/photos/4237146/pexels-photo-4237146.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Right-hand drive, right way",
    caption: "Every car in the fleet is a UK-spec RHD with dual pedals.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/9518022/pexels-photo-9518022.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Private practice",
    caption: "We coach parents on supervised practice too.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/19477337/pexels-photo-19477337.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Steering technique",
    caption: "Pull-push steering taught from hour one.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/28986777/pexels-photo-28986777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Night modules",
    caption: "Low-visibility coaching for new drivers.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/3646210/pexels-photo-3646210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Dusk drives",
    caption: "Golden hour is the best classroom there is.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/38903111/pexels-photo-38903111.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Rural routes",
    caption: "Country lane modules near Newbury.",
  },
  { type: "video", src: "https://videos.pexels.com/video-files/13164376/13164376-uhd_3840_2160_25fps.mp4", poster: "https://images.pexels.com/photos/13992748/pexels-photo-13992748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Open road", caption: "Building up to dual carriageway speeds." },
  { type: "video", src: "https://videos.pexels.com/video-files/15341707/15341707-uhd_3840_1620_24fps.mp4", poster: "https://images.pexels.com/photos/19199733/pexels-photo-19199733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Coastal run", caption: "Pass Plus motorway module." },
  { type: "video", src: "https://videos.pexels.com/video-files/15341182/15341182-uhd_3840_1620_24fps.mp4", poster: "https://images.pexels.com/photos/9227739/pexels-photo-9227739.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", title: "Dusk highway", caption: "Light and visibility coaching." },
];

export const accreditations = [
  "DVSA Approved (Grade A)",
  "ORDIT Registered Trainer",
  "Pass Plus Registered",
  "ADI Federation Member",
  "Enhanced DBS Checked",
  "£5m Public Liability Insured",
];

export const lessonTimes = [
  "07:00",
  "09:00",
  "11:00",
  "13:00",
  "15:00",
  "17:00",
  "19:00",
];

export const trustLogos = [
  "DVSA Grade A",
  "ORDIT",
  "Pass Plus",
  "RoSPA",
  "Trustpilot 4.9",
  "ADI Federation",
  "Which? Recommended",
  "Institute of Advanced Motorists",
];
