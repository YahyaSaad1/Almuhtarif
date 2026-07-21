import { Link } from "react-router-dom";

export default function NavBtns({ isLoggedIn = true }) {
    
    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-3">
                <Link 
                    to="/profile" 
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 py-1.5 px-3 rounded-full transition-colors duration-200 border border-white/20"
                >
                    <span className="text-sm font-bold hidden sm:inline">يحيى سعد</span>
                    <div className="w-8 h-8 rounded-full bg-text-color flex items-center justify-center text-first-color font-bold shadow-md">
                        Y
                    </div>
                </Link>
            </div>
        );
    }


    const Btns = [
        { id: 1, name: 'تسجيل الدخول', to: '/login', primary: false },
        { id: 2, name: 'تسجيل', to: '/register', primary: true },
    ];

    return (
        <div className="flex gap-2 md:gap-3 items-center">
            {Btns.map((item) => {
                return (
                    <Link 
                        key={item.id} 
                        to={item.to} 
                        className={`border-2 font-bold rounded-lg py-1.5 px-3 md:py-2 md:px-4 text-xs md:text-sm cursor-pointer transition-all duration-200 hover:scale-105 ${
                            item.primary 
                                ? "bg-text-color text-first-color border-text-color hover:opacity-90 shadow-md" 
                                : "border-text-color text-white hover:bg-text-color hover:text-first-color"
                        }`}
                    >
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}