import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, BookOpen, Layers, BarChart, Cloud, Shield } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';

const services = [
    {
        icon: <Code size={40} />,
        title: "Web Development",
        desc: "From landing pages to complex web apps, we build responsive, accessible, and performant digital experiences using the latest modern stacks like React, Next.js, and Node.js.",
        color: "text-blue-600 dark:text-blue-400",
        gradient: "from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20"
    },
    {
        icon: <Smartphone size={40} />,
        title: "App Development",
        desc: "Native-quality mobile applications for iOS and Android. detailed UX/UI design, seamless API integration, and store deployment support.",
        color: "text-purple-600 dark:text-purple-400",
        gradient: "from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20"
    },
    {
        icon: <Brain size={40} />,
        title: "AI Solutions",
        desc: "Leverage the power of Artificial Intelligence. Custom chatbots, predictive models, and automation workflows that give your business a competitive edge.",
        color: "text-green-600 dark:text-green-400",
        gradient: "from-green-100 to-emerald-100 dark:from-green-500/20 dark:to-emerald-500/20"
    },
    {
        icon: <BookOpen size={40} />,
        title: "Academic Assistance",
        desc: "Comprehensive support for researchers and students. Data analysis, thesis structure guidance, and technical implementation of research projects.",
        color: "text-orange-600 dark:text-orange-400",
        gradient: "from-orange-100 to-yellow-100 dark:from-orange-500/20 dark:to-yellow-500/20"
    },
    {
        icon: <Cloud size={40} />,
        title: "Cloud Infrastructure",
        desc: "Scalable, secure, and cost-effective cloud architecture. AWS, Azure, and Google Cloud setup, migration, and management.",
        color: "text-sky-600 dark:text-sky-400",
        gradient: "from-sky-100 to-indigo-100 dark:from-sky-500/20 dark:to-indigo-500/20"
    },
    {
        icon: <Shield size={40} />,
        title: "Cyber Security",
        desc: "Protect your digital assets. Penetration testing, vulnerability assessments, and security protocol implementation.",
        color: "text-red-600 dark:text-red-400",
        gradient: "from-red-100 to-rose-100 dark:from-red-500/20 dark:to-rose-500/20"
    },
];

const Services = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pt-24 pb-20 transition-colors duration-300">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 dark:from-teal-400 dark:via-blue-500 dark:to-purple-500 mb-6"
                    >
                        Our Expertise
                    </motion.h1>
                    <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to your unique challenges.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} delay={index * 0.1} />
                    ))}
                </div>

                {/* Process Section */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">How We Work</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <ProcessStep num="01" title="Discovery" desc="Understanding your goals and requirements." />
                        <ProcessStep num="02" title="Strategy" desc="Planning the perfect roadmap for success." />
                        <ProcessStep num="03" title="Development" desc="Coding with precision and creativity." />
                        <ProcessStep num="04" title="Launch" desc="Deploying and optimizing for growth." />
                    </div>
                </div>

            </div>
        </div>
    );
};

const ServiceCard = ({ icon, title, desc, color, gradient, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
    >
        <SpotlightCard className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full" spotlightColor="rgba(59, 130, 246, 0.15)">
            <div className="p-8 h-full flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center ${color} mb-6 border border-slate-100 dark:border-white/5`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                    {desc}
                </p>
            </div>
        </SpotlightCard>
    </motion.div>
);

const ProcessStep = ({ num, title, desc }) => (
    <div className="relative pl-8 border-l border-slate-200 dark:border-slate-800">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600"></div>
        <div className="text-4xl font-black text-slate-300 dark:text-slate-800 mb-2">{num}</div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{desc}</p>
    </div>
);

export default Services;
