export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          analytics_id: number
          metric: string
          recorded_at: string | null
          value: number
        }
        Insert: {
          analytics_id?: number
          metric: string
          recorded_at?: string | null
          value: number
        }
        Update: {
          analytics_id?: number
          metric?: string
          recorded_at?: string | null
          value?: number
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_breaking: boolean | null
          is_pinned: boolean | null
          published_at: string | null
          reading_time: number | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_breaking?: boolean | null
          is_pinned?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_breaking?: boolean | null
          is_pinned?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      bookmark_categories: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          article_id: number
          auth_user_id: string | null
          bookmark_id: number
          category: string | null
          is_read: boolean | null
          notes: string | null
          reading_time: number | null
          saved_at: string | null
          tags: string[] | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          article_id: number
          auth_user_id?: string | null
          bookmark_id?: number
          category?: string | null
          is_read?: boolean | null
          notes?: string | null
          reading_time?: number | null
          saved_at?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          article_id?: number
          auth_user_id?: string | null
          bookmark_id?: number
          category?: string | null
          is_read?: boolean | null
          notes?: string | null
          reading_time?: number | null
          saved_at?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "newsarticles"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      categories: {
        Row: {
          category_id: number
          name: string
          parent_id: number | null
        }
        Insert: {
          category_id?: number
          name: string
          parent_id?: number | null
        }
        Update: {
          category_id?: number
          name?: string
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      factchecks: {
        Row: {
          checked_by: number | null
          claim_text: string
          evidence: string | null
          fact_check_id: number
          published_at: string | null
          related_submission_id: number | null
          report_url: string | null
          verdict: Database["public"]["Enums"]["fact_verdict"]
        }
        Insert: {
          checked_by?: number | null
          claim_text: string
          evidence?: string | null
          fact_check_id?: number
          published_at?: string | null
          related_submission_id?: number | null
          report_url?: string | null
          verdict: Database["public"]["Enums"]["fact_verdict"]
        }
        Update: {
          checked_by?: number | null
          claim_text?: string
          evidence?: string | null
          fact_check_id?: number
          published_at?: string | null
          related_submission_id?: number | null
          report_url?: string | null
          verdict?: Database["public"]["Enums"]["fact_verdict"]
        }
        Relationships: [
          {
            foreignKeyName: "factchecks_checked_by_fkey"
            columns: ["checked_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "factchecks_related_submission_id_fkey"
            columns: ["related_submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["submission_id"]
          },
        ]
      }
      newsarticles: {
        Row: {
          article_id: number
          category_id: number | null
          content: string
          created_at: string | null
          fact_check_id: number | null
          is_verified: boolean | null
          location: string | null
          published_at: string | null
          source_id: number | null
          title: string
        }
        Insert: {
          article_id?: number
          category_id?: number | null
          content: string
          created_at?: string | null
          fact_check_id?: number | null
          is_verified?: boolean | null
          location?: string | null
          published_at?: string | null
          source_id?: number | null
          title: string
        }
        Update: {
          article_id?: number
          category_id?: number | null
          content?: string
          created_at?: string | null
          fact_check_id?: number | null
          is_verified?: boolean | null
          location?: string | null
          published_at?: string | null
          source_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsarticles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "newsarticles_fact_check_id_fkey"
            columns: ["fact_check_id"]
            isOneToOne: false
            referencedRelation: "factchecks"
            referencedColumns: ["fact_check_id"]
          },
          {
            foreignKeyName: "newsarticles_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "newssources"
            referencedColumns: ["source_id"]
          },
        ]
      }
      newsletter_campaigns: {
        Row: {
          click_count: number | null
          content: string
          created_at: string | null
          created_by: string | null
          html_content: string | null
          id: string
          open_count: number | null
          recipient_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string | null
          subject: string
          title: string
          updated_at: string | null
        }
        Insert: {
          click_count?: number | null
          content: string
          created_at?: string | null
          created_by?: string | null
          html_content?: string | null
          id?: string
          open_count?: number | null
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          title: string
          updated_at?: string | null
        }
        Update: {
          click_count?: number | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          html_content?: string | null
          id?: string
          open_count?: number | null
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          preferences: Json | null
          subscribed_at: string | null
          unsubscribed_at: string | null
          user_id: string | null
          verification_token: string | null
          verified_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          preferences?: Json | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
          verification_token?: string | null
          verified_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          preferences?: Json | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
          verification_token?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      newssources: {
        Row: {
          credibility_score: number | null
          last_synced: string | null
          name: string
          rss_url: string | null
          source_id: number
          status: boolean | null
          type: Database["public"]["Enums"]["source_type"] | null
        }
        Insert: {
          credibility_score?: number | null
          last_synced?: string | null
          name: string
          rss_url?: string | null
          source_id?: number
          status?: boolean | null
          type?: Database["public"]["Enums"]["source_type"] | null
        }
        Update: {
          credibility_score?: number | null
          last_synced?: string | null
          name?: string
          rss_url?: string | null
          source_id?: number
          status?: boolean | null
          type?: Database["public"]["Enums"]["source_type"] | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          is_read: boolean | null
          message: string
          notification_id: number
          type: Database["public"]["Enums"]["notification_type"] | null
          user_id: number
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          is_read?: boolean | null
          message: string
          notification_id?: number
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id: number
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          is_read?: boolean | null
          message?: string
          notification_id?: number
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          language: string | null
          location: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          language?: string | null
          location?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          language?: string | null
          location?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reading_history: {
        Row: {
          article_id: string | null
          article_title: string
          article_url: string | null
          completed: boolean | null
          id: string
          reading_time: number | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          article_id?: string | null
          article_title: string
          article_url?: string | null
          completed?: boolean | null
          id?: string
          reading_time?: number | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          article_id?: string | null
          article_title?: string
          article_url?: string | null
          completed?: boolean | null
          id?: string
          reading_time?: number | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_history_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          setting_id: number
          updated_at: string | null
          value: string
        }
        Insert: {
          key: string
          setting_id?: number
          updated_at?: string | null
          value: string
        }
        Update: {
          key?: string
          setting_id?: number
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          admin_comment: string | null
          auth_user_id: string | null
          category_id: number | null
          description: string | null
          evidence_url: string | null
          status: Database["public"]["Enums"]["submission_status"] | null
          submission_id: number
          submitted_at: string | null
          title: string
          type: Database["public"]["Enums"]["submission_type"]
          user_id: number | null
        }
        Insert: {
          admin_comment?: string | null
          auth_user_id?: string | null
          category_id?: number | null
          description?: string | null
          evidence_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          submission_id?: number
          submitted_at?: string | null
          title: string
          type: Database["public"]["Enums"]["submission_type"]
          user_id?: number | null
        }
        Update: {
          admin_comment?: string | null
          auth_user_id?: string | null
          category_id?: number | null
          description?: string | null
          evidence_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          submission_id?: number
          submitted_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["submission_type"]
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_engagement: {
        Row: {
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number | null
          recorded_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value?: number | null
          recorded_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number | null
          recorded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          is_active: boolean | null
          language: string | null
          last_login: string | null
          location: string | null
          name: string | null
          password_hash: string
          role: Database["public"]["Enums"]["user_role"] | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          email: string
          is_active?: boolean | null
          language?: string | null
          last_login?: string | null
          location?: string | null
          name?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id?: number
        }
        Update: {
          created_at?: string | null
          email?: string
          is_active?: boolean | null
          language?: string | null
          last_login?: string | null
          location?: string | null
          name?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "reader" | "contributor" | "verifier" | "admin"
      fact_verdict: "true" | "false" | "misleading" | "mixed"
      notification_type: "article" | "fact_check" | "system"
      source_type: "local" | "international" | "gov"
      submission_status: "pending" | "in_review" | "approved" | "rejected"
      submission_type: "news_tip" | "claim"
      user_role: "reader" | "contributor" | "verifier" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["reader", "contributor", "verifier", "admin"],
      fact_verdict: ["true", "false", "misleading", "mixed"],
      notification_type: ["article", "fact_check", "system"],
      source_type: ["local", "international", "gov"],
      submission_status: ["pending", "in_review", "approved", "rejected"],
      submission_type: ["news_tip", "claim"],
      user_role: ["reader", "contributor", "verifier", "admin"],
    },
  },
} as const
