import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800"
                >
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                        <div className="p-3 bg-blue-100 dark:bg-slate-800 rounded-xl text-primary">
                            <ScrollText size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="lead">
                            Welcome to PathMakers. By accessing or using our website and services, you agree to be bound by these terms.
                        </p>

                        <h3>1. Services</h3>
                        <p>
                            PathMakers provides web development, app development, AI solutions, and academic assistance services. Detailed scope of work is defined in individual client agreements.
                        </p>

                        <h3>2. Intellectual Property</h3>
                        <p>
                            Upon full payment, intellectual property rights for custom-developed software are transferred to the client, unless otherwise specified. PathMakers retains rights to pre-existing code, tools, and libraries.
                        </p>

                        <h3>3. Payments</h3>
                        <p>
                            Payments are due as per the schedule agreed upon in the project contract. Late payments may incur interest or result in suspension of services.
                        </p>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            PathMakers is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the specific service.
                        </p>

                        <h3>5. Changes to Terms</h3>
                        <p>
                            We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of the new terms.
                        </p>

                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
                            Last updated: December 2024
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
