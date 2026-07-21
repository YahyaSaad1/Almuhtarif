import { useState } from "react";

export default function Reports() {
    const [userRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin';
    });

    const [dateRange, setDateRange] = useState("هذا الشهر");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const allStoresData = [
        { id: 1, name: "متجر الأهرام للسباكة", category: "plumbing", sales: 45200, orders: 320, rating: "4.9", status: "active" },
        { id: 2, name: "العاصمة للدهانات والديكور", category: "paints", sales: 38900, orders: 280, rating: "4.8", status: "active" },
        { id: 3, name: "النور للأدوات الكهربائية", category: "electrical", sales: 31400, orders: 215, rating: "4.7", status: "active" },
        { id: 4, name: "المهندس لمستلزمات البناء", category: "building", sales: 24100, orders: 170, rating: "4.6", status: "pending" },
    ];

    const getDynamicStats = () => {
        let multiplier = 1;
        if (dateRange === "اليوم") multiplier = 0.05;
        if (dateRange === "هذا الأسبوع") multiplier = 0.25;
        if (dateRange === "هذه السنة") multiplier = 12;

        let baseSales = 142500 * multiplier;
        let baseOrders = Math.round(1840 * multiplier);

        if (categoryFilter === "plumbing") { baseSales *= 0.45; baseOrders = Math.round(baseOrders * 0.45); }
        else if (categoryFilter === "paints") { baseSales *= 0.30; baseOrders = Math.round(baseOrders * 0.30); }
        else if (categoryFilter === "electrical") { baseSales *= 0.25; baseOrders = Math.round(baseOrders * 0.25); }

        return {
            sales: Math.round(baseSales).toLocaleString() + " ج.م",
            orders: baseOrders.toLocaleString() + " طلب",
            stores: categoryFilter === "all" ? "64 متجر" : "متاجر التصنيف",
            avgBasket: "385 ج.م"
        };
    };

    const stats = getDynamicStats();

    const filteredStores = allStoresData.filter(store => {
        const matchesCategory = categoryFilter === "all" || store.category === categoryFilter;
        const matchesStatus = statusFilter === "all" || store.status === statusFilter;
        return matchesCategory && matchesStatus;
    });

    const getChartData = () => {
        switch (dateRange) {
            case "اليوم":
                return {
                    bars: [15, 30, 45, 60, 80, 50, 25],
                    labels: ["12 ص", "4 ص", "8 ص", "12 م", "4 م", "8 م", "11 م"]
                };
            case "هذا الأسبوع":
                return {
                    bars: [45, 70, 35, 90, 60, 100, 80],
                    labels: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
                };
            case "ها الشهر":
                return {
                    bars: [45, 70, 35, 90, 60, 100, 80, 55, 75, 95, 85, 65],
                    labels: ["أسبوع 1", "أسبوع 2", "أسبوع 3", "أسبوع 4"]
                };
            case "هذه السنة":
                return {
                    bars: [60, 80, 50, 95, 70, 100, 90, 85, 75, 90, 95, 100],
                    labels: ["يناير", "مارس", "مايو", "يوليو", "سبتمبر", "نوفمبر"]
                };
            default:
                return {
                    bars: [45, 70, 35, 90, 60, 100, 80],
                    labels: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
                };
        }
    };

    const currentChart = getChartData();

    if (userRole !== 'admin') {
        return (
            <div dir="rtl" className="flex flex-col items-center justify-center min-h-[60vh] gap-4 font-sans text-center px-4">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center text-4xl shadow-inner">
                    🔒
                </div>
                <h1 className="text-2xl font-black text-gray-900">غير مصرح لك بالدخول</h1>
                <p className="text-gray-500 text-sm max-w-md">
                    هذه الصفحة مخصصة لمدير المنصة (Admin) فقط. لا تملك الصلاحيات الكافية لعرض التقارير المتقدمة.
                </p>
            </div>
        );
    }

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        التقارير والإحصائيات الشاملة 📊
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        لوحة تحكم تحليلية تفاعلية تتغير لحظياً حسب الفلاتر المحددة.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-2xl shadow-sm transition-all text-sm flex items-center gap-2">
                        <span>📥</span> تصدير التقرير (Excel)
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    
                    <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
                        <span className="text-xs font-bold text-gray-400 px-2">الفترة:</span>
                        <select 
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer py-1 px-2"
                        >
                            <option value="اليوم">اليوم</option>
                            <option value="هذا الأسبوع">هذا الأسبوع</option>
                            <option value="هذا الشهر">هذا الشهر</option>
                            <option value="هذه السنة">هذه السنة</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
                        <span className="text-xs font-bold text-gray-400 px-2">التصنيف:</span>
                        <select 
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer py-1 px-2"
                        >
                            <option value="all">كل الأقسام</option>
                            <option value="plumbing">سباكة وأدوات صحية</option>
                            <option value="paints">نقاشة ودهانات</option>
                            <option value="electrical">أدوات كهربائية</option>
                            <option value="building">مواد بناء</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
                        <span className="text-xs font-bold text-gray-400 px-2">الحالة:</span>
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer py-1 px-2"
                        >
                            <option value="all">الكل</option>
                            <option value="active">نشط</option>
                            <option value="pending">قيد الانتظار</option>
                        </select>
                    </div>

                </div>

                <div className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2.5 rounded-2xl w-full lg:w-auto text-center animate-pulse">
                    ⚡ تم تحديث النتائج والجرافات بناءً على الفلتر الحالي.
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between transition-all">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-xs font-semibold">إجمالي أرباح المنصة</span>
                        <h3 className="text-2xl font-black text-gray-950">{stats.sales}</h3>
                        <span className="text-green-600 text-xs font-bold mt-1">↑ حسب الفترة المحددة</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-inner">
                        📈
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between transition-all">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-xs font-semibold">إجمالي الطلبات</span>
                        <h3 className="text-2xl font-black text-gray-900">{stats.orders}</h3>
                        <span className="text-green-600 text-xs font-bold mt-1">↑ طلبات مؤكدة</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-inner">
                        📦
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between transition-all">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-xs font-semibold">المتاجر النشطة</span>
                        <h3 className="text-2xl font-black text-gray-900">{stats.stores}</h3>
                        <span className="text-purple-600 text-xs font-bold mt-1">نشط بالمنصة</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-inner">
                        🛒
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between transition-all">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-xs font-semibold">متوسط قيمة السلة</span>
                        <h3 className="text-2xl font-black text-gray-900">{stats.avgBasket}</h3>
                        <span className="text-green-600 text-xs font-bold mt-1">⭐ عالي القيمة</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl shadow-inner">
                        💎
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col justify-between gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">معدل نمو الإيرادات (تفاعلي)</h3>
                            <p className="text-gray-400 text-xs mt-1">التدفق المالي</p>
                        </div>
                        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-xl uppercase">{dateRange}</span>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-gray-100 pb-2 px-2">
                        {currentChart.bars.map((height, i) => (
                            <div key={i} className="w-full bg-gray-50 rounded-2xl h-full flex items-end overflow-hidden group">
                                <div 
                                    style={{ height: `${height}%` }} 
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-2xl transition-all duration-700 group-hover:from-blue-700 group-hover:to-blue-500 shadow-md"
                                ></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 font-bold px-1">
                        {currentChart.labels.map((label, index) => (
                            <span key={index}>{label}</span>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">التوزيع الجغرافي</h3>
                        <p className="text-gray-400 text-xs mt-1">نسب الطلبات بحسب المحافظات</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {[
                            { name: "القاهرة", pct: "35%", sales: "54,200 ج.م" },
                            { name: "الجيزة", pct: "25%", sales: "38,100 ج.م" },
                            { name: "الإسكندرية", pct: "20%", sales: "29,400 ج.م" },
                            { name: "باقي المحافظات", pct: "20%", sales: "20,800 ج.م" },
                        ].map((gov, i) => (
                            <div key={i} className="flex flex-col gap-1.5">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-gray-700">{gov.name}</span>
                                    <span className="text-blue-600">{gov.pct}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: gov.pct }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-center">
                        <span className="text-blue-600 text-xs font-bold">📍 القاهرة الكبرى تستحوذ على النصيب الأكبر من الشحن.</span>
                    </div>
                </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                        أعلى المتاجر مبيعاً ({filteredStores.length})
                    </h3>
                    <span className="text-gray-400 text-xs font-semibold">مفلترة حسب القسم والحالة</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                                <th className="pb-4 pr-4">اسم المتجر</th>
                                <th className="pb-4">التصنيف</th>
                                <th className="pb-4">إجمالي المبيعات</th>
                                <th className="pb-4">عدد الطلبات</th>
                                <th className="pb-4">الحالة</th>
                                <th className="pb-4 pl-4 text-left">التقييم</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {filteredStores.length > 0 ? (
                                filteredStores.map((store, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 pr-4 font-bold text-gray-900 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">
                                                #{index + 1}
                                            </span>
                                            {store.name}
                                        </td>
                                        <td className="py-4 text-gray-500 font-medium">
                                            {store.category === 'plumbing' ? 'سباكة وأدوات صحية' : 
                                             store.category === 'paints' ? 'نقاشة ودهانات' : 
                                             store.category === 'electrical' ? 'أدوات كهربائية' : 'مواد بناء'}
                                        </td>
                                        <td className="py-4 font-black text-gray-900">{(store.sales * (dateRange === 'today' ? 0.05 : 1)).toLocaleString()} ج.م</td>
                                        <td className="py-4">
                                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-xl text-xs font-bold">
                                                {Math.round(store.orders * (dateRange === 'today' ? 0.05 : 1))} طلب
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${store.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {store.status === 'active' ? 'نشط' : 'قيد الانتظار'}
                                            </span>
                                        </td>
                                        <td className="py-4 pl-4 text-left font-bold text-amber-500">
                                            ⭐ {store.rating}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-12 text-gray-400 font-medium">
                                        لا توجد متاجر مطابقة لفلاتر البحث الحالية.
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