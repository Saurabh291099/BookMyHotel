import Image from 'next/image';
import React from 'react';


interface FooterProps {
    imageSrc?: string;
    decsription?: string;
    socialLinks?:{
        icon: string;
        link:string;
    }[];
    topLinks?:{
        name: string;
        link: string;
    }[];
    bottomLinks?:{
        name:string;
        link:string;

    }[];

}

const Footer: React.FC<FooterProps> = ({ imageSrc, decsription, socialLinks, topLinks, bottomLinks }) => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto flex flex-col md:grid grid-cols-3 justify-between items-center">
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                    {imageSrc && <Image width={100} height={100} src={imageSrc} alt="Logo" className="w-32 h-auto mb-4" />}
                    {decsription && <p className="text-center md:text-left">{decsription}</p>}
                </div>
                <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 mb-6 md:mb-0">
                    {topLinks?.map((link, index) => (
                        <a key={index} href={link.link} className="text-gray-400 hover:text-white">
                            {link.name}
                        </a>
                    ))}
                </div>
                <div className="flex space-x-4 justify-center">
                    {socialLinks?.map((socialLink, index) => (
                        <a key={index} href={socialLink?.link} className="text-gray-400 hover:text-white">
                            <Image width={100} height={100} src={socialLink?.icon} alt="Social Icon" className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="bg-gray-700 py-4 mt-8">
                <div className="container mx-auto text-center">
                    {bottomLinks?.map((link, index) => (
                        <a key={index} href={link?.link} className="text-gray-400 hover:text-white mx-2">
                            {link?.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};
export default Footer;