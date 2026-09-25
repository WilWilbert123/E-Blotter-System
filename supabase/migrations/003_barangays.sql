-- supabase/migrations/003_barangays.sql

CREATE TABLE barangays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  official_display_name VARCHAR(255) NOT NULL,
  captain_name VARCHAR(255),
  address TEXT,
  contact_details TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: RLS will be applied in 023_rls_policies.sql
