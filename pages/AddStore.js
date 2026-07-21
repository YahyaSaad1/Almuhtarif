import { useState } from "react";

export default function AddStore() {
    const [storeData, setStoreData] = useState({
        storeName: "",
        ownerName: "",
        email: "",
        phone: "",
        category: "سباكة وأدوات صحية",
        commercialRegister: "",
        taxNumber: "",
        commissionRate: "5",
        address: "",
        logo: null,
        status: "active"
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStoreData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setStoreData(prev => ({
                ...prev,
                logo: e.target.files[0].name
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Store Data Submitted:", storeData);

        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 4000);

        setStoreData({
            storeName: "",
            ownerName: "",
            email: "",
            phone: "",
            category: "سباكة وأدوات صحية",
            commercialRegister: "",
            taxNumber: "",
            commissionRate: "5",
            address: "",
            logo: null,
            status: "active"
        });
    };

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        تسجيل متجر جديد 🏪
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        أضف متجراً جديداً إلى المنصة واربطه ببيانات التاجر والتوثيق التجاري.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="bg-purple-50 text-purple-700 font-bold px-4 py-2 rounded-2xl text-xs border border-purple-100">
                        🛡️ صلاحية أدمن (إدارة المتاجر)
                    </span>
                </div>
            </div>

            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <span>✅</span> تم تسجيل المتجر بنجاح وتم إرسال بيانات الدخول للتاجر!
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        البيانات الأساسية للمتجر 🏷️
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">اسم المتجر</label>
                            <input 
                                type="text"
                                name="storeName"
                                required
                                placeholder="مثال: متجر النور للأدوات الصحية"
                                value={storeData.storeName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">القسم الرئيسي للنشاط</label>
                            <select 
                                name="category"
                                value={storeData.category}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                                <option value="سباكة وأدوات صحية">سباكة وأدوات صحية</option>
                                <option value="نقاشة ودهانات">نقاشة ودهانات</option>
                                <option value="أدوات كهربائية">أدوات كهربائية</option>
                                <option value="مواد بناء">مواد بناء</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        معلومات مالك المتجر (حساب التاجر) 👤
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">اسم المالك الكامل</label>
                            <input 
                                type="text"
                                name="ownerName"
                                required
                                placeholder="مثال: محمود حسن إبراهيم"
                                value={storeData.ownerName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">البريد الإلكتروني (لتسجيل الدخول)</label>
                            <input 
                                type="email"
                                name="email"
                                required
                                placeholder="merchant@store.com"
                                value={storeData.email}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">رقم الهاتف / الواتساب</label>
                            <input 
                                type="text"
                                name="phone"
                                required
                                placeholder="+20 1012345678"
                                value={storeData.phone}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        البيانات القانونية والعمولات 📜
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">رقم السجل التجاري</label>
                            <input 
                                type="text"
                                name="commercialRegister"
                                placeholder="102938475"
                                value={storeData.commercialRegister}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">الرقم الضريبي</label>
                            <input 
                                type="text"
                                name="taxNumber"
                                placeholder="987-654-321"
                                value={storeData.taxNumber}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">نسبة العمولة الخاصة بالمتجر (%)</label>
                            <input 
                                type="number"
                                name="commissionRate"
                                value={storeData.commissionRate}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-3">
                            <label className="text-xs font-bold text-gray-600">العنوان التفصيلي للمتجر / المخزن</label>
                            <input 
                                type="text"
                                name="address"
                                placeholder="شارع الجمهورية، عمارة 14، الدور الثاني - القاهرة"
                                value={storeData.address}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        شعار المتجر وحالة التفعيل 🖼️
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex flex-col gap-4">
                            <label className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50/50">
                                <span className="text-2xl">📁</span>
                                <span className="text-xs font-bold text-gray-700">ارفع شعار (لوجو) المتجر هنا</span>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>
                            {storeData.logo && (
                                <span className="text-xs font-bold text-blue-600">📎 تم إرفاق الملف: {storeData.logo}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">حالة المتجر عند الإضافة</label>
                            <select 
                                name="status"
                                value={storeData.status}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                                <option value="active">نشط ومفعل فوراً ✅</option>
                                <option value="suspended">معلق (تحت المراجعة) 🚫</option>
                            </select>
                            <span className="text-[11px] text-gray-400 mt-1">المتاجر النشطة يمكنها إضافة منتجات وعرضها للعملاء فوراً.</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <button 
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 px-6 rounded-2xl text-xs transition-all"
                    >
                        إلغاء
                    </button>
                    <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-sm transition-all text-xs flex items-center gap-2"
                    >
                        <span>🚀</span> حفظ وتسجيل المتجر
                    </button>
                </div>

            </form>

        </div>
    );
}