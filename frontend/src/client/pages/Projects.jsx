import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ExternalLink, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../../components/ui/SpotlightCard';

const categories = ['All', 'Web Development', 'App Development', 'AI Solutions'];

const projects = [
    {
        id: 1,
        title: "E-Commerce Giant",
        category: "Web Development",
        rating: 5,
        status: "Completed",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A full-scale e-commerce platform handling 10k+ daily transactions with real-time inventory.",
        tech: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 2,
        title: "HealthTrack Mobile",
        category: "App Development",
        rating: 5,
        status: "Completed",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Cross-platform mobile application for patient monitoring and telemedicine consultations.",
        tech: ["Flutter", "Firebase", "WebRTC"]
    },
    {
        id: 3,
        title: "Smart Logistics AI",
        category: "AI Solutions",
        rating: 4.8,
        status: "Ongoing",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Machine learning model optimizing route planning and fleet management.",
        tech: ["Python", "TensorFlow", "AWS"]
    },
    {
        id: 4,
        title: "Portfolio Plus",
        category: "Web Development",
        rating: 5,
        status: "Completed",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A highly animated portfolio template for creative professionals.",
        tech: ["Next.js", "Framer Motion", "Tailwind"]
    },
    {
        id: 5,
        title: "FitLife Pro",
        category: "App Development",
        rating: 4.9,
        status: "Completed",
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fitness tracking app with social features and workout plans.",
        tech: ["React Native", "GraphQL", "PostgreSQL"]
    },
    {
        id: 6,
        title: "Crypto Dashboard",
        category: "Web Development",
        rating: 5,
        status: "Completed",
        image: "https://images.unsplash.com/photo-1621504450168-b8c437542052?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Real-time cryptocurrency tracking dashboard with predictive analytics.",
        tech: ["Vue.js", "D3.js", "Socket.io"]
    },
];

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 text-slate-900 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white"
                    >
                        Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">Masterpieces</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 dark:text-slate-400"
                    >
                        Case studies of innovation and excellence.
                    </motion.p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === cat
                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SpotlightCard className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full flex flex-col group" spotlightColor="rgba(59, 130, 246, 0.15)">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                            <Link to="/contact" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"><ArrowRight size={24} /></Link>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10">
                                            {project.status}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{project.category}</span>
                                            <div className="flex gap-0.5 text-yellow-500 dark:text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < Math.floor(project.rating) ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto">
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-white/5">{t}</span>
                                                ))}
                                            </div>

                                            <Link
                                                to={`/contact?subject=I want a project like ${project.title}`}
                                                className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold hover:bg-blue-600 dark:hover:bg-blue-200 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                                            >
                                                Book Similar Project <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;
