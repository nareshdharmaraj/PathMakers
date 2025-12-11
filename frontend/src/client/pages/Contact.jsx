import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', service: 'General Inquiry' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '', service: 'General Inquiry' });
        }, 2000);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-100"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-100"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Info Section */}
                    <div className="space-y-12">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">Let's Build the Future</h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                                Ready to transform your ideas into reality? Reach out and let's discuss how we can elevate your business.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            <ContactInfoItem icon={<Phone />} title="Phone" value="+1 (555) 123-4567" delay={0.1} />
                            <ContactInfoItem icon={<Mail />} title="Email" value="hello@pathmakers.tech" delay={0.2} />
                            <ContactInfoItem icon={<MapPin />} title="Headquarters" value="123 Innovation Dr, Tech Valley, CA" delay={0.3} />
                        </div>

                        {/* Map Placeholder with futuristic border */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="h-64 w-full rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 group"
                        >
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-slate-500 font-mono">
                                [ INTERACTIVE MAP MODULE LOADING... ]
                            </div>
                            {/* Simulated grid lines for map */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        </motion.div>
                    </div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <SpotlightCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 p-8 md:p-10" spotlightColor="rgba(59, 130, 246, 0.1)">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
                                <div className="w-2 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                                Send Message
                            </h3>

                            {isSuccess ? (
                                <div className="h-96 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-500 mb-6 animate-bounce">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Received!</h4>
                                    <p className="text-slate-600 dark:text-slate-400">We'll initiate communication protocols shortly.</p>
                                    <button onClick={() => setIsSuccess(false)} className="mt-8 text-blue-600 dark:text-blue-500 font-bold hover:underline">Send another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                                        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service of Interest</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Web Dev', 'App Dev', 'AI Solutions', 'Academic', 'Other'].map((opt) => (
                                                <button
                                                    type="button"
                                                    key={opt}
                                                    onClick={() => setFormData({ ...formData, service: opt })}
                                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all text-left ${formData.service === opt ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" />

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                                            placeholder="Tell us about your next big thing..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : <>Transmit <Send size={18} /></>}
                                    </button>
                                </form>
                            )}
                        </SpotlightCard>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

const ContactInfoItem = ({ icon, title, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="flex items-center gap-6"
    >
        <div className="w-14 h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 shadow-sm">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{value}</div>
        </div>
    </motion.div>
);

const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            placeholder={placeholder}
            required
        />
    </div>
);

export default Contact;
