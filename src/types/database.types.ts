export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          role_id: string;
          username: string | null;
          first_name: string;
          last_name: string;
          is_active: boolean;
          must_change_password: boolean;
        };
      };
      roles: {
        Row: {
          id: string;
          name: string;
        };
      };
      barangays: {
        Row: {
          id: string;
          name: string;
          official_display_name: string;
        };
      };
    };
  };
}\n