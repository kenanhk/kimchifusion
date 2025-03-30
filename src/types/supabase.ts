export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feedbacks: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          overall_rating: number
          enjoyed_most: string | null
          food_quality: number | null
          service_quality: number | null
          improvements: string | null
          additional_comments: string | null
          submitted_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          overall_rating: number
          enjoyed_most?: string | null
          food_quality?: number | null
          service_quality?: number | null
          improvements?: string | null
          additional_comments?: string | null
          submitted_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          overall_rating?: number
          enjoyed_most?: string | null
          food_quality?: number | null
          service_quality?: number | null
          improvements?: string | null
          additional_comments?: string | null
          submitted_at?: string
        }
      }
      submission_attempts: {
        Row: {
          id: string
          email: string
          ip_address: string
          attempt_time: string
          success: boolean
        }
        Insert: {
          id?: string
          email: string
          ip_address: string
          attempt_time?: string
          success: boolean
        }
        Update: {
          id?: string
          email?: string
          ip_address?: string
          attempt_time?: string
          success?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 