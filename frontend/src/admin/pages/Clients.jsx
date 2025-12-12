import React, { useEffect, useState } from 'react';
import { Loader2, Search, Phone, Mail, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../utils/api';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedClient, setExpandedClient] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/clients`, {
                headers: { 'x-auth-token': token }
            });
            if (res.ok) setClients(await res.json());
        } catch (err) {
            console.error("Failed to fetch clients", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (clientId) => {
        setExpandedClient(expandedClient === clientId ? null : clientId);
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.phone && c.phone.includes(searchQuery)) ||
        (c.email && c.email.toLowerCase().includes(searchQuery))
    );

    if (loading) return <div className="h-full flex items-center justify-center min-h-[500px]"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Client Directory</h1>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-800 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                        placeholder="Search name, phone..."
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                            <th className="p-6">Client Name</th>
                            <th className="p-6 hidden md:table-cell">Contact Info</th>
                            <th className="p-6 text-center">Projects</th>
                            <th className="p-6 text-right">Financials</th>
                            <th className="p-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredClients.map((client) => (
                            <React.Fragment key={client.id}>
                                <tr className="hover:bg-slate-50/50 transition-colors bg-white group">
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-slate-800 text-lg">{client.name}</div>
                                        <div className="md:hidden text-xs text-slate-500 mt-1">
                                            {client.phone} <br /> {client.email}
                                        </div>
                                    </td>
                                    <td className="p-6 hidden md:table-cell align-top text-sm">
                                        <div className="flex items-center gap-2 text-slate-600 mb-1"><Phone size={14} /> {client.phone || 'N/A'}</div>
                                        <div className="flex items-center gap-2 text-slate-600"><Mail size={14} /> {client.email || 'N/A'}</div>
                                    </td>
                                    <td className="p-6 text-center align-top">
                                        <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold text-sm border border-indigo-100">
                                            {client.project_count}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right align-top">
                                        <div className="text-emerald-600 font-bold">₹{parseFloat(client.total_paid || 0).toLocaleString()} <span className="text-[10px] uppercase text-emerald-400">Paid</span></div>
                                        <div className="text-red-500 font-bold text-sm">₹{parseFloat(client.total_due || 0).toLocaleString()} <span className="text-[10px] uppercase text-red-300">Due</span></div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => toggleExpand(client.id)}
                                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                        >
                                            {expandedClient === client.id ? <ChevronUp /> : <ChevronDown />}
                                        </button>
                                    </td>
                                </tr>
                                <AnimatePresence>
                                    {expandedClient === client.id && (
                                        <tr>
                                            <td colSpan="5" className="p-0 border-b border-slate-100 bg-slate-50/50">
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="p-6 pl-12"
                                                >
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Project History</h4>
                                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                        {client.projects.map(proj => (
                                                            <div key={proj.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div className="font-mono text-xs font-bold text-indigo-500">{proj.unique_id}</div>
                                                                    <div className="text-[10px] uppercase font-bold text-slate-400">{proj.status}</div>
                                                                </div>
                                                                <div className="flex justify-between text-sm mt-3 pt-3 border-t border-slate-100">
                                                                    <div>
                                                                        <span className="text-[10px] text-slate-400 block uppercase">Fixed</span>
                                                                        <span className="font-bold text-slate-700">₹{parseFloat(proj.price_fixed || 0).toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span className="text-[10px] text-slate-400 block uppercase">Received</span>
                                                                        <span className="font-bold text-emerald-600">₹{parseFloat(proj.amount_received || 0).toLocaleString()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                {filteredClients.length === 0 && (
                    <div className="p-12 text-center text-slate-400 italic">No clients found matching "{searchQuery}"</div>
                )}
            </div>
        </div>
    );
};

export default Clients;
