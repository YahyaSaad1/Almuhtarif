import { useState } from "react";

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "خلاط حوض مطبخ تركي فاخر",
            storeName: "متجر الأهرام للسباكة",
            price: 1250,
            stockStatus: "in_stock",
            image: "🚿"
        },
        {
            id: 2,
            name: "طقم دهانات بلاستيك مطفي (10 لتر)",
            storeName: "العاصمة للدهانات والديكور",
            price: 850,
            stockStatus: "in_stock",
            image: "🎨"
        },
        {
            id: 3,
            name: "مفتاح لقمة وبطارية لوحة مفاتيح كهربائية",
            storeName: "النور للأدوات الكهربائية",
            price: 320,
            stockStatus: "out_of_stock",
            image: "⚡"
        }
    ]);

    const handleRemoveFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    const handleAddToCart = (item) => {
        alert(`تم إضافة "${item.name}" إلى سلة التسوق بنجاح! 🛒`);
    };

    return (
        <div dir="rtl" className="w-full font-sans flex flex-col gap-6 text-right">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">المفضلة</h1>
                    <p className="text-gray-400 text-xs mt-1">المنتجات التي قمت بحفظها للرجوع إليها لاحقاً</p>
                </div>

                <span className="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-2xl text-xs border border-blue-100">
                    ❤️ عدد المنتجات: {wishlistItems.length} منتج
                </span>
            </div>

            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between gap-4 transition-all hover:shadow-md relative group"
                        >
                            
                            <button 
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-all shadow-sm"
                                title="إزالة من المفضلة"
                            >
                                ✕
                            </button>

                            <div className="flex flex-col gap-3">
                                <div className="w-full h-36 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl shadow-inner">
                                    {item.image}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-blue-600 font-bold bg-blue-50 w-fit px-2.5 py-0.5 rounded-lg">
                                        {item.storeName}
                                    </span>
                                    <h3 className="font-black text-gray-900 text-sm mt-1 line-clamp-1">{item.name}</h3>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-base font-black text-gray-900">
                                        {item.price} <span className="text-xs font-bold text-gray-500">ج.م</span>
                                    </span>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                        item.stockStatus === 'in_stock' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                    }`}>
                                        {item.stockStatus === 'in_stock' ? 'متوفر بالمخزون' : 'نفذت الكمية'}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleAddToCart(item)}
                                disabled={item.stockStatus === 'out_of_stock'}
                                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                                    item.stockStatus === 'in_stock'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <span>🛒</span> إضافة إلى السلة
                            </button>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 font-bold shadow-sm">
                    📭 قائمة المفضلة لديك فارغة حالياً. تصفح المنتجات وأضف ما يعجبك!
                </div>
            )}

        </div>
    );
}