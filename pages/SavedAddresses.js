import { useState } from "react";

export default function SavedAddresses() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            title: "المنزل (الرئيسي)",
            recipientName: "أحمد محمد",
            phone: "01012345678",
            city: "القاهرة",
            area: "مدينة نصر",
            street: "شارع مصطفى النحاس، عمارة 14، الدور الثالث",
            isDefault: true
        },
        {
            id: 2,
            title: "العمل",
            recipientName: "أحمد محمد (قسم الصيانة)",
            phone: "01098765432",
            city: "الجيزة",
            area: "الدقي",
            street: "شارع التحرير، برج الاستثمار، الدور السابع",
            isDefault: false
        }
    ]);

    const handleDelete = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleSetDefault = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    return (
        <div dir="rtl" className="w-full font-sans flex flex-col gap-6 text-right">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">العناوين المحفوظة</h1>
                    <p className="text-gray-400 text-xs mt-1">إدارة عناوين الشحن الخاصة بك لتوصيل أسرع</p>
                </div>
                
                <button 
                    onClick={() => alert("فتح نافذة إضافة عنوان جديد...")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs transition-all shadow-sm flex items-center gap-2"
                >
                    <span>➕</span> إضافة عنوان جديد
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                    <div 
                        key={address.id} 
                        className={`bg-white rounded-3xl border p-6 shadow-sm flex flex-col justify-between gap-4 transition-all hover:shadow-md ${
                            address.isDefault ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-gray-100'
                        }`}
                    >
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shadow-inner">
                                        📍
                                    </div>
                                    <h3 className="font-black text-gray-900 text-sm">{address.title}</h3>
                                </div>
                                {address.isDefault && (
                                    <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-[10px]">
                                        العنوان الافتراضي
                                    </span>
                                )}
                            </div>

                            <div className="text-xs text-gray-600 flex flex-col gap-1.5 mt-2">
                                <p><strong className="text-gray-900">المستلم:</strong> {address.recipientName} ({address.phone})</p>
                                <p><strong className="text-gray-900">المدينة / المنطقة:</strong> {address.city}، {address.area}</p>
                                <p><strong className="text-gray-900">العنوان بالتفصيل:</strong> {address.street}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => alert(`تعديل العنوان ${address.id}`)}
                                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                                >
                                    تعديل
                                </button>
                                <button 
                                    onClick={() => handleDelete(address.id)}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                                >
                                    حذف
                                </button>
                            </div>

                            {!address.isDefault && (
                                <button 
                                    onClick={() => handleSetDefault(address.id)}
                                    className="text-blue-600 hover:text-blue-700 text-xs font-bold transition-all"
                                >
                                    تعيين كافتراضي
                                </button>
                            )}
                        </div>

                    </div>
                ))}
            </div>

            {addresses.length === 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 font-bold shadow-sm">
                    📭 ليس لديك أي عناوين محفوظة حالياً. أضف عنوانك الأول لتسهيل عملية الطلب!
                </div>
            )}

        </div>
    );
}