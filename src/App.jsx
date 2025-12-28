import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";


// === BASIC DATA ===
const resumeUrl = "/Maanya_S_Aithal_Software_Engineer_Resume.pdf";
const linkedinUrl = "https://www.linkedin.com/in/maanya-s-aithal04/";
const githubUrl = "https://github.com/Maa8nya";
const unstopUrl = "https://unstop.com/u/maanyait8831";

// photo URL 
const profilePhotoUrl = "/maanya.jpeg"; //  photo is in public folder

const skills = {
  Languages: ["C", "C++", "Java", "Python"],
  "Frontend": ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Framer Motion"],
  "Backend": ["Flask", "Django", "Node.js"],
  "Database": ["MySQL", "MongoDB"],
  "Developer Tools": ["GitHub", "VS Code", "Eclipse", "Figma", "Postman", "Firebase", "Netlify", "Vercel"],
  "Other": ["REST APIs", "Web Scraping (BeautifulSoup)", "Hugging Face Transformers", "NLP", "npm", "Vite"],
};

const projects = [
  {
    title: "AgriZen – Smart Agriculture Platform",
    description: "Farmer-focused web platform providing real-time crop prices, weather insights, and equipment sharing with multilingual UI and responsive design.",
    tech: ["Python", "Flask", "BeautifulSoup", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/Maa8nya/AgriZen",
    badge: "Smart Agriculture",
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "SheShines – Women Empowerment Platform",
    description: "Full-stack web application to support women with startup ideas, mentorship, and skill exchange. Includes AI chatbot using Hugging Face Transformers.",
    tech: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Hugging Face Transformers"],
    link: "https://github.com/Maa8nya/SheShines",
    badge: "Women in Tech",
    color: "from-purple-400 to-pink-500",
  },
  {
    title: "InfraWise – AI-Powered Construction Planning",
    description: "Smart construction planning platform using real-time weather and location data to analyse the soil quality and help clients connect with nearby contractors.",
    tech: ["Flask", "Firebase Firestore", "OpenWeather API", "OpenCage API"],
    link: null,
    badge: "Smart Infrastructure",
    color: "from-blue-400 to-cyan-500",
  },
];

const hackathons = [
  { title: "Global Rank 334 – Unstop", org: "Unstop", extra: "Competitive coding & hackathon participant", link: unstopUrl },
  { title: "Myntra HackerRamp: WeForShe 2024", org: "Myntra", extra: "Women-focused tech challenge", link: null },
  { title: "Flipkart GRiD 6.0 – Software Development Track", org: "Flipkart", extra: "Product engineering & SD", link: null },
  { title: "PixelFlow 2.0 – IIIT Bangalore", org: "IIIT Bangalore", extra: "Design & dev focused event", link: null },
  { title: "Web Dev Mastery Quiz – techSPARK", org: "techSPARK", extra: "Web development concepts", link: null },
];

// Updated certifications with your additions
const certifications = [
  "Fundamental AI Concepts – Microsoft",
  "Fundamentals of Generative AI – Microsoft",
  "Cybersecurity Training – Skill Vertex",
  "Git & GitHub Workshop – WsCube Tech",
  "Fundamentals of Docker & Kubernetes – Scaler",
  "AI for Students: Build Your Own Generative Model – NextWave",
  "ChatGPT & AI Tools Workshop – Be10X",
  "Exploring AI & Generative AI – NIE IEEE Student Branch",
];

const education = [
  {
    title: "B.E. in Computer Science & Design",
    place: "Mysore University School of Engineering, Mysuru",
    years: "2022 – 2026",
    detail: "Current: 7th Semester | CGPA: 9.864",
  },
  {
    title: "Pre-University – PCMB",
    place: "BGS Girls PU College",
    years: "2020 – 2022",
    detail: "Percentage: 93.5%",
  },
  {
    title: "Schooling",
    place: "Sri Adichunchanagiri Central School",
    years: "2008 – 2020",
    detail: "CGPA: 8.08",
  },
];

const languagesKnown = [
  "English – Full Professional Proficiency",
  "Hindi – Full Professional Proficiency",
  "Kannada – Full Professional Proficiency",
  "Telugu – Full Professional Proficiency",
];

// Custom animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Floating Particle Component
const FloatingParticle = ({ delay }) => (
  <motion.div
    className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
    initial={{ y: 0, x: 0 }}
    animate={{
      y: [0, -30, 0],
      x: [0, 10, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// Floating Tech Orb Component
const TechOrb = ({ x, y, size, color, delay }) => (
  <motion.div
    className="absolute rounded-full blur-xl opacity-20"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    }}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// Download resume function
const downloadResume = () => {
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'Maanya_S_Aithal_Software_Engineer_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Section wrapper with enhanced animations
const Section = ({ id, label, title, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section
      id={id}
      ref={ref}
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <TechOrb x="10%" y="20%" size="200px" color="#8b5cf6" delay={0} />
        <TechOrb x="80%" y="60%" size="150px" color="#3b82f6" delay={0.5} />
        <TechOrb x="30%" y="80%" size="120px" color="#06b6d4" delay={1} />
        <FloatingParticle delay={0} />
        <FloatingParticle delay={0.3} />
        <FloatingParticle delay={0.6} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-12 flex flex-col items-center gap-6"
          >
            <div className="relative inline-block">
              <span className="relative z-10 inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 px-6 py-2 text-sm font-medium uppercase tracking-[0.2em] text-white">
                {label}
              </span>
              <motion.div
                className="absolute inset-0 rounded-full blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <div className="relative">
              <motion.h2
                variants={fadeInUp}
                className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                  {title}
                </span>
              </motion.h2>
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const App = () => {
  const [theme, setTheme] = useState("dark");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.05]), {
    stiffness: 100,
    damping: 30
  });

  useEffect(() => {
    const stored = localStorage.getItem("maanya-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("maanya-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950 transition-all duration-500"
    >
      {/* Animated gradient background */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ scale }}
      >
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <SkillsSection />
          <ProjectsSection />
          <HackathonsSection />
          <CertificationsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

const Navbar = ({ theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section
      const sections = ["about", "skills", "projects", "hackathons", "certifications", "education", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#hackathons", label: "Hackathons" },
    { href: "#certifications", label: "Certifications" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3"
          >
            <div className="relative">
              <motion.div
                className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-bold text-white">MS</span>
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-2xl blur-md opacity-60 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                Maanya S Aithal
              </span>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300" />
            </div>
          </motion.a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div key={item.href} className="relative">
                <motion.a
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className={`relative text-sm font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                    layoutId="navbar-indicator"
                  />
                )}
              </motion.div>
            ))}
            
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              <motion.a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              
              <motion.button
                onClick={onToggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-16 h-8 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 shadow-inner"
              >
                <motion.div
                  layout
                  className="absolute top-1 w-6 h-6 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 shadow-lg"
                  animate={{ x: theme === "dark" ? 36 : 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  <span className="text-xs text-amber-500">☀️</span>
                  <span className="text-xs text-blue-300">🌙</span>
                </div>
              </motion.button>
            </motion.div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-slate-900/50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f0f0f0_1px,transparent_1px),linear-gradient(#f0f0f0_1px,transparent_1px)] bg-[size:50px_50px] opacity-10 dark:opacity-5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to full stack developer & software engineer roles
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="block text-slate-900 dark:text-slate-100">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Maanya S Aithal
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
            >
              Computer Science & Design Undergraduate · Full Stack Developer · React Specialist
              <span className="block text-lg mt-4 text-slate-500 dark:text-slate-400">
                Building digital experiences that combine elegant design with robust engineering.
              </span>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-white font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↗
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.button
                onClick={downloadResume}
                whileHover={{ y: -2 }}
                className="group rounded-xl border-2 border-slate-300 dark:border-slate-700 px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                Download Resume
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400"
            >
              <a href="mailto:maanya.s.aithal@gmail.com" className="group hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                📧 maanya.s.aithal@gmail.com
              </a>
              <span>📍 Mysuru, Karnataka</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRight}
            className="relative"
          >
            <div className="relative mx-auto h-96 w-96">
              {/* Animated gradient orb */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 30%, #8b5cf6, #3b82f6, #06b6d4)",
                    "radial-gradient(circle at 70% 70%, #06b6d4, #3b82f6, #8b5cf6)",
                    "radial-gradient(circle at 30% 30%, #8b5cf6, #3b82f6, #06b6d4)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Rotating tech elements */}
              {["React", "AI", "Dev", "Design"].map((text, i) => (
                <motion.div
                  key={text}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((i * Math.PI) / 2) * 120,
                    y: Math.sin((i * Math.PI) / 2) * 120,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <div className="rounded-full bg-white/10 backdrop-blur-sm p-3 shadow-lg">
                      <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {text}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Floating card with photo */}
              <motion.div
                className="absolute inset-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-center">
                  {/* Photo container */}
                  <div className="relative mx-auto w-36 h-36 mb-4">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-1"
                      animate={{
                        scale: [1, 1.03, 1]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          {!imageLoaded && (
                            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                          )}
                          <motion.img
                            src={profilePhotoUrl}
                            alt="Maanya S Aithal"
                            className={`w-full h-full object-cover rounded-full ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                            initial={{ scale: 0.8 }}
                            animate={imageLoaded ? { scale: 1 } : {}}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-white">9.864</div>
                    <div className="text-sm text-slate-200">CGPA</div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-200">
                    <p>7th Semester CSD</p>
                    <p>Full Stack Developer</p>
                  </div>
                  <motion.div
                    className="mt-6 inline-block rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <a href={githubUrl} className="text-sm font-semibold text-white">
                      Explore GitHub →
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
};

const SkillsSection = () => (
  <Section id="skills" label="Expertise" title="Technical Skills">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(skills).map(([category, items], index) => (
        <motion.div
          key={category}
          variants={scaleUp}
          className="group relative"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg" />
          <div className="relative p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {category}
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2" />
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-500/50 transition-all"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div
      variants={fadeInUp}
      className="mt-12 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 p-8 backdrop-blur-sm border border-white/20 dark:border-slate-700/50"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Language Proficiency</h4>
          <div className="space-y-4">
            {languagesKnown.map((lang, index) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">{lang}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Core Strengths</h4>
          <div className="space-y-3">
            {["Clean Code Architecture", "Responsive Design", "AI Integration", "Performance Optimization"].map((strength, index) => (
              <motion.div
                key={strength}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <span className="text-sm">✓</span>
                </div>
                <span className="text-slate-700 dark:text-slate-300">{strength}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </Section>
);

const ProjectsSection = () => (
  <Section id="projects" label="Portfolio" title="Featured Projects">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          variants={fadeInUp}
          className="group relative"
          whileHover={{ y: -10 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg" />
          <div className="relative p-6">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <span className="rounded-full bg-slate-900/10 dark:bg-slate-100/10 px-3 py-1 text-xs font-semibold text-slate-900 dark:text-white">
                  {project.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {project.description}
              </p>
            </div>
            
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-200/50 dark:bg-slate-800/50 px-2 py-1 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <motion.div
              className="flex items-center justify-between"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Stack Developer
              </span>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
                >
                  View Code
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↗
                  </motion.span>
                </a>
              ) : (
                <span className="text-slate-400 italic"></span>
              )}
            </motion.div>
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);

const HackathonsSection = () => (
  <Section id="hackathons" label="Achievements" title="Hackathons & Events">
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-cyan-500/20" />
      <div className="space-y-8 pl-12">
        {hackathons.map((event, index) => (
          <motion.div
            key={event.title}
            variants={fadeInUp}
            className="relative group"
            whileHover={{ x: 10 }}
          >
            <div className="absolute -left-16 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
              <span className="text-xs font-bold text-white">{index + 1}</span>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-r from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {event.title}
                </h3>
                <span className="rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {event.org}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {event.extra}
              </p>
              {event.link && (
                <motion.a
                  href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400"
                >
                  View Profile
                  <span>→</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const CertificationsSection = () => (
  <Section id="certifications" label="Credentials" title="Certifications">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <motion.div
          key={cert}
          variants={scaleUp}
          whileHover={{ scale: 1.02 }}
          className="group relative"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg" />
          <div className="relative p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                <span className="text-2xl">📜</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {cert}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

const EducationSection = () => (
  <Section id="education" label="Journey" title="Education Timeline">
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500" />
      <div className="space-y-12">
        {education.map((edu, index) => (
          <motion.div
            key={edu.title}
            variants={fadeInUp}
            className={`relative group ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2'}`}
          >
            <div className={`absolute top-6 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-xl"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-lg font-bold text-white">{edu.years.split('–')[0]}</span>
              </motion.div>
            </div>
            
            <div className={`rounded-2xl bg-gradient-to-br from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 p-6 shadow-lg ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {edu.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-3">
                {edu.place}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {edu.detail}
                </span>
                <span className="rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {edu.years}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 30, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className={`fixed bottom-6 right-6 z-50 rounded-xl px-6 py-4 shadow-xl text-white ${
      type === "success"
        ? "bg-gradient-to-r from-emerald-500 to-green-600"
        : "bg-gradient-to-r from-red-500 to-rose-600"
    }`}
  >
    <div className="flex items-center gap-3">
      <span className="text-xl">{type === "success" ? "✅" : "❌"}</span>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">
        ✕
      </button>
    </div>
  </motion.div>
);


const ContactSection = () =>{
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setToast({ type: "success", message: "Message sent successfully!" });
          e.target.reset();
        },
        () => {
          setToast({ type: "error", message: "Failed to send message. Try again!" });
        }
      )
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setToast(null), 4000);
      });
   };

  return (
  <Section id="contact" label="Connect" title="Let's Build Together">
    <div className="grid lg:grid-cols-2 gap-12">
      <motion.div
        variants={slideInLeft}
        className="relative"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10" />
        <div className="relative p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Get in Touch
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            I'm always excited to collaborate on innovative projects that make a difference. 
            Whether you have an idea, need a developer, or just want to connect, feel free to reach out!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                <a href="mailto:maanya.s.aithal@gmail.com" className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  maanya.s.aithal@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <svg
                className="w-7 h-7 fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>

              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">LinkedIn</p>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  linkedin.com/in/maanya-s-aithal04
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  Mysuru, Karnataka
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.05 }}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-center font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.05 }}
              className="flex-1 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-3 text-center font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            >
              GitHub
            </motion.a>
          </div>
        </div>
      </motion.div>
      
        <motion.form
          variants={slideInRight}
          onSubmit={handleSubmit}
          className="relative"
        >    
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50" />
        <div className="relative p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Send a Message
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                className="w-full rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Hello, I'd like to discuss..."
                required
              />
            </div>
            
            <motion.button
                type="submit"
                disabled={isSending}
                whileHover={!isSending ? { scale: 1.02 } : {}}
                whileTap={!isSending ? { scale: 0.98 } : {}}
                className={`w-full rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-xl transition-all
                  ${
                    isSending
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:shadow-2xl"
                  }`}
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.span
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              <AnimatePresence>
  {toast && (
    <Toast
      type={toast.type}
      message={toast.message}
      onClose={() => setToast(null)}
    />
  )}
</AnimatePresence>

          </div>
        </div>
      </motion.form>
    </div>
  </Section>
);
};

const Footer = () => (
  <footer className="relative border-t border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">MS</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Maanya S Aithal
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Crafting digital experiences with passion and precision
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <motion.a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </motion.a>
          <motion.button
            onClick={downloadResume}
            whileHover={{ y: -2 }}
            className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Resume
          </motion.button>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} Maanya S Aithal. Built with React, Tailwind & Framer Motion.
        </p>
      </div>
    </div>
  </footer>
);

export default App;