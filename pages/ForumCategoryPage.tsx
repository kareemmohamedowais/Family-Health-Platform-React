import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FORUM_CATEGORIES, FORUM_THREADS } from '../constants';
import type { ForumThread } from '../types';

const ThreadRow: React.FC<{ thread: ForumThread }> = ({ thread }) => (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-grow">
            <Link to={`/forums/${thread.categoryId}/${thread.id}`} className="text-lg font-bold text-primary hover:underline">
                {thread.title}
            </Link>
            <p className="text-sm text-gray-500">بواسطة <span className="font-semibold">{thread.authorName}</span>, {thread.createdAt}</p>
        </div>
        <div className="flex-shrink-0 grid grid-cols-3 gap-4 text-center text-sm w-full sm:w-auto">
            <div>
                <p className="font-bold">{thread.replyCount}</p>
                <p className="text-gray-500">الردود</p>
            </div>
            <div>
                <p className="font-bold">{thread.viewCount}</p>
                <p className="text-gray-500">المشاهدات</p>
            </div>
            <div className="text-right sm:text-center">
                <p className="font-semibold text-gray-800">{thread.lastReply.authorName}</p>
                <p className="text-xs text-gray-500">{thread.lastReply.createdAt}</p>
            </div>
        </div>
    </div>
);


const ForumCategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    
    const category = FORUM_CATEGORIES.find(c => c.id === categoryId);
    const threads = FORUM_THREADS.filter(t => t.categoryId === categoryId);

    if (!category) {
        return <div className="text-center p-12">لم يتم العثور على القسم.</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <button onClick={() => navigate('/forums')} className="text-primary hover:underline mb-4">&larr; العودة إلى كل المنتديات</button>
                    <h1 className="text-4xl font-extrabold text-primary-dark">{category.title}</h1>
                    <p className="mt-2 text-lg text-gray-600">{category.description}</p>
                </div>
                
                <div className="space-y-4">
                    {threads.map(thread => (
                        <ThreadRow key={thread.id} thread={thread} />
                    ))}
                    {threads.length === 0 && (
                        <div className="text-center p-12 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-600">لا توجد مواضيع في هذا القسم بعد. كن أول من يبدأ نقاشًا!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForumCategoryPage;