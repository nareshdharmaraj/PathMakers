import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Brain, BookOpen, Star, Zap, Globe, Cpu, ChevronDown, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../../components/ui/SpotlightCard';

const Landing = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotateS = useSpring(useTransform(scrollY, [0, 1000], [0, 360]), { stiffness: 50, damping: 20 });

    return (
        <div className="overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-300">

            {/* --- HERO SECTION V3 --- */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
                {/* Deep Space Background / Light Cloud Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-slate-50 dark:from-blue-900/20 dark:via-slate-950 dark:to-black"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-multiply dark:mix-blend-normal"></div>
                    {/* Animated Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                </div>

                <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Next-Gen Platform
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1] text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-white dark:to-slate-500">
                            REDEFINE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500">POSSIBILITY</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed border-l-2 border-blue-500/30 pl-6">
                            We architect digital ecosystems. Merging artistic vision with engineering precision to build the impossible.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <Link to="/contact" className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center gap-2">Start Project <ArrowRight size={20} className="group-hover:rotate-45 transition-transform" /></span>
                            </Link>
                            <Link to="/projects" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-900 dark:text-white font-bold text-lg rounded-full transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                                Explore Work
                            </Link>
                        </div>
                    </motion.div>

                    {/* Interactive Visuals */}
                    <div className="relative h-[600px] hidden lg:block perspective-1000">
                        <motion.div style={{ y: y1, rotateZ: rotateS }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/20 to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-[100px] animate-pulse-slow"></motion.div>

                        {/* Floating Orbitals */}
                        <motion.div style={{ y: y2 }} className="absolute inset-0 z-20">
                            {/* Center Core */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                                <div className="w-56 h-56 rounded-full border border-dashed border-slate-300 dark:border-slate-600 animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Globe size={64} className="text-blue-600 dark:text-blue-500 animate-pulse" />
                                </div>
                            </div>

                            {/* Satellite Cards */}
                            <FloatingCard delay={0} x="-30%" y="20%" icon={<Code />} title="Clean Code" color="text-green-600 dark:text-green-400" bg="bg-white/80 dark:bg-green-500/10" border="border-green-500/20" />
                            <FloatingCard delay={1} x="80%" y="-10%" icon={<Brain />} title="AI Core" color="text-purple-600 dark:text-purple-400" bg="bg-white/80 dark:bg-purple-500/10" border="border-purple-500/20" />
                            <FloatingCard delay={2} x="60%" y="60%" icon={<Smartphone />} title="Mobile First" color="text-pink-600 dark:text-pink-400" bg="bg-white/80 dark:bg-pink-500/10" border="border-pink-500/20" />
                            <FloatingCard delay={1.5} x="-10%" y="70%" icon={<Zap />} title="Fast Perf" color="text-yellow-600 dark:text-yellow-400" bg="bg-white/80 dark:bg-yellow-500/10" border="border-yellow-500/20" />
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 2, repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 flex flex-col items-center gap-2"
                >
                    <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
                    <ChevronDown size={20} />
                </motion.div>
            </section>

            {/* --- STATISTICS SECTION --- */}
            <section className="border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatItem value="23" label="Projects" suffix="+" icon={<Cpu />} />
                        <StatItem value="98" label="Satisfaction" suffix="%" icon={<Star />} />
                        <StatItem value="10" label="Hardcore Devs" suffix="+" icon={<UsersIcon />} />
                        <StatItem value="12" label="Awards Won" suffix="" icon={<TrophyIcon />} />
                    </div>
                </div>
            </section>

            {/* --- SERVICES SPOTLIGHT --- */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">Hyper-Scale Services</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ServiceSpotlight
                            icon={<Code size={32} />}
                            title="Web Development"
                            desc="Responsive, blazing fast web apps built with React, Next.js, and modern tools."
                        />
                        <ServiceSpotlight
                            icon={<Smartphone size={32} />}
                            title="App Development"
                            desc="Native feeling iOS and Android apps using React Native and Flutter."
                        />
                        <ServiceSpotlight
                            icon={<Brain size={32} />}
                            title="AI Solutions"
                            desc="LLM integration, predictive analytics, and process automation bots."
                        />
                        <ServiceSpotlight
                            icon={<BookOpen size={32} />}
                            title="Academic Edge"
                            desc="Thesis consultancy, research support, and technical tutoring."
                        />
                    </div>
                </div>
            </section>

            {/* --- FEATURED PROJECTS --- */}
            <section className="py-32 bg-slate-100 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Featured Work</h2>
                            <p className="text-slate-600 dark:text-slate-400">Selected projects that define our standard.</p>
                        </div>
                        <Link to="/projects" className="text-slate-900 dark:text-white border-b border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pb-1 flex items-center gap-2">View All <ArrowRight size={16} /></Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <FeaturedProject
                            image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            title="Retro Tech Hub"
                            cat="Web Development"
                        />
                        <FeaturedProject
                            image="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            title="Neon Mobile App"
                            cat="App Development"
                        />
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-purple-600 dark:text-purple-500 font-bold tracking-widest uppercase text-sm mb-2 block">Client Voices</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Trusted by Visionaries</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="PathMakers didn't just build an app; they engineered a masterpiece. The attention to detail is unlike anything I've seen."
                            author="Elena Rostova"
                            role="CEO, Nexus Dynamics"
                            delay={0}
                        />
                        <TestimonialCard
                            quote="Their team operates at a different frequency. The AI integration they built saved us 40% in operational costs within month one."
                            author="Marcus Thorne"
                            role="CTO, CyberFlow"
                            delay={0.2}
                        />
                        <TestimonialCard
                            quote="Aesthetics meet performance. The website they delivered is blazing fast and looks like it's from 2030."
                            author="Sarah Jenkins"
                            role="Founder, ArtStream"
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-600/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/50 dark:from-blue-500/20 via-transparent to-transparent"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8">READY TO LAUNCH?</h2>
                    <Link to="/contact" className="px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xl rounded-full hover:scale-110 transition-transform shadow-[0_0_40px_rgba(59,130,246,0.5)] dark:shadow-[0_0_40px_rgba(255,255,255,0.3)] inline-block">
                        Ignite Your Project
                    </Link>
                </div>
            </section>
        </div>
    );
};

const FloatingCard = ({ delay, x, y, icon, title, color, bg, border }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
        transition={{ delay, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute px-4 py-3 rounded-xl backdrop-blur-md border shadow-lg flex items-center gap-3 ${bg} ${border} ${color}`}
        style={{ left: x, top: y }}
    >
        {icon}
        <span className="font-bold whitespace-nowrap text-slate-800 dark:text-white">{title}</span>
    </motion.div>
);

const StatItem = ({ value, label, suffix, icon }) => (
    <div className="flex items-center gap-4">
        <div className="p-3 bg-white dark:bg-white/5 rounded-xl text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/10 shadow-sm">
            {icon}
        </div>
        <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}<span className="text-blue-600 dark:text-blue-500">{suffix}</span></div>
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</div>
        </div>
    </div>
);

const ServiceSpotlight = ({ icon, title, desc }) => (
    <SpotlightCard className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" spotlightColor="rgba(59, 130, 246, 0.2)">
        <div className="p-8 h-full flex flex-col items-start relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform shadow-sm">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {desc}
            </p>
            <Link to="/services" className="mt-auto pt-6 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                Learn More <ArrowRight size={16} />
            </Link>
        </div>
    </SpotlightCard>
);

const FeaturedProject = ({ image, title, cat }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="group relative rounded-3xl overflow-hidden aspect-video cursor-pointer"
    >
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 p-8">
            <span className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2 block">{cat}</span>
            <h3 className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">{title}</h3>
        </div>
    </motion.div>
)

const UsersIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
)

const TrophyIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
)

const TestimonialCard = ({ quote, author, role, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        <SpotlightCard className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" spotlightColor="rgba(168, 85, 247, 0.15)">
            <div className="p-8 h-full flex flex-col relative z-10">
                <div className="mb-6 text-purple-500 dark:text-purple-400">
                    <Quote size={40} className="fill-current opacity-20 transform rotate-180" />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed italic mb-8 flex-grow">
                    "{quote}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {author.charAt(0)}
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 dark:text-white">{author}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">{role}</div>
                    </div>
                </div>
            </div>
        </SpotlightCard>
    </motion.div>
);

export default Landing;
