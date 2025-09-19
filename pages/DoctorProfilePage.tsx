import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DOCTORS } from '../constants';

const DoctorProfilePage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const doctor = DOCTORS.find(d => d.id === parseInt(doctorId || ''));

  if (!doctor) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">لم يتم العثور على الطبيب</h1>
        <Link to="/doctors" className="text-primary hover:underline mt-4 inline-block">العودة إلى قائمة الأطباء</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Doctor Card */}
            <div className="md:col-span-1 text-center">
              <img src={doctor.imageUrl} alt={doctor.name} className="w-48 h-48 rounded-full mx-auto object-cover shadow-md" />
              <h1 className="text-3xl font-bold mt-4 text-primary-dark">{doctor.name}</h1>
              <p className="text-lg text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center justify-center mt-2 text-yellow-500">
                <span>{doctor.rating.toFixed(1)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-gray-500 text-sm mr-2">({doctor.reviews} تقييم)</span>
              </div>
              <Link to={`/booking/${doctor.id}`} className="mt-6 w-full block bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-transform duration-300 hover:scale-105 shadow-lg">
                احجز موعد الآن
              </Link>
            </div>
            
            {/* Doctor Details */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-primary pb-2">عن الطبيب</h2>
                  <p className="mt-4 text-gray-700 leading-relaxed">{doctor.bio}</p>
                </div>
                 <div>
                  <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-primary pb-2">المؤهلات العلمية</h2>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                    {doctor.education.map((edu, index) => <li key={index}>{edu}</li>)}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-primary pb-2">التخصصات الدقيقة</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {doctor.specializations.map((spec, index) => (
                      <span key={index} className="bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
