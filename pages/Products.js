import { useState } from "react";

export default function Products() {
    const [userRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin'; 
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStore, setSelectedStore] = useState("all");

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "خلاط حوض مطبخ تركي فاخر",
            storeName: "متجر الأهرام للسباكة",
            merchantId: "m1",
            category: "سباكة",
            price: 1250,
            stock: 45,
            status: "active",
            image: "🚿"
        },
        {
            id: 2,
            name: "طقم دهانات بلاستيك مطفي (10 لتر)",
            storeName: "العاصمة للدهانات والديكور",
            merchantId: "m2",
            category: "دهانات",
            price: 850,
            stock: 12,
            status: "active",
            image: "🎨"
        },
        {
            id: 3,
            name: "مفتاح لقمة وبطارية لوحة مفاتيح كهربائية",
            storeName: "النور للأدوات الكهربائية",
            merchantId: "m3",
            category: "كهرباء",
            price: 320,
            stock: 0,
            status: "out_of_stock",
            image: "⚡"
        },
        {
            id: 4,
            name: "محبس زاويه صيني تجميع عالي الجودة",
            storeName: "متجر الأهرام للسباكة",
            merchantId: "m1",
            category: "سباكة",
            price: 150,
            stock: 120,
            status: "active",
            image: "🔧"
        }
    ]);

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(item => item.id !== id));
    };

    const filteredProducts = products.filter(product => {
        const matchesRole = userRole === 'admin' || product.merchantId === "m1";
        
        const matchesStore = userRole !== 'admin' || selectedStore === "all" || product.storeName === selectedStore;

        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesRole && matchesStore && matchesSearch;
    });

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            {/* رأس الصفحة */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {userRole === 'admin' ? 'إدارة كل منتجات المنصة 📦' : 'منتجات متجرك 🏷️'}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'admin' 
                            ? 'استعرض وراقب جميع المنتجات المضافة من قِبل كافة التجار بالمنصة.' 
                            : 'تتبع مخزون منتجاتك، الأسعار، وحالة العرض للعملاء.'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <a 
                        href="/products/add" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-sm transition-all flex items-center gap-2"
                    >
                        <span>➕</span> إضافة منتج جديد
                    </a>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="w-full md:w-96 relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">🔍</span>
                    <input 
                        type="text"
                        placeholder="ابحث باسم المنتج أو القسم..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2.5 pr-11 pl-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {userRole === 'admin' && (
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <span className="text-xs font-bold text-gray-400 whitespace-nowrap">فلتر بالمتجر:</span>
                        <select 
                            value={selectedStore}
                            onChange={(e) => setSelectedStore(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-2xl py-2.5 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option value="all">كل المتاجر</option>
                            <option value="متجر الأهرام للسباكة">متجر الأهرام للسباكة</option>
                            <option value="العاصمة للدهانات والديكور">العاصمة للدهانات والديكور</option>
                            <option value="النور للأدوات الكهربائية">النور للأدوات الكهربائية</option>
                        </select>
                    </div>
                )}

            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-xs font-bold">
                                <th className="p-5">المنتج</th>
                                {userRole === 'admin' && <th className="p-5">المتجر التابع</th>}
                                <th className="p-5">القسم</th>
                                <th className="p-5">السعر</th>
                                <th className="p-5">المخزون</th>
                                <th className="p-5">الحالة</th>
                                <th className="p-5 text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        
                                        <td className="p-5 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-lg shadow-inner">
                                                {product.image}
                                            </div>
                                            <span className="font-bold text-gray-900">{product.name}</span>
                                        </td>

                                        {userRole === 'admin' && (
                                            <td className="p-5">
                                                <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-xl text-[11px]">
                                                    🛒 {product.storeName}
                                                </span>
                                            </td>
                                        )}

                                        <td className="p-5 font-bold text-gray-500">{product.category}</td>

                                        <td className="p-5 font-black text-gray-900">{product.price} ج.م</td>

                                        <td className="p-5 font-bold">
                                            <span className={product.stock > 0 ? "text-gray-800" : "text-red-500"}>
                                                {product.stock > 0 ? `${product.stock} قطعة` : 'نفذت الكمية'}
                                            </span>
                                        </td>

                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                                                product.status === 'active' 
                                                    ? 'bg-green-50 text-green-600' 
                                                    : 'bg-red-50 text-red-600'
                                            }`}>
                                                {product.status === 'active' ? 'نشط' : 'نفذ المخزون'}
                                            </span>
                                        </td>

                                        <td className="p-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-all"
                                                    title="تعديل"
                                                >
                                                    ✏️
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all"
                                                    title="حذف"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={userRole === 'admin' ? 7 : 6} className="p-12 text-center text-gray-400 font-bold">
                                        📭 لا توجد منتجات مطابقة لعمليات البحث أو الفلتر الحالي.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}