import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award, Zap, Smile } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';

const About = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pt-24 pb-20 overflow-hidden relative transition-colors duration-300">
            {/* Background Noise & Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100 dark:from-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
                    >
                        We Are PathMakers
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        A collective of visionaries, engineers, and artists redefining the digital landscape.
                    </motion.p>
                </div>

                {/* Vision & Mission */}
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    <SpotlightCard className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800" spotlightColor="rgba(59, 130, 246, 0.15)">
                        <div className="p-10 h-full">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6">
                                <Target size={32} />
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                To be the catalyst for the next generation of digital innovation, creating systems that feel less like software and more like magic.
                            </p>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800" spotlightColor="rgba(168, 85, 247, 0.15)">
                        <div className="p-10 h-full">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-500 mb-6">
                                <Heart size={32} />
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Empowering businesses with intelligent, scalable, and stunning digital solutions that drive real-world impact and growth.
                            </p>
                        </div>
                    </SpotlightCard>
                </div>

                {/* Story Section */}
                <div className="mb-32 relative">
                    <div className="absolute -left-20 -top-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-xl dark:shadow-none"
                    >
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                                <span className="text-pink-500">#</span> The Origin Story
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
                                Born from a hackathon project that refused to stay small, PathMakers began as a trio of developers obsessed with performance and aesthetics.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Today, we are a global team delivering enterprise-grade solutions, yet we retain that startup spirit—fast, agile, and always pushing boundaries.
                            </p>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <StatBox value="5+" label="Years" />
                            <StatBox value="50+" label="Experts" />
                            <StatBox value="200+" label="Clients" />
                            <StatBox value="∞" label="Ideas" />
                        </div>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Meet the Minds</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <TeamMember
                        name="Alex Rivera"
                        role="Founder & CEO"
                        img="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    />
                    <TeamMember
                        name="Sarah Chen"
                        role="Lead Architect"
                        img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    />
                    <TeamMember
                        name="Marcus Johnson"
                        role="Creative Director"
                        img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    />
                </div>

            </div>
        </div>
    );
};

const StatBox = ({ value, label }) => (
    <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center hover:bg-white dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
);

const TeamMember = ({ name, role, img }) => (
    <motion.div
        whileHover={{ y: -10 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative"
    >
        <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-4 shadow-lg">
            <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2 mb-2">
                        <button className="bg-white text-black p-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors"><Smile size={16} /></button>
                        <button className="bg-white text-black p-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors"><Zap size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h3>
        <p className="text-slate-500">{role}</p>
    </motion.div>
);

export default About;
