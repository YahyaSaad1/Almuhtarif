import { Link } from "react-router-dom";

export default function Home() {
    const popularProducts = [
        { id: 1, name: "فرشاة دهان 3 بوصة", price: "35 ج.م", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80" },
        { id: 2, name: "رولة دهان مع قميص 25 سم", price: "95 ج.م", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=300&q=80" },
        { id: 3, name: "دهان بلاستيك أبيض عالي الجودة", price: "320 ج.م", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80" },
        { id: 4, name: "وصلة 20 ملي", price: "15 ج.م", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" },
        { id: 5, name: "خلاط مغسلة ستاندرد", price: "450 ج.م", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" },
    ];

    return (
        <div dir="rtl" className="flex flex-col gap-16 pb-12 font-sans bg-gray-50/50">
            
            <section className="relative bg-gradient-to-l from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 md:p-12 shadow-sm border border-blue-100/50 flex flex-col md:flex-row items-center justify-between overflow-hidden">
                <div className="flex flex-col gap-6 max-w-xl z-10 text-right">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                        كل ما تحتاجه من <br />
                        <span className="text-blue-600">السباكة والنقاشة</span> <br />
                        في مكان واحد
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg font-medium">
                        منتجات عالية الجودة وأسعار مناسبة
                    </p>
                    <div>
                        <Link 
                            to="/products" 
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-10 rounded-2xl shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-105"
                        >
                            تسوق الآن
                        </Link>
                    </div>
                </div>

                <div className="mt-8 md:mt-0 relative w-full md:w-1/2 flex justify-center items-center">
                    <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-blue-50/30">
                        <img 
                            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" 
                            alt="أدوات السباكة والنقاشة" 
                            className="object-cover w-full h-full opacity-90 rounded-2xl"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                    تسوق حسب الفئة
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-blue-50/60 to-white p-6 md:p-8 rounded-3xl border border-blue-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-4 text-right">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-md">
                                🔧
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">السباكة</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                جميع مستلزمات السباكة بأفضل جودة
                            </p>
                            <Link 
                                to="/products?category=plumbing" 
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-center transition-all shadow-sm"
                            >
                                عرض المنتجات
                            </Link>
                        </div>
                        <div className="w-full md:w-48 h-40 rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100 flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" 
                                alt="السباكة" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50/60 to-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-4 text-right">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                                🎨
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">النقاشة</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                جميع مستلزمات النقاشة وألوان الدهان
                            </p>
                            <Link 
                                to="/products?category=painting" 
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-center transition-all shadow-sm"
                            >
                                عرض المنتجات
                            </Link>
                        </div>
                        <div className="w-full md:w-48 h-40 rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100 flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=300&q=80" 
                                alt="النقاشة" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                    لماذا نحن؟
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 hover:border-blue-200 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                            🚚
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">توصيل سريع</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">توصيل في أسرع وقت لكافة المحافظات</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 hover:border-blue-200 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                            🛡️
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">ضمان الجودة</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">جميع منتجاتنا أصلية 100% ومضمونة</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 hover:border-blue-200 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                            🏷️
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">أسعار مناسبة</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">أفضل الأسعار في السوق</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 hover:border-blue-200 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                            🎧
                        </div>
                        <h4 className="font-bold text-lg text-gray-900">دعم العملاء</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">خدمة عملاء في خدمتك دائماً</p>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-6 relative">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                    منتجات شائعة
                </h2>

                <div className="relative flex items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                        {popularProducts.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 hover:shadow-md transition-all group">
                                <div className="w-full h-36 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                    <img src={item.image} alt={item.name} className="object-contain h-full group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                                <span className="text-blue-600 font-extrabold text-sm">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-2">
                    <Link 
                        to="/products" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-12 rounded-2xl shadow-md transition-all"
                    >
                        عرض جميع المنتجات
                    </Link>
                </div>
            </section>

            <section className="bg-gradient-to-l from-blue-50/50 via-white to-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-6 shadow-sm">
                <div className="flex items-center gap-4 text-center md:text-right">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                        😊
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-gray-900">500+ عميل راضي</h4>
                        <p className="text-gray-500 text-xs">نثق بهم ونفخر بخدمتهم</p>
                    </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-gray-200"></div>

                <div className="flex items-center gap-4 text-center md:text-right">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                        ⭐
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-gray-900">1000+ منتج</h4>
                        <p className="text-gray-500 text-xs">اكتشف أفضل المنتجات</p>
                    </div>
                </div>
            </section>

        </div>
    );
}