import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900/50 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
                            <Rocket className="h-6 w-6" />
                            <span>PathMakers</span>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
                            Empowering businesses and individuals with cutting-edge digital solutions and academic assistance.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Services</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    App Development
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    AI Solutions
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                    Academic Assistance
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar - No Copyright */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex justify-center md:justify-end text-sm text-slate-500 dark:text-slate-500">
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
