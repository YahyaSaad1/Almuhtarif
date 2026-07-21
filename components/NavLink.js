import { Link, useLocation } from "react-router-dom";

export default function NavLink({ closeMobileMenu }) {
    const location = useLocation();

    const Links = [
        { name: 'الرئيسية', to: '/' },
        { name: 'السباكة', to: '/plumbing' },
        { name: 'النقاشة', to: '/painting' },
        { name: 'تواصل معنا', to: '/contactus' },
    ];

    return (
        <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
            {Links.map((link, index) => {
                const isActive = location.pathname === link.to;
                return (
                    <li key={index} className="w-full md:w-auto">
                        <Link 
                            to={link.to} 
                            onClick={closeMobileMenu}
                            className={`block w-full py-2 md:py-0 cursor-pointer font-bold transition-all duration-200 hover:text-text-color md:hover:scale-110 ${
                                isActive ? "text-text-color md:underline underline-offset-8" : "text-white/90"
                            }`}
                        >
                            {link.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}