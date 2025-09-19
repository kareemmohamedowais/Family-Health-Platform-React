
import React from 'react';
import type { Doctor, Article, Testimonial, FAQItem, ForumCategory, ForumThread, ForumPost } from './types';

export const DOCTORS: Doctor[] = [
  { 
    id: 1, 
    name: 'د. سارة عبد الرحمن', 
    specialty: 'طبيبة أطفال', 
    imageUrl: 'https://picsum.photos/seed/doc1/400/400', 
    rating: 4.9, 
    reviews: 120,
    bio: 'د. سارة هي طبيبة أطفال متمرسة لديها أكثر من 10 سنوات من الخبرة في رعاية الأطفال حديثي الولادة والمراهقين. تؤمن بأهمية الرعاية الوقائية وتثقيف الآباء لضمان نمو صحي لأطفالهم.',
    education: ['بكالوريوس الطب والجراحة، جامعة القاهرة', 'ماجستير طب الأطفال، جامعة عين شمس'],
    specializations: ['صحة حديثي الولادة', 'أمراض الجهاز التنفسي لدى الأطفال', 'التغذية والنمو']
  },
  { 
    id: 2, 
    name: 'د. أحمد المصري', 
    specialty: 'أخصائي تغذية', 
    imageUrl: 'https://picsum.photos/seed/doc2/400/400', 
    rating: 4.8, 
    reviews: 95,
    bio: 'د. أحمد متخصص في التغذية العلاجية وتغذية الأسرة، مع التركيز على صحة الأم والطفل. يساعد العائلات على تبني عادات غذائية صحية ومستدامة.',
    education: ['بكالوريوس علوم التغذية', 'دبلوم التغذية العلاجية'],
    specializations: ['تغذية الحوامل والمرضعات', 'تغذية الأطفال', 'إدارة الوزن']
  },
  { 
    id: 3, 
    name: 'د. فاطمة الزهراء', 
    specialty: 'استشارية نفسية', 
    imageUrl: 'https://picsum.photos/seed/doc3/400/400', 
    rating: 5.0, 
    reviews: 210,
    bio: 'د. فاطمة تقدم الدعم النفسي للأمهات والآباء خلال رحلة الأبوة، متخصصة في التعامل مع تحديات ما بعد الولادة والقلق الأسري.',
    education: ['ليسانس علم النفس', 'ماجستير في الإرشاد النفسي الأسري'],
    specializations: ['اكتئاب ما بعد الولادة', 'العلاقات الزوجية', 'إدارة ضغوطات الأبوة والأمومة']
  },
  { 
    id: 4, 
    name: 'د. عمر خالد', 
    specialty: 'طبيب عام', 
    imageUrl: 'https://picsum.photos/seed/doc4/400/400', 
    rating: 4.7, 
    reviews: 88,
    bio: 'د. عمر هو طبيب أسرة يقدم رعاية صحية شاملة لجميع أفراد العائلة، من الفحوصات الدورية إلى إدارة الحالات المزمنة.',
    education: ['بكالوريوس الطب العام'],
    specializations: ['طب الأسرة', 'الرعاية الصحية الأولية', 'الأمراض المزمنة']
  },
];

