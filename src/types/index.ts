export interface Review {
  id: string;
  rating: number;
  comment: string;
  platform: 'internal' | 'google' | 'openrice';
  createdAt: string;
}

export * from './supabase'; 