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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          capacity_max: number
          category: Database["public"]["Enums"]["event_category"]
          created_at: string | null
          date: string
          description: string | null
          has_reserved_seating: boolean | null
          id: string
          image_url: string | null
          location: string
          max_tickets_per_purchase: number | null
          tickets_sold: number
          time: string
          title: string
          updated_at: string | null
          venue_layout: string | null
        }
        Insert: {
          capacity_max?: number
          category: Database["public"]["Enums"]["event_category"]
          created_at?: string | null
          date: string
          description?: string | null
          has_reserved_seating?: boolean | null
          id?: string
          image_url?: string | null
          location: string
          max_tickets_per_purchase?: number | null
          tickets_sold?: number
          time: string
          title: string
          updated_at?: string | null
          venue_layout?: string | null
        }
        Update: {
          capacity_max?: number
          category?: Database["public"]["Enums"]["event_category"]
          created_at?: string | null
          date?: string
          description?: string | null
          has_reserved_seating?: boolean | null
          id?: string
          image_url?: string | null
          location?: string
          max_tickets_per_purchase?: number | null
          tickets_sold?: number
          time?: string
          title?: string
          updated_at?: string | null
          venue_layout?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          billing_zip: string | null
          card_brand: string
          cardholder_name: string
          created_at: string | null
          expiry_month: string
          expiry_year: string
          id: string
          is_default: boolean | null
          last_four: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          billing_zip?: string | null
          card_brand: string
          cardholder_name: string
          created_at?: string | null
          expiry_month: string
          expiry_year: string
          id?: string
          is_default?: boolean | null
          last_four: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          billing_zip?: string | null
          card_brand?: string
          cardholder_name?: string
          created_at?: string | null
          expiry_month?: string
          expiry_year?: string
          id?: string
          is_default?: boolean | null
          last_four?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      price_tiers: {
        Row: {
          available_seats: number
          created_at: string | null
          event_id: string
          id: string
          price: number
          section: string
        }
        Insert: {
          available_seats?: number
          created_at?: string | null
          event_id: string
          id?: string
          price: number
          section: string
        }
        Update: {
          available_seats?: number
          created_at?: string | null
          event_id?: string
          id?: string
          price?: number
          section?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_tiers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          created_at: string | null
          date: string
          event_category: Database["public"]["Enums"]["event_category"]
          event_id: string
          event_title: string
          id: string
          location: string
          price: number
          purchase_date: string | null
          qr_code: string
          quantity: number | null
          row: string | null
          seat: string | null
          seat_number: string | null
          section: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          time: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          event_category: Database["public"]["Enums"]["event_category"]
          event_id: string
          event_title: string
          id?: string
          location: string
          price: number
          purchase_date?: string | null
          qr_code: string
          quantity?: number | null
          row?: string | null
          seat?: string | null
          seat_number?: string | null
          section?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          time: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          event_category?: Database["public"]["Enums"]["event_category"]
          event_id?: string
          event_title?: string
          id?: string
          location?: string
          price?: number
          purchase_date?: string | null
          qr_code?: string
          quantity?: number | null
          row?: string | null
          seat?: string | null
          seat_number?: string | null
          section?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      event_category: "Big Arena" | "Selected Seats" | "Max Capacity"
      ticket_status: "selected" | "purchased" | "refunded"
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
      event_category: ["Big Arena", "Selected Seats", "Max Capacity"],
      ticket_status: ["selected", "purchased", "refunded"],
    },
  },
} as const
