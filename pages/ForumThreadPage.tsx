import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FORUM_THREADS, FORUM_POSTS, FORUM_CATEGORIES } from '../constants';
import type { ForumPost } from '../types';

const PostCard: React.FC<{ post: ForumPost }> = ({ post }) => (
    <div className={`bg-white rounded-lg shadow-sm flex items-start gap-4 p-5 ${post.isOriginalPost ? 'border-2 border-primary' : ''}`}>
        <div className="flex-shrink-0 text-center">
            <img src={post.authorImageUrl} alt={post.authorName} className="w-16 h-16 rounded-full object-cover mx-auto" />
            <p className="font-bold mt-2 text-primary-dark">{post.authorName}</p>
        </div>
        <div className="flex-1">
            <p className="text-xs text-gray-500 border-b pb-2 mb-3">{post.createdAt}</p>
            <div className="prose prose-sm max-w-none text-gray-800">
                <p>{post.content}</p>
            </div>
        </div>
    </div>
);


const ForumThreadPage: React.FC = () => {
    const { categoryId, threadId } = useParams<{ categoryId: string; threadId: string }>();
    const navigate = useNavigate();

    const thread = FORUM_THREADS.find(t => t.id === Number(threadId));
    const category = FORUM_CATEGORIES.find(c => c.id === categoryId);
    
    const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS.filter(p => p.threadId === Number(threadId)));
    const [newReply, setNewReply] = useState('');

    if (!thread || !category) {
        return <div className="text-center p-12">لم يتم العثور على الموضوع.</div>;
    }
    
    const handleAddReply = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newReply.trim()) return;
        
        const reply: ForumPost = {
            id: Date.now(),
            threadId: Number(threadId),
            authorName: 'أنت', // Placeholder for logged in user
            authorImageUrl: 'https://picsum.photos/seed/currentUser/100/100',
            createdAt: 'الآن',
            content: newReply
        };
        setPosts([...posts, reply]);
        setNewReply('');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><Link to="/forums" className="hover:underline">المنتديات</Link></li>
                            <li><Link to={`/forums/${categoryId}`} className="hover:underline">{category.title}</Link></li>
                        </ul>
                    </div>
                    <h1 className="text-3xl font-extrabold text-primary-dark mt-2">{thread.title}</h1>
                </div>

                <div className="space-y-6">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">أضف ردًا</h3>
                    <form onSubmit={handleAddReply}>
                        <textarea
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            rows={5}
                            placeholder="اكتب ردك هنا..."
                            required
                        ></textarea>
                        <div className="text-left mt-4">
                             <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-primary-dark transition-colors">
                                إرسال الرد
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForumThreadPage;