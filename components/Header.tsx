import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    const activeClass = "text-white bg-primary";
    const inactiveClass = "text-gray-600 hover:text-primary-dark hover:bg-blue-50";
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `${isActive ? activeClass : inactiveClass} px-3 py-2 rounded-md text-sm font-bold transition-colors duration-300`}
        >
            {children}
        </NavLink>
    );
};

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                             <svg className="h-8 w-auto text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <span className="text-2xl font-bold text-primary">صحة العائلة</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <nav className="ml-10 flex items-baseline space-x-4">
                            <NavItem to="/">الرئيسية</NavItem>
                            <NavItem to="/doctors">الأطباء</NavItem>
                            <NavItem to="/articles">المقالات</NavItem>
                            <NavItem to="/forums">المنتديات</NavItem>
                            <NavItem to="/pricing">الأسعار</NavItem>
                            <NavItem to="/contact">تواصل معنا</NavItem>
                        </nav>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                         <NavLink to="/dashboard" className="text-primary hover:bg-blue-50 font-bold px-3 py-2 rounded-md text-sm transition-colors duration-300">
                             لوحة التحكم
                         </NavLink>
                         <NavLink to="/doctor-dashboard" className="text-primary hover:bg-blue-50 font-bold px-3 py-2 rounded-md text-sm transition-colors duration-300">
                             لوحة تحكم الطبيب
                         </NavLink>
                         <NavLink to="/admin-dashboard" className="text-primary hover:bg-blue-50 font-bold px-3 py-2 rounded-md text-sm transition-colors duration-300">
                             لوحة تحكم المشرف
                         </NavLink>
                         <NavLink to="/login" className="text-gray-600 hover:text-primary-dark font-bold px-3 py-2 rounded-md text-sm">تسجيل الدخول</NavLink>
                         <NavLink to="/register" className="bg-secondary text-white hover:bg-opacity-90 font-bold px-4 py-2 rounded-full text-sm transition-transform duration-300 hover:scale-105">إنشاء حساب</NavLink>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="bg-primary-light inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavItem to="/">الرئيسية</NavItem>
                        <NavItem to="/doctors">الأطباء</NavItem>
                        <NavItem to="/articles">المقالات</NavItem>
                        <NavItem to="/forums">المنتديات</NavItem>
                        <NavItem to="/pricing">الأسعار</NavItem>
                        <NavItem to="/contact">تواصل معنا</NavItem>
                        <NavItem to="/dashboard">لوحة التحكم</NavItem>
                        <NavItem to="/doctor-dashboard">لوحة تحكم الطبيب</NavItem>
                        <NavItem to="/admin-dashboard">لوحة تحكم المشرف</NavItem>
                        <NavItem to="/login">تسجيل الدخول</NavItem>
                        <NavItem to="/register">إنشاء حساب</NavItem>
                    </div>
                </div>
            )}
        </header>
    );
};