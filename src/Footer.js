import React from "react";
import { IonIcon } from '@ionic/react';
import { mailOutline, logoInstagram, logoGithub } from 'ionicons/icons';

const externalLinks = "https://niaz.my.id"
const Footer = () => (
    <footer className="mt-12 border-t-2 border-gray-200 shadow-inner">
        <div className="flex flex-col-reverse max-w-6xl gap-8 px-4 py-8 mx-auto md:flex-row md:justify-between md:gap-0 md:px-8 rounded-b-2xl">
            <div className="flex flex-col items-center w-full md:items-start md:w-auto">
                <div className="flex mb-4 space-x-4 md:mb-2">
                    <a href="mailto:mzpnzakky@gmail.com" className="text-xl transition rounded-full shadow md:text-sm hover:bg-gray-100" target="_blank" rel="noopener noreferrer">
                        <IonIcon icon={mailOutline} />
                    </a>
                    <a href="https://instagram.com/m.niazyk" className="text-xl transition rounded-full shadow md:text-sm hover:bg-gray-100" target="_blank" rel="noopener noreferrer">
                        <IonIcon icon={logoInstagram} />
                    </a>
                    <a href="https://github.com/NiazTy" className="text-xl transition rounded-full shadow md:text-sm hover:bg-gray-100" target="_blank" rel="noopener noreferrer">
                        <IonIcon icon={logoGithub} />
                    </a>
                </div>
                <div className="inline-flex gap-1 text-xs font-semibold font-ibm-plex-sans md:text-sm">
                    <p className="text-gray-500">&copy;{new Date().getFullYear()}</p>
                    <a href={externalLinks} className="text-pink-500 transition hover:text-blue-500">Niaz</a>
                </div>
            </div>
            <div id="lastupdate" className="flex flex-col-reverse items-center w-full md:items-end md:flex-col">
                <div>
                    <p className="mt-4 text-xs font-semibold text-right text-gray-400 font-ibm-plex-sans md:text-sm md:mt-0">
                        Last update at 22/05/2025
                    </p>
                </div>
                <div className="flex flex-wrap justify-start mb-2 md:justify-end gap-x-4 gap-y-2 md:mb-0">
                    <a
                        href={externalLinks}
                        className="text-xs font-semibold text-pink-500 transition border-b-2 border-pink-300 font-ibm-plex-sans md:text-sm hover:text-blue-500"
                    >
                        Home
                    </a>
                    <a
                        href={`${externalLinks}/about`}
                        className="text-xs font-semibold text-pink-500 transition opacity-70 hover:opacity-100 font-ibm-plex-sans md:text-sm hover:text-blue-500"
                    >
                        About
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
