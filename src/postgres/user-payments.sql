-- Switch to the userpayments database
\c userpayments;

-- Create the 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'payments' table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 50 sample users
INSERT INTO users (name, email, phone)
SELECT 
    'User ' || i,
    'user' || i || '@example.com',
    '+92-300-000' || LPAD(i::text, 3, '0')
FROM generate_series(1, 50) AS s(i);

-- Insert 25 random payments linked to users
INSERT INTO payments (user_id, amount, status, payment_date, method)
SELECT 
    FLOOR(RANDOM() * 50 + 1)::int,  -- user_id between 1 and 50
    ROUND((RANDOM() * 9900 + 100)::numeric, 2),  -- amount between 100.00 to 10000.00
    (ARRAY['pending', 'completed', 'failed'])[FLOOR(RANDOM() * 3 + 1)],
    NOW() - (INTERVAL '1 day' * FLOOR(RANDOM() * 30)), -- random last 30 days
    (ARRAY['card', 'paypal', 'bank_transfer'])[FLOOR(RANDOM() * 3 + 1)]
FROM generate_series(1, 25);


