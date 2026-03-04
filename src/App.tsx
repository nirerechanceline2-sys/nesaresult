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
  ArrowLeft,
  Lock,
  Users,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { Language, translations } from './constants';
import { RWANDA_DISTRICTS, COMBINATIONS, SCHOOLS } from './data';

type Page = 'home' | 'gususha' | 'results' | 'help' | 'contact' | 'admin' | 'menu';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [page, setPage] = useState<Page>(() => {
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p') as Page;
    return (['home', 'gususha', 'results', 'help', 'contact', 'admin', 'menu'].includes(p) ? p : 'home');
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(page !== 'admin');

  const t = translations[lang];

  useEffect(() => {
    if (page === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.replaceState({}, '', '/admin');
      }
    } else {
      const params = new URLSearchParams(window.location.search);
      if (params.get('p') !== page) {
        params.set('p', page);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      }
    }
    setShowNav(page !== 'admin');
  }, [page]);

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
              <NavItem id="menu" label={t.nav.menu} icon={Menu} />
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
                <NavItem id="menu" label={t.nav.menu} icon={Menu} />
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
            {page === 'gususha' && <GusushaPage t={t} lang={lang} setShowNav={setShowNav} />}
            {page === 'results' && <ResultsPage t={t} setShowNav={setShowNav} />}
            {page === 'help' && <HelpPage t={t} />}
            {page === 'contact' && <ContactPage t={t} />}
            {page === 'admin' && <AdminPage t={t} />}
            {page === 'menu' && <MenuPage t={t} />}
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

function GusushaPage({ t, lang, setShowNav }: { t: any; lang: Language; setShowNav: (show: boolean) => void }) {
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

  useEffect(() => {
    if (submitted) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [submitted, setShowNav]);

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <button 
          onClick={() => setSubmitted(false)}
          className="flex items-center gap-2 text-nesa-blue font-bold hover:underline mb-4 print:hidden"
        >
          <ArrowLeft size={20} /> Back to Form / Gusubira inyuma
        </button>

        <div id="confirmation-slip" className="bg-white p-8 md:p-12 rounded-3xl border-2 border-nesa-blue shadow-2xl relative overflow-hidden print:border-0 print:shadow-none print:p-0">
          {/* Watermark */}
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
              <h4 className="text-xl font-bold text-gray-800 uppercase tracking-tight">School Selection Confirmation</h4>
              <p className="text-nesa-blue font-black text-lg font-mono mt-2">REF: {refNum}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.gususha.fullName}</p>
                <p className="text-2xl font-bold text-gray-900">{formData.fullName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.gususha.gender}</p>
                  <p className="text-lg font-bold text-gray-800">{formData.gender === 'M' ? 'Male' : 'Female'}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.gususha.dob}</p>
                  <p className="text-lg font-bold text-gray-800">{formData.dob}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.gususha.level}</p>
                <p className="text-lg font-bold text-gray-800">{formData.level}</p>
              </div>
              <div>
                <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.gususha.prevSchool}</p>
                <p className="text-lg font-bold text-gray-800">{formData.prevSchool} ({formData.district})</p>
              </div>
            </div>

            <div className="space-y-6">
              {!['L5', 'S6'].includes(formData.level) && (
                <div>
                  <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-3">{t.gususha.schoolChoice}</p>
                  <div className="space-y-2">
                    {formData.selectedSchools.map((school, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="w-6 h-6 bg-nesa-blue text-white rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                        <span className="font-bold text-gray-800">{school}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {formData.level === 'S3' && (
                <div>
                  <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.gususha.combination}</p>
                  <p className="text-lg font-bold text-gray-800">{formData.combination}</p>
                </div>
              )}

              {['L5', 'S6'].includes(formData.level) && (
                <div>
                  <p className="text-xs font-black text-nesa-blue uppercase tracking-widest mb-1">{t.results.nationalId}</p>
                  <p className="text-2xl font-black text-nesa-dark-blue font-mono">{formData.nationalId}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center justify-center gap-4 mb-12">
            <CheckCircle2 className="text-green-600" size={32} />
            <div>
              <p className="text-green-800 font-black uppercase tracking-wider leading-tight">{t.gususha.success}</p>
              <p className="text-green-600 text-sm font-medium">Your application has been successfully recorded.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-300 text-xs font-bold">QR VERIFY</div>
              <p className="text-[10px] text-gray-400 max-w-[200px] leading-tight italic">
                This is an official electronic confirmation of school selection. Authenticity can be verified using the reference number on the NESA portal.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Submission Date</p>
              <p className="font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 print:hidden">
          <button 
            onClick={() => window.print()}
            className="bg-nesa-blue text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-nesa-dark-blue transition-all flex items-center gap-3"
          >
            <Download size={24} />
            Download Confirmation PDF
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
                  if (['L5', 'S6'].includes(val)) setIdType('nid');
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
                disabled={['L5', 'S6'].includes(level)}
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

function MenuPage({ t }: { t: any }) {
  const menuItems = [
    { id: 'home', label: t.nav.home, icon: Home, desc: 'Return to the main dashboard' },
    { id: 'gususha', label: t.nav.gususha, icon: School, desc: 'Select your preferred schools' },
    { id: 'results', label: t.nav.results, icon: FileText, desc: 'Check your national exam results' },
    { id: 'help', label: t.nav.help, icon: HelpCircle, desc: 'Get help and support' },
    { id: 'contact', label: t.nav.contact, icon: Mail, desc: 'Contact the NESA team' },
  ];

  const handleReloadClick = (id: string) => {
    window.location.href = `/?p=${id}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-nesa-blue mb-4 uppercase tracking-tight">Portal Services</h2>
        <p className="text-gray-500 max-w-xl mx-auto">Access all NESA student services from this central menu. Clicking a service will reload the portal for a fresh session.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleReloadClick(item.id)}
            className="group relative bg-white p-8 rounded-[2rem] border-2 border-gray-100 hover:border-nesa-blue transition-all cursor-pointer shadow-sm hover:shadow-2xl overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-nesa-light-blue rounded-full opacity-0 group-hover:opacity-20 transition-all group-hover:scale-150" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-nesa-light-blue text-nesa-blue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-nesa-blue group-hover:text-white transition-colors">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-nesa-blue transition-colors">{item.label}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              
              <div className="mt-6 flex items-center gap-2 text-nesa-blue font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Launch Service <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-nesa-dark-blue rounded-[3rem] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Need immediate assistance?</h3>
            <p className="text-blue-100 opacity-80">Our support team is available 24/7 for technical issues.</p>
          </div>
          <button 
            onClick={() => handleReloadClick('contact')}
            className="bg-white text-nesa-dark-blue px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl"
          >
            Contact Support
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AdminPage({ t }: { t: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'schools' | 'results' | 'users' | 'settings'>('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid password / Ijambo ry\'ibanga ritaryo');
    }
  };

  if (!isLoggedIn) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-gray-50 flex items-center justify-center z-[100]"
      >
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-nesa-blue text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Lock size={32} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-nesa-blue">{t.admin.loginTitle}</h2>
            <p className="text-gray-500 text-sm">Access restricted to authorized personnel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{t.admin.passwordLabel}</label>
              <input 
                type="password" 
                className={`w-full p-3 rounded-xl border ${error ? 'border-rose-500' : 'border-gray-300'} focus:ring-2 focus:ring-nesa-blue outline-none transition-all`}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
              />
              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-nesa-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nesa-dark-blue transition-all shadow-lg"
            >
              {t.admin.loginButton}
            </button>
          </form>
          <div className="text-center pt-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="text-gray-400 text-sm hover:text-nesa-blue transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft size={14} /> Return to Public Portal
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const SidebarItem = ({ id, label, icon: Icon }: { id: typeof activeTab; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? 'bg-nesa-blue text-white shadow-lg' 
          : 'text-gray-400 hover:bg-blue-50 hover:text-nesa-blue'
      }`}
    >
      <Icon size={20} />
      <span className="font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gray-50 flex z-[100]"
    >
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-nesa-blue rounded-xl flex items-center justify-center text-white font-bold text-xl">N</div>
          <div>
            <h1 className="text-nesa-blue font-black text-lg leading-tight">ADMIN</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">NESA Portal</p>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          <SidebarItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <SidebarItem id="students" label="Students" icon={Users} />
          <SidebarItem id="schools" label="Schools" icon={School} />
          <SidebarItem id="results" label="Results" icon={FileText} />
          <SidebarItem id="users" label="Staff/Users" icon={ShieldCheck} />
          <SidebarItem id="settings" label="Settings" icon={Settings} />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all"
          >
            <X size={20} />
            <span className="font-bold text-sm">{t.admin.logout}</span>
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-grow overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-nesa-dark-blue capitalize">{activeTab}</h2>
            <p className="text-gray-400 text-sm">National Examination & School Inspection Authority</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-800">Administrator</p>
              <p className="text-xs text-nesa-blue">Super Admin Access</p>
            </div>
            <div className="w-12 h-12 bg-nesa-light-blue rounded-full border-2 border-white shadow-sm flex items-center justify-center text-nesa-blue font-bold">
              AD
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Total Submissions', value: '1,284', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'P6 Students', value: '842', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'S3 Students', value: '442', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Pending Reviews', value: '12', icon: Bell, color: 'text-rose-600', bg: 'bg-rose-50' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <LayoutDashboard size={20} className="text-nesa-blue" />
                    {t.admin.submissionsTitle}
                  </h3>
                  <button className="text-nesa-blue text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-bold">Student Name</th>
                        <th className="px-6 py-4 font-bold">Level</th>
                        <th className="px-6 py-4 font-bold">District</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { name: 'MUGISHA Jean', level: 'P6', district: 'Huye', status: 'Verified' },
                        { name: 'UWASE Marie', level: 'S3', district: 'Kicukiro', status: 'Pending' },
                        { name: 'KEZA Alice', level: 'S6', district: 'Rubavu', status: 'Verified' },
                        { name: 'GISA Eric', level: 'L5', district: 'Musanze', status: 'Verified' },
                        { name: 'IRADUKUNDA Bertin', level: 'P6', district: 'Gasabo', status: 'Pending' },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-800">{row.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{row.level}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{row.district}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                              row.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-nesa-blue hover:text-nesa-dark-blue"><Settings size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-nesa-dark-blue text-white p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck size={24} />
                    System Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-200">Database</span>
                      <span className="font-bold text-green-400">Online</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-200">API Gateway</span>
                      <span className="font-bold text-green-400">Stable</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-200">Server Load</span>
                      <span className="font-bold text-amber-400">Normal (24%)</span>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-bold transition-all">
                    Run Diagnostics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center space-y-4">
            <Users size={48} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800">Student Management Module</h3>
            <p className="text-gray-500 max-w-md mx-auto">Manage all student applications, edit profiles, and verify submitted documents from this module.</p>
            <button className="bg-nesa-blue text-white px-6 py-2 rounded-xl font-bold">Load Student Data</button>
          </div>
        )}

        {activeTab === 'schools' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center space-y-4">
            <School size={48} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800">School Registry Module</h3>
            <p className="text-gray-500 max-w-md mx-auto">Update the list of secondary schools, TVET centers, and TTCs available for student selection.</p>
            <button className="bg-nesa-blue text-white px-6 py-2 rounded-xl font-bold">Manage Schools</button>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center space-y-4">
            <FileText size={48} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800">Results Management Module</h3>
            <p className="text-gray-500 max-w-md mx-auto">Upload national examination results, generate result slips, and manage grade distributions.</p>
            <button className="bg-nesa-blue text-white px-6 py-2 rounded-xl font-bold">Upload Results (CSV)</button>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center space-y-4">
            <ShieldCheck size={48} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800">Staff & Permissions Module</h3>
            <p className="text-gray-500 max-w-md mx-auto">Manage administrative users, assign roles (Super Admin, Editor, Viewer), and review audit logs.</p>
            <button className="bg-nesa-blue text-white px-6 py-2 rounded-xl font-bold">Manage Staff</button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center space-y-4">
            <Settings size={48} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800">System Settings</h3>
            <p className="text-gray-500 max-w-md mx-auto">Configure portal deadlines, maintenance mode, and global notification settings.</p>
            <button className="bg-nesa-blue text-white px-6 py-2 rounded-xl font-bold">Save Configuration</button>
          </div>
        )}
      </main>
    </motion.div>
  );
}

