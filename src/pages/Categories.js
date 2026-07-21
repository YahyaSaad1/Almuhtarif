import { useState } from "react";

export default function Categories({ userRole = 'admin' }) {
    const [categories, setCategories] = useState([
        { id: 1, name: "السباكة والأدوات الصحية", slug: "plumbing", productsCount: 34, icon: "🔧", status: "نشط", createdDate: "2026-01-10" },
        { id: 2, name: "النقاشة والدهانات", slug: "paints", productsCount: 22, icon: "🎨", status: "نشط", createdDate: "2026-01-15" },
        { id: 3, name: "الكهرباء والإضاءة", slug: "electrical", productsCount: 18, icon: "💡", status: "نشط", createdDate: "2026-02-01" },
        { id: 4, name: "العدوات اليدوية", slug: "tools", productsCount: 10, icon: "🛠️", status: "موقوف", createdDate: "2026-03-12" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryIcon, setNewCategoryIcon] = useState("📦");

    const filteredCategories = categories.filter(cat => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = cat.name.toLowerCase().includes(query) || cat.slug.toLowerCase().includes(query);
        const matchesStatus = filterStatus === "all" || cat.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (userRole !== 'admin') return;
        if (!newCategoryName.trim()) return;

        const newCat = {
            id: categories.length + 1,
            name: newCategoryName,
            slug: `cat-${Date.now()}`,
            productsCount: 0,
            icon: newCategoryIcon,
            status: "نشط",
            createdDate: new Date().toISOString().split('T')[0]
        };

        setCategories([newCat, ...categories]);
        setNewCategoryName("");
        setIsAddModalOpen(false);
    };

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {userRole === 'admin' ? "إدارة أقسام المنصة 🗂️" : "أقسام التصنيف المتاحة 📂"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'admin' 
                            ? "التحكم الكامل في إضافة وتعديل وحذف أقسام المنتجات على مستوى المنصة." 
                            : "استعراض الأقسام والتصنيفات المعتمدة لإضافة منتجاتك تحتها بشكل صحيح."}
                    </p>
                </div>

                {userRole === 'admin' && (
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-2xl shadow-sm transition-all text-sm flex items-center gap-2"
                    >
                        <span>+</span> إضافة قسم جديد
                    </button>
                )}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                        🔍
                    </span>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث باسم القسم..."
                        className="w-full pr-11 pl-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-gray-50/50"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-xs font-bold text-gray-500 ml-1">الحالة:</span>
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
                    {userRole === 'admin' && (
                        <button 
                            onClick={() => setFilterStatus("موقوف")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === "موقوف" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            موقوف
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                
                <h3 className="text-xl font-bold text-gray-900">
                    {userRole === 'admin' ? "كافة أقسام المنصة" : "اختر قسماً لإضافة منتجاتك"} ({filteredCategories.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat) => (
                            <div key={cat.id} className="bg-gray-50/60 border border-gray-100 p-6 rounded-3xl flex flex-col justify-between gap-6 hover:shadow-md transition-all group">
                                <div className="flex items-start justify-between">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                        {cat.icon}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${cat.status === 'نشط' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {cat.status}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <h4 className="text-lg font-black text-gray-900">{cat.name}</h4>
                                    <p className="text-xs text-gray-400 font-medium">
                                        {userRole === 'admin' ? "إجمالي المنتجات:" : "المنتجات المتاحة بالقسم:"} 
                                        <span className="font-bold text-gray-700 mr-1">{cat.productsCount} منتج</span>
                                    </p>
                                </div>

                                {userRole === 'admin' ? (
                                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200/60">
                                        <button className="flex-1 bg-white hover:bg-blue-600 hover:text-white text-blue-600 py-2 rounded-xl font-bold text-xs shadow-sm transition-all border border-gray-100">
                                            تعديل
                                        </button>
                                        <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 px-3 py-2 rounded-xl font-bold text-xs shadow-sm transition-all border border-gray-100">
                                            حذف
                                        </button>
                                    </div>
                                ) : (
                                    <div className="pt-4 border-t border-gray-200/60">
                                        <button className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm">
                                            + إضافة منتج بهذا القسم
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400 font-medium">
                            لا توجد أقسام مطابقة للبحث.
                        </div>
                    )}
                </div>

            </div>

            {userRole === 'admin' && isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 md:p-8 flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-gray-900">إضافة قسم جديد للمنصة</h3>
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-700">اسم القسم</label>
                                <input 
                                    type="text" 
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="أدخل اسم القسم (مثال: أدوات حديقة)"
                                    required
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-gray-50"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-700">رمز القسم (الإيموجي)</label>
                                <input 
                                    type="text" 
                                    value={newCategoryIcon}
                                    onChange={(e) => setNewCategoryIcon(e.target.value)}
                                    placeholder="🛠️"
                                    maxLength={2}
                                    className="w-20 px-4 py-3 text-center rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-600 text-lg bg-gray-50"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <button 
                                    type="submit" 
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-sm transition-all text-sm"
                                >
                                    حفظ القسم
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-2xl transition-all text-sm"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}