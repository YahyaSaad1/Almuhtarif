import { useState } from "react";

export default function MyOrders() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const orders = [
        {
            id: "#45872",
            date: "18 مايو 2024 - 10:30 ص",
            totalAmount: 660,
            paymentMethod: "الدفع عند الاستلام",
            status: "processing",
            statusText: "جاري التجهيز",
            itemsCount: 4,
            items: [
                { id: 1, image: "🔧" },
                { id: 2, image: "🔩" },
                { id: 3, image: "🟢" },
                { id: 4, image: "🚰" }
            ],
            extraCount: "+1"
        },
        {
            id: "#45790",
            date: "17 مايو 2024 - 04:15 م",
            totalAmount: 1240,
            paymentMethod: "الدفع عند الاستلام",
            status: "on-the-way",
            statusText: "في الطريق",
            itemsCount: 3,
            items: [
                { id: 1, image: "🚰" },
                { id: 2, image: "🟢" },
                { id: 3, image: "🔩" }
            ]
        },
        {
            id: "#45621",
            date: "16 مايو 2024 - 02:45 م",
            totalAmount: 870,
            paymentMethod: "الدفع عند الاستلام",
            status: "delivered",
            statusText: "تم التسليم",
            itemsCount: 5,
            items: [
                { id: 1, image: "🔧" },
                { id: 2, image: "🔩" },
                { id: 3, image: "🚰" },
                { id: 4, image: "🟢" }
            ],
            extraCount: "+1"
        },
        {
            id: "#45510",
            date: "12 مايو 2024 - 10:00 ص",
            totalAmount: 310,
            paymentMethod: "الدفع عند الاستلام",
            status: "cancelled",
            statusText: "ملغي",
            itemsCount: 5,
            items: [
                { id: 1, image: "🔩" },
                { id: 2, image: "🪣" }
            ]
        }
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'processing':
                return "bg-amber-50 text-amber-500 font-bold";
            case 'on-the-way':
                return "bg-sky-50 text-sky-500 font-bold";
            case 'delivered':
                return "bg-emerald-50 text-emerald-600 font-bold";
            case 'cancelled':
                return "bg-rose-50 text-rose-500 font-bold";
            default:
                return "bg-gray-50 text-gray-500";
        }
    };

    return (
        <div dir="rtl" className="w-full font-sans flex flex-col gap-6 text-right">
            
            <div>
                <h1 className="text-2xl font-black text-gray-900">طلباتي</h1>
                <p className="text-gray-400 text-xs mt-1">هنا يمكنك متابعة جميع طلباتك</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="relative md:col-span-8">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder="ابحث برقم الطلب ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-3 pr-11 pl-4 text-xs text-gray-700 shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="md:col-span-4">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-3 px-4 text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value="all">كل الطلبات</option>
                        <option value="processing">جاري التجهيز</option>
                        <option value="on-the-way">في الطريق</option>
                        <option value="delivered">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {orders.map((order, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:shadow-md"
                    >
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-black text-gray-900">{order.id}</h3>
                                <span className={`text-[11px] px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}>
                                    {order.statusText}
                                </span>
                            </div>

                            <span className="text-[11px] text-gray-400 font-medium">
                                {order.date}
                            </span>

                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-400 ml-1">{order.itemsCount} منتجات</span>
                                <div className="flex items-center -space-x-2 space-x-reverse gap-x-2 lg:gap-x-5">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-base shadow-sm">
                                            {item.image}
                                        </div>
                                    ))}
                                    {order.extraCount && (
                                        <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                                            {order.extraCount}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* القسم الأيسر: الإجمالي، طريقة الدفع، ورار التفاصيل */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-50 gap-4">
                            <div className="text-right md:text-left">
                                <span className="text-[10px] text-gray-400 block font-medium">المجموع</span>
                                <span className="text-base font-black text-gray-900">
                                    {order.totalAmount} <span className="text-xs font-bold text-gray-500">ج.م</span>
                                </span>
                                <span className="text-[10px] text-gray-400 block mt-0.5">{order.paymentMethod}</span>
                            </div>

                            <button 
                                onClick={() => alert(`عرض تفاصيل الطلب ${order.id}`)}
                                className="bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-100 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm"
                            >
                                عرض التفاصيل
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* أزرار التنقل بين الصفحات (Pagination) */}
            <div className="flex items-center justify-center gap-2 pt-4">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-50 shadow-sm"
                >
                    السابق &larr;
                </button>
                
                <button 
                    onClick={() => setCurrentPage(1)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold shadow-sm transition-all ${currentPage === 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-700'}`}
                >
                    1
                </button>
                <button 
                    onClick={() => setCurrentPage(2)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold shadow-sm transition-all ${currentPage === 2 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-700'}`}
                >
                    2
                </button>
                <button 
                    onClick={() => setCurrentPage(3)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold shadow-sm transition-all ${currentPage === 3 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-700'}`}
                >
                    3
                </button>

                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
                    className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-50 shadow-sm"
                >
                    &rarr; التالي
                </button>
            </div>

        </div>
    );
}