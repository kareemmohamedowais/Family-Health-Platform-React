
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoCallModal } from '../components/VideoCallModal';
import type { Patient, MedicalEntry, AvailabilitySlot } from '../types';

// --- Icons ---
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const VideoCameraIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TrashIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// --- Mock Data ---
const initialPatients: Patient[] = [
  { id: 1, name: 'نورة خالد', lastVisit: '25 يوليو 2024', age: 28, gender: 'أنثى', medicalHistory: [{ date: '25 يوليو 2024', type: 'تشخيص', details: 'فحص للمولود الجديد', doctor: 'د. سارة عبد الرحمن' }] },
  { id: 2, name: 'مريم أحمد', lastVisit: '24 يوليو 2024', age: 32, gender: 'أنثى', medicalHistory: [{ date: '24 يوليو 2024', type: 'ملاحظة', details: 'متابعة لخطة التغذية', doctor: 'د. أحمد المصري' }] },
];

const initialAvailability: AvailabilitySlot[] = [
  { id: 1, date: '2024-08-05', time: '09:00' },
  { id: 2, date: '2024-08-05', time: '09:30' },
  { id: 3, date: '2024-08-06', time: '11:00' },
];

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


const DoctorDashboardPage: React.FC = () => {
    const [doctor, setDoctor] = useState({ name: 'د. سارة عبد الرحمن', specialty: 'طبيبة أطفال' });
    
    // State for modals
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
    const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] = useState(false);
    
    // State for data
    const [patients, setPatients] = useState<Patient[]>(initialPatients);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [callDetails, setCallDetails] = useState({ patientName: '', doctorName: '' });
    
    // State for new availability feature
    const [availability, setAvailability] = useState<AvailabilitySlot[]>(initialAvailability);
    const [newSlotDate, setNewSlotDate] = useState('');
    const [newSlotTime, setNewSlotTime] = useState('');

    const todayAppointments = [
        { id: 1, patient: 'نورة خالد', time: '10:00 ص', status: 'upcoming' },
        { id: 2, patient: 'خالد عبد الله', time: '10:30 ص', status: 'upcoming' },
        { id: 3, patient: 'فاطمة علي', time: '11:00 ص', status: 'completed' },
    ];
    
    const startVideoCall = (patientName: string) => {
        setCallDetails({ patientName, doctorName: doctor.name });
        setIsVideoCallOpen(true);
    };

    const handleOpenPatientRecord = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsPatientRecordModalOpen(true);
    };

    const handleAddSlot = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSlotDate && newSlotTime) {
            const newSlot: AvailabilitySlot = {
                id: Date.now(),
                date: newSlotDate,
                time: newSlotTime,
            };
            setAvailability([...availability, newSlot].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time)));
            setNewSlotDate('');
            setNewSlotTime('');
        }
    };

    const handleDeleteSlot = (id: number) => {
        setAvailability(availability.filter(slot => slot.id !== id));
    };


    return (
        <>
            <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="container mx-auto">
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                             <h1 className="text-4xl font-extrabold text-primary-dark">لوحة تحكم الطبيب</h1>
                             <p className="text-lg text-gray-600 mt-2">مرحبًا بعودتك، {doctor.name}!</p>
                        </div>
                         <button onClick={() => setIsProfileModalOpen(true)} className="bg-white p-3 rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                            <CogIcon />
                        </button>
                    </header>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Appointments Section */}
                        <DashboardCard className="lg:col-span-2" title="مواعيد اليوم (الحجوزات)" icon={<CalendarIcon />}>
                            <div className="space-y-4">
                                {todayAppointments.map(appt => (
                                    <div key={appt.id} className="p-4 bg-blue-50 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-primary">{appt.patient}</p>
                                            <p className="text-sm text-gray-600">{appt.time}</p>
                                        </div>
                                        {appt.status === 'upcoming' ? (
                                            <button onClick={() => startVideoCall(appt.patient)} className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 flex items-center gap-2 text-sm">
                                                <VideoCameraIcon className="h-5 w-5"/>
                                                <span>بدء الاجتماع</span>
                                            </button>
                                        ) : (
                                            <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">مكتمل</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>

                        {/* Patients Section */}
                        <DashboardCard className="lg:col-span-1" title="سجلات المرضى" icon={<UsersIcon />}>
                            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                {patients.map(patient => (
                                    <div key={patient.id} className="py-3 flex justify-between items-center">
                                        <p className="font-semibold text-gray-800">{patient.name}</p>
                                        <button onClick={() => handleOpenPatientRecord(patient)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-sm font-semibold">
                                            عرض السجل
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>

                        {/* Manage Availability Section */}
                        <DashboardCard className="lg:col-span-3" title="إدارة المواعيد المتاحة" icon={<ClockIcon />}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1 p-4 border rounded-lg bg-gray-50">
                                    <h4 className="font-semibold text-gray-700 mb-2">إضافة موعد جديد</h4>
                                    <form onSubmit={handleAddSlot} className="space-y-3">
                                        <div>
                                            <label htmlFor="slot-date" className="text-sm font-medium text-gray-600">التاريخ</label>
                                            <input id="slot-date" type="date" value={newSlotDate} onChange={e => setNewSlotDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mt-1" required />
                                        </div>
                                        <div>
                                            <label htmlFor="slot-time" className="text-sm font-medium text-gray-600">الوقت</label>
                                            <input id="slot-time" type="time" value={newSlotTime} onChange={e => setNewSlotTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mt-1" required />
                                        </div>
                                        <button type="submit" className="w-full bg-secondary text-white font-bold py-2 rounded-md hover:bg-opacity-90 transition-colors">إضافة الموعد</button>
                                    </form>
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="font-semibold text-gray-700 mb-2">المواعيد المتاحة القادمة</h4>
                                    <div className="max-h-64 overflow-y-auto space-y-2 border p-3 rounded-md bg-white">
                                        {availability.length > 0 ? availability.map(slot => (
                                            <div key={slot.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                                <span className="font-mono text-sm text-gray-800">{new Date(slot.date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })} - {slot.time}</span>
                                                <button onClick={() => handleDeleteSlot(slot.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100" aria-label="حذف الموعد">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )) : <p className="text-gray-500 text-center py-8">لا توجد مواعيد متاحة حاليًا.</p>}
                                    </div>
                                </div>
                            </div>
                        </DashboardCard>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <VideoCallModal 
                isOpen={isVideoCallOpen} 
                onClose={() => setIsVideoCallOpen(false)} 
                localUser={callDetails.doctorName} 
                remoteUser={callDetails.patientName} 
            />

            <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="تعديل الملف الشخصي">
                <p>هنا يمكن وضع نموذج لتعديل معلومات الطبيب.</p>
            </Modal>

            <Modal isOpen={isPatientRecordModalOpen} onClose={() => setIsPatientRecordModalOpen(false)} title={`سجل المريض: ${selectedPatient?.name}`} size="xl">
                {selectedPatient && (
                    <div>
                        <h3 className="font-bold">التاريخ الطبي</h3>
                        <div className="mt-4 border rounded-lg p-4">
                            {selectedPatient.medicalHistory.map((entry, index) => (
                                <div key={index} className="border-b last:border-b-0 py-2">
                                    <p><span className="font-semibold">التاريخ:</span> {entry.date}</p>
                                    <p><span className="font-semibold">النوع:</span> {entry.type}</p>
                                    <p><span className="font-semibold">التفاصيل:</span> {entry.details}</p>
                                    <p><span className="font-semibold">الطبيب:</span> {entry.doctor}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default DoctorDashboardPage;
