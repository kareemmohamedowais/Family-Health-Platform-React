import React, { useState } from 'react';
import { DOCTORS, ARTICLES } from '../constants';
import type { Doctor, Article } from '../types';

// --- Types ---
type User = {
  id: number;
  name: string;
  email: string;
  joined: string;
  status: 'Active' | 'Suspended';
};

type DoctorWithStatus = Doctor & {
  status: 'Pending' | 'Approved' | 'Rejected';
};

type ArticleWithStatus = Article & {
  status: 'Published' | 'Draft';
};

type Booking = {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Canceled';
};

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
};

type View = 'home' | 'users' | 'doctors' | 'bookings' | 'articles' | 'contactMessages' | 'notifications';

// --- Mock Data ---
const mockUsers: User[] = [
  { id: 1, name: 'نورة خالد', email: 'noura.k@example.com', joined: '2024-07-01', status: 'Active' },
  { id: 2, name: 'أحمد علي', email: 'ahmad.a@example.com', joined: '2024-06-25', status: 'Active' },
  { id: 3, name: 'فاطمة محمد', email: 'fatima.m@example.com', joined: '2024-06-10', status: 'Suspended' },
  { id: 4, name: 'خالد عبد الله', email: 'khalid.a@example.com', joined: '2024-05-15', status: 'Active' },
];

const mockDoctors: DoctorWithStatus[] = DOCTORS.map((doc, index) => ({
  ...doc,
  status: index % 3 === 0 ? 'Pending' : (index % 3 === 1 ? 'Approved' : 'Rejected'),
}));

const mockArticles: ArticleWithStatus[] = ARTICLES.map((art, index) => ({
  ...art,
  status: index % 2 === 0 ? 'Published' : 'Draft',
}));

const mockBookings: Booking[] = [
  { id: 1, patientName: 'نورة خالد', doctorName: 'د. سارة عبد الرحمن', date: '2024-08-01', time: '10:00 ص', status: 'Upcoming' },
  { id: 2, patientName: 'أحمد علي', doctorName: 'د. أحمد المصري', date: '2024-07-30', time: '02:30 م', status: 'Upcoming' },
  { id: 3, patientName: 'فاطمة محمد', doctorName: 'د. سارة عبد الرحمن', date: '2024-07-29', time: '11:00 ص', status: 'Completed' },
  { id: 4, patientName: 'خالد عبد الله', doctorName: 'د. عمر خالد', date: '2024-07-28', time: '09:00 ص', status: 'Canceled' },
];

const mockContactMessages: ContactMessage[] = [
    { id: 1, name: 'سارة', email: 'sara@example.com', message: 'لدي استفسار بخصوص خطط الأسعار، هل تشمل عدد غير محدود من الأطفال؟', date: '2024-07-30', read: false },
    { id: 2, name: 'محمد', email: 'mohammed@example.com', message: 'واجهت مشكلة فنية أثناء محاولة حجز موعد. أرجو المساعدة.', date: '2024-07-29', read: false },
    { id: 3, name: 'ليلى', email: 'laila@example.com', message: 'شكرًا لكم على هذه المنصة الرائعة!', date: '2024-07-28', read: true },
];


// --- Icons ---
const HomeIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UsersIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const DoctorsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const BookingsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ArticlesIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;
const MailIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const NotificationsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode, size?: 'md'|'lg'|'xl' }> = ({ isOpen, onClose, title, children, size='lg' }) => {
    if (!isOpen) return null;
    const sizeClasses = { md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-4xl' }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
            <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} m-4 transform transition-all flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};


