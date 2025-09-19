import React from 'react';
import { Link } from 'react-router-dom';
import type { Doctor, Article, Testimonial, FAQItem } from '../types';
import { DOCTORS, ARTICLES, TESTIMONIALS, FAQ_ITEMS } from '../constants';
import { MessageIcon } from '../components/icons/Icon';


const HeroSection: React.FC = () => (
  <div className="bg-blue-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark tracking-tight">
        رعاية صحية تثق بها، لأسرة سعيدة
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        احصل على استشارات طبية موثوقة، محتوى مخصص، ودعم مستمر لك ولعائلتك في كل مرحلة.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/doctors" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-dark transition-transform duration-300 hover:scale-105 shadow-lg">
          ابحث عن طبيب
        </Link>
        <Link to="/pricing" className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-transform duration-300 hover:scale-105 shadow-lg">
          عرض الخطط
        </Link>
      </div>
    </div>
  </div>
);

const ServiceCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-primary mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </div>
);

const ServicesSection: React.FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800">خدماتنا</h2>
            <p className="text-center mt-2 text-gray-600">كل ما تحتاجه الأسرة في مكان واحد.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard title="استشارات عبر الفيديو" description="تحدث مع أفضل الأطباء من راحة منزلك." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>} />
                <ServiceCard title="مساعد ذكي AI" description="احصل على إجابات فورية لأسئلتك الصحية العامة على مدار الساعة." icon={<MessageIcon className="h-8 w-8"/>} />
                <ServiceCard title="محتوى مخصص" description="مقالات وفيديوهات معدة خصيصًا لك بناءً على حالتك واهتماماتك." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>} />
            </div>
        </div>
    </div>
);


const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <Link to={`/doctors/${doctor.id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden text-center group transition-transform duration-300 hover:-translate-y-2">
      <div className="overflow-hidden">
        <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">{doctor.name}</h3>
        <p className="text-primary mt-1">{doctor.specialty}</p>
      </div>
    </Link>
);


const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-primary-dark p-8 rounded-xl text-white">
        <p className="italic">"{testimonial.quote}"</p>
        <div className="flex items-center mt-6">
            <img src={testimonial.imageUrl} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="mr-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-blue-200">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

const FaqAccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-right flex justify-between items-center py-4 font-semibold text-lg hover:text-primary transition-colors">
                <span>{item.question}</span>
                <svg className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="pb-4 text-gray-600">{item.answer}</div>
            </div>
        </div>
    );
}

const ChatbotFAB: React.FC = () => (
    <Link to="/chatbot" className="fixed bottom-6 left-6 bg-secondary text-white p-4 rounded-full shadow-xl hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-transform duration-300 hover:scale-110 z-40">
        <MessageIcon className="h-8 w-8" />
        <span className="sr-only">Open Chatbot</span>
    </Link>
);


const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ServicesSection />
       {/* Featured Doctors Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">تعرف على أطبائنا</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {DOCTORS.slice(0, 4).map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white">ماذا يقول عملاؤنا</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-gray-800">الأسئلة الشائعة</h2>
            <div className="mt-8 space-y-2">
                {FAQ_ITEMS.map((item, index) => <FaqAccordionItem key={index} item={item} />)}
            </div>
        </div>
      </div>
      <ChatbotFAB />
    </div>
  );
};

export default HomePage;