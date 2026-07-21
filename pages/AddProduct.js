import { useState } from "react";

export default function AddProduct() {
    const [userRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin'; 
    });

    const storesList = [
        { id: "s1", name: "متجر الأهرام للسباكة" },
        { id: "s2", name: "العاصمة للدهانات والديكور" },
        { id: "s3", name: "النور للأدوات الكهربائية" },
        { id: "s4", name: "المهندس لمستلزمات البناء" },
    ];

    const [productData, setProductData] = useState({
        storeId: storesList[0].id,
        name: "",
        category: "plumbing",
        price: "",
        discountPrice: "",
        stock: "",
        sku: "",
        description: "",
        image: null,
        isFeatured: false,
        status: "active"
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProductData(prev => ({
                ...prev,
                image: e.target.files[0].name
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Data Submitted:", productData);
        
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 4000);

        setProductData({
            storeId: storesList[0].id,
            name: "",
            category: "plumbing",
            price: "",
            discountPrice: "",
            stock: "",
            sku: "",
            description: "",
            image: null,
            isFeatured: false,
            status: "active"
        });
    };

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        إضافة منتج جديد 📦
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'admin' 
                            ? 'أضف منتج جديد لأي متجر بالمنصة وحدد تفاصيله بدقة.' 
                            : 'أضف منتجاً جديداً لقائمة متجرك ليظهر للعملاء فوراً.'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-2xl text-xs border border-blue-100">
                        {userRole === 'admin' ? '🛡️ صلاحية أدمن (إدارة شاملة)' : '🛒 صلاحية تاجر (متجرك الخاص)'}
                    </span>
                </div>
            </div>

            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <span>✅</span> تم إضافة المنتج بنجاح وأصبح متاحاً الآن في المتجر!
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {userRole === 'admin' ? (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                            المتجر المستهدف 🛒
                        </h3>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">اختر المتجر الذي سيعرض هذا المنتج</label>
                            <select 
                                name="storeId"
                                value={productData.storeId}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                                {storesList.map(store => (
                                    <option key={store.id} value={store.id}>{store.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="bg-blue-50/50 rounded-3xl border border-blue-100 p-6 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-blue-600 font-bold">إضافة منتج تابع لـ:</span>
                            <h4 className="text-base font-black text-gray-900">متجر الأهرام للسباكة (متجرك)</h4>
                        </div>
                        <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg">🏪</span>
                    </div>
                )}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        تفاصيل المنتج الأساسية 📝
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-600">اسم المنتج</label>
                            <input 
                                type="text"
                                name="name"
                                required
                                placeholder="مثال: خلاط حوض مطبخ تركي فاخر"
                                value={productData.name}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">القسم الرئيسي</label>
                            <select 
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                                <option value="plumbing">سباكة وأدوات صحية</option>
                                <option value="paints">نقاشة ودهانات</option>
                                <option value="electrical">أدوات كهربائية</option>
                                <option value="building">مواد بناء</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">كود المنتج (SKU)</label>
                            <input 
                                type="text"
                                name="sku"
                                placeholder="PRD-94821"
                                value={productData.sku}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">السعر الأساسي (ج.م)</label>
                            <input 
                                type="number"
                                name="price"
                                required
                                placeholder="1250"
                                value={productData.price}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">سعر العرض / التخفيض (اختياري)</label>
                            <input 
                                type="number"
                                name="discountPrice"
                                placeholder="1100"
                                value={productData.discountPrice}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        المخزون ووصف المنتج 📊
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">الكمية المتوفرة بالمخزون</label>
                            <input 
                                type="number"
                                name="stock"
                                required
                                placeholder="45"
                                value={productData.stock}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-600">حالة النشر</label>
                            <select 
                                name="status"
                                value={productData.status}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                                <option value="active">نشط (يظهر للعملاء فوراً)</option>
                                <option value="draft">مسودة (غير مرئي)</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-600">وصف المنتج التفصيلي</label>
                            <textarea 
                                rows="4"
                                name="description"
                                placeholder="اكتب تفاصيل ومميزات المنتج ومواصفاته الفنية..."
                                value={productData.description}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                        صور المنتج والوسائط 🖼️
                    </h3>

                    <div className="flex flex-col gap-4">
                        <label className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50/50">
                            <span className="text-3xl">📁</span>
                            <span className="text-xs font-bold text-gray-700">اسحب صورة المنتج هنا أو اضغط للاختيار</span>
                            <span className="text-[10px] text-gray-400">PNG, JPG, WEBP (الحد الأقصى 5MB)</span>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        {productData.image && (
                            <div className="flex items-center justify-between bg-blue-50/50 border border-blue-100 p-3 rounded-2xl">
                                <span className="text-xs font-bold text-blue-700">📎 تم إرفاق الصورة: {productData.image}</span>
                                <button 
                                    type="button" 
                                    onClick={() => setProductData(prev => ({ ...prev, image: null }))}
                                    className="text-xs text-red-600 font-bold hover:underline"
                                >
                                    حذف
                                </button>
                            </div>
                        )}

                        <div className="flex items-center gap-2 pt-2">
                            <input 
                                type="checkbox"
                                name="isFeatured"
                                id="isFeatured"
                                checked={productData.isFeatured}
                                onChange={handleChange}
                                className="w-5 h-5 accent-blue-600 cursor-pointer"
                            />
                            <label htmlFor="isFeatured" className="text-xs font-bold text-gray-800 cursor-pointer">
                                تعيين كمنتج مميز (يظهر في قسم العروض الكبرى بالرئيسية ⭐)
                            </label>
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
                        <span>🚀</span> نشر وإضافة المنتج
                    </button>
                </div>

            </form>

        </div>
    );
}