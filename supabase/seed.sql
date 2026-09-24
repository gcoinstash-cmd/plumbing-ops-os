-- SEED DATA FOR HYDROFORCE PLUMBING OPERATIONS OS
INSERT INTO emergency_tickets (ticket_code, client_name, property_address, issue_description, severity, hydrostatic_psi, assigned_technician, dispatch_status)
VALUES
('PL-8821', 'Kona Wharf Seafood Grill', 'Pier 14 Commercial Pier, Austin TX', '4" Main Line Grease Obstruction & Kitchen Backup', 'CRITICAL', 68.0, 'UNIT 04 (Master Tech Morales)', 'EN ROUTE'),
('PL-8822', 'Highland Medical Pavilions', '3800 Medical Center Dr, Bldg B', 'Backflow Preventer Pressure Drop (RPZ Relief Tripped)', 'ELEVATED', 52.0, 'UNIT 02 (Cert Specialist Chen)', 'DISPATCHED'),
('PL-8823', 'Residences at Lake Austin', '1204 Scenic Overlook Way', 'Sub-Slab High Pressure Supply Line Leak Detected', 'CRITICAL', 82.0, 'UNIT 07 (Leak Detection Rig)', 'ISOLATING'),
('PL-8824', 'Benchmark Distribution Hub', '900 Logistics Way, Round Rock', 'Fire Suppression Dual-Check Valve Hydrostatic Check', 'ROUTINE', 110.0, 'UNIT 09 (Commercial Fleet)', 'RESOLVED');

INSERT INTO commercial_backflow (serial_tag, facility_name, assembly_type, differential_psid, test_result, licensed_tester, next_due_date)
VALUES
('RPZ-2026-9901', 'Omni Barton Creek Resort', 'Watts 909 RPZ (3")', 8.4, 'PASS', 'Chen, B. (BPAT #9812)', '2027-04-15'),
('RPZ-2026-8842', 'St. David Emergency Wing', 'Febco 860 RPBA (4")', 9.1, 'PASS', 'Chen, B. (BPAT #9812)', '2027-02-10'),
('DCV-2026-7731', 'Domain Luxury Lofts', 'Wilkins 350 Double Check (6")', 2.1, 'SERVICE_REQUIRED', 'Morales, H. (BPAT #8841)', '2026-10-01');

INSERT INTO hydro_inspections (property_name, pipe_material, pipe_diameter_in, depth_ft, blockage_percent, camera_video_url, diagnostic_verdict)
VALUES
('Northwest Tech Campus (Building 4)', 'Schedule 40 PVC', 6.0, 8.5, 15, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', 'CLEAR'),
('The Driskill Commercial Kitchens', 'Cast Iron', 4.0, 5.2, 85, 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80', 'HYDRO_JET_REQUIRED'),
('Oakmont Heritage Condominiums', 'Clay Vitrified', 8.0, 11.0, 60, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80', 'TRENCHLESS_REPAIR');

INSERT INTO technician_units (unit_callsign, lead_master_plumber, gps_latitude, gps_longitude, hydro_jet_trailer_attached, active_loadout_verified)
VALUES
('UNIT 04', 'Hector Morales (Master Plumber #44019)', 30.2672, -97.7431, true, true),
('UNIT 02', 'Brian Chen (BPAT Certified #9812)', 30.2850, -97.7340, false, true),
('UNIT 07', 'Derrick Vance (Acoustic Specialist)', 30.3011, -97.7522, false, true),
('UNIT 09', 'Roland Miller (Commercial Foreman)', 30.2505, -97.7120, true, true);
