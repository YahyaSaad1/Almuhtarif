import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";
import NavBtns from "./NavBtns";

export default function Navbar({ isLoggedIn = true, userRole = 'user', toggleSidebar }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAuthPage = ['/login', '/register'].includes(location.pathname.toLowerCase());

    return (
        <header dir="rtl" className="sticky top-0 z-50 flex items-center justify-between py-4 px-6 md:px-12 lg:px-16 xl:px-20 shadow-xl bg-first-color text-white">
            <div className="flex items-center gap-4">
                {!isAuthPage && (
                    <button 
                        onClick={toggleSidebar}
                        className="text-white focus:outline-none p-1 rounded-lg hover:bg-white/15 transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}

                <div className="flex tracking-wider whitespace-nowrap">
                    <h2 className="font-bold text-3xl scale-y-105 text-text-color">logo</h2>
                </div>
            </div>

            <div className="hidden md:flex">
                {!isAuthPage && <NavLink />}
            </div>

            <div>
                {!isAuthPage && (
                    <NavBtns isLoggedIn={isLoggedIn} userRole={userRole} />
                )}
            </div>

            {isMobileMenuOpen && !isAuthPage && (
                <div className="absolute top-full right-0 w-full bg-first-color shadow-2xl border-t border-white/10 py-4 px-6 flex flex-col gap-4 md:hidden transition-all duration-300">
                    <NavLink closeMobileMenu={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </header>
    );
}