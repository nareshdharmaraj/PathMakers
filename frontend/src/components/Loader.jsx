import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Sparkles, Code2, Zap, Palette, Globe } from 'lucide-react';

const messages = [
    "Initializing quantum cores...",
    "Calibrating design vectors...",
    "Injecting neon plasma...",
    "Optimizing user happiness...",
    "Waking up the AI algorithms...",
    "Polishing every pixel...",
    "Almost there...",
    "Ready for launch!",
];

const Loader = ({ onComplete }) => {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        // Cycle messages every 700ms (Total ~5.6s for 8 messages)
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 700);

        // Complete after 6000ms
        const timeout = setTimeout(() => {
            onComplete();
        }, 6000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden font-sans"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 1 } }}
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-black"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Main Animation */}
                <div className="relative mb-16">
                    {/* Rotating Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute inset-0 border border-blue-500/30 rounded-full w-40 h-40 -top-8 -left-8"
                        style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
                    ></motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        className="absolute inset-0 border border-purple-500/30 rounded-full w-56 h-56 -top-16 -left-16"
                        style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent' }}
                    ></motion.div>

                    {/* Central Rocket */}
                    <motion.div
                        initial={{ y: 20, rotate: -45 }}
                        animate={{ y: [-10, 10, -10], rotate: -45 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="relative z-20"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.6)] backdrop-blur-md border border-white/20">
                            <Rocket size={48} className="text-white drop-shadow-md" />
                        </div>
                    </motion.div>

                    {/* Thrust Particles */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-10 h-32 bg-gradient-to-t from-transparent via-blue-500 to-cyan-400 blur-xl opacity-60 rounded-full -z-10 origin-top"
                        style={{ transform: 'translate(-50%, -50%) rotate(135deg) translateY(40px)' }}
                        animate={{ height: [100, 150, 100], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                    ></motion.div>
                </div>

                {/* Message */}
                <div className="h-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-xl tracking-wider uppercase">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={msgIndex}
                            initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            exit={{ opacity: 0, filter: "blur(5px)", y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            {messages[msgIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Advanced Progress Bar */}
                <div className="mt-10 w-80 h-1.5 bg-slate-900 rounded-full overflow-hidden relative border border-slate-800">
                    {/* Moving gradient background */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 5.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    ></motion.div>

                    {/* Scanline effect */}
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                    ></motion.div>
                </div>

                <div className="mt-2 text-xs text-slate-500 flex justify-between w-80 font-mono">
                    <span>LOADING ASSETS</span>
                    <span>{(msgIndex + 1) / messages.length * 100 > 100 ? 100 : Math.round((msgIndex + 1) / messages.length * 100)}%</span>
                </div>
            </div>

            {/* Floating Orbital Icons */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <OrbitingIcon icon={<Code2 />} duration={15} radius={300} angle={0} />
                <OrbitingIcon icon={<Sparkles />} duration={18} radius={350} angle={72} />
                <OrbitingIcon icon={<Zap />} duration={20} radius={250} angle={144} />
                <OrbitingIcon icon={<Palette />} duration={22} radius={380} angle={216} />
                <OrbitingIcon icon={<Globe />} duration={25} radius={320} angle={288} />
            </div>
        </motion.div>
    );
};

// Icon that actually orbits center
const OrbitingIcon = ({ icon, duration, radius, angle }) => (
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-0 h-0"
    >
        <div
            className="absolute text-slate-700/30 dark:text-slate-600/20"
            style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`
            }}
        >
            <motion.div
                animate={{ rotate: -360 }} // Counter-rotate to keep icon upright
                transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
            >
                {React.cloneElement(icon, { size: 24 })}
            </motion.div>
        </div>
    </motion.div>
);

export default Loader;
