import React, { useState } from 'react';

// --- SVG Icons for Payment Methods ---
const VisaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" role="img" aria-labelledby="pi-visa">
        <title id="pi-visa">Visa</title>
        <g fill="none">
            <path fill="#2364A2" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
            <path fill="#F2F2F2" d="M12.9 16.9c-1.3-1.3-1.4-3.5-.3-4.8.8-1 2-1.5 3.3-1.5 1.1 0 2.2.4 3.1 1.2l-2.1 2.2c-.3-.3-.7-.5-1.1-.5-.5 0-.9.2-1.2.5-.3.3-.5.7-.5 1.2s.2.9.5 1.2c.3.3.7.5 1.1.5.4 0 .8-.2 1.1-.5l2.1 2.2c-.9.8-2 1.2-3.1 1.2-1.3 0-2.5-.5-3.3-1.5zM22.4 17.1L25 8h3.3l-2.6 9.1h-3.3zM28.8 8l-1.8 6.5L25.6 8h-3.1l2.8 9.1h1.9l3.5-9.1h-1.9zM9.9 8h-3l-1.3 9.1H8.5L9.9 8z"/>
        </g>
    </svg>
);

const VodafoneCashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 48 24" role="img">
        <title>Vodafone Cash</title>
        <path d="M23.1,19.5c-4,0-7.3-3.2-7.3-7.2s3.3-7.2,7.3-7.2s7.3,3.2,7.3,7.2S27.1,19.5,23.1,19.5z M23.1,6.5c-3.1,0-5.6,2.5-5.6,5.8s2.5,5.8,5.6,5.8s5.6-2.5,5.6-5.8S26.2,6.5,23.1,6.5z M43.4,22.1c-1.2-1.9-2.9-3.2-5-3.9c1.6-1,2.7-2.7,2.7-4.7c0-3-2.5-5.4-5.5-5.4h-6.2v14h6.3c1.7,0,3.3-0.5,4.7-1.5C41.7,21.3,42.5,21.7,43.4,22.1z M36.3,9.5h3c2.1,0,3.8,1.6,3.8,3.7s-1.7,3.7-3.8,3.7h-3V9.5z M36.3,20.6h3.1c1.5,0,2.9-0.5,4.1-1.3c-0.6-0.2-1.2-0.5-1.7-0.9c-1,0.6-2.1,1-3.3,1h-2.2V20.6z M10.4,19.2c-0.8,0.4-1.7,0.6-2.6,0.6c-2.8,0-5-2.2-5-4.9c0-2.1,1.4-3.9,3.3-4.6l-2.9-8.4h1.8l2.6,7.5c0.5-0.1,1-0.1,1.5-0.1c2.8,0,5,2.2,5,4.9C14.4,16.5,12.8,18.3,10.4,19.2z M7.7,11.1c-1.8,0.6-3.1,2.2-3.1,4.2c0,1.9,1.6,3.5,3.6,3.5c0.6,0,1.2-0.1,1.8-0.4c1.7-0.8,2.8-2.5,2.8-4.4C12.8,12.9,10.6,11.1,7.7,11.1z" fill="#E60000"/>
    </svg>
);


interface Plan {
    title: string;
    price: string;
    period: string;
    features: string[];
    popular?: boolean;
}

const plans: Plan[] = [
    { title: "الأساسية", price: "مجانية", period: "دائمًا", features: ['الوصول للمقالات العامة', 'مساعد AI ذكي (محدود)', 'تذكير بالمواعيد'] },
    { title: "العائلة", price: "99 ر.س", period: "شهريًا", features: ['كل مزايا الخطة الأساسية', 'استشارات فيديو غير محدودة', 'مساعد AI ذكي متقدم', 'متابعة صحية مخصصة'], popular: true },
    { title: "العائلة بلس", price: "199 ر.س", period: "شهريًا", features: ['كل مزايا خطة العائلة', 'تقارير صحية شهرية', 'خصم على الفحوصات', 'دعم فوري'] },
];