export const ARTICLES: Article[] = [
  { 
    id: 1, 
    title: 'أهمية التغذية السليمة أثناء الحمل', 
    excerpt: 'نصائح الخبراء حول أفضل الأطعمة لضمان صحة الأم والجنين.', 
    imageUrl: 'https://picsum.photos/seed/art1/600/400', 
    author: 'د. أحمد المصري', 
    date: '15 يونيو 2024',
    content: 'تعتبر فترة الحمل من أهم المراحل في حياة المرأة، حيث يتطلب جسمها عناصر غذائية إضافية لدعم نمو الجنين والحفاظ على صحتها. ينصح الأطباء بالتركيز على نظام غذائي متوازن يشمل البروتينات، الكربوهرات المعقدة، الدهون الصحية، بالإضافة إلى الفيتامينات والمعادن الأساسية مثل حمض الفوليك، الحديد، والكالسيوم. \n\nيجب الحرص على تناول كميات كافية من الخضروات والفواكه الطازجة، الحبوب الكاملة، ومنتجات الألبان. كما يُنصح بتجنب الأطعمة غير المبسترة واللحوم النيئة لتقليل خطر الإصابة بالعدوى. شرب كميات وافرة من الماء ضروري أيضًا للحفاظ على ترطيب الجسم.'
  },
  { 
    id: 2, 
    title: 'كيفية التعامل مع اكتئاب ما بعد الولادة', 
    excerpt: 'دليل شامل للأمهات الجدد للتعرف على الأعراض وطلب المساعدة.', 
    imageUrl: 'https://picsum.photos/seed/art2/600/400', 
    author: 'د. فاطمة الزهراء', 
    date: '12 يونيو 2024',
    content: 'اكتئاب ما بعد الولادة هو حالة شائعة تصيب العديد من الأمهات الجدد، وتتجاوز مجرد "الكآبة النفاسية". تشمل الأعراض الشعور بالحزن المستمر، فقدان الاهتمام بالأنشطة الممتعة، صعوبة في النوم، وتغيرات في الشهية. من المهم جدًا أن تدرك الأم أنها ليست وحدها وأن طلب المساعدة هو علامة قوة. \n\nيمكن أن يشمل العلاج الدعم النفسي من خلال التحدث مع استشاري، الانضمام إلى مجموعات دعم، وفي بعض الحالات، قد يوصي الطبيب بالأدوية. الدعم من الشريك والعائلة يلعب دورًا حاسمًا في التعافي. تذكري دائمًا أن الاعتناء بنفسك هو جزء أساسي من الاعتناء بطفلك.'
  },
  { 
    id: 3, 
    title: 'الجدول الزمني لتطعيمات الأطفال', 
    excerpt: 'كل ما تحتاجين معرفته عن التطعيمات الضرورية لطفلك في عامه الأول.', 
    imageUrl: 'https://picsum.photos/seed/art3/600/400', 
    author: 'د. سارة عبد الرحمن', 
    date: '10 يونيو 2024',
    content: 'تعتبر التطعيمات خط الدفاع الأول لحماية طفلك من العديد من الأمراض الخطيرة. تتبع وزارة الصحة جدولًا زمنيًا محددًا لضمان حصول الطفل على الحماية في الوقت المناسب. يبدأ جدول التطعيمات منذ الولادة ويستمر خلال السنوات الأولى من عمر الطفل. \n\nتشمل التطعيمات الأساسية في العام الأول لقاحات ضد شلل الأطفال، الحصبة، النكاف، الحصبة الألمانية، والتهاب الكبد الوبائي وغيرها. من الضروري الالتزام بالمواعيد المحددة من قبل طبيب الأطفال وعدم تأجيلها لضمان فعالية اللقاحات. استشيري طبيبك دائمًا للحصول على الجدول الزمني المحدث وأي معلومات إضافية حول أهمية كل تطعيم.'
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'نورة', role: 'أم جديدة', quote: 'منصة رائعة! ساعدني الشات بوت في الإجابة على الكثير من أسئلتي السريعة في منتصف الليل.', imageUrl: 'https://picsum.photos/seed/user1/100/100' },
  { id: 2, name: 'خالد', role: 'أب', quote: 'تمكنت من حجز استشارة مع طبيبة أطفال بسهولة، وكانت الجلسة عبر الفيديو مريحة وفعالة جدًا.', imageUrl: 'https://picsum.photos/seed/user2/100/100' },
  { id: 3, name: 'مريم', role: 'حامل', quote: 'المقالات والنصائح المقدمة قيمة للغاية، أشعر بدعم كبير خلال فترة الحمل بفضل هذا التطبيق.', imageUrl: 'https://picsum.photos/seed/user3/100/100' },
];

export const FAQ_ITEMS: FAQItem[] = [
    { question: 'كيف يمكنني حجز موعد مع طبيب؟', answer: 'يمكنك تصفح قائمة الأطباء، اختيار الطبيب المناسب، والضغط على زر "احجز الآن" لاختيار الموعد المناسب لك.' },
    { question: 'هل الاستشارات عبر الإنترنت آمنة؟', answer: 'نعم، جميع استشاراتنا تتم عبر اتصال مشفر وآمن لضمان خصوصية معلوماتك الصحية.' },
    { question: 'ما هي خطط الدفع المتاحة؟', answer: 'نحن نقدم خطط اشتراك شهرية وسنوية، بالإضافة إلى خيار الدفع لكل استشارة على حدة. يمكنك الاطلاع على صفحة "الأسعار" لمزيد من التفاصيل.' },
    { question: 'هل الشات بوت يغني عن استشارة الطبيب؟', answer: 'لا، الشات بوت مصمم لتقديم معلومات عامة ودعم أولي. للحالات الطبية والتشخيص، يجب دائمًا استشارة طبيب متخصص.' },
];

// --- Mock Data for New Features ---