// --- Main Page Component ---
const AdminDashboardPage: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('home');

    const renderView = () => {
        switch (activeView) {
            case 'home': return <DashboardView />;
            case 'users': return <UsersView />;
            case 'doctors': return <DoctorsView />;
            case 'bookings': return <BookingsView />;
            case 'articles': return <ArticlesView />;
            case 'contactMessages': return <ContactMessagesView />;
            default: return <div className="p-8"><h2 className="text-2xl font-bold text-gray-700">{activeView}</h2><p>This section is under construction.</p></div>;
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen flex font-sans">
            <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};


// --- Sidebar Component ---
const AdminSidebar: React.FC<{ activeView: View; setActiveView: (view: View) => void; }> = ({ activeView, setActiveView }) => {
    const NavLink: React.FC<{ view: View; icon: React.ReactNode; label: string; }> = ({ view, icon, label }) => (
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveView(view); }}
            className={`flex items-center px-4 py-2 text-gray-500 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-200 ${activeView === view ? 'bg-primary text-white' : ''}`}
        >
            {icon}
            <span className="mx-4 font-medium">{label}</span>
        </a>
    );

    return (
        <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-l border-gray-200 rtl:border-l-0 rtl:border-r">
            <div className="flex items-center gap-2 px-4">
                 <svg className="h-8 w-auto text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                 <span className="text-2xl font-bold text-primary">لوحة التحكم</span>
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <NavLink view="home" icon={<HomeIcon />} label="الرئيسية" />
                    <NavLink view="users" icon={<UsersIcon />} label="المستخدمون" />
                    <NavLink view="doctors" icon={<DoctorsIcon />} label="الأطباء" />
                    <NavLink view="bookings" icon={<BookingsIcon />} label="الحجوزات" />
                    <NavLink view="articles" icon={<ArticlesIcon />} label="المقالات" />
                    <NavLink view="contactMessages" icon={<MailIcon />} label="رسائل التواصل" />
                    <NavLink view="notifications" icon={<NotificationsIcon />} label="الإشعارات" />
                </nav>
            </div>
        </aside>
    );
};

// --- View Components ---

const DashboardView: React.FC = () => {
    const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
            <div className="bg-blue-100 text-primary p-3 rounded-full">
                {icon}
            </div>
        </div>
    );
    
    const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">{title}</h3>
            {children}
        </div>
    );

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">لوحة التحكم الرئيسية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="إجمالي المستخدمين" value="1,250" icon={<UsersIcon />} />
                <StatCard title="إجمالي الأطباء" value="75" icon={<DoctorsIcon />} />
                <StatCard title="مواعيد اليوم" value="12" icon={<BookingsIcon />} />
                <StatCard title="طلبات معلقة" value="3" icon={<NotificationsIcon />} />
            </div>
             <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="التركيبة السكانية للمستخدمين">
                   <p className="text-center text-gray-500 p-8">ميزة قيد التطوير</p>
                </ChartCard>
                 <ChartCard title="المقالات الأكثر قراءة">
                    <ul className="space-y-3">
                       {ARTICLES.slice(0,3).map(article => (
                           <li key={article.id} className="text-sm text-gray-700 border-b pb-2">
                               <a href="#" className="font-semibold text-primary hover:underline">{article.title}</a>
                               <p className="text-xs text-gray-500">بواسطة {article.author}</p>
                           </li>
                       ))}
                    </ul>
                </ChartCard>
            </div>
        </>
    );
};

