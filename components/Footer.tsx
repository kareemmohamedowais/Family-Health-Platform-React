import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold">صحة العائلة</h3>
            <p className="mt-2 text-gray-400">منصتك الأولى لرعاية صحية متكاملة للأسرة.</p>
          </div>
          <div>
            <h4 className="font-semibold">روابط سريعة</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="hover:text-secondary">من نحن</Link></li>
              <li><Link to="/articles" className="hover:text-secondary">المقالات</Link></li>
              <li><Link to="/doctors" className="hover:text-secondary">الأطباء</Link></li>
              <li><Link to="/forums" className="hover:text-secondary">المنتديات</Link></li>
              <li><Link to="/contact" className="hover:text-secondary">تواصل معنا</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">قانوني</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy" className="hover:text-secondary">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-secondary">شروط الاستخدام</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">تابعنا</h4>
            <div className="flex mt-4 space-x-4">
              {/* Social Icons */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} صحة العائلة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};