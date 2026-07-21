import { useState } from "react";

export default function PaymentMethods() {
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: "visa",
            cardNumber: "**** **** **** 4242",
            cardHolder: "أحمد محمد",
            expiryDate: "08/28",
            isDefault: true,
            icon: "💳"
        },
        {
            id: 2,
            type: "mastercard",
            cardNumber: "**** **** **** 8888",
            cardHolder: "أحمد محمد",
            expiryDate: "12/27",
            isDefault: false,
            icon: "💳"
        }
    ]);

    const handleDelete = (id) => {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    };

    const handleSetDefault = (id) => {
        setPaymentMethods(paymentMethods.map(method => ({
            ...method,
            isDefault: method.id === id
        })));
    };

    return (
        <div dir="rtl" className="w-full font-sans flex flex-col gap-6 text-right">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">طرق الدفع</h1>
                    <p className="text-gray-400 text-xs mt-1">إدارة بطاقاتك الائتمانية ووسائل الدفع المحفوظة لعمليات تسوق أسرع وأمان تام</p>
                </div>
                
                <button 
                    onClick={() => alert("فتح نافذة إضافة بطاقة دفع جديدة...")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs transition-all shadow-sm flex items-center gap-2"
                >
                    <span>➕</span> إضافة بطاقة جديدة
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-inner font-bold">
                        💵
                    </div>
                    <div>
                        <h3 className="font-black text-gray-900 text-sm">الدفع عند الاستلام</h3>
                        <p className="text-gray-400 text-xs mt-0.5">ادفع نقداً أو بالبطاقة عند استلام طلبك من مندوب التوصيل</p>
                    </div>
                </div>
                <span className="bg-emerald-50 text-emerald-600 font-bold px-4 py-1.5 rounded-full text-xs">
                    متاح دائماً ✅
                </span>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-gray-700">البطاقات الائتمانية المحفوظة</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                        <div 
                            key={method.id} 
                            className={`bg-white rounded-3xl border p-6 shadow-sm flex flex-col justify-between gap-6 transition-all hover:shadow-md ${
                                method.isDefault ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-gray-100'
                            }`}
                        >
                            
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-inner">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 text-sm tracking-widest">{method.cardNumber}</h4>
                                        <span className="text-gray-400 text-[11px] block mt-0.5">المستفيد: {method.cardHolder} | تنتهي في: {method.expiryDate}</span>
                                    </div>
                                </div>
                                
                                {method.isDefault && (
                                    <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-[10px]">
                                        الافتراضية
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <button 
                                    onClick={() => handleDelete(method.id)}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                                >
                                    حذف البطاقة
                                </button>

                                {!method.isDefault && (
                                    <button 
                                        onClick={() => handleSetDefault(method.id)}
                                        className="text-blue-600 hover:text-blue-700 text-xs font-bold transition-all"
                                    >
                                        تعيين كافتراضية
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {paymentMethods.length === 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center text-gray-400 font-bold text-xs shadow-sm">
                    📭 ليس لديك أي بطاقات ائتمانية محفوظة حالياً.
                </div>
            )}

        </div>
    );
}