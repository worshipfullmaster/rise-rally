export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      donations: {
        Row: {
          amount_cents: number | null
          created_at: string
          currency: string | null
          donor_email: string | null
          id: string
          message: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount_cents?: number | null
          created_at?: string
          currency?: string | null
          donor_email?: string | null
          id?: string
          message?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount_cents?: number | null
          created_at?: string
          currency?: string | null
          donor_email?: string | null
          id?: string
          message?: string | null
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      event_rsvps: {
        Row: {
          created_at: string
          event_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: Json
          ends_at: string | null
          id: string
          location: string | null
          published: boolean
          rsvp_enabled: boolean
          slug: string
          source: string
          starts_at: string
          title: Json
        }
        Insert: {
          created_at?: string
          description: Json
          ends_at?: string | null
          id?: string
          location?: string | null
          published?: boolean
          rsvp_enabled?: boolean
          slug: string
          source?: string
          starts_at: string
          title: Json
        }
        Update: {
          created_at?: string
          description?: Json
          ends_at?: string | null
          id?: string
          location?: string | null
          published?: boolean
          rsvp_enabled?: boolean
          slug?: string
          source?: string
          starts_at?: string
          title?: Json
        }
        Relationships: []
      }
      github_config: {
        Row: {
          branch: string
          created_at: string
          enabled: boolean
          folders: Json
          id: string
          last_synced_at: string | null
          pat_encrypted: string
          repo_url: string
          updated_at: string
        }
        Insert: {
          branch?: string
          created_at?: string
          enabled?: boolean
          folders?: Json
          id?: string
          last_synced_at?: string | null
          pat_encrypted: string
          repo_url: string
          updated_at?: string
        }
        Update: {
          branch?: string
          created_at?: string
          enabled?: boolean
          folders?: Json
          id?: string
          last_synced_at?: string | null
          pat_encrypted?: string
          repo_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_items: {
        Row: {
          caption: Json | null
          created_at: string
          id: string
          metadata_stripped: boolean
          mime_type: string | null
          status: Database["public"]["Enums"]["media_status"]
          storage_path: string
          uploader_id: string | null
        }
        Insert: {
          caption?: Json | null
          created_at?: string
          id?: string
          metadata_stripped?: boolean
          mime_type?: string | null
          status?: Database["public"]["Enums"]["media_status"]
          storage_path: string
          uploader_id?: string | null
        }
        Update: {
          caption?: Json | null
          created_at?: string
          id?: string
          metadata_stripped?: boolean
          mime_type?: string | null
          status?: Database["public"]["Enums"]["media_status"]
          storage_path?: string
          uploader_id?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          body: Json
          cover_image: string | null
          created_at: string
          excerpt: Json
          id: string
          published: boolean
          published_at: string
          slug: string
          source: string
          title: Json
          updated_at: string
        }
        Insert: {
          body: Json
          cover_image?: string | null
          created_at?: string
          excerpt: Json
          id?: string
          published?: boolean
          published_at?: string
          slug: string
          source?: string
          title: Json
          updated_at?: string
        }
        Update: {
          body?: Json
          cover_image?: string | null
          created_at?: string
          excerpt?: Json
          id?: string
          published?: boolean
          published_at?: string
          slug?: string
          source?: string
          title?: Json
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          active: boolean
          body: Json
          created_at: string
          id: string
          level: string
          title: Json
        }
        Insert: {
          active?: boolean
          body: Json
          created_at?: string
          id?: string
          level?: string
          title: Json
        }
        Update: {
          active?: boolean
          body?: Json
          created_at?: string
          id?: string
          level?: string
          title?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          preferred_language: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          preferred_language?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          preferred_language?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          body: Json
          category: Database["public"]["Enums"]["resource_category"]
          created_at: string
          id: string
          published: boolean
          read_minutes: number | null
          slug: string
          source: string
          summary: Json
          title: Json
        }
        Insert: {
          body: Json
          category?: Database["public"]["Enums"]["resource_category"]
          created_at?: string
          id?: string
          published?: boolean
          read_minutes?: number | null
          slug: string
          source?: string
          summary: Json
          title: Json
        }
        Update: {
          body?: Json
          category?: Database["public"]["Enums"]["resource_category"]
          created_at?: string
          id?: string
          published?: boolean
          read_minutes?: number | null
          slug?: string
          source?: string
          summary?: Json
          title?: Json
        }
        Relationships: []
      }
      sync_logs: {
        Row: {
          details: Json | null
          finished_at: string | null
          id: string
          items_failed: number
          items_updated: number
          message: string | null
          started_at: string
          status: Database["public"]["Enums"]["sync_status"]
        }
        Insert: {
          details?: Json | null
          finished_at?: string | null
          id?: string
          items_failed?: number
          items_updated?: number
          message?: string | null
          started_at?: string
          status: Database["public"]["Enums"]["sync_status"]
        }
        Update: {
          details?: Json | null
          finished_at?: string | null
          id?: string
          items_failed?: number
          items_updated?: number
          message?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["sync_status"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "member"
      media_status: "pending" | "approved" | "rejected"
      resource_category:
        | "digital_safety"
        | "organizing"
        | "street_safety"
        | "narrative"
        | "know_your_rights"
        | "general"
      sync_status: "success" | "partial" | "failed" | "running"
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
      app_role: ["admin", "moderator", "member"],
      media_status: ["pending", "approved", "rejected"],
      resource_category: [
        "digital_safety",
        "organizing",
        "street_safety",
        "narrative",
        "know_your_rights",
        "general",
      ],
      sync_status: ["success", "partial", "failed", "running"],
    },
  },
} as const
