import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ userRole, isOpen, setIsOpen }) { 
    const location = useLocation();

    const [isProductsOpen, setIsProductsOpen] = useState(
        location.pathname.startsWith('/products') || location.pathname.startsWith('/brands')
    );

    const [isOffersOpen, setIsOffersOpen] = useState(
        location.pathname.startsWith('/offers')
    );

    const [isStoresOpen, setIsStoresOpen] = useState(
        location.pathname.startsWith('/stores')
    );

    useEffect(() => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    }, [location.pathname]);

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm ${
            isActive 
                ? "bg-white/20 text-white font-bold shadow-inner" 
                : "text-white/80 hover:bg-white/10 hover:text-white"
        }`;
    };

    return (
        <>
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
                />
            )}

            <aside className={`
                fixed md:sticky top-16 h-[calc(100vh-4rem)] bg-first-color shadow-xl flex flex-col justify-between py-6 px-4 text-right transition-all duration-300 z-40
                w-72 md:w-64
                ${isOpen ? "right-0" : "-right-72 md:right-0"}
            `}>
                <div className="flex flex-col gap-1.5 w-full overflow-y-auto custom-scrollbar">
                    
                    <Link to="/" className={getLinkClass("/")}>
                        <h2>الرئيسية</h2>
                    </Link>

                    <Link to="/profile" className={getLinkClass("/profile")}>
                        <h2>الملف الشخصي</h2>
                    </Link>

                    {userRole === 'user' && (
                        <>
                            <Link to="/my-orders" className={getLinkClass("/my-orders")}>
                                <h2>طلباتي</h2>
                            </Link>

                            <Link to="/addresses" className={getLinkClass("/addresses")}>
                                <h2>العناوين المحفوظة</h2>
                            </Link>

                            <Link to="/wishlist" className={getLinkClass("/wishlist")}>
                                <h2>المفضلة</h2>
                            </Link>

                            <Link to="/payment-methods" className={getLinkClass("/payment-methods")}>
                                <h2>طريقة الدفع</h2>
                            </Link>
                        </>
                    )}

                    {(userRole === 'admin' || userRole === 'merchant') && (
                        <>
                            <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                                <h2>لوحة التحكم</h2>
                            </Link>

                            <Link to="/orders" className={getLinkClass("/orders")}>
                                <h2>الطلبات</h2>
                            </Link>

                            <div className="flex flex-col">
                                <button 
                                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                                    className="flex items-center justify-between py-2.5 px-4 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200 text-sm w-full"
                                >
                                    <span className="font-medium">المنتجات</span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isProductsOpen && (
                                    <div className="flex flex-col gap-1 pr-4 mt-1 border-r border-white/20 mr-2">
                                        <Link to="/products" className={getLinkClass("/products")}><h2>عرض المنتجات</h2></Link>
                                        <Link to="/products/add" className={getLinkClass("/products/add")}><h2>إضافة منتج</h2></Link>
                                        <Link to="/brands" className={getLinkClass("/brands")}><h2>العلامات التجارية</h2></Link>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <button 
                                    onClick={() => setIsOffersOpen(!isOffersOpen)}
                                    className="flex items-center justify-between py-2.5 px-4 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200 text-sm w-full"
                                >
                                    <span className="font-medium">العروض والخصومات</span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isOffersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isOffersOpen && (
                                    <div className="flex flex-col gap-1 pr-4 mt-1 border-r border-white/20 mr-2">
                                        <Link to="/offers" className={getLinkClass("/offers")}><h2>عرض العروض</h2></Link>
                                        <Link to="/offers/add" className={getLinkClass("/offers/add")}><h2>إضافة عرض جديد</h2></Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {userRole === 'admin' && (
                        <>
                            <div className="flex flex-col">
                                <button 
                                    onClick={() => setIsStoresOpen(!isStoresOpen)}
                                    className="flex items-center justify-between py-2.5 px-4 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200 text-sm w-full"
                                >
                                    <span className="font-medium">إدارة المتاجر</span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isStoresOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isStoresOpen && (
                                    <div className="flex flex-col gap-1 pr-4 mt-1 border-r border-white/20 mr-2">
                                        <Link to="/stores" className={getLinkClass("/stores")}><h2>عرض المتاجر</h2></Link>
                                        <Link to="/stores/add" className={getLinkClass("/stores/add")}><h2>إضافة متجر جديد</h2></Link>
                                    </div>
                                )}
                            </div>

                            <Link to="/categories" className={getLinkClass("/categories")}>
                                <h2>إدارة الأقسام</h2>
                            </Link>

                            <Link to="/customers" className={getLinkClass("/customers")}>
                                <h2>العملاء</h2>
                            </Link>

                            <Link to="/reports" className={getLinkClass("/reports")}>
                                <h2>التقارير (شاملة)</h2>
                            </Link>
                        </>
                    )}

                    <Link to="/reviews" className={getLinkClass("/reviews")}>
                        <h2>التقييمات</h2>
                    </Link>

                    <Link to="/settings" className={getLinkClass("/settings")}>
                        <h2>الإعدادات</h2>
                    </Link>
                </div>

                <div className="pt-4 border-t border-white/10 w-full mt-2 bg-first-color">
                    <Link 
                        to="/login" 
                        className="flex items-center py-2.5 px-4 rounded-lg text-red-200 hover:bg-red-500/20 transition-colors duration-200 text-sm"
                    >
                        <h2>تسجيل الخروج</h2>
                    </Link>
                </div>
            </aside>
        </>
    );
}