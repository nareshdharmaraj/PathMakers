import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Target, Heart, Smile, Zap, Users, Shield, Code, Rocket, Star } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';

const About = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pt-24 pb-20 overflow-hidden relative transition-colors duration-300">
            {/* Background Noise & Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100 dark:from-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
                    >
                        We Are PathMakers
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        A digital powerhouse dedicated to transforming complex challenges into elegant, high-performance solutions.
                    </motion.p>
                </div>

                {/* Vision & Mission */}
                <div className="grid md:grid-cols-2 gap-6 mb-24">
                    <SpotlightCard className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 h-full" spotlightColor="rgba(59, 130, 246, 0.2)">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 h-full flex flex-col"
                        >
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                                <Target size={28} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed italic border-l-4 border-blue-500 pl-4 mb-4 bg-blue-50/50 dark:bg-blue-900/10 py-2 rounded-r-lg">
                                "To become a dependable digital partner for individuals, startups, and small businesses."
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed flex-grow">
                                We aim to build technology that genuinely helps people move forward, one step at a time.
                            </p>
                        </motion.div>
                    </SpotlightCard>

                    <SpotlightCard className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 h-full" spotlightColor="rgba(168, 85, 247, 0.2)">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 h-full flex flex-col"
                        >
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 shadow-sm">
                                <Heart size={28} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h2>
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed flex-grow">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                                    To provide clean, reliable, and affordable digital solutions.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                                    To understand every client’s idea deeply and turn it into a functional product.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                                    To keep learning, improving, and evolving as a team.
                                </li>
                            </ul>
                        </motion.div>
                    </SpotlightCard>
                </div>

                {/* Compact Story Section */}
                <div className="mb-24 relative max-w-5xl mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-pink-500/10 rounded-full blur-[80px] -z-10"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-none"
                    >
                        <div className="p-8 md:p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-black mb-8 inline-flex items-center gap-2 text-slate-900 dark:text-white">
                                <span className="text-pink-500">#</span> The Origin Story
                            </h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                                <p>“PathMakers began with five friends who shared one simple belief — <span className="text-slate-900 dark:text-white font-semibold">good work doesn’t need noise; it needs intention.</span></p>
                                <p>We started with curiosity, long conversations, small projects, and the excitement of creating something real.</p>
                                <p>We built PathMakers as a team that listens first and builds next.</p>
                                <p className="font-medium text-slate-900 dark:text-white">We’re not just delivering projects; we’re helping people move forward on their path.”</p>
                            </div>
                        </div>

                        {/* Compact Stats Bar */}
                        <div className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 p-6 md:p-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                                <StatBox value={23} label="Projects" suffix="+" icon={<Rocket size={20} />} color="text-blue-500" />
                                <StatBox value={98} label="Satisfaction" suffix="%" icon={<Star size={20} />} color="text-yellow-500" />
                                <StatBox value={10} label="Hardcore Devs" suffix="+" icon={<Code size={20} />} color="text-pink-500" />
                                <StatBox value={1} label="Experience" suffix="+ Years" icon={<Shield size={20} />} color="text-purple-500" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Meet the Minds</h2>
                    <p className="text-slate-600 dark:text-slate-400">The people behind the code.</p>
                </div>

                {/* Founder */}
                <div className="flex justify-center mb-12">
                    <div className="w-full max-w-sm">
                        <TeamMember
                            name="Naresh D"
                            role="Founder & Team Lead"
                            img="/assets/team/founder.jpg"
                            isFounder={true}
                        />
                    </div>
                </div>

                {/* Core Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <TeamMember name="Subash Shanmugam" role="Core Team" img="/assets/team/subash.jpeg" delay={0.1} />
                    <TeamMember name="Saravana Priyan ST" role="Core Team" img="/assets/team/SaravanaPriyan.png" delay={0.2} />
                    <TeamMember name="Sardheesh M" role="Core Team" img="/assets/team/Sardheesh.jpeg" delay={0.3} />
                    <TeamMember name="Ruthuvarshan E" role="Core Team" img="/assets/team/Ruthuvarshan.jpg" delay={0.4} />
                </div>

            </div>
        </div>
    );
};

// Animated Counter
const AnimatedCounter = ({ value, suffix = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });
    const spring = useSpring(0, { mass: 0.5, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (inView) spring.set(value);
    }, [inView, value, spring]);

    return (
        <span ref={ref} className="tabular-nums">
            <motion.span>{display}</motion.span>{suffix}
        </span>
    );
};

// Compact Stat Box
const StatBox = ({ value, label, suffix, icon, color }) => (
    <div className="flex flex-col items-center justify-center p-2">
        <div className={`mb-2 ${color} p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm`}>
            {icon}
        </div>
        <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-0.5">
            <AnimatedCounter value={value} suffix={suffix} />
        </div>
        <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">{label}</div>
    </div>
);

const TeamMember = ({ name, role, img, isFounder = false, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -8 }}
        className={`group relative rounded-3xl overflow-hidden cursor-pointer ${isFounder ? 'shadow-2xl shadow-blue-500/20' : 'shadow-lg hover:shadow-xl dark:shadow-none dark:bg-slate-900'}`}
    >
        <div className={`relative overflow-hidden aspect-[3/4] bg-slate-200 dark:bg-slate-800`}>
            {/* Image with Zoom Effect */}
            <img
                src={img}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isFounder ? 'from-blue-900/90' : 'from-slate-900/90'} via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity`}></div>

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className={`font-bold text-white mb-1 ${isFounder ? 'text-2xl' : 'text-lg'}`}>{name}</div>
                <div className={`text-sm font-medium ${isFounder ? 'text-blue-200' : 'text-slate-300'}`}>{role}</div>

                {/* Social Icons (Appear on Hover) */}
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 delay-100">
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white hover:text-black text-white transition-colors backdrop-blur-md">
                        <Smile size={16} />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white hover:text-black text-white transition-colors backdrop-blur-md">
                        <Zap size={16} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export default About;
