import { useState } from "react";
import { Link } from "react-router-dom";
import yahyaImage from "../Images/yahyaSaad.png";

export default function Profile() {
    const [user, setUser] = useState({
        name: "يحيى سعد",
        email: "yahyasaad2040@gmail.com",
        phone: "01127471188",
        role: "مدير النظام (Admin)",
        city: "القاهرة - rkh",
        joinDate: "يوليو 2026",
        avatar: yahyaImage
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    const handleSave = (e) => {
        e.preventDefault();
        setUser(formData);
        setIsEditing(false);
    };

    return (
        <div dir="rtl" className="max-w-5xl mx-auto flex flex-col gap-8 pb-12 font-sans">
            
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-40 bg-gradient-to-l from-blue-600 to-blue-400 relative"></div>
                
                <div className="px-6 md:px-10 pb-8 flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 gap-6 text-center md:text-right">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-md bg-white"
                            />
                            <span className="absolute bottom-2 left-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        
                        <div className="flex flex-col gap-1 mt-2 md:mt-0">
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900">{user.name}</h1>
                            <p className="text-gray-500 text-sm font-medium">{user.role}</p>
                            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto md:mx-0 mt-1">
                                منضم منذ {user.joinDate}
                            </span>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-2xl shadow-sm transition-all text-sm"
                    >
                        {isEditing ? "إلغاء التعديل" : "تعديل الملف الشخصي"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                        📦
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-gray-900">24</h4>
                        <p className="text-gray-500 text-xs">الطلبات الكلية</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                        ⭐
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-gray-900">4.9</h4>
                        <p className="text-gray-500 text-xs">تقييمات الحساب</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
                        🛡️
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-gray-900">نشط</h4>
                        <p className="text-gray-500 text-xs">حالة الحساب</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                    {isEditing ? "تعديل البيانات الشخصية" : "المعلومات الشخصية"}
                </h3>

                {isEditing ? (
                    <form onSubmit={handleSave} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">الاسم الكامل</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">البريد الإلكتروني</label>
                                <input 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">رقم الهاتف</label>
                                <input 
                                    type="text" 
                                    value={formData.phone} 
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">المدينة / العنوان</label>
                                <input 
                                    type="text" 
                                    value={formData.city} 
                                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                                    className="p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <button 
                                type="button" 
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
                            >
                                إلغاء
                            </button>
                            <button 
                                type="submit" 
                                className="px-8 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
                            >
                                حفظ التغييرات
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-400">الاسم الكامل</span>
                            <span className="text-gray-900 font-bold text-base">{user.name}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-400">البريد الإلكتروني</span>
                            <span className="text-gray-900 font-bold text-base">{user.email}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-400">رقم الهاتف</span>
                            <span className="text-gray-900 font-bold text-base">{user.phone}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-400">المدينة / العنوان</span>
                            <span className="text-gray-900 font-bold text-base">{user.city}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-400">صلاحية الحساب</span>
                            <span className="text-blue-600 font-bold text-base">{user.role}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">إعدادات الأمان</h3>
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 gap-4">
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">كلمة المرور</h4>
                        <p className="text-gray-500 text-xs mt-0.5">آخر تحديث منذ 3 أشهر</p>
                    </div>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold px-5 py-2 rounded-xl text-xs transition-all shadow-sm">
                        تغيير كلمة المرور
                    </button>
                </div>
            </div>

        </div>
    );
}