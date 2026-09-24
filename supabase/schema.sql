-- ==============================================================================
-- HYDROFORCE PLUMBING OPERATIONS OS (Phase 2 - #58)
-- Commercial Hydraulic Dispatch & Backflow Compliance Schema
-- ==============================================================================

-- 1. Emergency Dispatch Tickets Table
CREATE TABLE IF NOT EXISTS emergency_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_code TEXT NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    property_address TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'ELEVATED', -- CRITICAL, ELEVATED, ROUTINE
    hydrostatic_psi NUMERIC DEFAULT 60.0,
    assigned_technician TEXT NOT NULL,
    dispatch_status TEXT NOT NULL DEFAULT 'DISPATCHED', -- DISPATCHED, EN ROUTE, ISOLATING, RESOLVED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Commercial Backflow Certifications Table
CREATE TABLE IF NOT EXISTS commercial_backflow (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_tag TEXT NOT NULL UNIQUE,
    facility_name TEXT NOT NULL,
    assembly_type TEXT NOT NULL,
    differential_psid NUMERIC NOT NULL,
    test_result TEXT NOT NULL DEFAULT 'PASS', -- PASS, FAIL, SERVICE_REQUIRED
    licensed_tester TEXT NOT NULL,
    next_due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Underground CCTV Scope Inspections Table
CREATE TABLE IF NOT EXISTS hydro_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_name TEXT NOT NULL,
    pipe_material TEXT NOT NULL,
    pipe_diameter_in NUMERIC NOT NULL,
    depth_ft NUMERIC NOT NULL,
    blockage_percent INTEGER DEFAULT 0,
    camera_video_url TEXT,
    diagnostic_verdict TEXT NOT NULL, -- CLEAR, HYDRO_JET_REQUIRED, TRENCHLESS_REPAIR
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Technician Vans Fleet Table
CREATE TABLE IF NOT EXISTS technician_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_callsign TEXT NOT NULL UNIQUE,
    lead_master_plumber TEXT NOT NULL,
    gps_latitude NUMERIC,
    gps_longitude NUMERIC,
    hydro_jet_trailer_attached BOOLEAN DEFAULT false,
    active_loadout_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE emergency_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE commercial_backflow ENABLE ROW LEVEL SECURITY;
ALTER TABLE hydro_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE technician_units ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public Read Access emergency_tickets" ON emergency_tickets FOR SELECT USING (true);
CREATE POLICY "Public Write Access emergency_tickets" ON emergency_tickets FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access commercial_backflow" ON commercial_backflow FOR SELECT USING (true);
CREATE POLICY "Public Write Access commercial_backflow" ON commercial_backflow FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access hydro_inspections" ON hydro_inspections FOR SELECT USING (true);
CREATE POLICY "Public Write Access hydro_inspections" ON hydro_inspections FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access technician_units" ON technician_units FOR SELECT USING (true);
CREATE POLICY "Public Write Access technician_units" ON technician_units FOR INSERT WITH CHECK (true);
