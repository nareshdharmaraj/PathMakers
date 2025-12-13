import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2, CheckCircle, Download } from 'lucide-react';
import { API_URL } from '../../utils/api';
import { generateReceipt } from '../../utils/ReceiptGenerator';

const BookingModal = ({ service, onClose }) => {
    const [step, setStep] = useState(1); // 1: Details, 2: Success
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        org_name: '',
        phone: '',
        email: '',
        address_door: '',
        address_city: '',
        address_district: '',
        address_state: '',
        address_pincode: '',
        description: '',
        expected_date: '',
        attachment: null
    });

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else if (name === 'address_pincode') {
            const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            alert("File size exceeds 5MB");
            return;
        }
        if (file && file.type !== 'application/pdf') {
            alert("Only PDF files are allowed");
            return;
        }
        setFormData(prev => ({ ...prev, attachment: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for phone
        if (!/^\d{10}$/.test(formData.phone)) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }

        // Validation for Pincode (Optional but if entered must be 6 digits)
        if (formData.address_pincode && !/^\d{6}$/.test(formData.address_pincode)) {
            alert("Please enter a valid 6-digit Pincode");
            return;
        }

        if (!acceptedTerms) {
            alert("You must agree to the Terms and Conditions to proceed.");
            return;
        }

        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) data.append(key, formData[key]);
        });
        data.append('service_code', service.code);

        try {
            const res = await fetch(`${API_URL}/public/contact`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (res.ok) {
                setResponse(result);
                setStep(2);
            } else {
                alert(result.msg || "Failed to submit request");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 relative scrollbar-hide"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500 transition-colors z-10">
                    <X size={20} />
                </button>

                {step === 1 && (
                    <div className="p-8">
                        <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                            <span className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-widest text-xs">Book Service</span>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{service.name}</h2>
                            <p className="text-slate-500 text-sm mt-2">Fill in your details to get started. Our team will contact you shortly.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <InputField label="Full Name *" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                                <InputField label="Phone Number (10 Digits) *" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 1234567809" type="tel" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <InputField label="Organization (Optional)" name="org_name" value={formData.org_name} onChange={handleChange} placeholder="Your Organization Name" />
                                <InputField label="Email Address (Optional)" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" type="email" />
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Address Details (Optional)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Door No / Street" name="address_door" value={formData.address_door} onChange={handleChange} placeholder="123, Main St" />
                                    <InputField label="Village / City" name="address_city" value={formData.address_city} onChange={handleChange} placeholder="New York" />
                                    <InputField label="District" name="address_district" value={formData.address_district} onChange={handleChange} placeholder="Manhattan" />
                                    <InputField label="State" name="address_state" value={formData.address_state} onChange={handleChange} placeholder="NY" />
                                    <InputField label="Pincode (6 Digits)" name="address_pincode" value={formData.address_pincode} onChange={handleChange} placeholder="100001" type="text" maxLength={6} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Project Description (Requirements) *</label>
                                <textarea
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Describe what you need..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Expected Date of Work Completion</label>
                                <input
                                    type="date"
                                    name="expected_date"
                                    value={formData.expected_date}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <p className="text-xs text-slate-500 mt-2 italic">
                                    * Disclaimer: The date can vary. Accurate date will be fixed after the confirmation of request by the PathMakers team.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Related Document (PDF &lt; 5MB)</label>
                                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                                    <input type="file" accept="application/pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <Upload className="mx-auto text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-500">{formData.attachment ? formData.attachment.name : "Click to upload (Optional)"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                                    I have read and understand the <a href="/terms" target="_blank" className="text-blue-600 font-bold hover:underline">Terms and Conditions</a> and <a href="/terms" target="_blank" className="text-blue-600 font-bold hover:underline">Privacy Policy</a> of PathMakers.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Submit Request'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="p-12 text-center h-full flex flex-col items-center justify-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500 mb-6">
                            <CheckCircle size={48} />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Request Submitted!</h2>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            Your request has been received. Your Tracking ID is <span className="font-mono text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">{response?.unique_id}</span>.
                            Our team will contact you shortly at {formData.phone}.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => generateReceipt({ ...response, message: formData.description })}
                                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <Download size={20} /> Download Receipt
                            </button>
                            <button onClick={onClose} className="px-6 py-3 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input
            {...props}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
        />
    </div>
);

export default BookingModal;