const PaymentModal: React.FC<{ isOpen: boolean; onClose: () => void; plan: Plan | null }> = ({ isOpen, onClose, plan }) => {
    const [paymentMethod, setPaymentMethod] = useState<'visa' | 'vodafone'>('visa');
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

    if (!isOpen || !plan) return null;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentStatus('processing');
        setTimeout(() => {
            setPaymentStatus('success');
        }, 1500); // Simulate API call
    };

    const resetAndClose = () => {
        setPaymentStatus('idle');
        setPaymentMethod('visa');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity" onClick={resetAndClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 m-4 transform transition-all" onClick={e => e.stopPropagation()}>
                {paymentStatus === 'success' ? (
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h2 className="text-2xl font-bold text-gray-800 mt-4">تم الاشتراك بنجاح!</h2>
                        <p className="text-gray-600 mt-2">مرحبًا بك في خطة {plan.title}. يمكنك الآن الاستفادة من جميع المزايا.</p>
                        <button onClick={resetAndClose} className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors">
                            إغلاق
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">إتمام الدفع</h2>
                                <p className="text-gray-500">أنت على وشك الاشتراك في خطة <span className="font-bold text-primary">{plan.title}</span>.</p>
                            </div>
                            <button onClick={resetAndClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>
                        
                        <div className="my-6">
                            <h3 className="text-lg font-semibold mb-3">اختر طريقة الدفع</h3>
                            <div className="flex gap-4">
                                <button onClick={() => setPaymentMethod('visa')} className={`flex-1 p-4 border-2 rounded-lg flex items-center justify-center gap-3 transition-colors ${paymentMethod === 'visa' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-400'}`}>
                                    <VisaIcon/>
                                    <span className="font-semibold">فيزا</span>
                                </button>
                                <button onClick={() => setPaymentMethod('vodafone')} className={`flex-1 p-4 border-2 rounded-lg flex items-center justify-center gap-3 transition-colors ${paymentMethod === 'vodafone' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-400'}`}>
                                    <VodafoneCashIcon/>
                                    <span className="font-semibold">فودافون كاش</span>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handlePayment}>
                            {paymentMethod === 'visa' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">رقم البطاقة</label>
                                        <input type="text" placeholder="**** **** **** 1234" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700">تاريخ الانتهاء</label>
                                            <input type="text" placeholder="MM/YY" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700">CVC</label>
                                            <input type="text" placeholder="123" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {paymentMethod === 'vodafone' && (
                                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        يرجى تحويل مبلغ <span className="font-bold">{plan.price}</span> إلى الرقم التالي: <br />
                                        <span className="font-bold text-lg text-red-600 tracking-wider">01012345678</span>
                                    </p>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">رقم عملية التحويل</label>
                                        <input type="text" placeholder="أدخل رقم المعاملة هنا للتأكيد" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
                                    </div>
                                </div>
                            )}
                            <button type="submit" className="mt-6 w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400">
                                {paymentStatus === 'processing' ? 'جاري المعالجة...' : `تأكيد الدفع (${plan.price})`}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

const PricingTier: React.FC<{ plan: Plan; onSelect: () => void }> = ({ plan, onSelect }) => (
  <div className={`border-2 rounded-lg p-8 flex flex-col ${plan.popular ? 'border-primary' : 'border-gray-200'}`}>
    {plan.popular && <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">الأكثر شيوعًا</span>}
    <h3 className="text-2xl font-bold">{plan.title}</h3>
    <p className="mt-4">
      <span className="text-4xl font-extrabold">{plan.price}</span>
      {plan.price !== "مجانية" && <span className="text-gray-500"> / {plan.period}</span>}
    </p>
    <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="h-6 w-6 text-secondary ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button 
        onClick={onSelect}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${plan.popular ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-secondary text-white hover:bg-opacity-90'}`}
        disabled={plan.price === "مجانية"}
    >
      {plan.price === "مجانية" ? "الخطة الحالية" : "ابدأ الآن"}
    </button>
  </div>
);

const PricingPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const handleSelectPlan = (plan: Plan) => {
        if (plan.price !== "مجانية") {
            setSelectedPlan(plan);
            setIsModalOpen(true);
        }
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-primary-dark">خطط أسعار مرنة</h1>
                    <p className="mt-4 text-lg text-gray-600">اختر الخطة التي تناسب احتياجاتك أنت وعائلتك.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map(plan => (
                        <PricingTier 
                            key={plan.title}
                            plan={plan}
                            onSelect={() => handleSelectPlan(plan)}
                        />
                    ))}
                </div>
            </div>
            <PaymentModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                plan={selectedPlan}
            />
        </div>
    );
};

export default PricingPage;
