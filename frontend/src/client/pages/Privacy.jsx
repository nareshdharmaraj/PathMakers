import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800"
                >
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                        <div className="p-3 bg-green-100 dark:bg-slate-800 rounded-xl text-green-600">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="lead">
                            Your privacy is important to us. This policy explains how PathMakers collects, uses, and protects your personal information.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We collect information you provide directly to us, such as your name, email address, and project details when you fill out our contact forms.
                        </p>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            We use your information to:
                        </p>
                        <ul>
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Communicate with you about your projects and our services.</li>
                            <li>Process payments and send invoices.</li>
                        </ul>

                        <h3>3. Data Security</h3>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <h3>4. Third-Party Sharing</h3>
                        <p>
                            We do not sell your personal information. We may share data with trusted third-party service providers (e.g., payment processors, email services) who assist us in operating our business.
                        </p>

                        <h3>5. Your Rights</h3>
                        <p>
                            You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
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

export default Privacy;
