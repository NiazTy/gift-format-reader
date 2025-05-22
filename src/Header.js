import React, { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const externalLinks = "https://niaz.my.id"

    return (
        <header className="border-b-2 border-gray-200 shadow-lg bg-white/95">
            <div className="flex items-center justify-between max-w-6xl px-4 py-4 mx-auto">
                <div className="flex items-center space-x-3">
                    <span className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text drop-shadow">🎁 Gift Viewer</span>
                    <span className="hidden ml-2 text-base font-normal text-gray-400 sm:inline">(By NiazTy)</span>
                </div>
                <nav className="hidden space-x-8 md:flex">
                    <a href={externalLinks} className="font-semibold text-pink-500 transition hover:text-blue-500">Home</a>
                    <a href={`${externalLinks}/about`} className="font-semibold text-pink-500 transition hover:text-blue-500">About</a>
                </nav>
                <button
                    className="flex flex-col items-center justify-center w-10 h-10 md:hidden group"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-1 w-8 bg-pink-400 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block h-1 w-8 bg-pink-400 rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                    <span className={`block h-1 w-8 bg-pink-400 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>
            </div>
            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMenuOpen(false)}
            />
            <nav
                className={`md:hidden fixed top-0 right-0 w-64 h-full bg-white/95 shadow-2xl z-50 transform transition-transform duration-300 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-pink-100">
                    <span className="text-xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">Gift Viewer</span>
                    <button
                        className="flex items-center justify-center w-8 h-8"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col px-6 py-4 space-y-4">
                    <a href={externalLinks} className="font-semibold text-pink-500 transition hover:text-blue-500" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href={`${externalLinks}/about`} className="font-semibold text-pink-500 transition hover:text-blue-500" onClick={() => setMenuOpen(false)}>About</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;