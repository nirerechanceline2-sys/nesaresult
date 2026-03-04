/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  School, 
  FileText, 
  HelpCircle, 
  Mail, 
  Globe, 
  Menu, 
  X, 
  CheckCircle2, 
  Printer, 
  Search,
  Phone,
  MapPin,
  ExternalLink,
  Bell,
  Info,
  ShieldCheck,
  Database,
  MessageSquare,
  Newspaper,
  Download,
  Plus,
  Trash2,
  ChevronRight,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { Language, translations } from './constants';
import { RWANDA_DISTRICTS, COMBINATIONS, SCHOOLS } from './data';

type Page = 'home' | 'gususha' | 'results' | 'help' | 'contact';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [page, setPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowNav(true);
  }, [page]);

  const toggleLang = () => setLang(lang === 'en' ? 'rw' : 'en');

  const NavItem = ({ id, label, icon: Icon }: { id: Page; label: string; icon: any }) => (
    <button
      onClick={() => { setPage(id); setIsMenuOpen(false); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        page === id 
          ? 'bg-nesa-blue text-white shadow-md' 
          : 'text-gray-600 hover:bg-nesa-light-blue hover:text-nesa-blue'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fixed Navbar */}
      {showNav && (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-md py-4'
        }`}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
              <div className="w-10 h-10 bg-nesa-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <div>
                <h1 className="text-nesa-blue font-bold text-lg leading-tight">NESA</h1>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Student Portal</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              <NavItem id="home" label={t.nav.home} icon={Home} />
              <NavItem id="gususha" label={t.nav.gususha} icon={School} />
              <NavItem id="results" label={t.nav.results} icon={FileText} />
              <NavItem id="help" label={t.nav.help} icon={HelpCircle} />
              <NavItem id="contact" label={t.nav.contact} icon={Mail} />
              
              <div className="h-6 w-[1px] bg-gray-200 mx-2" />
              
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-nesa-blue text-nesa-blue hover:bg-nesa-blue hover:text-white transition-colors text-sm font-bold"
              >
                <Globe size={14} />
                {lang === 'en' ? 'Kinyarwanda' : 'English'}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-nesa-blue" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-2 md:hidden"
              >
                <NavItem id="home" label={t.nav.home} icon={Home} />
                <NavItem id="gususha" label={t.nav.gususha} icon={School} />
                <NavItem id="results" label={t.nav.results} icon={FileText} />
                <NavItem id="help" label={t.nav.help} icon={HelpCircle} />
                <NavItem id="contact" label={t.nav.contact} icon={Mail} />
                <button 
                  onClick={toggleLang}
                  className="mt-2 flex items-center justify-center gap-2 p-3 rounded-lg bg-nesa-light-blue text-nesa-blue font-bold"
                >
                  <Globe size={18} />
                  {lang === 'en' ? 'Kinyarwanda' : 'English'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* Main Content */}
      <main className={`flex-grow pb-12 ${showNav ? 'pt-24' : 'pt-6'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {page === 'home' && <HomePage t={t} setPage={setPage} />}
            {page === 'gususha' && <GusushaPage t={t} lang={lang} />}
            {page === 'results' && <ResultsPage t={t} setShowNav={setShowNav} />}
            {page === 'help' && <HelpPage t={t} />}
            {page === 'contact' && <ContactPage t={t} />}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-nesa-dark-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-nesa-blue font-bold text-xl">
                N
              </div>
              <h2 className="font-bold text-xl">NESA Rwanda</h2>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              National Examination and School Inspection Authority (NESA) is a government institution established in 2020 to ensure quality of education in basic education and TVET.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-blue-400/30 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => setPage('gususha')} className="hover:text-white transition-colors">School Selection</button></li>
              <li><button onClick={() => setPage('results')} className="hover:text-white transition-colors">Check Results</button></li>
              <li><button onClick={() => setPage('help')} className="hover:text-white transition-colors">Help Center</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-blue-400/30 pb-2">Contact Info</h3>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li className="flex items-center gap-3"><Phone size={16} /> +250 788 123 456</li>
              <li className="flex items-center gap-3"><Mail size={16} /> info@nesa.gov.rw</li>
              <li className="flex items-center gap-3"><MapPin size={16} /> Kigali, Rwanda</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-blue-400/20 text-center text-blue-200 text-xs">
          &copy; {new Date().getFullYear()} NESA Rwanda. All Rights Reserved. Official Government Portal.
        </div>
      </footer>
    </div>
  );
}

function HomePage({ t, setPage }: { t: any; setPage: (p: Page) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-20"
    >
      <section className="relative overflow-hidden rounded-3xl official-gradient text-white p-8 md:p-16 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{t.home.welcome}</h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            {t.home.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setPage('gususha')}
              className="bg-white text-nesa-blue px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-nesa-light-blue transition-all flex items-center gap-2"
            >
              <School size={20} />
              {t.home.ctaGususha}
            </button>
            <button 
              onClick={() => setPage('results')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <FileText size={20} />
              {t.home.ctaResults}
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nesa-light-blue text-nesa-blue text-xs font-bold uppercase tracking-wider">
            <Info size={14} />
            {t.home.aboutTitle}
          </div>
          <h3 className="text-3xl font-bold text-nesa-blue">{t.home.aboutTitle}</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t.home.aboutText}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nesa-light-blue p-4 rounded-2xl border border-blue-100">
              <p className="text-nesa-blue font-bold text-2xl">100%</p>
              <p className="text-gray-500 text-sm">Digital Placements</p>
            </div>
            <div className="bg-nesa-light-blue p-4 rounded-2xl border border-blue-100">
              <p className="text-nesa-blue font-bold text-2xl">30+</p>
              <p className="text-gray-500 text-sm">Districts Covered</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/education/800/600" 
            alt="Education" 
            className="rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
            <p className="text-nesa-blue font-bold text-lg">Official Portal</p>
            <p className="text-gray-500 text-sm">Rwanda Basic Education</p>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-nesa-dark-blue">{t.home.quickFeatures}</h3>
            <p className="text-gray-500">Access essential services quickly and securely</p>
          </div>
          <button 
            onClick={() => setPage('help')}
            className="text-nesa-blue font-bold text-sm hover:underline hidden md:block"
          >
            View All Services
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: School, label: t.home.feature1, color: 'bg-blue-500', action: () => setPage('gususha') },
            { icon: FileText, label: t.home.feature2, color: 'bg-emerald-500', action: () => setPage('results') },
            { icon: Database, label: t.home.feature3, color: 'bg-amber-500', action: () => setPage('gususha') },
            { icon: ShieldCheck, label: t.home.feature4, color: 'bg-indigo-500', action: () => setPage('help') },
            { icon: MessageSquare, label: t.home.feature5, color: 'bg-rose-500', action: () => setPage('contact') },
            { icon: Newspaper, label: t.home.feature6, color: 'bg-cyan-500', action: () => {} }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              onClick={feature.action}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 ${feature.color} text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <feature.icon size={24} />
              </div>
              <p className="font-bold text-gray-800 text-sm leading-tight">{feature.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-nesa-dark-blue flex items-center gap-2">
            <Bell className="text-nesa-blue" />
            {t.home.newsTitle}
          </h3>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-nesa-blue font-bold text-sm hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[t.home.news1, t.home.news2, t.home.news3].map((news, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-nesa-blue uppercase mb-2">Announcement</p>
              <p className="text-gray-700 font-medium leading-relaxed">{news}</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>March {idx + 1}, 2025</span>
                <span className="flex items-center gap-1 hover:text-nesa-blue cursor-pointer">Read More <ExternalLink size={12} /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-nesa-light-blue p-8 rounded-3xl border border-blue-100">
          <div className="w-14 h-14 bg-nesa-blue rounded-2xl flex items-center justify-center text-white mb-6">
            <School size={32} />
          </div>
          <h3 className="text-2xl font-bold text-nesa-blue mb-4">{t.home.gusushaTitle}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {t.home.gusushaDesc}
          </p>
          <button 
            onClick={() => setPage('gususha')}
            className="text-nesa-blue font-bold flex items-center gap-2 hover:underline"
          >
            {t.home.ctaGususha} <ExternalLink size={16} />
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="w-14 h-14 bg-nesa-dark-blue rounded-2xl flex items-center justify-center text-white mb-6">
            <FileText size={32} />
          </div>
          <h3 className="text-2xl font-bold text-nesa-dark-blue mb-4">{t.home.resultsTitle}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {t.home.resultsDesc}
          </p>
          <button 
            onClick={() => setPage('results')}
            className="text-nesa-dark-blue font-bold flex items-center gap-2 hover:underline"
          >
            {t.home.ctaResults} <ExternalLink size={16} />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function GusushaPage({ t, lang }: { t: any; lang: Language }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    prevSchool: '',
    district: '',
    sector: '',
    cell: '',
    year: '2025',
    level: 'P6',
    selectedSchools: [] as string[],
    combination: '',
    nationalId: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refNum, setRefNum] = useState('');
  const [expandedDistrict, setExpandedDistrict] = useState<string | null>(null);

  const filteredSchools = SCHOOLS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group schools by district
  const schoolsByDistrict = filteredSchools.reduce((acc, school) => {
    if (!acc[school.district]) acc[school.district] = [];
    acc[school.district].push(school);
    return acc;
  }, {} as Record<string, typeof SCHOOLS>);

  const toggleSchool = (schoolName: string) => {
    if (formData.selectedSchools.includes(schoolName)) {
      setFormData({
        ...formData,
        selectedSchools: formData.selectedSchools.filter(s => s !== schoolName)
      });
    } else if (formData.selectedSchools.length < 3) {
      setFormData({
        ...formData,
        selectedSchools: [...formData.selectedSchools, schoolName]
      });
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (['L5', 'S6'].includes(formData.level)) {
        setStep(3); // Skip school selection for L5/S6
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      if (formData.selectedSchools.length < 3) {
        alert(lang === 'en' ? 'Please select 3 schools.' : 'Mugomba guhitamo amashuri 3.');
      } else if (formData.level === 'S3') {
        setStep(3);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    let finalRef = '';
    if (['L5', 'S6'].includes(formData.level)) {
      if (!formData.nationalId || formData.nationalId.length < 16) {
        alert(lang === 'en' ? 'Please enter a valid 16-digit National ID.' : 'Mugomba kwandika indangamuntu yanyu yuzuye (imibare 16).');
        return;
      }
      finalRef = formData.nationalId;
    } else {
      finalRef = 'NESA-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    
    setRefNum(finalRef);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border-2 border-nesa-blue text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-nesa-blue mb-4">{t.gususha.success}</h2>
        <p className="text-gray-600 mb-8">
          {lang === 'en' ? 'Your school selection has been recorded. Please keep your reference number for future tracking.' : 'Guhitamo amashuri kwawe kwakiriwe. Mubike inomero yanyu y\'icyemezo kugira ngo muzayikoreshe mu gukurikirana.'}
        </p>
        <div className="bg-nesa-light-blue p-6 rounded-2xl mb-8">
          <p className="text-nesa-blue text-sm font-bold uppercase tracking-widest mb-2">
            {['L5', 'S6'].includes(formData.level) ? t.results.nationalId : t.gususha.refNumber}
          </p>
          <p className="text-4xl font-black text-nesa-dark-blue font-mono">{refNum}</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-nesa-blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-nesa-dark-blue transition-all"
        >
          <Printer size={20} />
          {t.results.print}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-nesa-blue mb-2">{t.gususha.title}</h2>
        <div className="flex gap-2">
          <div className={`h-2 flex-grow rounded-full transition-all ${step >= 1 ? 'bg-nesa-blue' : 'bg-gray-200'}`} />
          <div className={`h-2 flex-grow rounded-full transition-all ${step >= 2 ? 'bg-nesa-blue' : 'bg-gray-200'}`} />
          <div className={`h-2 flex-grow rounded-full transition-all ${step >= 3 ? 'bg-nesa-blue' : 'bg-gray-200'}`} />
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">{t.gususha.personalInfo}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.gususha.fullName}</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue focus:border-transparent outline-none"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.gususha.gender}</label>
                <select 
                  required
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male / Gabo</option>
                  <option value="F">Female / Gore</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.gususha.dob}</label>
                <input 
                  required
                  type="date" 
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                  value={formData.dob}
                  onChange={e => setFormData({...formData, dob: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.gususha.level}</label>
                <select 
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                  value={formData.level}
                  onChange={e => setFormData({...formData, level: e.target.value})}
                >
                  <option value="P6">{t.gususha.p6}</option>
                  <option value="S3">{t.gususha.s3}</option>
                  <option value="L5">{t.gususha.l5}</option>
                  <option value="S6">{t.gususha.s6}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.gususha.district}</label>
                <select 
                  required
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                  value={formData.district}
                  onChange={e => setFormData({...formData, district: e.target.value})}
                >
                  <option value="">Select District</option>
                  {RWANDA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{t.gususha.prevSchool}</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                  value={formData.prevSchool}
                  onChange={e => setFormData({...formData, prevSchool: e.target.value})}
                />
              </div>
            </div>
            <button 
              type="button"
              onClick={handleNext}
              className="w-full bg-nesa-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nesa-dark-blue transition-all"
            >
              Next Step / Gukomeza
            </button>
          </div>
        )}

        {step === 2 && !['L5', 'S6'].includes(formData.level) && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-bold text-gray-800">{t.gususha.schoolChoice}</h3>
              <span className="text-sm font-bold text-nesa-blue bg-nesa-light-blue px-3 py-1 rounded-full">
                {formData.selectedSchools.length} / 3 Selected
              </span>
            </div>

            {/* Selected Schools Summary */}
            {formData.selectedSchools.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                {formData.selectedSchools.map((school, idx) => (
                  <div key={school} className="bg-white px-3 py-1.5 rounded-lg border border-nesa-blue flex items-center gap-2 shadow-sm">
                    <span className="text-xs font-bold text-nesa-blue">{idx + 1}.</span>
                    <span className="text-sm font-medium text-gray-700">{school}</span>
                    <button 
                      type="button"
                      onClick={() => toggleSchool(school)}
                      className="text-gray-400 hover:text-rose-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Search Bar & List - Hidden if 3 selected */}
            {formData.selectedSchools.length < 3 ? (
              <>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder={t.gususha.searchPlaceholder}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                  {Object.entries(schoolsByDistrict).map(([district, schools]) => (
                    <div key={district} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setExpandedDistrict(expandedDistrict === district ? null : district)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-bold text-nesa-dark-blue flex items-center gap-2">
                          <MapPin size={16} className="text-nesa-blue" />
                          {district}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">{schools.length} schools</span>
                          {expandedDistrict === district ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </div>
                      </button>
                      
                      {expandedDistrict === district && (
                        <div className="grid gap-2 pl-2">
                          {schools.map(school => {
                            const isSelected = formData.selectedSchools.includes(school.name);
                            return (
                              <div 
                                key={school.name}
                                onClick={() => toggleSchool(school.name)}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                                  isSelected 
                                    ? 'bg-nesa-light-blue border-nesa-blue' 
                                    : 'bg-white border-gray-100 hover:border-nesa-blue/30'
                                }`}
                              >
                                <div>
                                  <p className="font-bold text-gray-800">{school.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {school.type === 'Internal' ? t.gususha.internal : t.gususha.external} • {school.district}
                                  </p>
                                </div>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                  isSelected ? 'bg-nesa-blue text-white' : 'border-2 border-gray-200 text-transparent'
                                }}`}>
                                  {isSelected ? <CheckCircle2 size={16} /> : <Plus size={16} className="text-gray-300" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                <p className="text-nesa-blue font-bold">You have selected your 3 schools. Click Next to continue.</p>
              </div>
            )}

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
              >
                Back / Subira inyuma
              </button>
              <button 
                type="button"
                onClick={handleNext}
                className="flex-[2] bg-nesa-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nesa-dark-blue transition-all"
              >
                Next Step / Gukomeza
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {['L5', 'S6'].includes(formData.level) ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">{t.results.nationalId}</h3>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t.results.nationalId}</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter 16-digit National ID"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                    value={formData.nationalId}
                    onChange={e => setFormData({...formData, nationalId: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
                  >
                    Back / Subira inyuma
                  </button>
                  <button 
                    type="button"
                    onClick={handleSubmit}
                    className="flex-[2] bg-nesa-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nesa-dark-blue transition-all"
                  >
                    {t.gususha.submit}
                  </button>
                </div>
              </div>
            ) : formData.level === 'S3' ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">{t.gususha.combination}</h3>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t.gususha.combination}</label>
                  <select 
                    required
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                    value={formData.combination}
                    onChange={e => setFormData({...formData, combination: e.target.value})}
                  >
                    <option value="">Select Combination/Trade</option>
                    {COMBINATIONS.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
                  >
                    Back / Subira inyuma
                  </button>
                  <button 
                    type="button"
                    onClick={handleSubmit}
                    className="flex-[2] bg-nesa-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nesa-dark-blue transition-all"
                  >
                    {t.gususha.submit}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </form>
    </motion.div>
  );
}

function ResultsPage({ t, setShowNav }: { t: any; setShowNav: (show: boolean) => void }) {
  const [level, setLevel] = useState('P6');
  const [idType, setIdType] = useState('index');
  const [idValue, setIdValue] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'search' | 'report'>('search');

  useEffect(() => {
    if (view === 'report') {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [view, setShowNav]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock search
    setTimeout(() => {
      setResult({
        name: 'MUGISHA Jean de Dieu',
        school: 'GS St Aloys Rwamagana',
        aggregate: level === 'P6' ? '6' : '12',
        division: 'Division 1',
        status: 'PROMOTED / WATSINZE',
        index: idValue || '0102030405',
        year: '2024'
      });
      setLoading(false);
      setView('report');
    }, 1000);
  };

  if (view === 'report' && result) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <button 
          onClick={() => setView('search')}
          className="flex items-center gap-2 text-nesa-blue font-bold hover:underline mb-4"
        >
          <ArrowLeft size={20} /> Back to Search / Gusubira inyuma
        </button>

        <div id="result-slip" className="bg-white p-8 md:p-12 rounded-3xl border-2 border-nesa-blue shadow-2xl relative overflow-hidden print:border-0 print:shadow-none print:p-0">
          {/* Watermark/Logo background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <div className="w-96 h-96 bg-nesa-blue rounded-full flex items-center justify-center text-white font-black text-9xl">N</div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 border-b-2 border-nesa-blue pb-8">
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-nesa-blue rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto md:mx-0 mb-4">N</div>
              <h3 className="text-2xl font-black text-nesa-dark-blue uppercase tracking-tighter">Republic of Rwanda</h3>
              <p className="text-nesa-blue font-bold text-sm">National Examination and School Inspection Authority</p>
            </div>
            <div className="text-center md:text-right">
              <h4 className="text-xl font-bold text-gray-800">{t.results.reportTitle}</h4>
              <p className="text-gray-500 font-mono text-sm">Ref: {result.index}/{result.year}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.results.studentName}</p>
                <p className="text-2xl font-bold text-gray-900">{result.name}</p>
              </div>
              <div>
                <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.results.indexNumber}</p>
                <p className="text-xl font-mono text-gray-700">{result.index}</p>
              </div>
              <div>
                <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.results.school}</p>
                <p className="text-lg font-bold text-gray-800">{result.school}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-nesa-light-blue p-6 rounded-3xl text-center border border-blue-100 shadow-inner">
                <p className="text-xs font-black text-nesa-blue uppercase mb-2">{t.results.aggregate}</p>
                <p className="text-5xl font-black text-nesa-dark-blue">{result.aggregate}</p>
              </div>
              <div className="bg-nesa-light-blue p-6 rounded-3xl text-center border border-blue-100 shadow-inner">
                <p className="text-xs font-black text-nesa-blue uppercase mb-2">{t.results.division}</p>
                <p className="text-2xl font-black text-nesa-dark-blue">{result.division}</p>
              </div>
              <div className="col-span-2 bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center justify-center gap-3">
                <CheckCircle2 className="text-green-600" size={24} />
                <span className="text-green-700 font-black uppercase tracking-wider">{result.status}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-300 text-xs font-bold">QR CODE</div>
              <p className="text-[10px] text-gray-400 max-w-[200px] leading-tight italic">
                This document is an official electronic result slip. Scan the QR code to verify its authenticity on the NESA portal.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Issued Date</p>
              <p className="font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => window.print()}
            className="bg-nesa-blue text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-nesa-dark-blue transition-all flex items-center gap-3"
          >
            <Download size={24} />
            Download Result Slip
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-white text-nesa-blue border-2 border-nesa-blue px-10 py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-nesa-light-blue transition-all flex items-center gap-3"
          >
            <Printer size={24} />
            {t.results.print}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-nesa-blue mb-2">{t.results.title}</h2>
        <p className="text-gray-500">Official National Examination Results Portal</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{t.results.level}</label>
              <select 
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                value={level}
                onChange={e => {
                  const val = e.target.value;
                  setLevel(val);
                  if (val === 'L5') setIdType('nid');
                  else setIdType('index');
                }}
              >
                <option value="P6">{t.results.p6}</option>
                <option value="S3">{t.results.s3}</option>
                <option value="L5">{t.results.l5}</option>
                <option value="S6">{t.results.s6}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{t.results.checkBy}</label>
              <select 
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                value={idType}
                onChange={e => setIdType(e.target.value)}
                disabled={level === 'L5'}
              >
                <option value="index">{t.results.indexNumber}</option>
                <option value="nid">{t.results.nationalId}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                {idType === 'index' ? t.results.indexNumber : t.results.nationalId}
              </label>
              <input 
                required
                type="text" 
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none"
                value={idValue}
                onChange={e => setIdValue(e.target.value)}
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-nesa-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nesa-dark-blue transition-all flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search size={20} />}
            {t.results.search}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function HelpPage({ t }: { t: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <h2 className="text-3xl font-bold text-nesa-blue">{t.help.title}</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-nesa-blue text-white rounded-xl flex items-center justify-center">
            <School size={24} />
          </div>
          <h3 className="text-xl font-bold text-nesa-blue">{t.help.gusushaSteps}</h3>
          <ol className="space-y-4 text-gray-600 list-decimal pl-4">
            <li>Go to the <strong>Gususha</strong> page from the menu.</li>
            <li>Fill in your personal details correctly (Names, Index Number, etc.).</li>
            <li>Select your current level (P6 or S3).</li>
            <li>Choose your top 3 preferred schools from the list.</li>
            <li>If you are in S3, select your preferred combination.</li>
            <li>Submit the form and save your reference number.</li>
          </ol>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-nesa-dark-blue text-white rounded-xl flex items-center justify-center">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-bold text-nesa-dark-blue">{t.help.resultsSteps}</h3>
          <ol className="space-y-4 text-gray-600 list-decimal pl-4">
            <li>Go to the <strong>Check Results</strong> page.</li>
            <li>Select your examination level (P6, S3, or L5).</li>
            <li>Choose whether to search by Index Number or National ID.</li>
            <li>Enter your correct identification number.</li>
            <li>Click <strong>Search Results</strong> to view your report.</li>
            <li>You can print your result report for your records.</li>
          </ol>
        </div>
      </div>

      <div className="bg-nesa-light-blue p-8 rounded-3xl text-center">
        <h3 className="text-xl font-bold text-nesa-blue mb-2">Still need help? / Ukeneye ubufasha buhagije?</h3>
        <p className="text-gray-600 mb-6">Contact our support team for any technical issues or inquiries.</p>
        <button className="bg-nesa-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-nesa-dark-blue transition-all">
          Call Support: 1122 (Toll Free)
        </button>
      </div>
    </motion.div>
  );
}

function ContactPage({ t }: { t: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8"
    >
      <div className="md:col-span-3 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <h2 className="text-3xl font-bold text-nesa-blue mb-6">{t.contact.title}</h2>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{t.contact.formName}</label>
              <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{t.contact.formEmail}</label>
              <input type="email" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">{t.contact.formMessage}</label>
            <textarea rows={5} className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-nesa-blue outline-none resize-none"></textarea>
          </div>
          <button className="w-full bg-nesa-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nesa-dark-blue transition-all">
            {t.contact.send}
          </button>
        </form>
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="bg-nesa-dark-blue text-white p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">{t.contact.info}</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-lg"><Phone size={20} /></div>
              <div>
                <p className="text-xs text-blue-300 font-bold uppercase">Phone</p>
                <p className="font-bold">+250 788 123 456</p>
                <p className="text-sm text-blue-200">Toll Free: 1122</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-lg"><Mail size={20} /></div>
              <div>
                <p className="text-xs text-blue-300 font-bold uppercase">Email</p>
                <p className="font-bold">info@nesa.gov.rw</p>
                <p className="text-sm text-blue-200">support@nesa.gov.rw</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-lg"><MapPin size={20} /></div>
              <div>
                <p className="text-xs text-blue-300 font-bold uppercase">Address</p>
                <p className="font-bold">Kigali City Tower, 12th Floor</p>
                <p className="text-sm text-blue-200">Kigali, Rwanda</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-nesa-light-blue p-6 rounded-3xl border border-blue-100">
          <h4 className="font-bold text-nesa-blue mb-2">Working Hours</h4>
          <p className="text-sm text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
          <p className="text-sm text-gray-600">Saturday - Sunday: Closed</p>
        </div>
      </div>
    </motion.div>
  );
}

