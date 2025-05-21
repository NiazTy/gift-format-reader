import React from "react";

const Footer = () => (
    <footer className="bg-gray-900 text-gray-200 py-6 px-4 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-lg font-semibold tracking-wide">
                🎁 Gift Viewer
            </div>
            <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
                <a href="#" className="hover:text-pink-400 transition">Home</a>
                <a href="#" className="hover:text-pink-400 transition">About</a>
                <a href="#" className="hover:text-pink-400 transition">Contact</a>
            </nav>
            <div className="text-xs text-gray-400 mt-2 md:mt-0">
                &copy; {new Date().getFullYear()} Gift Viewer. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;