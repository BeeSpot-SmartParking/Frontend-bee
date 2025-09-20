-- Seed data for the parking management system

-- Insert sample admin
INSERT INTO admins (username, email, password_hash, role) VALUES
('admin', 'admin@parkspace.com', '$2b$10$example_hash', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample companies
INSERT INTO companies (company_name, contact_name, email, phone, address, business_type, description, password_hash, plan_type, status) VALUES
('Downtown Parking Solutions', 'John Smith', 'john@downtown-parking.com', '+1 (555) 123-4567', '123 Main St, Downtown', 'parking-operator', 'Premier downtown parking operator', '$2b$10$example_hash', 'premium', 'approved'),
('City Center Management', 'Jane Doe', 'jane@citycenter.com', '+1 (555) 987-6543', '456 Business Ave', 'property-management', 'Commercial property management company', '$2b$10$example_hash', 'normal', 'approved'),
('Metro Mall Parking', 'Mike Johnson', 'mike@metromall.com', '+1 (555) 456-7890', '789 Commerce Blvd', 'retail-business', 'Shopping mall parking management', '$2b$10$example_hash', 'normal', 'pending')
ON CONFLICT (email) DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, phone, license_plate, password_hash, emergency_contact) VALUES
('John Doe', 'john@example.com', '+1 (555) 111-2222', 'ABC-123', '$2b$10$example_hash', 'Jane Doe - +1 (555) 111-2223'),
('Jane Smith', 'jane@example.com', '+1 (555) 333-4444', 'XYZ-789', '$2b$10$example_hash', 'John Smith - +1 (555) 333-4445'),
('Mike Wilson', 'mike@example.com', '+1 (555) 555-6666', 'DEF-456', '$2b$10$example_hash', 'Sarah Wilson - +1 (555) 555-6667')
ON CONFLICT (email) DO NOTHING;

-- Insert sample parking locations
INSERT INTO parking_locations (company_id, name, address, total_spots, available_spots, price_per_hour, location_type, status, features, coordinates, rules, images) VALUES
(1, 'Downtown Plaza - Level 1', '123 Main St, Downtown', 25, 8, 2.00, 'covered', 'active', '["24/7", "Security", "Covered"]', '{"lat": 40.7128, "lng": -74.0060}', ARRAY['Maximum stay: 8 hours', 'No overnight parking', 'Payment required before parking'], ARRAY['/multi-level-parking.png']),
(1, 'Downtown Plaza - Level 2', '123 Main St, Downtown', 25, 15, 2.00, 'covered', 'active', '["24/7", "Security", "Covered"]', '{"lat": 40.7128, "lng": -74.0060}', ARRAY['Maximum stay: 8 hours', 'No overnight parking', 'Payment required before parking'], ARRAY['/multi-level-parking.png']),
(2, 'Business Center Lot', '456 Business Ave', 50, 32, 1.50, 'outdoor', 'active', '["Security", "CCTV"]', '{"lat": 40.7589, "lng": -73.9851}', ARRAY['Business hours only', 'Compact cars preferred'], ARRAY[]),
(1, 'Premium Valet Section', '789 Executive Dr', 15, 5, 5.00, 'valet', 'maintenance', '["Valet", "Premium", "Covered"]', '{"lat": 40.7505, "lng": -73.9934}', ARRAY['Valet service required', 'Premium vehicles only'], ARRAY[]);

-- Insert sample bookings
INSERT INTO bookings (user_id, location_id, booking_date, start_time, end_time, duration_hours, vehicle_type, license_plate, total_amount, payment_method, payment_status, booking_status, qr_code) VALUES
(1, 1, '2024-01-15', '14:00', '16:00', 2, 'sedan', 'ABC-123', 4.00, 'card', 'completed', 'active', 'QR-BK-2024-001-DOWNTOWN'),
(2, 3, '2024-01-15', '09:00', '17:00', 8, 'suv', 'XYZ-789', 12.00, 'paypal', 'completed', 'completed', 'QR-BK-2024-002-BUSINESS'),
(3, 4, '2024-01-14', '10:00', '14:00', 4, 'sedan', 'DEF-456', 20.00, 'card', 'completed', 'completed', 'QR-BK-2024-003-PREMIUM');

-- Insert sample reports
INSERT INTO reports (user_id, report_type, title, description, location, reporter_contact, status, priority) VALUES
(1, 'double-parking', 'Double Parking Violation', 'Vehicle blocking two parking spaces at Downtown Plaza', 'Downtown Plaza, Level 1, Spot 15-16', 'john@example.com', 'pending', 'high'),
(2, 'illegal-parking', 'Illegal Parking in Disabled Space', 'Non-disabled vehicle parked in handicapped spot', 'Business Center, Entrance Area', 'jane@example.com', 'investigating', 'high'),
(3, 'no-parking-request', 'No Parking Zone Request', 'Request to establish no-parking zone in front of residential property', '123 Oak Street, Residential Area', 'mike@example.com', 'pending', 'medium');

-- Insert sample company requests
INSERT INTO company_requests (company_id, request_type, current_plan, requested_plan, reason, status) VALUES
(2, 'plan_upgrade', 'normal', 'premium', 'Need promotional offers and advanced analytics', 'pending'),
(3, 'registration', NULL, NULL, 'New company registration request', 'pending');
