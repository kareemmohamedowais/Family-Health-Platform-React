
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-primary-dark">تواصل معنا</h1>
          <p className="mt-4 text-lg text-gray-600">نحن هنا للمساعدة. أرسل لنا استفسارك وسنعاود الاتصال بك قريبًا.</p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
              <input type="text" name="name" id="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <input type="email" name="email" id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">رسالتك</label>
              <textarea name="message" id="message" rows={4} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                إرسال الرسالة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
