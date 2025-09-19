
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  bio: string;
  education: string[];
  specializations: string[];
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  content: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// New Types for added features

export interface Symptom {
    id: number;
    date: string;
    name: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    notes: string;
}

export interface ForumCategory {
    id: string;
    title: string;
    description: string;
    threadCount: number;
    postCount: number;
    icon: React.ReactNode;
}

export interface ForumThread {
    id: number;
    categoryId: string;
    title: string;
    authorName: string;
    authorId: number;
    createdAt: string;
    replyCount: number;
    viewCount: number;
    lastReply: {
        authorName: string;
        createdAt: string;
    }
}

export interface ForumPost {
    id: number;
    threadId: number;
    authorName: string;
    authorImageUrl: string;
    createdAt: string;
    content: string;
    isOriginalPost?: boolean;
}

export interface DirectMessage {
    id: number;
    sender: 'Doctor' | 'Patient';
    text: string;
    timestamp: string;
}

export interface MessageConversation {
    id: number;
    participant: {
        name: string;
        role: 'Patient' | 'Doctor';
    };
    lastMessage: string;
    timestamp: string;
    messages: DirectMessage[];
}

// FIX: Added missing type definitions for Patient and MedicalEntry
export interface MedicalEntry {
  date: string;
  type: 'تشخيص' | 'ملاحظة';
  details: string;
  doctor: string;
}

export interface Patient {
  id: number;
  name: string;
  lastVisit: string;
  age: number;
  gender: 'أنثى';
  medicalHistory: MedicalEntry[];
}

export interface AvailabilitySlot {
  id: number;
  date: string;
  time: string;
}
