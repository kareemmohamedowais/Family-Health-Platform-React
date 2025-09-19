import React from 'react';
import { Link } from 'react-router-dom';
import type { Doctor } from '../types';
import { DOCTORS } from '../constants';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
    <Link to={`/doctors/${doctor.id}`} className="block">
      <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-64 object-cover" />
    </Link>
    <div className="p-6 flex flex-col flex-grow">
      <Link to={`/doctors/${doctor.id}`} className="hover:text-primary transition-colors">
        <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
      </Link>
      <p className="text-primary mt-1">{doctor.specialty}</p>
      <div className="flex items-center mt-4 text-yellow-500">
        <span>{doctor.rating.toFixed(1)}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-gray-500 text-sm mr-2">({doctor.reviews} تقييم)</span>
      </div>
      <Link 
        to={`/booking/${doctor.id}`} 
        className="mt-auto block text-center w-full bg-secondary text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors mt-6"
      >
        احجز الآن
      </Link>
    </div>
  </div>
);

const DoctorsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-center text-primary-dark mb-2">ابحث عن الطبيب المناسب</h1>
        <p className="text-center text-lg text-gray-600 mb-8">نخبة من أفضل الأطباء في خدمتكم</p>
        
        {/* Filters */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="اسم الطبيب" className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"/>
            <select className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary">
              <option>كل التخصصات</option>
              <option>طبيب أطفال</option>
              <option>أخصائي تغذية</option>
              <option>استشاري نفسي</option>
            </select>
            <button className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
              بحث
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {DOCTORS.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;