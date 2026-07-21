import React, { useState } from 'react';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    );

    const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
    );

    const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
    );

    const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50">
                <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100">
                
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">تسجيل الدخول</h1>
                    <p className="text-gray-600 text-base">أدخل بيانات حسابك للمتابعة</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 block">البريد الإلكتروني أو رقم الهاتف</label>
                    <div className="relative">
                        <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="أدخل البريد أو الهاتف"
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition text-sm pr-12"
                        required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                        </span>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 block">كلمة المرور</label>
                    <div className="relative">
                        <input 
                        type={showPassword ? 'text' : 'password'} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition text-sm pr-12 pl-12"
                        required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                        </span>
                        <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        aria-label={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
                        >
                        <EyeIcon />
                        </button>
                    </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-blue-600" />
                        <span className="text-gray-700 group-hover:text-blue-600 transition">تذكرني</span>
                    </label>
                    <a href="/#" className="text-blue-600 hover:text-blue-700 font-medium transition">نسيت كلمة المرور؟</a>
                    </div>

                    <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition duration-200 shadow-md shadow-blue-100 text-lg"
                    >
                    تسجيل الدخول
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-sm text-gray-500">أو سجل الدخول باستخدام</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium text-sm">
                    <GoogleIcon />
                    <span>Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition text-gray-600 font-medium text-sm">
                    <FacebookIcon />
                    <span>Facebook</span>
                    </button>
                </div>

                <div className="mt-10 text-center text-gray-600 text-sm border-t border-gray-100 pt-6">
                    ليس لديك حساب؟{' '}
                    <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition underline decoration-blue-200 hover:decoration-blue-600">
                    أنشئ حسابك الآن
                    </a>
                </div>

                </div>
            </main>
        </div>
    );
};

export default LoginPage;