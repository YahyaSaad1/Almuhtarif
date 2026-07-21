import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [userRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin';
    });

    const recentOrders = [
        { id: "#ORD-9421", client: "اشرف أبو الري", service: "سباكة - خلاط مغسلة", total: "450 ج.م", status: "قيد التنفيذ", statusColor: "bg-amber-50 text-amber-600" },
        { id: "#ORD-9420", client: "ياسر محمد", service: "نقاشة - رولة دهان", total: "95 ج.م", status: "مكتمل", statusColor: "bg-green-50 text-green-600" },
        { id: "#ORD-9419", client: "عبده حمدي", service: "سباكة - وصلة 20 ملي", total: "15 ج.م", status: "ملغي", statusColor: "bg-red-50 text-red-600" },
    ];

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {userRole === 'admin' ? "أهلاً بك يا أدمن (لوحة التحكم الشاملة) 👋" : "أهلاً بك يا تاجر (لوحة تحكم المتجر) 🛒"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'admin' 
                            ? "متابعة أداء المنصة، المتاجر، والتقارير العامة." 
                            : "إدارة منتجاتك، متابعة طلبات عملائك، وزيادة مبيعاتك."}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link 
                        to="/products/add" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-2xl shadow-sm transition-all text-sm"
                    >
                        + إضافة منتج جديد
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-xs font-semibold">
                            {userRole === 'admin' ? "إجمالي مبيعات المنصة" : "مبيعات متجرك"}
                        </span>
                        <h3 className="text-2xl font-black text-gray-950">
                            {userRole === 'admin' ? "24,580 ج.م" : "8,420 ج.م"}
                        </h3>
                        <span className="text-green-600 text-xs font-bold mt-1">↑ +12% هذا الشهر</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-inner">
                        💰
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-xs font-semibold">
                            {userRole === 'admin' ? "إجمالي الطلبات" : "طلبات منتجاتك"}
                        </span>
                        <h3 className="text-2xl font-black text-gray-900">
                            {userRole === 'admin' ? "142 طلب" : "45 طلب"}
                        </h3>
                        <span className="text-green-600 text-xs font-bold mt-1">↑ طلبات جديدة اليوم</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-inner">
                        📦
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-xs font-semibold">منتجاتك النشطة</span>
                        <h3 className="text-2xl font-black text-gray-900">
                            {userRole === 'admin' ? "84 منتج (كل المنصة)" : "18 منتج"}
                        </h3>
                        <span className="text-gray-400 text-xs font-medium mt-1">قيد البيع</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-inner">
                        🛠️
                    </div>
                </div>

                {userRole === 'admin' ? (
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-400 text-xs font-semibold">إجمالي العملاء</span>
                            <h3 className="text-2xl font-black text-gray-900">512 عميل</h3>
                            <span className="text-green-600 text-xs font-bold mt-1">↑ +38 عميل جديد</span>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl shadow-inner">
                            👥
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-400 text-xs font-semibold">تقييم المتجر</span>
                            <h3 className="text-2xl font-black text-gray-900">4.8 / 5</h3>
                            <span className="text-amber-500 text-xs font-bold mt-1">⭐ ممتاز</span>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl shadow-inner">
                            ⭐
                        </div>
                    </div>
                )}

            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                        {userRole === 'admin' ? "أحدث طلبات المنصة" : "أحدث طلبات منتجاتك"}
                    </h3>
                    <Link to="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-bold">
                        عرض الكل ←
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                                <th className="pb-4 pr-4">رقم الطلب</th>
                                <th className="pb-4">العميل</th>
                                <th className="pb-4">المنتج</th>
                                <th className="pb-4">الإجمالي</th>
                                <th className="pb-4">الحالة</th>
                                <th className="pb-4 pl-4 text-left">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 pr-4 font-bold text-gray-900">{order.id}</td>
                                    <td className="py-4 text-gray-700 font-medium">{order.client}</td>
                                    <td className="py-4 text-gray-500">{order.service}</td>
                                    <td className="py-4 font-bold text-gray-900">{order.total}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 pl-4 text-left">
                                        <button className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-xl font-semibold text-xs transition-all">
                                            التفاصيل
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-bold">إدارة المنتجات</h4>
                        <p className="text-blue-100 text-xs leading-relaxed">
                            {userRole === 'admin' ? "التحكم في كافة منتجات المنصة وتعديلها." : "إضافة منتجات جديدة لمتجرك الخاص."}
                        </p>
                    </div>
                    <Link to="/products" className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-2.5 px-5 rounded-xl text-xs w-fit transition-all shadow-sm">
                        الانتقال للمنتجات
                    </Link>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-bold">العروض والخصومات</h4>
                        <p className="text-gray-300 text-xs leading-relaxed">إنشاء عروض ترويجية لزيادة المبيعات.</p>
                    </div>
                    <Link to="/offers" className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-2.5 px-5 rounded-xl text-xs w-fit transition-all shadow-sm">
                        إدارة العروض
                    </Link>
                </div>

                {userRole === 'admin' ? (
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-lg font-bold">إدارة المتاجر</h4>
                            <p className="text-amber-100 text-xs leading-relaxed">مراجعة المتاجر الجديدة واعتمادها.</p>
                        </div>
                        <Link to="/stores" className="bg-white text-amber-600 hover:bg-amber-50 font-bold py-2.5 px-5 rounded-xl text-xs w-fit transition-all shadow-sm">
                            عرض المتاجر
                        </Link>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-lg font-bold">أرباح المتجر</h4>
                            <p className="text-green-100 text-xs leading-relaxed">سحب الأرباح ومراجعة التقارير المالية.</p>
                        </div>
                        <Link to="/reports" className="bg-white text-green-600 hover:bg-green-50 font-bold py-2.5 px-5 rounded-xl text-xs w-fit transition-all shadow-sm">
                            التقارير المالية
                        </Link>
                    </div>
                )}

            </div>

        </div>
    );
}