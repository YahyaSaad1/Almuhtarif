import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Plumbing({ userRole }) {
    const [products, setProducts] = useState([
        { id: 1, name: "خلاط مغسلة عالي الجودة", price: "450 ج.م", image: "https://via.placeholder.com/300", description: "خلاط مياه بتصميم عصري ومقاوم للصدأ." },
        { id: 2, name: "محبوب زاوية كروم", price: "120 ج.م", image: "https://via.placeholder.com/300", description: "محبس زاوية إيطالي الصنع عالي التحمل." },
        { id: 3, name: "شاور حمام مططر", price: "850 ج.م", image: "https://via.placeholder.com/300", description: "طقم دش متكامل بخيارات تدفق مياه متعددة." },
        { id: 4, name: "شريط تيفلون أصلي", price: "15 ج.م", image: "https://via.placeholder.com/300", description: "شريط منع تسريب المياه للوصلات." },
    ]);

    const [loading, setLoading] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">منتجات قسم السباكة</h1>
                    <p className="text-gray-500 text-sm mt-1">تصفح أحدث أدوات ومستلزمات السباكة بأفضل الأسعار</p>
                </div>

                {(userRole === 'admin' || userRole === 'merchant') && (
                    <Link 
                        to="/products/add" 
                        className="bg-first-color text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                        <span>+ إضافة منتج للسباكة</span>
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">جاري تحميل المنتجات...</div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500 text-lg">لا توجد منتجات مضافة في هذا القسم حالياً.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="h-48 bg-gray-100 overflow-hidden relative">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 text-lg mb-1">{product.name}</h3>
                                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">{product.description}</p>
                                    <span className="text-first-color font-bold text-base">{product.price}</span>
                                </div>
                            </div>
                            
                            <div className="p-4 pt-0">
                                <button className="w-full bg-gray-50 text-first-color border border-first-color/30 py-2 rounded-xl text-sm font-bold hover:bg-first-color hover:text-white transition-colors">
                                    عرض التفاصيل / أطلب الان
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}