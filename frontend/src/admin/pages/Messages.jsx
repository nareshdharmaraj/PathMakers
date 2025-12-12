import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Mail, Phone, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/messages`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={32} /></div>;

    return (
        <div className="p-6 md:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Messages ({messages.length})</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {messages.length === 0 ? (
                    <div className="col-span-full text-center text-slate-400 py-20">No messages yet.</div>
                ) : (
                    messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${msg.status === 'New' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-500'}`}>
                                    {msg.status}
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 line-clamp-1">{msg.subject || 'No Subject'}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {(JSON.parse(msg.services || '[]') || []).map((s, i) => (
                                    <span key={i} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                                        {s}
                                    </span>
                                ))}
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                                {msg.message}
                            </p>

                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                                        {msg.name.charAt(0)}
                                    </div>
                                    {msg.name}
                                </div>
                                <div className="flex flex-col gap-1 pl-10 text-xs text-slate-500">
                                    <div className="flex items-center gap-2"><Phone size={12} /> {msg.phone}</div>
                                    {msg.email && <div className="flex items-center gap-2"><Mail size={12} /> {msg.email}</div>}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Messages;
