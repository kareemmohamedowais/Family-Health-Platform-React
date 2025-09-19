
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DOCTORS } from '../constants';

// --- Calendar Component ---
interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

  const days = [];
  let day = new Date(startDate);

  while (day <= endDate) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const isSameDay = (d1: Date, d2: Date) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="font-bold text-lg text-gray-800">
          {currentMonth.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2 font-semibold">
        {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const isCurrentMonth = d.getMonth() === currentMonth.getMonth();
          const isSelected = isSameDay(d, selectedDate);
          const isToday = isSameDay(d, startOfToday);
          const isPast = d < startOfToday;

          let classes = "w-10 h-10 flex items-center justify-center rounded-full transition-colors text-sm";
          if (!isCurrentMonth) {
            classes += " text-gray-300";
          } else if (isPast) {
              classes += " text-gray-400 cursor-not-allowed";
          } else {
            classes += " cursor-pointer";
            if (isSelected) {
              classes += " bg-primary text-white font-bold shadow";
            } else if (isToday) {
              classes += " bg-blue-200 text-primary-dark font-bold";
            } else {
              classes += " text-gray-700 hover:bg-blue-100";
            }
          }
          
          return (
            <div
              key={i}
              className={classes}
              onClick={() => isCurrentMonth && !isPast && onDateSelect(d)}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const doctor = DOCTORS.find(d => d.id === parseInt(doctorId || ''));
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Example of some slots being unavailable for demonstration
  const timeSlots = [
    { time: '09:00 ص', available: true },
    { time: '09:30 ص', available: true },
    { time: '10:00 ص', available: false },
    { time: '10:30 ص', available: true },
    { time: '11:00 ص', available: true },
    { time: '02:00 م', available: true },
    { time: '02:30 م', available: false },
    { time: '03:00 م', available: true },
  ];

  const handleBooking = () => {
    if (selectedTime && bookingStatus === 'idle') {
      setBookingStatus('processing');
      // Simulate API call
      setTimeout(() => {
        setBookingStatus('success');
        // Wait for user to see success message before showing the final screen
        setTimeout(() => {
          setIsBooked(true);
        }, 1200);
      }, 1500);
    }
  };
  
  const getButtonContent = () => {
    switch (bookingStatus) {
      case 'processing':
        return (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري الحجز...
          </>
        );
      case 'success':
        return 'تم الحجز بنجاح ✓';
      default:
        return 'تأكيد الحجز';
    }
  };


  if (!doctor) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">لم يتم العثور على الطبيب</h1>
        <Link to="/doctors" className="text-primary hover:underline mt-4 inline-block">العودة إلى قائمة الأطباء</Link>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="bg-gray-50 min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-lg shadow-xl">
          <svg className="w-16 h-16 mx-auto text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h1 className="text-3xl font-bold text-primary-dark mt-4">تم تأكيد حجزك بنجاح!</h1>
          <p className="text-gray-600 mt-2">
            تم حجز موعدك مع <span className="font-bold">{doctor.name}</span> في تاريخ {selectedDate.toLocaleDateString('ar-EG')}، الساعة {selectedTime}.
          </p>
          <p className="mt-2">سوف تتلقى تذكيرًا عبر البريد الإلكتروني قبل الموعد.</p>
          <Link to="/" className="mt-6 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-center text-primary-dark mb-8">حجز موعد</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md text-center self-start">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto object-cover shadow-sm" />
            <h2 className="text-2xl font-bold mt-4">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. اختر التاريخ</h3>
                <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. اختر الوقت المتاح</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map(({time, available}) => (
                    <button 
                      key={time}
                      onClick={() => available && setSelectedTime(time)}
                      disabled={!available}
                      className={`p-3 rounded-lg text-center font-semibold transition-colors border-2 ${
                        selectedTime === time 
                        ? 'bg-primary text-white border-primary-dark shadow-md' 
                        : available 
                          ? 'bg-white text-gray-700 border-gray-200 hover:bg-blue-100 hover:border-primary' 
                          : 'bg-gray-50 text-gray-400 border-gray-100 line-through cursor-not-allowed'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                 <button 
                  onClick={handleBooking} 
                  disabled={!selectedTime || bookingStatus !== 'idle'}
                  className={`w-full flex justify-center items-center font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out ${
                    bookingStatus === 'success'
                      ? 'bg-green-500 text-white cursor-default'
                      : 'bg-secondary text-white hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed'
                  }`}
                >
                  {getButtonContent()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
