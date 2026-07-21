import { useState } from "react";

export default function Stores() {
    const [stores, setStores] = useState([
        {
            id: "s1",
            name: "متجر الأهرام للسباكة",
            owner: "اشرف أبو الري",
            phone: "+20 1012345678",
            category: "سباكة وأدوات صحية",
            productsCount: 45,
            totalSales: "48,500 ج.م",
            status: "active", // active, suspended
            joinedDate: "2026-01-15",
            logo: "🚿"
        },
        {
            id: "s2",
            name: "العاصمة للدهانات والديكور",
            owner: "محمود حسن",
            phone: "+20 1098765432",
            category: "نقاشة ودهانات",
            productsCount: 28,
            totalSales: "32,100 ج.م",
            status: "active",
            joinedDate: "2026-02-10",
            logo: "🎨"
        },
        {
            id: "s3",
            name: "النور للأدوات الكهربائية",
            owner: "مصطفى عبد الله",
            phone: "+20 1122334455",
            category: "أدوات كهربائية",
            productsCount: 15,
            totalSales: "14,800 ج.م",
            status: "suspended",
            joinedDate: "2026-03-01",
            logo: "⚡"
        },
        {
            id: "s4",
            name: "المهندس لمستلزمات البناء",
            owner: "إبراهيم السيد",
            phone: "+20 1234567890",
            category: "مواد بناء",
            productsCount: 60,
            totalSales: "95,000 ج.م",
            status: "active",
            joinedDate: "2025-12-20",
            logo: "🏗️"
        }
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const toggleStoreStatus = (id) => {
        setStores(stores.map(store => {
            if (store.id === id) {
                const newStatus = store.status === 'active' ? 'suspended' : 'active';
                return { ...store, status: newStatus };
            }
            return store;
        }));
    };

    const handleDeleteStore = (id) => {
        setStores(stores.filter(store => store.id !== id));
    };

    const filteredStores = stores.filter(store => {
        const matchesStatus = statusFilter === "all" || store.status === statusFilter;
        const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              store.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalStoresCount = stores.length;
    const activeStoresCount = stores.filter(s => s.status === 'active').length;

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        إدارة متاجر المنصة 🏪
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        مراقبة التجار المسجلين، حالة الحسابات، ومتابعة الأداء العام لكل متجر.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="bg-blue-50 text-blue-600 font-bold px-4 py-2.5 rounded-2xl text-xs border border-blue-100">
                        🛡️ إجمالي المتاجر: {totalStoresCount} ({activeStoresCount} نشط)
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="w-full md:w-96 relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">🔍</span>
                    <input 
                        type="text"
                        placeholder="ابحث باسم المتجر، المالك، أو القسم..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2.5 pr-11 pl-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap">الحالة:</span>
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-2xl py-2.5 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value="all">كل المتاجر</option>
                        <option value="active">المتاجر النشطة ✅</option>
                        <option value="suspended">المتاجر المعلقة 🚫</option>
                    </select>
                </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-xs font-bold">
                                <th className="p-5">المتجر والمالك</th>
                                <th className="p-5">القسم الرئيسي</th>
                                <th className="p-5">عدد المنتجات</th>
                                <th className="p-5">إجمالي المبيعات</th>
                                <th className="p-5">تاريخ الانضمام</th>
                                <th className="p-5">حالة الحساب</th>
                                <th className="p-5 text-center">الإجراءات والتحكم</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                            {filteredStores.length > 0 ? (
                                filteredStores.map((store) => (
                                    <tr key={store.id} className="hover:bg-gray-50/50 transition-colors">
                                        
                                        <td className="p-5 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xl shadow-inner shrink-0">
                                                {store.logo}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">{store.name}</h4>
                                                <span className="text-gray-400 text-[11px] block mt-0.5">👤 {store.owner} ({store.phone})</span>
                                            </div>
                                        </td>

                                        <td className="p-5 font-bold text-gray-600">{store.category}</td>

                                        <td className="p-5 font-bold text-gray-800">
                                            <span className="bg-gray-100 px-3 py-1 rounded-xl text-xs">
                                                📦 {store.productsCount} منتج
                                            </span>
                                        </td>

                                        <td className="p-5 font-black text-gray-900">{store.totalSales}</td>

                                        <td className="p-5 text-gray-400 text-[11px] font-medium">{store.joinedDate}</td>

                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                                                store.status === 'active' 
                                                    ? 'bg-green-50 text-green-600 border border-green-100' 
                                                    : 'bg-red-50 text-red-600 border border-red-100'
                                            }`}>
                                                {store.status === 'active' ? 'نشط ومصرح' : 'معلق مؤقتاً'}
                                            </span>
                                        </td>

                                        <td className="p-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => toggleStoreStatus(store.id)}
                                                    className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                                                        store.status === 'active' 
                                                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                                                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                    }`}
                                                    title={store.status === 'active' ? 'تعليق المتجر' : 'تفعيل المتجر'}
                                                >
                                                    {store.status === 'active' ? 'تعليق 🚫' : 'تفعيل ✅'}
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteStore(store.id)}
                                                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all"
                                                    title="حذف المتجر نهائياً"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-400 font-bold">
                                        📭 لا توجد متاجر تطابق خيارات البحث الحالية.
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