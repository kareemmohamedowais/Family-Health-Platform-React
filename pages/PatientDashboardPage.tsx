import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../constants';
import { VideoCallModal } from '../components/VideoCallModal';
import type { Symptom, DirectMessage, MessageConversation } from '../types';

// --- Icons ---
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const VideoCameraIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;


// --- Components ---
const DashboardCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        <div className="flex items-center mb-4">
            <div className="mr-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div>{children}</div>
    </div>
);

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 m-4 transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
};

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ label, enabled, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-md">
        <span className="text-gray-700">{label}</span>
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={enabled} onChange={(e) => onChange(e.target.checked)} />
            <div className={`block w-14 h-8 rounded-full transition ${enabled ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
        </div>
    </label>
);

// --- New Feature Components ---
const PregnancyTracker: React.FC = () => {
    const week = 22;
    const babySize = "حجم ثمرة البابايا";
    return (
        <DashboardCard title="متابعة الحمل" icon={<CalendarIcon />}>
            <div className="text-center bg-pink-50 p-4 rounded-lg">
                <p className="font-bold text-lg text-pink-700">أنتِ في الأسبوع {week}</p>
                <p className="text-gray-600 mt-2">حجم طفلك الآن تقريبًا بحجم <span className="font-bold text-pink-600">{babySize}</span>.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${(week / 40) * 100}%` }}></div>
                </div>
            </div>
        </DashboardCard>
    );
};

