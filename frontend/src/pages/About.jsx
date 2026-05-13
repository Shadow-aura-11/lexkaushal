import { motion } from 'framer-motion';
import { 
  Award, Target, BookOpen, CheckCircle2, GraduationCap, 
  History, Landmark, Scale, ShieldCheck, UserCheck
} from 'lucide-react';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const education = [
    { degree: "LL.M. (Master of Laws)", institution: "Chaudhary Charan Singh University", year: "Pursuing" },
    { degree: "B.A. LL.B. (Hons.)", institution: "Chaudhary Charan Singh University", year: "2025" }
  ];

  const milestones = [
    { year: "2023", title: "Senior Legal Counsel", desc: "Successfully defended multiple high-profile white-collar crime cases." },
    { year: "2019", title: "Independent Practice", desc: "Founded the law chambers with a focus on civil and criminal litigation." },
    { year: "2014", title: "Associate Advocate", desc: "Started career at a prestigious national law firm specializing in corporate law." }
  ];

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-navy-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="heading-primary text-white mb-4"
          >
            About Advocate Kaushal Pal
          </motion.h1>
          <p className="text-gold-500 font-poppins text-xl tracking-widest uppercase font-bold">Committed to Justice. Dedicated to You.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        
        {/* Main Biography Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
          <motion.div 
            {...fadeIn}
            className="lg:col-span-5 relative h-full"
          >
            <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden h-full min-h-[600px] border-8 border-white">
              <img 
                src="/images/image-1.jpeg" 
                alt="Advocate Kaushal Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://media.licdn.com/dms/image/v2/D5622AQEfbRCNMil3oQ/feedshare-shrink_480/B56Z0V0dUrJYAk-/0/1774187566626?e=1780531200&v=beta&t=e-nWped6voOLxuKXBu1z8vnEJIOkUooCMtnEYU9mcHg";
                }}
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 border-4 border-gold-500/20 -z-10 rounded-full"></div>
            <div className="absolute top-10 -right-10 w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 shadow-xl z-20">
              <ShieldCheck className="w-10 h-10" />
            </div>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="lg:col-span-7"
          >
            <h2 className="heading-secondary">A Legacy of Legal Excellence</h2>
            <h3 className="text-2xl font-poppins text-gold-600 mb-8 font-semibold italic">Expert Advocacy & Strategic Counsel</h3>
            
            <div className="space-y-6 text-gray-600 font-poppins text-lg leading-relaxed">
              <p>
                Advocate Kaushal Pal is a dedicated legal practitioner known for his strong courtroom representation, strategic legal approach, and commitment towards protecting the rights of his clients. His practice primarily focuses on Criminal Law, Family & Matrimonial Disputes, and Civil Matters, where he provides practical legal solutions with professionalism and integrity.
              </p>
              <p>
                He regularly handles matters related to bail, criminal trials, matrimonial disputes, divorce cases, domestic violence matters, maintenance, child custody, property disputes, and other civil litigation matters. With experience in court practice and client representation, Adv. Kaushal believes in thorough case preparation, transparent legal guidance, and result-oriented advocacy.
              </p>
              <p>
                Whether representing clients in sensitive family disputes or complex criminal proceedings, he works with dedication, confidentiality, and a client-first approach to ensure effective legal support at every stage of the matter.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              <div className="flex items-start bg-gray-50 p-6 rounded-xl border-l-4 border-gold-500">
                <UserCheck className="w-8 h-8 text-gold-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-playfair font-bold text-navy-900 text-xl">2+ Years</h4>
                  <p className="text-sm text-gray-500 font-poppins mt-1">Courtroom & Litigation Experience</p>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 p-6 rounded-xl border-l-4 border-gold-500">
                <Landmark className="w-8 h-8 text-gold-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-playfair font-bold text-navy-900 text-xl">Supreme Court</h4>
                  <p className="text-sm text-gray-500 font-poppins mt-1">Practicing in Supreme Court & Various Courts</p>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 p-6 rounded-xl border-l-4 border-gold-500">
                <ShieldCheck className="w-8 h-8 text-gold-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-playfair font-bold text-navy-900 text-xl">Core Areas</h4>
                  <p className="text-sm text-gray-500 font-poppins mt-1">Criminal, Civil & Family Law</p>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 p-6 rounded-xl border-l-4 border-gold-500">
                <Target className="w-8 h-8 text-gold-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-playfair font-bold text-navy-900 text-xl">Client-Centric</h4>
                  <p className="text-sm text-gray-500 font-poppins mt-1">Professional, Ethical & Dedicated</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education & Timeline Section - NEW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <motion.div {...fadeIn}>
            <div className="flex items-center space-x-4 mb-10">
              <GraduationCap className="w-10 h-10 text-gold-500" />
              <h2 className="text-4xl font-playfair font-bold text-navy-900">Education</h2>
            </div>
            <div className="space-y-8">
              {education.map((item, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-gray-100">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold-500"></div>
                  <h4 className="text-2xl font-playfair font-bold text-navy-900">{item.degree}</h4>
                  <p className="text-gold-600 font-poppins font-bold text-sm mb-2">{item.year}</p>
                  <p className="text-gray-500 font-poppins">{item.institution}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <div className="flex items-center space-x-4 mb-10">
              <Scale className="w-10 h-10 text-gold-500" />
              <h2 className="text-4xl font-playfair font-bold text-navy-900">Professional Values</h2>
            </div>
            <div className="space-y-6">
              {[
                { title: "Client Confidentiality", desc: "Ensuring absolute privacy and data protection for every legal matter." },
                { title: "Strategic Advocacy", desc: "Crafting customized legal pathways focused on successful outcomes." },
                { title: "Ethical Practice", desc: "Transparent dealings and strictly following the Bar Council norms." },
                { title: "Accessible Justice", desc: "Committed to making legal solutions practical and reachable." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gold-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-navy-900 font-playfair text-lg">{item.title}</h4>
                    <p className="text-gray-500 font-poppins text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Philosophy Section - NEW */}
        <motion.div 
          {...fadeIn}
          className="bg-navy-900 text-white rounded-3xl p-16 mb-32 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Scale className="w-16 h-16 text-gold-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8 italic text-white">"Justice is not a concept; it's a commitment."</h2>
            <p className="text-white text-xl font-poppins leading-relaxed mb-12 opacity-90">
              My philosophy is built on three pillars: Integrity, Strategy, and Compassion. I believe every client deserves not just a lawyer, but a dedicated advocate who will stand by them until the resolution is achieved.
            </p>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-gold-500 font-bold uppercase tracking-widest">Advocate Kaushal Pal</p>
          </div>
        </motion.div>

        {/* Professional Recognition */}
        <div className="bg-gray-50 p-16 rounded-3xl mb-32 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div {...fadeIn}>
              <div className="w-20 h-20 mx-auto bg-navy-900 text-gold-500 flex items-center justify-center rounded-2xl mb-8 transform rotate-3 hover:rotate-0 transition-transform">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-navy-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                To provide exceptional, ethical, and effective legal representation while ensuring that the justice system remains accessible.
              </p>
            </motion.div>
            
            <motion.div {...fadeIn}>
              <div className="w-20 h-20 mx-auto bg-navy-900 text-gold-500 flex items-center justify-center rounded-2xl mb-8 transform -rotate-3 hover:rotate-0 transition-transform">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-navy-900 mb-4">Our Philosophy</h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                We believe in proactive legal counsel. By anticipating challenges, we position our clients for the best possible outcomes.
              </p>
            </motion.div>

            <motion.div {...fadeIn}>
              <div className="w-20 h-20 mx-auto bg-navy-900 text-gold-500 flex items-center justify-center rounded-2xl mb-8 transform rotate-3 hover:rotate-0 transition-transform">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-navy-900 mb-4">Core Values</h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                Integrity, Confidentiality, and Diligence form the four pillars of our law practice.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
