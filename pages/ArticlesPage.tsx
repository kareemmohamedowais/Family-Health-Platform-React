import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';
import { ARTICLES } from '../constants';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <Link to={`/articles/${article.id}`} className="group block bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
    <div className="overflow-hidden">
        <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">{article.title}</h3>
      <p className="mt-2 text-gray-600 flex-grow">{article.excerpt}</p>
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <span>{article.author}</span>
        <span>{article.date}</span>
      </div>
    </div>
  </Link>
);

const ArticlesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-center text-primary-dark mb-2">مقالات صحية</h1>
        <p className="text-center text-lg text-gray-600 mb-12">معلومات موثوقة من خبراء الصحة لتعزيز وعيك الصحي</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;