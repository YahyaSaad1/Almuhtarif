import { useState } from "react";

export default function ReviewsManagement() {
    const [userRole] = useState(() => {
        return localStorage.getItem('userRole') || 'admin'; 
    });

    const [filterRating, setFilterRating] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [replyText, setReplyText] = useState({});
    const [activeReplyBox, setActiveReplyBox] = useState(null);

    const [reviews, setReviews] = useState([
        { 
            id: 1, 
            storeName: "متجر الأهرام للسباكة", 
            merchantId: "m1", 
            clientName: "اشرف أبو الري", 
            clientUsername: "ahmed_m",
            rating: 5, 
            comment: "خدمة ممتازة جداً وتوصيل سريع في نفس اليوم، الأدوات جودتها عالية ومطابقة للصورة.", 
            date: "2026-07-20", 
            status: "published",
            reply: "شكراً لك يا فندم، سعدنا بخدمتك ودائماً في الخدمة!"
        },
        { 
            id: 2, 
            storeName: "العاصمة للدهانات والديكور", 
            merchantId: "m2", 
            clientName: "محمود حسن", 
            clientUsername: "mahmoud_h",
            rating: 2, 
            comment: "التوصيل تأخر عن الميعاد المحدد بيومين، ودرجة اللون طلعت مختلفة عن اللي طلبناها.", 
            date: "2026-07-19", 
            status: "published",
            reply: ""
        },
        { 
            id: 3, 
            storeName: "متجر الأهرام للسباكة", 
            merchantId: "m1", 
            clientName: "إبراهيم السيد", 
            clientUsername: "ibrahim_s",
            rating: 4, 
            comment: "المنتج ممتاز بس الأسعار مرتفعة شوية مقارنة بالسوق.", 
            date: "2026-07-18", 
            status: "published",
            reply: ""
        },
        { 
            id: 4, 
            storeName: "النور للأدوات الكهربائية", 
            merchantId: "m3", 
            clientName: "مصطفى عبد الله", 
            clientUsername: "mostafa_a",
            rating: 1, 
            comment: "تجربة سيئة، المفتاح الكهربائي تالف ومش شغال واتصلت بالدعم محدش رد.", 
            date: "2026-07-17", 
            status: "hidden",
            reply: ""
        },
    ]);

    const toggleReviewStatus = (id) => {
        setReviews(reviews.map(rev => {
            if (rev.id === id) {
                const newStatus = rev.status === 'published' ? 'hidden' : 'published';
                return { ...rev, status: newStatus };
            }
            return rev;
        }));
    };

    const handleSendReply = (id) => {
        if (!replyText[id]) return;
        setReviews(reviews.map(rev => {
            if (rev.id === id) {
                return { ...rev, reply: replyText[id] };
            }
            return rev;
        }));
        setActiveReplyBox(null);
    };

    const filteredReviews = reviews.filter(rev => {
        let matchesRole = true;

        if (userRole === 'merchant') {
            matchesRole = rev.merchantId === "m1";
        } else if (userRole === 'client') {
            matchesRole = rev.clientUsername === "ahmed_m";
        }

        const matchesRating = filterRating === "all" || rev.rating.toString() === filterRating;
        const matchesSearch = rev.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              rev.storeName.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesRole && matchesRating && matchesSearch;
    });

    const averageRating = filteredReviews.length > 0 
        ? (filteredReviews.reduce((acc, item) => acc + item.rating, 0) / filteredReviews.length).toFixed(1) 
        : "0.0";

    return (
        <div dir="rtl" className="flex flex-col gap-8 pb-12 font-sans">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {userRole === 'admin' && 'إدارة تقييمات المنصة ⭐'}
                        {userRole === 'merchant' && 'تقييمات العملاء لمتجرك ⭐'}
                        {userRole === 'client' && 'تقييماتي السابقة ⭐'}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'admin' && 'مراقبة آراء العملاء، الرد على الاستفسارات، وإدارة المحتوى المخالف.'}
                        {userRole === 'merchant' && 'تابع آراء ومقترحات عملائك لتحسين جودة منتجاتك وخدماتك.'}
                        {userRole === 'client' && 'استعرض التقييمات والآراء التي قمت بمشاركتها على المنتجات والتاجر.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="bg-amber-50 text-amber-600 font-black px-4 py-2.5 rounded-2xl text-sm border border-amber-100 flex items-center gap-2">
                        ⭐ متوسط التقييم: {averageRating} / 5.0
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="w-full md:w-96 relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">🔍</span>
                    <input 
                        type="text"
                        placeholder={userRole === 'client' ? "ابحث في تعليقاتك أو المتاجر..." : "ابحث باسم العميل أو نص التعليق..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2.5 pr-11 pl-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap">فلتر بالتقييم:</span>
                    {["all", "5", "4", "3", "2", "1"].map((rate) => (
                        <button
                            key={rate}
                            onClick={() => setFilterRating(rate)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                filterRating === rate 
                                    ? 'bg-blue-600 text-white shadow-sm' 
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            {rate === "all" ? "الكل" : `${rate} نجوم ⭐`}
                        </button>
                    ))}
                </div>

            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <div 
                            key={review.id} 
                            className={`bg-white rounded-3xl border p-6 md:p-8 shadow-sm flex flex-col gap-4 transition-all ${
                                review.status === 'hidden' ? 'border-red-100 bg-red-50/20 opacity-75' : 'border-gray-100'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 font-black text-lg flex items-center justify-center shadow-inner">
                                        {review.clientName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-900 text-base">{review.clientName}</h4>
                                            {(userRole === 'admin' || userRole === 'client') && (
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-lg font-medium">
                                                    🛒 {review.storeName}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-gray-400 text-xs mt-0.5 block">{review.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 text-amber-500 font-black text-xs">
                                        {"⭐".repeat(review.rating)}
                                        <span className="text-gray-700 mr-1">({review.rating}/5)</span>
                                    </div>

                                    {userRole === 'admin' && (
                                        <button 
                                            onClick={() => toggleReviewStatus(review.id)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                                review.status === 'published' 
                                                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                                            }`}
                                        >
                                            {review.status === 'published' ? 'إخفاء التعليق 🚫' : 'إعادة إظهار ✅'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                "{review.comment}"
                            </p>

                            {review.reply && (
                                <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex flex-col gap-1 mr-6 md:mr-10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-blue-700">رد إدارة المتجر:</span>
                                        <span className="text-[10px] text-gray-400">تم الرد رسمياً</span>
                                    </div>
                                    <p className="text-gray-600 text-xs font-medium">{review.reply}</p>
                                </div>
                            )}

                            {userRole !== 'client' && (
                                <div className="flex items-center justify-between pt-2">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                        review.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                    }`}>
                                        {review.status === 'published' ? 'منشور بالمنصة' : 'مخفي (غير مرئي للعملاء)'}
                                    </span>

                                    <button 
                                        onClick={() => setActiveReplyBox(activeReplyBox === review.id ? null : review.id)}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-all"
                                    >
                                        {activeReplyBox === review.id ? 'إغلاق الرد' : (review.reply ? 'تعديل الرد ✍️' : 'الرد على العميل 💬')}
                                    </button>
                                </div>
                            )}

                            {userRole !== 'client' && activeReplyBox === review.id && (
                                <div className="flex flex-col gap-3 pt-3 border-t border-gray-100 animate-fadeIn">
                                    <textarea 
                                        rows="2"
                                        placeholder="اكتب ردك هنا ليوجّه للعميل..."
                                        value={replyText[review.id] || review.reply || ""}
                                        onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500"
                                    ></textarea>
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => setActiveReplyBox(null)}
                                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200"
                                        >
                                            إلغاء
                                        </button>
                                        <button 
                                            onClick={() => handleSendReply(review.id)}
                                            className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm"
                                        >
                                            حفظ ونشر الرد 🚀
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                            📭
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">لا توجد تقييمات مطابقة</h3>
                        <p className="text-gray-400 text-xs max-w-sm">
                            لم يتم العثور على أي تقييمات تتطابق مع خيارات البحث أو الفلتر الحالي لديك.
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}