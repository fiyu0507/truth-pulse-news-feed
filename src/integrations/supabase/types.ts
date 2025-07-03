export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      bookmarks: {
        Row: {
          article_id: number
          bookmark_id: number
          saved_at: string | null
          user_id: number
        }
        Insert: {
          article_id: number
          bookmark_id?: number
          saved_at?: string | null
          user_id: number
        }
        Update: {
          article_id?: number
          bookmark_id?: number
          saved_at?: string | null
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
          created_at: string | null
          is_read: boolean | null
          message: string
          notification_id: number
          type: Database["public"]["Enums"]["notification_type"] | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          is_read?: boolean | null
          message: string
          notification_id?: number
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id: number
        }
        Update: {
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
      [_ in never]: never
    }
    Enums: {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      fact_verdict: ["true", "false", "misleading", "mixed"],
      notification_type: ["article", "fact_check", "system"],
      source_type: ["local", "international", "gov"],
      submission_status: ["pending", "in_review", "approved", "rejected"],
      submission_type: ["news_tip", "claim"],
      user_role: ["reader", "contributor", "verifier", "admin"],
    },
  },
} as const
