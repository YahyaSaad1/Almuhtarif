import { useState } from "react";

export default function Settings() {
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin'; 
    });

    const [formData, setFormData] = useState({
        name: userRole === 'admin' ? 'مدير المنصة العام' : userRole === 'merchant' ? 'متجر الأهرام للسباكة' : 'يحيى سعد',
        email: userRole === 'admin' ? 'yahyasaad2040@gmail.com' : userRole === 'merchant' ? 'ahram.store@gmail.com' : 'ahmed.mahmoud@gmail.com',
        phone: '+20 1012345678',
        address: 'القاهرة، مصر',
        
        commercialRegister: '102938475',
        taxNumber: '987-654-321',
        shippingPolicy: 'التوصيل خلال 24 إلى 48 ساعة كحد أقصى لجميع المحافظات.',
        
        commissionRate: '5',
        maintenanceMode: false,
        
        currentPassword: '',
        newPassword: '',
        
        emailNotifications: true,
        smsNotifications: false,
        whatsappAlerts: true
    });

    const [savedMessage, setSavedMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 3000);
    };

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        إعدادات الحساب والنظام ⚙️
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'admin' && 'إدارة إعدادات المنصة العامة، نسب العمولات، وصلاحيات النظام.'}
                        {userRole === 'merchant' && 'إدارة بيانات متجرك، السياسات التجارية، وتفاصيل الحساب.'}
                        {userRole === 'customer' && 'تعديل بياناتك الشخصية، عناوين الشحنات، وتفضيلات الإشعارات.'}
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                    <span className="text-xs font-bold text-gray-400">معاينة بدور:</span>
                    <select 
                        value={userRole} 
                        onChange={(e) => {
                            setUserRole(e.target.value);
                            localStorage.setItem('userRole', e.target.value);
                        }}
                        className="bg-white text-xs font-bold text-blue-600 focus:outline-none cursor-pointer py-1 px-3 rounded-xl border border-gray-200"
                    >
                        <option value="admin">أدمن المنصة (Admin)</option>
                        <option value="merchant">التاجر (Merchant)</option>
                        <option value="customer">العميل (Customer)</option>
                    </select>
                </div>
            </div>

            {savedMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <span>✅</span> تم حفظ وتحديث الإعدادات بنجاح!
                </div>
            )}

            <form onSubmit={handleSave} className="flex flex-col gap-6">

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        {userRole === 'merchant' ? 'المعلومات الأساسية للمتجر' : 'المعلومات الشخصية'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">
                                {userRole === 'merchant' ? 'اسم المتجر' : 'الاسم الكامل'}
                            </label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">البريد الإلكتروني</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">رقم الهاتف / الجوال</label>
                            <input 
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">العنوان الرئيسي</label>
                            <input 
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {userRole === 'merchant' && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6 animate-fadeIn">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                            بيانات التوثيق والسياسات التجارية 📜
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-600">رقم السجل التجاري</label>
                                <input 
                                    type="text"
                                    name="commercialRegister"
                                    value={formData.commercialRegister}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-600">الرقم الضريبي</label>
                                <input 
                                    type="text"
                                    name="taxNumber"
                                    value={formData.taxNumber}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-xs font-bold text-gray-600">سياسة الشحن والتوصيل الخاصة بالمتجر</label>
                                <textarea 
                                    rows="3"
                                    name="shippingPolicy"
                                    value={formData.shippingPolicy}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}

                {userRole === 'admin' && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6 animate-fadeIn">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                            إعدادات المنصة والتحكم العام 🛡️
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-600">نسبة عمولة المنصة (%) من المبيعات</label>
                                <input 
                                    type="number"
                                    name="commissionRate"
                                    value={formData.commissionRate}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-gray-900">وضع الصيانة العاجلة</span>
                                    <span className="text-[11px] text-gray-400">إيقاف الموقع مؤقتاً للتحديثات والصيانة</span>
                                </div>
                                <input 
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={formData.maintenanceMode}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        الأمان وتغيير كلمة المرور 🔒
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">كلمة المرور الحالية</label>
                            <input 
                                type="password"
                                name="currentPassword"
                                placeholder="••••••••"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">كلمة المرور الجديدة</label>
                            <input 
                                type="password"
                                name="newPassword"
                                placeholder="••••••••"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        تفضيلات الإشعارات 🔔
                    </h3>

                    <div className="flex flex-col gap-4">
                        <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer">
                            <span className="text-xs font-bold text-gray-800">إشعارات البريد الإلكتروني (الطلبات والتحديثات الهامة)</span>
                            <input 
                                type="checkbox"
                                name="emailNotifications"
                                checked={formData.emailNotifications}
                                onChange={handleChange}
                                className="w-5 h-5 accent-blue-600 cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer">
                            <span className="text-xs font-bold text-gray-800">تنبيهات الرسائل النصية القصيرة (SMS)</span>
                            <input 
                                type="checkbox"
                                name="smsNotifications"
                                checked={formData.smsNotifications}
                                onChange={handleChange}
                                className="w-5 h-5 accent-blue-600 cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer">
                            <span className="text-xs font-bold text-gray-800">تنبيهات وتحديثات الواتساب الفورية</span>
                            <input 
                                type="checkbox"
                                name="whatsappAlerts"
                                checked={formData.whatsappAlerts}
                                onChange={handleChange}
                                className="w-5 h-5 accent-blue-600 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-sm transition-all text-sm flex items-center gap-2"
                    >
                        <span>💾</span> حفظ التعديلات
                    </button>
                </div>

            </form>

        </div>
    );
}