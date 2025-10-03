export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  targetAudience: 'nurse-practitioners' | 'physician-assistants' | 'both';
  amazonUrl: string;
  googlePlayUrl?: string;
  payHipUrl?: string;
  appleUrl?: string;
  features: string[];
  edition: string;
}

export const books: Book[] = [
  {
    id: 'np-acp',
    title: 'Nurse Practitioner Acute Care Protocols',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'Comprehensive acute care protocols specifically designed for nurse practitioners. Concise and fast-reading resources in a bulleted outline format for family practice, urgent care, and emergency medicine.',
    coverImage: '/images/npacp-front_small.png',
    targetAudience: 'nurse-practitioners',
    amazonUrl: 'https://www.amazon.com/s?k=%22Nurse+Practitioner+Acute+Care+Protocols+-+SIXTH+EDITION%22%3A+For+Emergency+Departments+%22Donald+Correll%22&i=stripbooks&crid=2KMIBYLHQHNJK&sprefix=nurse+practitioner+acute+care+protocols+-+sixth+edition+for+emergency+departments+donald+correll+%2Cstripbooks%2C357&ref=nb_sb_noss',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: 'Paper'
  },
  {
    id: 'pa-acp',
    title: 'Physician Assistant Acute Care Protocols',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'Essential acute care protocols tailored for physician assistants. Provides foundational information and serves as a valuable resource for both recent graduates and experienced practitioners.',
    coverImage: '/images/paacp-front_small.png',
    targetAudience: 'physician-assistants',
    amazonUrl: 'https://www.amazon.com/s?k=%22Physician+Assistant+Acute+Care+Protocols+-+SIXTH+EDITION%22+%22Donald+Correll%22&i=stripbooks&crid=2O5EN22UO0T2C&sprefix=physician+assistant+acute+care+protocols+-+sixth+edition+donald+correll+%2Cstripbooks%2C297&ref=nb_sb_noss',
    features: [
      'Well-organized and easy to follow',
      'Treatment and diagnosis guidance',
      'Admission/discharge criteria',
      'Consultation guidelines',
      'Emergency department focused'
    ],
    edition: 'Paper'
  },
  {
    id: 'np-pg',
    title: 'Nurse Practitioner Practice Guide',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'A comprehensive practice guide that helps direct diagnosis, treatment and details criteria for either admission/discharge or further consultation. An important "go-to" text for day-to-day practice.',
    coverImage: '/images/np-pg_small.png?ver=2025-09',
    targetAudience: 'nurse-practitioners',
    amazonUrl: 'https://www.amazon.com/Nurse-Practitioner-Guide-Donald-Correll/dp/1737738988/ref=mp_s_a_1_1?crid=28VBTJPQXN8RS&dib=eyJ2IjoiMSJ9.7hef00Ew-kiR6lXtkdWS87e0D0LcM_1GUh5nA7qK-cAdAlQ4zl7cYND--mwI7Ge81ost08_voAI2o4JRiRInR8V7SXM9JCQRUm-ZoRDucw7dvBSGTmdVCm9SJ130KNt75WM_1aYW4Dco7pxsDbSnZqfSwUws__Nfu9Kw6WZnoqAzfm-VZYjCr50XbiUZGTadII5VQ0w78-S_Ad19sDU8EQ.20YVetcxc_P1DniXudPnHKqA2PIOJEfV7SxXZdNAQWA&dib_tag=se&keywords=nurse+practitioner+guide+donald+correll&qid=1758745440&sprefix=donald+correll+%2Caps%2C129&sr=8-1',
    features: [
      'Day-to-day practice guidance',
      'Readable font and format',
      'Memory jogging for unfamiliar subjects',
      'Quick in-and-out reference',
      'Discharge criteria focus'
    ],
    edition: 'Paper'
  },
  {
    id: 'pa-protocols-2025',
    title: 'Physician Assistant Protocols',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'This book comprises a compendium of practice guides created for physician assistants. Over 290 concise, fast-reading topics for physician assistants working in emergency medicine, urgent care and family practice. Covers cardiovascular, respiratory, endocrine, toxicology, neurology, musculoskeletal, gastrointestinal, general surgery, genitourinary disorders, electrolyte and acid/base disturbances, HEENT, trauma, pediatrics, geriatrics, gynecology, infectious disease, dermatology, hematology, psychiatric and social, environmental emergencies, and critical care, among others. The book provides differential diagnosis, pertinent clinical facts, and practice guidance in a bulleted outline format for improving patient care and safety.',
    coverImage: '/images/pa-protocols-2025.jpg?ver=2025-10',
    targetAudience: 'physician-assistants',
    amazonUrl: 'https://www.amazon.com/Physician-Assistant-Protocols-Emergency-Departments-ebook/dp/B0FBZ56BJW/ref=sr_1_1?crid=2STTEOURHIBFE&dib=eyJ2IjoiMSJ9.pSnJlTRT4S_hLL0L4ne6_8ArFzC7yH-p1zBMUvHDacG1lsP81xIF4GbPArnoG-HC890Hguz5jSt39KLU7AteBimsWgapCmt0idN9RvoAmTM.aJHD8XXC70RaBIgx4SPtkwBb638GGUKyAuFD42lBrN0&dib_tag=se&keywords=FACEP+Donald+Correll&qid=1751215199&s=books&sprefix=facepdonald+correll%2Cstripbooks%2C367&sr=1-1',
    googlePlayUrl: 'https://play.google.com/store/books/details/Donald_Correll_MD_FACEP_Physician_Assistant_Protoc?id=yMJoEQAAQBAJ&hl=en_US',
    payHipUrl: 'https://payhip.com/b/4ZjOR',
    appleUrl: 'https://books.apple.com/us/book/physician-assistant-protocols/id6751246941',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: 'eBook'
  },
  {
    id: 'pa-acp-dm-2025',
    title: 'Physician Assistant Acute Care Protocols and Disease Management',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'This eBook is a compendium of acute care protocols and disease management guides created for the Physician Assistant. Over 290 concise, fast-reading protocols and disease management sections for Physician Assistants working in family practice, urgent care, and emergency medicine. Covers cardiovascular, respiratory, endocrine, toxicology, neurology, musculoskeletal, gastrointestinal, genitourinary disorders, electrolyte and acid/base disturbances, HEENT, trauma, pediatrics, geriatrics, gynecology, infectious disease, dermatology, hematology, psychiatric and social, environmental, medications, and disease management, among others. Also includes an Acute Care Ultrasound Chapter. The book provides differential diagnosis, pertinent central clinical facts, and practice guidance in a bulleted outline format for the purpose of furthering the relationship between the Nurse Practitioner and the Physician and for improving patient care and safety.',
    coverImage: '/images/pa-acp-dm-2025.jpg',
    targetAudience: 'physician-assistants',
    amazonUrl: 'https://www.amazon.com/Physician-Assistant-Protocols-Disease-Management-ebook/dp/B0FBML85HZ/ref=sr_1_2?crid=2STTEOURHIBFE&dib=eyJ2IjoiMSJ9.pSnJlTRT4S_hLL0L4ne6_8ArFzC7yH-p1zBMUvHDacG1lsP81xIF4GbPArnoG-HC890Hguz5jSt39KLU7AteBimsWgapCmt0idN9RvoAmTM.aJHD8XXC70RaBIgx4SPtkwBb638GGUKyAuFD42lBrN0&dib_tag=se&keywords=FACEP+Donald+Correll&qid=1751215199&s=books&sprefix=facepdonald+correll%2Cstripbooks%2C367&sr=1-2',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: 'eBook'
  },
  {
    id: 'pa-ped-acp-2025',
    title: 'Physician Assistant Pediatric Acute Care Protocols',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'This book comprises a compendium of pediatric acute care protocols created for physician assistants. Concise, fast-reading topics for physician assistants working in emergency medicine, urgent care and family practice. The book provides differential diagnosis, pertinent clinical facts, and practice guidance in a bulleted outline format for improving patient care and safety.',
    coverImage: '/images/pa-ped-acp-2025.jpg',
    targetAudience: 'physician-assistants',
    amazonUrl: 'https://www.amazon.com/Physician-Assistant-Pediatric-Acute-Protocols-ebook/dp/B0FBKPB2PF/ref=sr_1_3?crid=2STTEOURHIBFE&dib=eyJ2IjoiMSJ9.pSnJlTRT4S_hLL0L4ne6_8ArFzC7yH-p1zBMUvHDacG1lsP81xIF4GbPArnoG-HC890Hguz5jSt39KLU7AteBimsWgapCmt0idN9RvoAmTM.aJHD8XXC70RaBIgx4SPtkwBb638GGUKyAuFD42lBrN0&dib_tag=se&keywords=FACEP+Donald+Correll&qid=1751216561&s=books&sprefix=facepdonald+correll%2Cstripbooks%2C367&sr=1-3',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: 'eBook'
  },
  {
    id: 'np-ped-acp-2025',
    title: 'Nurse Practitioner Pediatric Acute Care Protocols',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'This book comprises a compendium of pediatric acute care created for nurse practitioners. Concise, fast-reading topics for nurse practitioners working in emergency medicine, urgent care and family practice. Covers cardiovascular, respiratory, endocrine, toxicology, neurology, musculoskeletal, gastrointestinal, general surgery, genitourinary disorders, HEENT, trauma, pediatrics, infectious disease, dermatology, psychiatric and social, environmental emergencies, and critical care, among others. The book provides differential diagnosis, pertinent clinical facts, and practice guidance in a bulleted outline format for improving patient care and safety.',
    coverImage: '/images/np-ped-acp-2025.jpg',
    targetAudience: 'nurse-practitioners',
    amazonUrl: 'https://www.amazon.com/Nurse-Practitioner-Pediatric-Acute-Protocols-ebook/dp/B0FBKKJRMY/ref=sr_1_4?crid=2STTEOURHIBFE&dib=eyJ2IjoiMSJ9.pSnJlTRT4S_hLL0L4ne6_8ArFzC7yH-p1zBMUvHDacG1lsP81xIF4GbPArnoG-HC890Hguz5jSt39KLU7AteBimsWgapCmt0idN9RvoAmTM.aJHD8XXC70RaBIgx4SPtkwBb638GGUKyAuFD42lBrN0&dib_tag=se&keywords=FACEP+Donald+Correll&qid=1751216561&s=books&sprefix=facepdonald+correll%2Cstripbooks%2C367&sr=1-4',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: 'eBook'
  },
  {
    id: 'np-acp-dm-2025',
    title: 'Nurse Practitioner Acute Care Protocols and Disease Management',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'This is a compendium of acute care protocols and disease management guides created for the Nurse Practitioner. Over 290 concise, fast-reading protocols and disease management sections for Nurse Practitioners working in family practice, urgent care, and emergency medicine. Covers cardiovascular, respiratory, endocrine, toxicology, neurology, musculoskeletal, gastrointestinal, genitourinary disorders, electrolyte and acid/base disturbances, HEENT, trauma, pediatrics, geriatrics, gynecology, infectious disease, dermatology, hematology, psychiatric and social, environmental, medications, and disease management, among others. Also includes an Acute Care Ultrasound Chapter. The book provides differential diagnosis, pertinent central clinical facts, and practice guidance in a bulleted outline format, for the purpose of furthering the relationship between the Nurse Practitioner and the Physician and for improving patient care and safety.',
    coverImage: '/images/np-acp-dm-2025.jpg',
    targetAudience: 'nurse-practitioners',
    amazonUrl: 'https://www.amazon.com/Nurse-Practitioner-Protocols-Disease-Management-ebook/dp/B0FBKJ8F3X/ref=sr_1_5?crid=2STTEOURHIBFE&dib=eyJ2IjoiMSJ9.pSnJlTRT4S_hLL0L4ne6_8ArFzC7yH-p1zBMUvHDacG1lsP81xIF4GbPArnoG-HC890Hguz5jSt39KLU7AteBimsWgapCmt0idN9RvoAmTM.aJHD8XXC70RaBIgx4SPtkwBb638GGUKyAuFD42lBrN0&dib_tag=se&keywords=FACEP+Donald+Correll&qid=1751216561&s=books&sprefix=facepdonald+correll%2Cstripbooks%2C367&sr=1-5',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: 'eBook'
  },
  {
    id: 'ac-bedside-us-2025',
    title: 'Acute Care Bedside Ultrasound',
    subtitle: 'Made Simpler',
    description: 'These are some representative emergency department bedside ultrasounds performed by the author over a 10 year period. The ultrasounds presented are to assist the medical provider with an introduction to bedside acute ultrasound. They are limited and are not a replacement for formal in-depth complete ultrasounds performed by trained personnel and read by radiologist.',
    coverImage: '/images/ac-bedside-us-2025.jpg',
    targetAudience: 'both',
    amazonUrl: 'https://www.amazon.com/Acute-Care-Bedside-Ultrasound-Simpler-ebook/dp/B0FBJLG4GG/ref=sr_1_6?crid=2STTEOURHIBFE&dib=eyJ2IjoiMSJ9.pSnJlTRT4S_hLL0L4ne6_8ArFzC7yH-p1zBMUvHDacG1lsP81xIF4GbPArnoG-HC890Hguz5jSt39KLU7AteBimsWgapCmt0idN9RvoAmTM.aJHD8XXC70RaBIgx4SPtkwBb638GGUKyAuFD42lBrN0&dib_tag=se&keywords=FACEP+Donald+Correll&qid=1751216561&s=books&sprefix=facepdonald+correll%2Cstripbooks%2C367&sr=1-6',
    googlePlayUrl: 'https://play.google.com/store/books/details/Donald_Correll_MD_FACEP_Acute_Care_Bedside_Ultraso?id=CMNoEQAAQBAJ&hl=en_US',
    features: [
      'Introduction to bedside ultrasound',
      'Representative emergency department cases',
      'Not a replacement for formal ultrasound',
      'Educational resource for providers'
    ],
    edition: 'eBook'
  },
  {
    id: 'np-guide-2025',
    title: 'Nurse Practitioner Guide',
    subtitle: 'For Emergency Departments, Urgent Care Centers, and Family Practices',
    description: 'This book comprises a compendium of practice guides created for nurse practitioners. Over 290 concise, fast-reading topics for nurse practitioners working in emergency medicine, urgent care and family practice. Covers cardiovascular, respiratory, endocrine, toxicology, neurology, musculoskeletal, gastrointestinal, general surgery, genitourinary disorders, electrolyte and acid/base disturbances, HEENT, trauma, pediatrics, geriatrics, gynecology, infectious disease, dermatology, hematology, psychiatric and social, environmental emergencies, and critical care, among others. The book provides differential diagnosis, pertinent clinical facts, and practice guidance in a bulleted outline, double column format for improving patient care and safety.',
    coverImage: '/images/np-pg_small.jpg',
    targetAudience: 'nurse-practitioners',
    amazonUrl: 'https://www.amazon.com/Nurse-Practitioner-Guide-Emergency-Departments-ebook/dp/B0FBJ5PSTT/ref=sr_1_7?crid=2STTEOURHIBFE&dib=eyJ2IjoiMSJ9.pSnJlTRT4S_hLL0L4ne6_8ArFzC7yH-p1zBMUvHDacG1lsP81xIF4GbPArnoG-HC890Hguz5jSt39KLU7AteBimsWgapCmt0idN9RvoAmTM.aJHD8XXC70RaBIgx4SPtkwBb638GGUKyAuFD42lBrN0&dib_tag=se&keywords=FACEP+Donald+Correll&qid=1751216561&s=books&sprefix=facepdonald+correll%2Cstripbooks%2C367&sr=1-7',
    googlePlayUrl: 'https://play.google.com/store/books/details/Donald_Correll_MD_FACEP_Nurse_Practitioner_Guide?id=p71oEQAAQBAJ&hl=en_US',
    payHipUrl: 'https://payhip.com/b/dvJTC',
    appleUrl: 'https://books.apple.com/us/book/nurse-practitioner-guide/id6751246325',
    features: [
      'Bulleted outline format',
      'Evidence-based information',
      'Up-to-date clinical guidelines',
      'Quick reference guide',
      'Differential diagnosis guidance'
    ],
    edition: 'eBook'
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