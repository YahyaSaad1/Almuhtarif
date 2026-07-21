import { useState } from "react";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <div className="container mx-auto px-4 py-12" dir="rtl">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">تواصل معنا</h1>
                <p className="text-gray-500 text-sm md:text-base">
                    نحن هنا دائماً لمساعدتك والإجابة على كافة استفساراتك. لا تتردد في مراسلتنا في أي وقت.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                
                <div className="bg-first-color text-white p-8 rounded-3xl shadow-lg flex flex-col justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">معلومات الاتصال</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            يسعدنا تلقي مقترحاتكم واستفساراتكم عبر وسائل الاتصال المتاحة أو زيارتكم لنا.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white/90">العنوان</h4>
                                    <p className="text-white/70 text-sm mt-1">قنا، قوص، طريق الشوادر بجوار قاعة شهرزاد</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white/90">رقم الهاتف</h4>
                                    <p className="text-white/70 text-sm mt-1" dir="ltr">+966 50 000 0000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white/90">البريد الإلكتروني</h4>
                                    <p className="text-white/70 text-sm mt-1">yahyasaad2040@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 text-xs text-white/60">
                        متاحة طوال أيام الأسبوع لدعم العملاء وتلقي الاستفسارات.
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h3>

                    {submitted && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium">
                            تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت ممكن.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">الاسم الكامل</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="أدخل اسمك هنا" 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-first-color text-sm transition-colors bg-gray-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">رقم الهاتف</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="01127471188" 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-first-color text-sm transition-colors bg-gray-50/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="yahyasaad2040@gmail.com" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-first-color text-sm transition-colors bg-gray-50/50"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">الرسالة أو الاستفسار</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4" 
                                placeholder="اكتب تفاصيل رسالتك هنا..." 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-first-color text-sm transition-colors bg-gray-50/50 resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-first-color text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:opacity-95 transition-opacity"
                        >
                            إرسال الرسالة
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}