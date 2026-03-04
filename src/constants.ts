export type Language = 'en' | 'rw';

export interface Translation {
  nav: {
    home: string;
    gususha: string;
    results: string;
    help: string;
    contact: string;
  };
  home: {
    welcome: string;
    subtitle: string;
    aboutTitle: string;
    aboutText: string;
    quickFeatures: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    feature5: string;
    feature6: string;
    newsTitle: string;
    news1: string;
    news2: string;
    news3: string;
    gusushaTitle: string;
    gusushaDesc: string;
    resultsTitle: string;
    resultsDesc: string;
    ctaGususha: string;
    ctaResults: string;
  };
  gususha: {
    title: string;
    personalInfo: string;
    schoolChoice: string;
    fullName: string;
    gender: string;
    dob: string;
    prevSchool: string;
    district: string;
    sector: string;
    cell: string;
    year: string;
    level: string;
    p6: string;
    s3: string;
    l5: string;
    s6: string;
    choice1: string;
    choice2: string;
    choice3: string;
    combination: string;
    submit: string;
    success: string;
    refNumber: string;
    searchPlaceholder: string;
    internal: string;
    external: string;
  };
  results: {
    title: string;
    checkBy: string;
    indexNumber: string;
    nationalId: string;
    level: string;
    p6: string;
    s3: string;
    l5: string;
    s6: string;
    search: string;
    reportTitle: string;
    studentName: string;
    school: string;
    aggregate: string;
    division: string;
    status: string;
    print: string;
  };
  help: {
    title: string;
    gusushaSteps: string;
    resultsSteps: string;
  };
  contact: {
    title: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    send: string;
    info: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      gususha: 'Gususha',
      results: 'Check Results',
      help: 'Help',
      contact: 'Contact Us',
    },
    home: {
      welcome: 'Welcome to the NESA Student Portal',
      subtitle: 'Official platform for National Examination services in Rwanda.',
      aboutTitle: 'About NESA',
      aboutText: 'The National Examination and School Inspection Authority (NESA) is a government institution established to ensure quality of education in basic education and TVET. We manage national examinations, school inspections, and student placements across Rwanda. Our mission is to provide a fair, transparent, and efficient examination system that reflects the true potential of every student.',
      quickFeatures: 'Quick Services',
      feature1: 'Online Placement',
      feature2: 'Instant Results',
      feature3: 'School Database',
      feature4: 'Secure Portal',
      feature5: 'Help Desk',
      feature6: 'News & Updates',
      newsTitle: 'Important Updates',
      news1: 'S3 Placement Results for 2025 are now available.',
      news2: 'P6 School Selection deadline extended to March 15th.',
      news3: 'New TVET combinations added for the upcoming academic year.',
      gusushaTitle: 'School Selection (Gususha)',
      gusushaDesc: 'P6 and S3 students can select their preferred secondary schools and combinations for the next academic level.',
      resultsTitle: 'National Exam Results',
      resultsDesc: 'Access your official national examination results for P6, S3, and L5 (TTC/TVET) levels.',
      ctaGususha: 'Start Selection',
      ctaResults: 'Check Results',
    },
    gususha: {
      title: 'School Selection Form',
      personalInfo: 'Personal Information',
      schoolChoice: 'School Choices',
      fullName: 'Full Names',
      gender: 'Gender',
      dob: 'Date of Birth',
      prevSchool: 'Previous School',
      district: 'District',
      sector: 'Sector',
      cell: 'Cell',
      year: 'Year of Completion',
      level: 'Current Level',
      p6: 'Primary 6 (P6)',
      s3: 'Senior 3 (S3)',
      l5: 'Level 5 (L5)',
      s6: 'Senior 6 (S6)',
      choice1: 'First Choice School',
      choice2: 'Second Choice School',
      choice3: 'Third Choice School',
      combination: 'Preferred Combination/Trade',
      submit: 'Submit Selection',
      success: 'Selection Submitted Successfully!',
      refNumber: 'Reference Number',
      searchPlaceholder: 'Search school by name or district...',
      internal: 'Internal',
      external: 'External',
    },
    results: {
      title: 'Check National Exam Results',
      checkBy: 'Check by',
      indexNumber: 'Index Number',
      nationalId: 'National ID',
      level: 'Level',
      p6: 'Primary 6 (P6)',
      s3: 'Senior 3 (S3)',
      l5: 'Level 5 (L5)',
      s6: 'Senior 6 (S6)',
      search: 'Search Results',
      reportTitle: 'Official Result Report',
      studentName: 'Student Name',
      school: 'School',
      aggregate: 'Aggregate/Points',
      division: 'Division/Grade',
      status: 'Status',
      print: 'Print Result',
    },
    help: {
      title: 'Help & Support',
      gusushaSteps: 'How to use Gususha',
      resultsSteps: 'How to check results',
    },
    contact: {
      title: 'Contact Us',
      formName: 'Your Name',
      formEmail: 'Your Email',
      formMessage: 'Message',
      send: 'Send Message',
      info: 'Official Contact Details',
    },
  },
  rw: {
    nav: {
      home: 'Ahabanza',
      gususha: 'Gususha',
      results: 'Reba Amanota',
      help: 'Ubufasha',
      contact: 'Twandikire',
    },
    home: {
      welcome: 'Ikaze kuri Porutayo y\'Umunyeshuri ya NESA',
      subtitle: 'Urubuga rwemewe rwa serivisi z\'ibizamini bya Leta mu Rwanda.',
      aboutTitle: 'Ibyerekeye NESA',
      aboutText: 'Urwego rw\'Igihugu rushinzwe Ibizamini n\'Ubugenzuzi bw\'Amashuri (NESA) ni ikigo cya Leta cyashyizweho kugira ngo kigenzure ireme ry\'uburezi mu mashuri abanza, ayisumbuye n\'ay\'imyuga. NESA icunga ibizamini bya Leta, ubugenzuzi bw\'amashuri, no gushyira abanyeshuri mu mashuri mu Rwanda hose. Intego yacu ni ugutanga uburyo bwizewe kandi bunoze bwo gupima ubumenyi bw\'abanyeshuri.',
      quickFeatures: 'Serivisi zihuse',
      feature1: 'Gushyirwa mu mashuri',
      feature2: 'Amanota ako kanya',
      feature3: 'Amakuru y\'amashuri',
      feature4: 'Umutekano w\'amakuru',
      feature5: 'Ubufasha',
      feature6: 'Amakuru mashya',
      newsTitle: 'Amakuru n\'Imenyekanisha',
      news1: 'Ibyavuye mu gushyira abanyeshuri ba S3 mu mashuri byasohotse.',
      news2: 'Igihe ntarengwa cyo guhitamo amashuri kuri P6 cyongerewe kugeza ku itariki ya 15 Werurwe.',
      news3: 'Amashami mashya ya TVET yongerewe mu mwaka w\'amashuri utaha.',
      gusushaTitle: 'Guhitamo Amashuri (Gususha)',
      gusushaDesc: 'Abanyeshuri ba P6 na S3 bashobora guhitamo amashuri bifuza kwigaho mu kiciro gikurikiyeho.',
      resultsTitle: 'Amanota y\'Ibizamini bya Leta',
      resultsDesc: 'Reba amanota yawe y\'ibizamini bya Leta ku nzego za P6, S3, na L5 (TTC/TVET).',
      ctaGususha: 'Tangira Guhitamo',
      ctaResults: 'Reba Amanota',
    },
    gususha: {
      title: 'Ifishi yo Guhitamo Amashuri',
      personalInfo: 'Amakuru bwite',
      schoolChoice: 'Amashuri wahisemo',
      fullName: 'Amazina yose',
      gender: 'Igitsina',
      dob: 'Itariki y\'amavuko',
      prevSchool: 'Ishuri wigagaho',
      district: 'Akarere',
      sector: 'Umurenge',
      cell: 'Akagari',
      year: 'Umwaka wasorejemo',
      level: 'Urwego urimo',
      p6: 'Abasoreje Amashuri Abanza (P6)',
      s3: 'Abasoreje Icyiciro rusange (S3)',
      l5: 'Amashuri y\'imyuga/TTC (L5)',
      s6: 'Abasoreje Amashuri Yisumbuye (S6)',
      choice1: 'Ishuri rya mbere wahisemo',
      choice2: 'Ishuri rya kabiri wahisemo',
      choice3: 'Ishuri rya gatatu wahisemo',
      combination: 'Ishami wifuza kwigamo',
      submit: 'Ohereza amahitamo',
      success: 'Amahitamo yawe yakiriwe neza!',
      refNumber: 'Inomero y\'icyemezo',
      searchPlaceholder: 'Shaka ishuri ukoresheje izina cyangwa akarere...',
      internal: 'Imbere (Internal)',
      external: 'Hanze (External)',
    },
    results: {
      title: 'Reba Amanota y\'Ibizamini bya Leta',
      checkBy: 'Reba ukoresheje',
      indexNumber: 'Inomero y\'ikizamini',
      nationalId: 'Indangamuntu',
      level: 'Urwego',
      p6: 'Amashuri Abanza (P6)',
      s3: 'Icyiciro rusange (S3)',
      l5: 'Amashuri y\'imyuga/TTC (L5)',
      s6: 'Amashuri Yisumbuye (S6)',
      search: 'Shaka Amanota',
      reportTitle: 'Icyemezo cy\'amanota',
      studentName: 'Amazina y\'umunyeshuri',
      school: 'Ishuri',
      aggregate: 'Amanota yose',
      division: 'Icyiciro (Division)',
      status: 'Imiterere',
      print: 'Sohora amanota',
    },
    help: {
      title: 'Ubufasha',
      gusushaSteps: 'Uko wahitamo amashuri (Gususha)',
      resultsSteps: 'Uko wareba amanota yawe',
    },
    contact: {
      title: 'Twandikire',
      formName: 'Amazina yawe',
      formEmail: 'Imeri yawe',
      formMessage: 'Ubutumwa',
      send: 'Ohereza ubutumwa',
      info: 'Amakuru yo kutugeraho',
    },
  },
};