const UsersView: React.FC = () => {
    const [users, setUsers] = useState(mockUsers);
    
    const toggleStatus = (id: number) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    };

    const deleteUser = (id: number) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const statusColor = (status: 'Active' | 'Suspended') => status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">إدارة المستخدمين</h1>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full min-w-max text-right">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 px-4 font-semibold text-gray-600">الاسم</th>
                            <th className="py-3 px-4 font-semibold text-gray-600">البريد الإلكتروني</th>
                            <th className="py-3 px-4 font-semibold text-gray-600">تاريخ الانضمام</th>
                            <th className="py-3 px-4 font-semibold text-gray-600">الحالة</th>
                            <th className="py-3 px-4 font-semibold text-gray-600">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.joined}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor(user.status)}`}>{user.status === 'Active' ? 'نشط' : 'معلق'}</span>
                                </td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button onClick={() => toggleStatus(user.id)} className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">تغيير الحالة</button>
                                    <button onClick={() => deleteUser(user.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">حذف</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DoctorsView: React.FC = () => {
    const [doctors, setDoctors] = useState(mockDoctors);
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorWithStatus | null>(null);

    const initialNewDoctorState = { name: '', specialty: '', bio: '', imageUrl: '', education: '', specializations: '' };
    const [newDoctor, setNewDoctor] = useState(initialNewDoctorState);
    
    const setStatus = (id: number, status: DoctorWithStatus['status']) => setDoctors(doctors.map(d => d.id === id ? { ...d, status } : d));

    const handleViewDetails = (doctor: DoctorWithStatus) => {
        setSelectedDoctor(doctor);
        setIsDetailsModalOpen(true);
    };
    
    const handleAddDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Math.max(...doctors.map(d => d.id)) + 1;
        const doctorToAdd: DoctorWithStatus = {
            id: newId, rating: 0, reviews: 0, ...newDoctor,
            education: newDoctor.education.split(',').map(s => s.trim()),
            specializations: newDoctor.specializations.split(',').map(s => s.trim()),
            imageUrl: newDoctor.imageUrl || 'https://picsum.photos/seed/newDoc/400/400', status: 'Pending'
        };
        setDoctors([doctorToAdd, ...doctors]);
        setIsAddModalOpen(false);
        setNewDoctor(initialNewDoctorState);
    };

    const statusOptions: DoctorWithStatus['status'][] = ['Pending', 'Approved', 'Rejected'];
    const statusClasses = { Pending: 'bg-yellow-100 text-yellow-800', Approved: 'bg-green-100 text-green-800', Rejected: 'bg-red-100 text-red-800' };
    const statusArabic = { Pending: 'قيد المراجعة', Approved: 'مقبول', Rejected: 'مرفوض' };
    
    const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialty)))];
    
    const filteredDoctors = doctors.filter(doc => (doc.name.toLowerCase().includes(searchTerm.toLowerCase())) && (specialtyFilter === 'All' || doc.specialty === specialtyFilter) && (statusFilter === 'All' || doc.status === statusFilter));

    return (
        <div>
            <div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-bold text-gray-800">إدارة الأطباء</h1><button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark">إضافة طبيب جديد</button></div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><input type="text" placeholder="ابحث..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-4 py-2 border rounded-md"/> <select value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)} className="w-full px-4 py-2 border rounded-md bg-white">{specialties.map(s => <option key={s} value={s}>{s === 'All' ? 'كل التخصصات' : s}</option>)}</select> <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full px-4 py-2 border rounded-md bg-white"><option value="All">كل الحالات</option>{statusOptions.map(opt => <option key={opt} value={opt}>{statusArabic[opt]}</option>)}</select></div></div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto"><table className="w-full min-w-max text-right"><thead><tr className="border-b"><th className="py-3 px-4 font-semibold text-gray-600">الاسم</th><th className="py-3 px-4">التخصص</th><th className="py-3 px-4">الحالة</th><th className="py-3 px-4">إجراءات</th></tr></thead><tbody>{filteredDoctors.map(doc => (<tr key={doc.id} className="border-b hover:bg-gray-50"><td className="py-3 px-4 flex items-center gap-3"><img src={doc.imageUrl} alt={doc.name} className="w-10 h-10 rounded-full object-cover"/><span>{doc.name}</span></td><td className="py-3 px-4">{doc.specialty}</td><td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[doc.status]}`}>{statusArabic[doc.status]}</span></td><td className="py-3 px-4 flex items-center gap-2"><button onClick={() => handleViewDetails(doc)} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md">عرض</button><select value={doc.status} onChange={(e) => setStatus(doc.id, e.target.value as any)} className="text-sm p-2 border rounded-md bg-white">{statusOptions.map(opt => <option key={opt} value={opt}>{statusArabic[opt]}</option>)}</select></td></tr>))}</tbody></table></div>
            <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title={`ملف: ${selectedDoctor?.name}`} size="xl">{selectedDoctor && (<div className="space-y-6"><div><h4 className="text-lg font-bold">عن الطبيب</h4><p>{selectedDoctor.bio}</p></div></div>)}</Modal>
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="إضافة طبيب جديد" size="xl"><form onSubmit={handleAddDoctor} className="space-y-4"><div><label>الاسم</label><input type="text" value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} className="mt-1 block w-full p-2 border rounded-md" required/></div><button type="submit">إضافة</button></form></Modal>
        </div>
    );
};

