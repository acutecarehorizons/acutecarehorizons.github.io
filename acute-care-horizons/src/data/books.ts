export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  targetAudience: 'nurse-practitioners' | 'physician-assistants' | 'both';
  amazonUrl: string;
  features: string[];
  edition: string;
}

export const books: Book[] = [
  {
    id: 'np-acp',
    title: 'Acute Care Protocols for Nurse Practitioners',
    subtitle: '6th Edition',
    description: 'Comprehensive acute care protocols specifically designed for nurse practitioners. Concise and fast-reading resources in a bulleted outline format for family practice, urgent care, and emergency medicine.',
    coverImage: '/images/npacp-front_small.png',
    targetAudience: 'nurse-practitioners',
    amazonUrl: 'https://www.amazon.com/s?k=acute+care+protocols+6th+edition+Donald+Correll&i=stripbooks&s=date-desc-rank&ds=v1%3Acq3BPCh%2Fu4mjKy0%2Bf5y6gJf3kTtz8aZaxZjVxi5Rkfs&crid=ECA65RZFP1SI&qid=1675627436&sprefix=acute+care+protocols+6th+edition+donald+correl%2Cstripbooks%2C175&ref=sr_st_date-desc-rank',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: '6th'
  },
  {
    id: 'pa-acp',
    title: 'Acute Care Protocols for Physician Assistants',
    subtitle: '6th Edition',
    description: 'Essential acute care protocols tailored for physician assistants. Provides foundational information and serves as a valuable resource for both recent graduates and experienced practitioners.',
    coverImage: '/images/paacp-front_small.png',
    targetAudience: 'physician-assistants',
    amazonUrl: 'https://www.amazon.com/s?k=acute+care+protocols+6th+edition+Donald+Correll&i=stripbooks&s=date-desc-rank&ds=v1%3Acq3BPCh%2Fu4mjKy0%2Bf5y6gJf3kTtz8aZaxZjVxi5Rkfs&crid=ECA65RZFP1SI&qid=1675627436&sprefix=acute+care+protocols+6th+edition+donald+correl%2Cstripbooks%2C175&ref=sr_st_date-desc-rank',
    features: [
      'Well-organized and easy to follow',
      'Treatment and diagnosis guidance',
      'Admission/discharge criteria',
      'Consultation guidelines',
      'Emergency department focused'
    ],
    edition: '6th'
  },
  {
    id: 'np-pg',
    title: 'Practice Guide for Nurse Practitioners',
    subtitle: '6th Edition',
    description: 'A comprehensive practice guide that helps direct diagnosis, treatment and details criteria for either admission/discharge or further consultation. An important "go-to" text for day-to-day practice.',
    coverImage: '/images/np-pg_small.png',
    targetAudience: 'nurse-practitioners',
    amazonUrl: 'https://www.amazon.com/s?k=acute+care+protocols+6th+edition+Donald+Correll&i=stripbooks&s=date-desc-rank&ds=v1%3Acq3BPCh%2Fu4mjKy0%2Bf5y6gJf3kTtz8aZaxZjVxi5Rkfs&crid=ECA65RZFP1SI&qid=1675627436&sprefix=acute+care+protocols+6th+edition+donald+correl%2Cstripbooks%2C175&ref=sr_st_date-desc-rank',
    features: [
      'Day-to-day practice guidance',
      'Readable font and format',
      'Memory jogging for unfamiliar subjects',
      'Quick in-and-out reference',
      'Discharge criteria focus'
    ],
    edition: '6th'
  }
];

export const testimonials = [
  "I have used it several times in the last few months and continue to use it, particularly if I came across a subject that I hadn't done in a while to jog my memory for what to order.",
  "It gets you in and out quick.",
  "I bought it for the discharge criteria. I wanted to make sure that I was not missing anything.",
  "I like the bulleted format and readable font.",
  "After receiving this book, I have found it to be an important \"go-to\" text for day-to-day practice in the emergency department.",
  "Well-organized and easy to follow, the book helps direct diagnosis, treatment and details criteria for either admission/discharge or further consultation.",
  "I find the book to be helpful in practice. It provides foundational information that serves as a guide and it has been a valuable resource for me.",
  "I found this book to be well written, easy to follow and a great resource. I keep it near my desk at work and use it often. The author incorporates evidence based information and up to date clinical guidelines. A wonderful resource especially for the recent graduate!",
  "I am using the practice guide daily and very much appreciate how valuable it is."
]; 