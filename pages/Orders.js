import { useState } from "react";

export default function Orders() {
    const [userRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin';
    });

    const [orders, setOrders] = useState([
        { id: "#ORD-9421", client: "اشرف أبو الري", merchant: "متجر النور للسباكة", product: "خلاط مغسلة ستاندرد", qty: 2, total: "900 ج.م", status: "قيد التنفيذ", date: "2026-07-20" },
        { id: "#ORD-9420", client: "ياسر محمد", merchant: "متجر الأمل للدهانات", product: "رولة دهان 25 سم", qty: 1, total: "95 ج.م", status: "مكتمل", date: "2026-07-19" },
        { id: "#ORD-9419", client: "عبده حمدي", merchant: "متجر النور للسباكة", product: "وصلة 20 ملي", qty: 5, total: "75 ج.م", status: "ملغي", date: "2026-07-15" },
        { id: "#ORD-9418", client: "سارة أحمد", merchant: "متجر الأمل للدهانات", product: "دهان بلاستيك أبيض", qty: 2, total: "640 ج.م", status: "مكتمل", date: "2026-07-10" },
        { id: "#ORD-9417", client: "خالد سعيد", merchant: "متجر النور للسباكة", product: "محبس مياه 1 بوصة", qty: 3, total: "210 ج.م", status: "قيد التنفيذ", date: "2026-07-05" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const filteredOrders = orders.filter(order => {
        const matchesRole = userRole === 'admin' || order.merchant === "متجر النور للسباكة";

        const query = searchQuery.toLowerCase();
        const matchesSearch = 
            order.id.toLowerCase().includes(query) || 
            order.client.toLowerCase().includes(query) || 
            order.product.toLowerCase().includes(query);

        const matchesStatus = filterStatus === "all" || order.status === filterStatus;

        const orderDate = new Date(order.date);
        const matchesStartDate = startDate ? orderDate >= new Date(startDate) : true;
        const matchesEndDate = endDate ? orderDate <= new Date(endDate) : true;

        return matchesRole && matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
    });

    const getStatusStyle = (status) => {
        switch(status) {
            case 'مكتمل': return 'bg-green-50 text-green-600 border-green-200';
            case 'قيد التنفيذ': return 'bg-amber-50 text-amber-600 border-amber-200';
            case 'ملغي': return 'bg-red-50 text-red-600 border-red-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {userRole === 'admin' ? "إدارة طلبات المنصة الشاملة 📦" : "طلبات متجري 🛒"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'admin' 
                            ? "متابعة كافة الطلبات الواردة للمتاجر وتحديث حالاتها." 
                            : "متابعة طلبات العملاء الخاصة بمنتجاتك وتجهيزها للشحن."}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
                
                <div className="relative w-full">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                        🔍
                    </span>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث برقم الطلب (مثال: #ORD-9421)، اسم العميل، أو اسم المنتج..."
                        className="w-full pr-11 pl-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-gray-50/50"
                    />
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
                    
                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
                        <span className="text-xs font-bold text-gray-500 ml-2">الحالة:</span>
                        <button 
                            onClick={() => setFilterStatus("all")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "all" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            الكل
                        </button>
                        <button 
                            onClick={() => setFilterStatus("قيد التنفيذ")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "قيد التنفيذ" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            قيد التنفيذ
                        </button>
                        <button 
                            onClick={() => setFilterStatus("مكتمل")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "مكتمل" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            مكتملة
                        </button>
                        <button 
                            onClick={() => setFilterStatus("ملغي")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "ملغي" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            ملغية
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-gray-500">من:</span>
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-600"
                            />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-gray-500">إلى:</span>
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-600"
                            />
                        </div>
                        {(startDate || endDate || searchQuery || filterStatus !== "all") && (
                            <button 
                                onClick={() => { setSearchQuery(""); setFilterStatus("all"); setStartDate(""); setEndDate(""); }}
                                className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-all"
                            >
                                إعادة تعيين
                            </button>
                        )}
                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                        نتائج الطلبات ({filteredOrders.length})
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                                <th className="pb-4 pr-4">رقم الطلب</th>
                                <th className="pb-4">العميل</th>
                                {userRole === 'admin' && <th className="pb-4">المتجر / التاجر</th>}
                                <th className="pb-4">المنتج والكمية</th>
                                <th className="pb-4">الإجمالي</th>
                                <th className="pb-4">التاريخ</th>
                                <th className="pb-4">الحالة</th>
                                <th className="pb-4 pl-4 text-left">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 pr-4 font-bold text-gray-900">{order.id}</td>
                                        <td className="py-4 text-gray-800 font-semibold">{order.client}</td>
                                        
                                        {userRole === 'admin' && (
                                            <td className="py-4 text-blue-600 font-medium text-xs">{order.merchant}</td>
                                        )}

                                        <td className="py-4 text-gray-600">
                                            {order.product} <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md text-gray-500 font-bold mr-1">x{order.qty}</span>
                                        </td>
                                        <td className="py-4 font-black text-gray-900">{order.total}</td>
                                        <td className="py-4 text-gray-400 text-xs">{order.date}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 pl-4 text-left">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all">
                                                    التفاصيل
                                                </button>
                                                {userRole === 'admin' && (
                                                    <button className="bg-gray-50 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-xl font-bold text-xs transition-all">
                                                        تعديل
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={userRole === 'admin' ? 8 : 7} className="text-center py-12 text-gray-400 font-medium">
                                        لا توجد نتائج مطابقة لخيارات البحث أو الفلترة.
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