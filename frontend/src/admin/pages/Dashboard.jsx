import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, Activity, Loader2, TrendingUp, CreditCard, Database } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { API_URL } from '../../utils/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_URL}/admin/stats`, {
                    headers: { 'x-auth-token': token }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleExportDatabase = () => {
        // Trigger file download
        window.location.href = `${API_URL}/admin/export-db`;
    };

    if (loading) {
        return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
    }

    const statCards = [
        { title: "Total Requests", value: stats?.totalRequests || 0, icon: <FileText className="text-blue-600" />, color: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-100" },
        { title: "Active Projects", value: stats?.activeProjects || 0, icon: <Activity className="text-purple-600" />, color: "from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-100" },
        { title: "Team Members", value: stats?.activeEmployees || 0, icon: <Users className="text-green-600" />, color: "from-green-500/10 to-green-500/5 text-green-600 border-green-100" },
        { title: "Net Earnings", value: `₹${((stats?.financials?.client?.received || 0) - (stats?.financials?.employee?.paid || 0)).toLocaleString()}`, icon: <TrendingUp className="text-emerald-600" />, color: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-100" },
    ];

    // Calculations for Graphs
    const clientFixed = stats?.financials?.client?.fixed || 0;
    const clientReceived = stats?.financials?.client?.received || 0;
    const clientProgress = clientFixed > 0 ? (clientReceived / clientFixed) * 100 : 0;

    const empPaid = stats?.financials?.employee?.paid || 0;
    const empPending = stats?.financials?.employee?.pending || 0;
    const empTotal = empPaid + empPending;
    const empProgress = empTotal > 0 ? (empPaid / empTotal) * 100 : 0;

    return (
        <div className="p-4 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">System Overview</h1>
                <button
                    onClick={handleExportDatabase}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-800/20 active:scale-95"
                >
                    <Database size={16} /> Export Database
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className={`bg-gradient-to-br ${stat.color} bg-white border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-100 dark:border-transparent">
                                {stat.icon}
                            </div>
                            <span className="text-2xl font-black text-slate-800 truncate pl-2">{stat.value}</span>
                        </div>
                        <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider">{stat.title}</h3>
                    </div>
                ))}
            </div>

            {/* Financial Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Client Revenue */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <CreditCard className="text-indigo-500" /> Client Revenue
                        </h2>
                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">Inflow</span>
                    </div>

                    <div className="mb-2 flex justify-between text-sm font-bold text-slate-600">
                        <span>Received</span>
                        <span>Fixed Total</span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-full overflow-hidden mb-4 relative">
                        <div style={{ width: `${clientProgress}%` }} className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-500 drop-shadow-sm pointer-events-none uppercase tracking-widest">{clientProgress.toFixed(1)}% Collected</div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">₹{clientReceived.toLocaleString()}</div>
                        <div className="font-mono font-bold text-slate-500">₹{clientFixed.toLocaleString()}</div>
                    </div>
                </div>

                {/* Employee Salaries */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Users className="text-green-500" /> Team Payroll
                        </h2>
                        <span className="text-xs font-bold bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100">Outflow</span>
                    </div>

                    <div className="mb-2 flex justify-between text-sm font-bold text-slate-600">
                        <span>Paid</span>
                        <span>Total Committed</span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-full overflow-hidden mb-4 relative">
                        <div style={{ width: `${empProgress}%` }} className="h-full bg-gradient-to-r from-emerald-500 to-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-1000"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-500 drop-shadow-sm pointer-events-none uppercase tracking-widest">{empProgress.toFixed(1)}% Disbursed</div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="font-mono font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">₹{empPaid.toLocaleString()}</div>
                        <div className="font-mono font-bold text-slate-500">₹{empTotal.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div className="text-center pt-8 border-t border-slate-100">
                <p className="text-slate-400 text-sm font-medium">Data is updated in real-time based on request financials and assignment payments.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
