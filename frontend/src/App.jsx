import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ClientLayout from './layouts/ClientLayout';
import Landing from './client/pages/Landing';
import About from './client/pages/About';
import Projects from './client/pages/Projects';
import Services from './client/pages/Services';
import Contact from './client/pages/Contact';
import Terms from './client/pages/Terms';
import Privacy from './client/pages/Privacy';
import Loader from './components/Loader';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence>
                {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && (
                <Routes>
                    <Route element={<ClientLayout />}>
                        <Route path="/" element={<Landing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                    </Route>
                    {/* Future routes for Admin and Employees will go here */}
                    <Route path="*" element={<div className="h-screen flex items-center justify-center text-xl text-slate-800 dark:text-white bg-white dark:bg-slate-900">404 - Page Not Found</div>} />
                </Routes>
            )}
        </>
    );
}

export default App;
