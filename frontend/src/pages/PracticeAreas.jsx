import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Scale, BookOpen, Heart, AlertTriangle, Briefcase, FileText, ArrowRight } from 'lucide-react';

const PracticeAreas = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const areas = [
    { 
      title: 'Criminal Cases', 
      icon: <Shield className="w-10 h-10" />, 
      desc: 'Expert defense for all criminal charges. We protect your rights at every stage of the criminal justice process, from investigation through trial and appeals. Our strategic approach aims to achieve the best possible outcome for your specific situation.' 
    },
    { 
      title: 'Civil Cases', 
      icon: <Scale className="w-10 h-10" />, 
      desc: 'Comprehensive representation in civil litigation, including property disputes, breach of contract, injunctions, and tort claims. We provide strategic advocacy to protect your interests and secure favorable resolutions.' 
    },
    { 
      title: 'Family Law', 
      icon: <BookOpen className="w-10 h-10" />, 
      desc: 'Compassionate and dedicated legal support for child custody, alimony, partition suits, and family settlements. We handle sensitive family matters with the utmost confidentiality and care.' 
    },
    { 
      title: 'Marriage Cases', 
      icon: <Heart className="w-10 h-10" />, 
      desc: 'Specialized legal assistance in contested and mutual consent divorces, restitution of conjugal rights, and annulments. We aim to make difficult transitions as smooth as possible.' 
    },
    { 
      title: 'Domestic Violence', 
      icon: <AlertTriangle className="w-10 h-10" />, 
      desc: 'Urgent and decisive legal action under the Protection of Women from Domestic Violence Act. We prioritize your safety and fight for protection orders, residence rights, and maintenance.' 
    },
    { 
      title: 'Recovery Cases', 
      icon: <Briefcase className="w-10 h-10" />, 
      desc: 'Aggressive representation in civil recovery suits, summary suits, and commercial debt recovery. We employ effective legal strategies to recover your legitimate dues swiftly.' 
    },
    { 
      title: 'Cheque Bounce', 
      icon: <FileText className="w-10 h-10" />, 
      desc: 'Expert handling of cases under Section 138 of the Negotiable Instruments Act. We represent both complainants and accused with robust legal strategies to ensure justice is served.' 
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-navy-900 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="heading-primary text-white mb-4">Practice Areas</h1>
          <p className="text-gold-500 font-poppins text-lg">Comprehensive legal expertise across diverse areas of law</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 border border-gray-100 p-8 rounded-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gold-500 rounded-sm mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                {area.icon}
              </div>
              <h3 className="font-playfair text-2xl font-bold text-navy-900 mb-4">{area.title}</h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed mb-6">
                {area.desc}
              </p>
              <Link to="/contact" className="inline-flex items-center text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors group/link">
                Consult for {area.title} <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-navy-900 rounded-sm p-12 text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">Not sure which area covers your case?</h2>
            <p className="text-gray-300 font-poppins max-w-2xl mx-auto mb-8">
              Every legal situation is unique. Schedule a consultation to discuss the specifics of your case, and we will determine the best legal strategy for you.
            </p>
            <Link to="/contact" className="btn-primary">
              Book a Free Evaluation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeAreas;