const BookingsView: React.FC = () => {
    const [bookings, setBookings] = useState(mockBookings);
    const setStatus = (id: number, status: Booking['status']) => setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    const statusOptions: Booking['status'][] = ['Upcoming', 'Completed', 'Canceled'];
    const statusClasses = { Upcoming: 'bg-blue-100 text-blue-800', Completed: 'bg-green-100 text-green-800', Canceled: 'bg-red-100 text-red-800' };
    const statusArabic = { Upcoming: 'قادم', Completed: 'مكتمل', Canceled: 'ملغى' };

    return (
        <div><h1 className="text-3xl font-bold text-gray-800 mb-6">إدارة الحجوزات</h1><div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto"><table className="w-full min-w-max text-right"><thead><tr className="border-b"><th>المريض</th><th>الطبيب</th><th>التاريخ</th><th>الحالة</th><th>تغيير</th></tr></thead><tbody>{bookings.map(booking => (<tr key={booking.id} className="border-b hover:bg-gray-50"><td className="py-3 px-4">{booking.patientName}</td><td className="py-3 px-4">{booking.doctorName}</td><td className="py-3 px-4">{booking.date} - {booking.time}</td><td><span className={`px-2 py-1 text-xs rounded-full ${statusClasses[booking.status]}`}>{statusArabic[booking.status]}</span></td><td><select value={booking.status} onChange={(e) => setStatus(booking.id, e.target.value as any)} className="text-sm p-2 border rounded-md">{statusOptions.map(opt => <option key={opt} value={opt}>{statusArabic[opt]}</option>)}</select></td></tr>))}</tbody></table></div></div>
    );
};

const ArticlesView: React.FC = () => {
    const [articles, setArticles] = useState(mockArticles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: '', author: '', content: '', excerpt: '', imageUrl: '' });

    const deleteArticle = (id: number) => {
        if (window.confirm('متأكد؟')) setArticles(articles.filter(a => a.id !== id));
    };
    
    const handleAddArticle = (e: React.FormEvent) => {
        e.preventDefault();
        const articleToAdd: ArticleWithStatus = { id: Math.max(...articles.map(a => a.id)) + 1, date: new Date().toLocaleDateString('ar-EG'), status: 'Draft', ...newArticle };
        setArticles([articleToAdd, ...articles]);
        setIsModalOpen(false);
        setNewArticle({ title: '', author: '', content: '', excerpt: '', imageUrl: '' });
    };

    return (
         <div><div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-bold">إدارة المقالات</h1><button onClick={() => setIsModalOpen(true)} className="bg-primary text-white font-bold py-2 px-4 rounded-md">إضافة مقال</button></div><div className="bg-white p-6 rounded-lg shadow-md"><table className="w-full text-right"><thead><tr className="border-b"><th>العنوان</th><th>الكاتب</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody>{articles.map(article => (<tr key={article.id} className="border-b hover:bg-gray-50"><td>{article.title}</td><td>{article.author}</td><td>{article.status === 'Published' ? 'منشور' : 'مسودة'}</td><td className="flex gap-2 py-2"><button className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md">تعديل</button><button onClick={() => deleteArticle(article.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md">حذف</button></td></tr>))}</tbody></table></div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إضافة مقال" size="xl"><form onSubmit={handleAddArticle} className="space-y-4"><input type="text" placeholder="العنوان" value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})} className="w-full p-2 border rounded-md" required/><button type="submit">إضافة</button></form></Modal></div>
    );
};

const ContactMessagesView: React.FC = () => {
    const [messages, setMessages] = useState(mockContactMessages);
    const toggleRead = (id: number) => setMessages(messages.map(m => m.id === id ? { ...m, read: !m.read } : m));
    const deleteMessage = (id: number) => { if (window.confirm('متأكد؟')) setMessages(messages.filter(m => m.id !== id)); };

    return (
        <div><h1 className="text-3xl font-bold mb-6">رسائل التواصل</h1><div className="bg-white rounded-lg shadow-md p-4 space-y-4">{messages.map(msg => (<div key={msg.id} className={`p-4 border-l-4 rounded-md ${msg.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-primary'}`}><div className="flex justify-between items-center"><p className="font-bold">{msg.name} <span className="text-sm text-gray-500">&lt;{msg.email}&gt;</span></p><div className="flex gap-2"><button onClick={() => toggleRead(msg.id)} className="text-sm bg-gray-200 px-3 py-1 rounded-md">{msg.read ? 'غير مقروء' : 'مقروء'}</button><button onClick={() => deleteMessage(msg.id)} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md">حذف</button></div></div><p className="mt-3 text-gray-700">{msg.message}</p></div>))}</div></div>
    );
};

export default AdminDashboardPage;