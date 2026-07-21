import { useState } from "react";

export default function Customers() {
    const [userRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin';
    });

    const [customers, setCustomers] = useState([
        { id: "#CUS-101", name: "اشرف أبو الري", email: "ahmed.m@gmail.com", phone: "01012345678", ordersCount: 12, totalSpent: "5,400 ج.م", status: "نشط", joinDate: "2026-05-10" },
        { id: "#CUS-102", name: "ياسر محمد", email: "mahmoud.h@yahoo.com", phone: "01123456789", ordersCount: 5, totalSpent: "1,250 ج.م", status: "نشط", joinDate: "2026-06-01" },
        { id: "#CUS-103", name: "عبده حمدي", email: "ibrahim.ali@gmail.com", phone: "01234567890", ordersCount: 2, totalSpent: "320 ج.م", status: "موقوف", joinDate: "2026-06-15" },
        { id: "#CUS-104", name: "سارة أحمد", email: "sara.ahmed@gmail.com", phone: "01511223344", ordersCount: 8, totalSpent: "3,890 ج.م", status: "نشط", joinDate: "2026-07-02" },
        { id: "#CUS-105", name: "خالد سعيد", email: "khaled.s@outlook.com", phone: "01098765432", ordersCount: 1, totalSpent: "210 ج.م", status: "نشط", joinDate: "2026-07-12" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredCustomers = customers.filter(customer => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
            customer.name.toLowerCase().includes(query) || 
            customer.email.toLowerCase().includes(query) || 
            customer.phone.includes(query) ||
            customer.id.toLowerCase().includes(query);

        const matchesStatus = filterStatus === "all" || customer.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status) => {
        switch(status) {
            case 'نشط': return 'bg-green-50 text-green-600 border-green-200';
            case 'موقوف': return 'bg-red-50 text-red-600 border-red-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    if (userRole !== 'admin') {
        return (
            <div dir="rtl" className="flex flex-col items-center justify-center min-h-[60vh] gap-4 font-sans text-center px-4">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center text-4xl shadow-inner">
                    🔒
                </div>
                <h1 className="text-2xl font-black text-gray-900">غير مصرح لك بالدخول</h1>
                <p className="text-gray-500 text-sm max-w-md">
                    هذه الصفحة مخصصة لمدير المنصة (Admin) فقط. لا تملك الصلاحيات الكافية لعرض قائمة العملاء.
                </p>
            </div>
        );
    }

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        إدارة العملاء 👥
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        متابعة قائمة عملاء المنصة، إجمالي مشترياتهم، وحالة حساباتهم.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-2xl shadow-sm transition-all text-sm">
                        + إضافة عميل جديد
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="relative w-full md:w-96">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                        🔍
                    </span>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث بالاسم، البريد، أو رقم الهاتف..."
                        className="w-full pr-11 pl-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-gray-50/50"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <span className="text-xs font-bold text-gray-500 ml-2">الحالة:</span>
                    <button 
                        onClick={() => setFilterStatus("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "all" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        الكل
                    </button>
                    <button 
                        onClick={() => setFilterStatus("نشط")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "نشط" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        نشط
                    </button>
                    <button 
                        onClick={() => setFilterStatus("موقوف")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "موقوف" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        موقوف
                    </button>
                </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                        قائمة العملاء ({filteredCustomers.length})
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                                <th className="pb-4 pr-4">معرف العميل</th>
                                <th className="pb-4">الاسم وبيانات التواصل</th>
                                <th className="pb-4">عدد الطلبات</th>
                                <th className="pb-4">إجمالي المشتريات</th>
                                <th className="pb-4">تاريخ الانضمام</th>
                                <th className="pb-4">الحالة</th>
                                <th className="pb-4 pl-4 text-left">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 pr-4 font-bold text-gray-900">{customer.id}</td>
                                        <td className="py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{customer.name}</span>
                                                <span className="text-xs text-gray-400">{customer.email} • {customer.phone}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 font-semibold text-gray-700">
                                            <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-xl text-xs font-bold">
                                                {customer.ordersCount} طلبات
                                            </span>
                                        </td>
                                        <td className="py-4 font-black text-gray-900">{customer.totalSpent}</td>
                                        <td className="py-4 text-gray-400 text-xs">{customer.joinDate}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(customer.status)}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="py-4 pl-4 text-left">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all">
                                                    الملف
                                                </button>
                                                <button className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all">
                                                    حظر
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-12 text-gray-400 font-medium">
                                        لا توجد نتائج مطابقة لعملية البحث.
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