import React, { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-3xl font-extrabold text-indigo-700 tracking-tight">🎁 Gift Viewer</span>
                </div>
                <nav className="hidden md:flex space-x-8">
                    <a href="#" className="text-indigo-700 font-medium hover:text-yellow-500 transition">Home</a>
                    <a href="#" className="text-indigo-700 font-medium hover:text-yellow-500 transition">About</a>
                    <a href="#" className="text-indigo-700 font-medium hover:text-yellow-500 transition">Contact</a>
                </nav>
                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 group"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-1 w-8 bg-indigo-700 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block h-1 w-8 bg-indigo-700 rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                    <span className={`block h-1 w-8 bg-indigo-700 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>
            </div>
            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMenuOpen(false)}
            />
            <nav
                className={`md:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b">
                    <span className="text-xl font-bold text-indigo-700">Gift Viewer</span>
                    <button
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col px-6 py-4 space-y-4">
                    <a href="#" className="text-gray-800 font-medium hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#" className="text-gray-800 font-medium hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#" className="text-gray-800 font-medium hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>Contact</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;