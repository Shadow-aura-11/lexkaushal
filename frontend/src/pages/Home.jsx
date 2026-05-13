import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Scale, BookOpen, Award, ArrowRight, CheckCircle2,
  Users, Briefcase, Gavel, MessageSquare, HelpCircle, Star,
  Globe, Zap, Heart, TrendingUp
} from 'lucide-react';
import AnimatedScale from '../components/AnimatedScale';

const Home = () => {
  const [activeTextIdx, setActiveTextIdx] = useState(0);
  const heroTexts = ["Justice", "Advocacy", "Defense", "Resolve", "Integrity"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIdx((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const practiceAreas = [
    { title: 'Criminal Defense', icon: <Shield className="w-8 h-8" />, desc: 'Expert defense for all criminal charges, protecting your rights.' },
    { title: 'Civil Litigation', icon: <Scale className="w-8 h-8" />, desc: 'Resolving disputes with strategic and effective civil litigation.' },
    { title: 'Family Law', icon: <BookOpen className="w-8 h-8" />, desc: 'Compassionate handling of divorce, custody, and family disputes.' },
    { title: 'Cheque Bounce', icon: <TrendingUp className="w-8 h-8" />, desc: 'Legal recovery and litigation for NI Act Section 138 cases.' }
  ];

  const stats = [
    { label: 'Cases Won', value: '500+', icon: <Gavel className="w-6 h-6" /> },
    { label: 'Happy Clients', value: '1200+', icon: <Users className="w-6 h-6" /> },
    { label: 'Years Experience', value: '2+', icon: <Briefcase className="w-6 h-6" /> },
    { label: 'Consultations', value: '3500+', icon: <MessageSquare className="w-6 h-6" /> }
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Business Owner', text: 'Adv. Kaushal provided exceptional guidance during our corporate merger. Highly professional and result-oriented.', rating: 5 },
    { name: 'Priya Singh', role: 'Client', text: 'The way my family case was handled was very compassionate yet legally strong. I highly recommend his services.', rating: 5 },
    { name: 'Amit Verma', role: 'Property Developer', text: 'Meticulous attention to detail and great communication. A trustable legal partner for long-term needs.', rating: 5 }
  ];

  const faqs = [
    { q: 'What should I bring to my first consultation?', a: 'Please bring all relevant legal documents, ID proofs, and a brief summary of your situation for an effective assessment.' },
    { q: 'How do you charge for your services?', a: 'We offer competitive fee structures, including flat rates for specific services and hourly billing for litigation. This is discussed transparently during the first meeting.' },
    { q: 'Do you offer emergency legal support?', a: 'Yes, for urgent criminal or domestic matters, we provide immediate assistance. Please call our dedicated helpline.' }
  ];

  return (
    <div className="overflow-hidden bg-gray-50">
      {/* Hero Section with 3D Animation */}
      <section className="relative min-h-screen flex items-center justify-center bg-navy-900 overflow-hidden">
        {/* 3D Component */}
        <AnimatedScale />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1 }}
            className="text-gold-500 font-poppins font-semibold uppercase mb-6 tracking-[0.5em] text-sm md:text-base"
          >
            Advocate & Legal Consultant
          </motion.p>
          <motion.h1
            className="heading-primary text-white mb-8 text-5xl md:text-7xl lg:text-8xl flex flex-col items-center"
          >
            <span>The Shield Of</span>
            <div className="h-24 md:h-32 lg:h-40 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroTexts[activeTextIdx]}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-gold-500 italic block"
                >
                  {heroTexts[activeTextIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white opacity-90 text-lg md:text-2xl font-poppins font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Premium legal advocacy with a focus on integrity, strategic excellence, and measurable results. Your case is our priority.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-20"
          >
            <Link to="/contact" className="btn-primary px-10 py-4 text-lg">
              Book Private Consultation
            </Link>
            <Link to="/practice-areas" className="btn-outline border-white/30 text-white hover:bg-white hover:text-navy-900 px-10 py-4 text-lg">
              Explore Expertise
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-gold-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section - FIXED SPACING */}
      <section className="relative z-20 -mt-16 mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white glass-card p-8 md:p-10 rounded-xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b-4 border-gold-500 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="text-gold-500 mb-4 flex justify-center scale-125">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-playfair font-bold text-navy-900 mb-2">{stat.value}</div>
                <div className="text-gray-400 font-poppins text-xs uppercase tracking-[0.2em] font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Recognition */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-navy-900 font-playfair text-2xl font-bold tracking-tighter">BAR COUNCIL</div>
            <div className="text-navy-900 font-playfair text-2xl font-bold tracking-tighter italic">SUPREME COURT</div>
            <div className="text-navy-900 font-playfair text-2xl font-bold tracking-tighter">LEGAL 500</div>
            <div className="text-navy-900 font-playfair text-2xl font-bold tracking-tighter uppercase">Advocates Assoc.</div>
          </div>
        </div>
      </section>

      {/* Intro / About Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              {...fadeIn}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] h-full min-h-[500px]">
                <img
                  src="/images/image-1.jpeg"
                  alt="Advocate Kaushal Pal"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://media.licdn.com/dms/image/v2/D5622AQEfbRCNMil3oQ/feedshare-shrink_480/B56Z0V0dUrJYAk-/0/1774187566626?e=1780531200&v=beta&t=e-nWped6voOLxuKXBu1z8vnEJIOkUooCMtnEYU9mcHg&auto=format&fit=crop" }}
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-gold-500/5 rounded-2xl -z-10 border border-gold-500/10"></div>
              <div className="absolute top-1/2 -right-12 glass-card p-8 z-20 hidden md:block rounded-xl border-l-4 border-gold-500">
                <p className="font-playfair text-5xl font-bold text-navy-900 mb-1">2<span className="text-gold-500">+</span></p>
                <p className="font-poppins text-xs text-gold-600 font-bold uppercase tracking-widest">Professional<br />Excellence</p>
              </div>
            </motion.div>

            <motion.div {...fadeIn}>
              <h4 className="text-gold-500 font-poppins font-bold tracking-[0.3em] uppercase mb-4 text-sm">Professional Journey</h4>
              <h2 className="heading-secondary text-5xl leading-tight">Advocate Kaushal Pal: <br /><span className="text-gold-500">Expertise You Can Trust</span></h2>
              <div className="w-20 h-1.5 bg-gold-500 mb-8"></div>
              <p className="text-gray-600 text-lg mb-6 font-poppins leading-relaxed">
                With dedicated experience in handling Criminal Cases, Family & Matrimonial Disputes, and Civil Litigation, I am committed to providing practical legal solutions with professionalism and integrity.
              </p>
              <p className="text-gray-600 text-lg mb-10 font-poppins leading-relaxed">
                My approach focuses on strong legal strategy, client confidentiality, and personalized attention for every case.
              </p>

              <div className="space-y-4 mb-12">
                {[
                  'Expertise in Criminal Defense Cases',
                  'Family & Matrimonial Dispute Resolution',
                  'Civil Litigation & Legal Consultancy',
                  'Transparent & Ethical Legal Practice',
                  'Client-Focused Legal Support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="bg-gold-500/10 p-2 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-gold-500" />
                    </div>
                    <span className="text-navy-900 font-poppins font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-primary group">
                View Professional Bio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Workflow Section */}
      <section className="py-32 bg-navy-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h4 className="text-gold-500 font-poppins font-bold tracking-[0.3em] uppercase mb-4 text-sm">How We Work</h4>
            <h2 className="heading-secondary text-white text-5xl">The Path to Justice</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Personal meeting to understand the facts and legal nuances of your situation.' },
              { step: '02', title: 'Deep Analysis', desc: 'Meticulous review of evidence, precedents, and legal frameworks.' },
              { step: '03', title: 'Strategy', desc: 'Crafting a customized legal strategy focused on the best outcome.' },
              { step: '04', title: 'Representation', desc: 'Strong advocacy in court or at the negotiation table until resolution.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 bg-white/5 border border-white/10 rounded-2xl group hover:bg-gold-500 transition-all duration-500"
              >
                <div className="text-6xl font-playfair font-black text-white/10 group-hover:text-navy-900/20 absolute top-4 right-8 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-2xl font-playfair font-bold text-white group-hover:text-navy-900 mb-4 mt-8 relative z-10">{item.title}</h3>
                <p className="text-gray-400 group-hover:text-navy-900/80 font-poppins text-sm leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas - With 3D Tilt */}
      <section className="py-32 bg-gray-50 perspective-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-gold-500 font-poppins font-bold tracking-[0.3em] uppercase mb-4 text-sm">Specializations</h4>
            <h2 className="heading-secondary text-5xl">Legal Practice Areas</h2>
            <div className="w-20 h-1.5 bg-gold-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 rounded-2xl shadow-xl hover-tilt preserve-3d group cursor-pointer border border-gray-100"
              >
                <div className="w-16 h-16 bg-navy-900 text-gold-500 flex items-center justify-center rounded-xl mb-8 group-hover:scale-110 transition-transform duration-500">
                  {area.icon}
                </div>
                <h3 className="text-2xl font-playfair font-bold text-navy-900 mb-4">{area.title}</h3>
                <p className="text-gray-500 font-poppins text-sm leading-relaxed mb-8">{area.desc}</p>
                <Link to="/practice-areas" className="text-gold-600 font-bold font-poppins text-xs uppercase tracking-widest flex items-center group-hover:text-navy-900 transition-colors">
                  Details <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link to="/practice-areas" className="btn-outline border-navy-900/10 text-navy-900 hover:bg-navy-900 hover:text-white px-12">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section - MOVED HERE */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h4 className="text-gold-500 font-poppins font-bold tracking-[0.3em] uppercase mb-4 text-sm">Competitive Advantage</h4>
            <h2 className="heading-secondary text-5xl">Why Advocate Kaushal Pal?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 font-poppins">We combine traditional legal values with modern strategic thinking to deliver superior results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Globe className="w-10 h-10" />, title: "Pan-India Presence", desc: "Handling cases across District Courts, High Courts, and Tribunals nationwide." },
              { icon: <Zap className="w-10 h-10" />, title: "Fast-Track Strategy", desc: "Focused on resolving disputes efficiently without unnecessary delays." },
              { icon: <Heart className="w-10 h-10" />, title: "Client First Policy", desc: "Your peace of mind is our priority. We maintain 100% transparency." }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeIn} className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="bg-navy-900 text-gold-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-playfair font-bold text-navy-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 font-poppins text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h4 className="text-gold-500 font-poppins font-bold tracking-[0.3em] uppercase mb-4 text-sm">Testimonials</h4>
            <h2 className="heading-secondary text-white text-5xl">Voices of Success</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-colors"
              >
                <div className="flex space-x-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />)}
                </div>
                <p className="text-white opacity-90 italic mb-8 font-poppins leading-relaxed">"{t.text}"</p>
                <div>
                  <h5 className="text-white font-bold font-playfair text-xl">{t.name}</h5>
                  <p className="text-gold-500 text-sm font-poppins uppercase tracking-widest">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-gold-500 mx-auto mb-4" />
            <h2 className="heading-secondary text-4xl">Common Legal Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-b border-gray-100 pb-6"
              >
                <h4 className="font-playfair text-xl font-bold text-navy-900 mb-3">{faq.q}</h4>
                <p className="text-gray-600 font-poppins">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gold-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-navy-900 p-16 rounded-3xl text-center shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Ready to Resolve Your <br /><span className="text-gold-500">Legal Matters?</span></h2>
            <p className="text-gray-400 font-poppins text-xl max-w-2xl mx-auto mb-12">
              Join hundreds of satisfied clients who found justice with expert representation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="btn-primary px-12 py-5 text-xl">
                Schedule Now
              </Link>
              <a href="tel:+919520076046" className="btn-outline border-white/20 text-white hover:bg-white hover:text-navy-900 px-12 py-5 text-xl">
                Call: +91 95200 76046
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