export const FORUM_CATEGORIES: ForumCategory[] = [
    { 
        id: 'pregnancy-journey', 
        title: 'رحلة الحمل', 
        description: 'لتبادل الخبرات والنصائح خلال أشهر الحمل التسعة.', 
        threadCount: 125, 
        postCount: 1500,
        // FIX: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
        icon: React.createElement('svg', {xmlns:"http://www.w3.org/2000/svg", className:"h-8 w-8", fill:"none", viewBox:"0 0 24 24", stroke:"currentColor"}, React.createElement('path', {strokeLinecap:"round", strokeLinejoin:"round", strokeWidth:2, d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"}))
    },
    { 
        id: 'newborn-care', 
        title: 'رعاية حديثي الولادة', 
        description: 'كل ما يخص رعاية المولود الجديد من تغذية ونوم وصحة.', 
        threadCount: 210, 
        postCount: 3200,
        // FIX: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
        icon: React.createElement('svg', {xmlns:"http://www.w3.org/2000/svg", className:"h-8 w-8", fill:"none", viewBox:"0 0 24 24", stroke:"currentColor"}, React.createElement('path', {strokeLinecap:"round", strokeLinejoin:"round", strokeWidth:2, d:"M12 11c0 3.517-1.009 6.78-2.75 9.566-1.74 2.786-5.25 2.786-7 0C.25 17.78 0 14.517 0 11c0-3.517.25-6.78 2-9.566C3.74 3.65 7.25 3.65 9 1.434 10.74.218 12 3.483 12 11z"}))
    },
    { 
        id: 'child-nutrition', 
        title: 'تغذية الأطفال', 
        description: 'وصفات، نصائح، وتحديات تغذية الأطفال في مختلف الأعمار.', 
        threadCount: 95, 
        postCount: 980,
        // FIX: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
        icon: React.createElement('svg', {xmlns:"http://www.w3.org/2000/svg", className:"h-8 w-8", fill:"none", viewBox:"0 0 24 24", stroke:"currentColor"}, React.createElement('path', {strokeLinecap:"round", strokeLinejoin:"round", strokeWidth:2, d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}))
    },
    { 
        id: 'family-wellbeing', 
        title: 'الصحة النفسية للأسرة', 
        description: 'للنقاش حول الصحة النفسية للأم والأب والعلاقات الأسرية.', 
        threadCount: 80, 
        postCount: 750,
        // FIX: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
        icon: React.createElement('svg', {xmlns:"http://www.w3.org/2000/svg", className:"h-8 w-8", fill:"none", viewBox:"0 0 24 24", stroke:"currentColor"}, React.createElement('path', {strokeLinecap:"round", strokeLinejoin:"round", strokeWidth:2, d:"M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"}))
    },
];

export const FORUM_THREADS: ForumThread[] = [
    { id: 1, categoryId: 'pregnancy-journey', title: 'ما هي أفضل الأطعمة لتجنب الغثيان الصباحي؟', authorName: 'منى', authorId: 1, createdAt: 'منذ يومين', replyCount: 15, viewCount: 250, lastReply: { authorName: 'سارة', createdAt: 'منذ 3 ساعات' } },
    { id: 2, categoryId: 'pregnancy-journey', title: 'تجربتي مع تمارين الحمل في الشهر السابع', authorName: 'هند', authorId: 2, createdAt: 'منذ 5 أيام', replyCount: 8, viewCount: 180, lastReply: { authorName: 'فاطمة', createdAt: 'منذ يوم' } },
    { id: 3, categoryId: 'newborn-care', title: 'استفسار بخصوص تنظيم نوم الرضيع', authorName: 'خالد', authorId: 3, createdAt: 'منذ 10 ساعات', replyCount: 22, viewCount: 400, lastReply: { authorName: 'د. سارة', createdAt: 'منذ 20 دقيقة' } },
];

export const FORUM_POSTS: ForumPost[] = [
    { id: 1, threadId: 1, authorName: 'منى', authorImageUrl: 'https://picsum.photos/seed/user4/100/100', createdAt: 'منذ يومين', content: 'مرحبًا جميعًا، أنا في الأسبوع الثامن وأعاني من الغثيان بشدة في الصباح. هل لديكم أي نصائح أو أطعمة معينة ساعدتكم في التغلب على هذا الشعور؟', isOriginalPost: true },
    { id: 2, threadId: 1, authorName: 'سارة', authorImageUrl: 'https://picsum.photos/seed/user1/100/100', createdAt: 'منذ يومين', content: 'أهلاً منى. جربي تناول قطعة بسكويت مالح قبل النهوض من السرير. ساعدني ذلك كثيرًا. أيضًا الزنجبيل الطازج مفيد جدًا.' },
    { id: 3, threadId: 1, authorName: 'نورة', authorImageUrl: 'https://picsum.photos/seed/user3/100/100', createdAt: 'منذ يوم', content: 'بالنسبة لي، تقسيم الوجبات إلى وجبات صغيرة ومتعددة على مدار اليوم كان أفضل حل. تجنبي المعدة الفارغة.' },
    { id: 4, threadId: 1, authorName: 'د. أحمد المصري', authorImageUrl: 'https://picsum.photos/seed/doc2/100/100', createdAt: 'منذ 3 ساعات', content: 'نصائح ممتازة! أضيف أيضًا أهمية شرب السوائل بكثرة وتجنب الأطعمة الدهنية والحارة. إذا استمر الغثيان الشديد، من المهم استشارة طبيبك المتابع. - (رد من خبير معتمد)' },
];