const SymptomTracker: React.FC = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>([
        { id: 1, date: '2024-07-30', name: 'صداع خفيف', severity: 'Mild', notes: 'في فترة ما بعد الظهر' }
    ]);
    const [newSymptom, setNewSymptom] = useState({ name: '', severity: 'Mild', notes: '' });

    const handleAddSymptom = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSymptom.name) return;
        const newEntry: Symptom = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...newSymptom
        } as Symptom;
        setSymptoms([newEntry, ...symptoms]);
        setNewSymptom({ name: '', severity: 'Mild', notes: '' });
    };

    return (
        <DashboardCard title="متتبع الأعراض" icon={<ClipboardListIcon />}>
            <form onSubmit={handleAddSymptom} className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="العرض" value={newSymptom.name} onChange={e => setNewSymptom({...newSymptom, name: e.target.value})} className="col-span-2 p-2 border rounded-md" />
                <select value={newSymptom.severity} onChange={e => setNewSymptom({...newSymptom, severity: e.target.value as any})} className="p-2 border rounded-md bg-white">
                    <option value="Mild">خفيف</option>
                    <option value="Moderate">متوسط</option>
                    <option value="Severe">شديد</option>
                </select>
                <button type="submit" className="bg-secondary text-white font-semibold rounded-md hover:bg-opacity-90">إضافة</button>
            </form>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                {symptoms.map(s => (
                    <div key={s.id} className="bg-gray-100 p-2 rounded-md">
                        <p className="font-semibold">{s.name} <span className="text-xs text-gray-500">({s.severity})</span></p>
                        <p className="text-sm text-gray-600">{s.date}</p>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};


const PatientDashboardPage: React.FC = () => {
    const [patient, setPatient] = useState({ name: 'نورة خالد', email: 'noura.k@example.com' });
    const [tempProfile, setTempProfile] = useState(patient);
    const [notifications, setNotifications] = useState({ appointments: true, articles: true, offers: false });

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
    const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
    const [callDetails, setCallDetails] = useState({ doctorName: '', patientName: '' });
    const [isPregnancyMode, setIsPregnancyMode] = useState(false);

    const upcomingAppointments = [
        { id: 1, doctor: 'د. سارة عبد الرحمن', specialty: 'طبيبة أطفال', date: '25 يوليو 2024', time: '10:00 ص', type: 'video' },
        { id: 2, doctor: 'د. أحمد المصري', specialty: 'أخصائي تغذية', date: '05 أغسطس 2024', time: '02:30 م', type: 'in-person' },
    ];

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setPatient(tempProfile);
        setIsProfileModalOpen(false);
    };

    const handlePasswordSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert("تم تحديث كلمة المرور بنجاح!");
        setIsPasswordModalOpen(false);
    };

    const handleLogout = () => {
        alert("تم تسجيل الخروج بنجاح!");
    };
    
    const startVideoCall = (doctorName: string) => {
        setCallDetails({ doctorName, patientName: patient.name });
        setIsVideoCallOpen(true);
    };

    return (
        <>
            <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="container mx-auto">
                    <header className="mb-8">
                        <div className="flex justify-between items-center">
                             <div>
                                <h1 className="text-4xl font-extrabold text-primary-dark">لوحة تحكم المريض</h1>
                                <p className="text-lg text-gray-600 mt-2">مرحبًا بعودتك، {patient.name}!</p>
                             </div>
                             <div className="bg-white p-2 rounded-lg shadow-sm">
                                <ToggleSwitch label="وضع الحمل" enabled={isPregnancyMode} onChange={setIsPregnancyMode} />
                             </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                             {isPregnancyMode && <PregnancyTracker />}

                            <DashboardCard title="حجوزاتي القادمة" icon={<CalendarIcon />}>
                                <div className="space-y-4">
                                    {upcomingAppointments.map(appt => (
                                        <div key={appt.id} className="p-4 bg-blue-50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <div className="flex-grow">
                                                <p className="font-bold text-primary">{appt.doctor}</p>
                                                <p className="text-sm text-gray-600">{appt.specialty}</p>
                                            </div>
                                            <div className="text-left sm:text-right mt-2 sm:mt-0">
                                                <p className="font-semibold text-gray-800">{appt.date}</p>
                                                <p className="text-sm text-gray-500">{appt.time}</p>
                                            </div>
                                            {appt.type === 'video' && (
                                                <button onClick={() => startVideoCall(appt.doctor)} className="mt-3 sm:mt-0 sm:ml-4 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 flex items-center gap-2 text-sm w-full sm:w-auto justify-center">
                                                    <VideoCameraIcon className="h-5 w-5"/>
                                                    <span>بدء الاجتماع</span>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </DashboardCard>

                            <SymptomTracker />
                            
                            <DashboardCard title="مقالات نرشحها لك" icon={<BookOpenIcon />}>
                                <div className="space-y-3">
                                    {ARTICLES.slice(isPregnancyMode ? 0 : 1, isPregnancyMode ? 2 : 3).map(article => (
                                        <Link key={article.id} to={`/articles/${article.id}`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                            <h4 className="font-semibold text-primary-dark">{article.title}</h4>
                                            <p className="text-sm text-gray-600">{article.excerpt}</p>
                                        </Link>
                                    ))}
                                </div>
                            </DashboardCard>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <img src="https://picsum.photos/seed/patient1/200/200" alt="Patient Name" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
                                <p className="text-gray-500">{patient.email}</p>
                                <button onClick={() => { setTempProfile(patient); setIsProfileModalOpen(true); }} className="mt-4 text-sm text-primary hover:underline font-semibold">تعديل الملف الشخصي</button>
                            </div>
                            
                            <DashboardCard title="الإعدادات" icon={<CogIcon />}>
                                <nav className="flex flex-col space-y-1">
                                    <button onClick={() => setIsPasswordModalOpen(true)} className="w-full text-right p-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium">تغيير كلمة المرور</button>
                                    <button onClick={() => setIsNotificationsModalOpen(true)} className="w-full text-right p-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium">إدارة الإشعارات</button>
                                    <button onClick={handleLogout} className="w-full text-right p-2 rounded-md text-red-600 hover:bg-red-50 font-medium">تسجيل الخروج</button>
                                </nav>
                            </DashboardCard>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="تعديل الملف الشخصي">
                <form onSubmit={handleProfileSave} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                        <input type="text" id="name" value={tempProfile.name} onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                        <input type="email" id="email" value={tempProfile.email} onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                         <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">إلغاء</button>
                         <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark font-semibold">حفظ التغييرات</button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="تغيير كلمة المرور">
                 <form onSubmit={handlePasswordSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">كلمة المرور الحالية</label>
                        <input type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
                        <input type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور الجديدة</label>
                        <input type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                         <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">إلغاء</button>
                         <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark font-semibold">تحديث كلمة المرور</button>
                    </div>
                </form>
            </Modal>

             <Modal isOpen={isNotificationsModalOpen} onClose={() => setIsNotificationsModalOpen(false)} title="إدارة الإشعارات">
                <div className="space-y-4">
                   <ToggleSwitch label="تذكير بالمواعيد" enabled={notifications.appointments} onChange={val => setNotifications({...notifications, appointments: val})} />
                   <ToggleSwitch label="تنبيهات المقالات الجديدة" enabled={notifications.articles} onChange={val => setNotifications({...notifications, articles: val})} />
                   <ToggleSwitch label="العروض والتحديثات" enabled={notifications.offers} onChange={val => setNotifications({...notifications, offers: val})} />
                </div>
                 <div className="flex justify-end pt-6">
                     <button onClick={() => setIsNotificationsModalOpen(false)} className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark font-semibold">حفظ</button>
                </div>
            </Modal>
            
            <VideoCallModal 
                isOpen={isVideoCallOpen} 
                onClose={() => setIsVideoCallOpen(false)} 
                localUser={callDetails.patientName}
                remoteUser={callDetails.doctorName}
            />
        </>
    );
};

export default PatientDashboardPage;