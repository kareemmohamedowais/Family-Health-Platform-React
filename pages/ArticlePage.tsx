import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES } from '../constants';

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const article = ARTICLES.find(a => a.id === parseInt(articleId || ''));
  const relatedArticles = ARTICLES.filter(a => a.id !== parseInt(articleId || '')).slice(0, 2);

  if (!article) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">لم يتم العثور على المقال</h1>
        <Link to="/articles" className="text-primary hover:underline mt-4 inline-block">العودة إلى قائمة المقالات</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-500 mb-6">
            <span>بواسطة {article.author}</span>
            <span className="mx-2">|</span>
            <span>{article.date}</span>
          </div>

          {/* Article Image */}
          <img src={article.imageUrl} alt={article.title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" style={{whiteSpace: 'pre-wrap'}}>
            {article.content}
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map(related => (
                <Link key={related.id} to={`/articles/${related.id}`} className="group block bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={related.imageUrl} alt={related.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">{related.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
