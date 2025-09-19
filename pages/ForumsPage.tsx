import React from 'react';
import { Link } from 'react-router-dom';
import { FORUM_CATEGORIES } from '../constants';
import type { ForumCategory } from '../types';

const CategoryCard: React.FC<{ category: ForumCategory }> = ({ category }) => (
    <Link to={`/forums/${category.id}`} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start gap-4">
            <div className="text-primary bg-blue-50 p-3 rounded-lg">
                {category.icon}
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-primary-dark">{category.title}</h3>
                <p className="text-gray-600 mt-1">{category.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                    <span><span className="font-semibold">{category.threadCount}</span> موضوع</span>
                    <span><span className="font-semibold">{category.postCount}</span> مشاركة</span>
                </div>
            </div>
        </div>
    </Link>
);


const ForumsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-primary-dark">منتديات صحة العائلة</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                تواصل مع مجتمع من الآباء والأمهات، شارك تجاربك، واحصل على الدعم من أفراد يمرون بنفس رحلتك.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {FORUM_CATEGORIES.map(category => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;