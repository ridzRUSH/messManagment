 const sqlInit = `
    CREATE DATABASE IF NOT EXISTS app_db;
    USE app_db;

    CREATE TABLE IF NOT EXISTS hostel (
        hostel_id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_name VARCHAR(100),
        location VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS student (
        student_id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        room_no VARCHAR(20),
        FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
    );

    CREATE TABLE IF NOT EXISTS staff (
        staff_id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT,
        name VARCHAR(100),
        role VARCHAR(50),
<<<<<<< Updated upstream
        email VARCHAR(100) UNIQUE,
=======
        email VARCHAR(100) ,
>>>>>>> Stashed changes
        FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
    );

    CREATE TABLE IF NOT EXISTS mess_card (
        card_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        status VARCHAR(20),
        open_date DATE,
        close_date DATE,
        total_active_days INT,
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

    CREATE TABLE IF NOT EXISTS mess_card_history (
        history_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        open_date DATE,
        close_date DATE,
        days INT,
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

    CREATE TABLE IF NOT EXISTS daily_expense (
        expense_id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT,
        date DATE,
        normal_expense DECIMAL(10,2),
        FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
    );

    CREATE TABLE IF NOT EXISTS special_meal (
        special_id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT,
        date DATE,
        meal_name VARCHAR(100),
        total_cost DECIMAL(10,2),
        total_plates INT,
        FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
    );

    CREATE TABLE IF NOT EXISTS special_meal_student (
        special_id INT,
        student_id INT,
        plates_taken INT,
        PRIMARY KEY (special_id, student_id),
        FOREIGN KEY (special_id) REFERENCES special_meal(special_id),
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

    CREATE TABLE IF NOT EXISTS subscription (
        sub_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        item_name VARCHAR(50),
        cost DECIMAL(10,2),
        start_date DATE,
        end_date DATE,
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

    CREATE TABLE IF NOT EXISTS bill (
        bill_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        month INT,
        year INT,
        normal_amount DECIMAL(10,2),
        special_amount DECIMAL(10,2),
        subscription_amount DECIMAL(10,2),
        total_amount DECIMAL(10,2),
        payment_status VARCHAR(20),
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

    CREATE TABLE IF NOT EXISTS payment (
        payment_id INT AUTO_INCREMENT PRIMARY KEY,
        bill_id INT,
        amount DECIMAL(10,2),
        payment_date DATE,
        status VARCHAR(20),
        FOREIGN KEY (bill_id) REFERENCES bill(bill_id)
    );

    CREATE TABLE IF NOT EXISTS feedback (
        feedback_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        date DATE,
        food_rating INT,
        hygiene_rating INT,
        comments TEXT,
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

    CREATE TABLE IF NOT EXISTS supplier (
        supplier_id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT,
        name VARCHAR(100),
        contact_info VARCHAR(255),
        FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
    );

    CREATE TABLE IF NOT EXISTS ration_item (
        ration_item_id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT,
        name VARCHAR(100),
        unit VARCHAR(20),  -- KG, LITRE, PIECE, etc.
        unit_cost DECIMAL(10,2),
        supplier_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id),
        FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
    );

    CREATE TABLE IF NOT EXISTS ration_consumption (
        consumption_id INT AUTO_INCREMENT PRIMARY KEY,
        ration_item_id INT,
        hostel_id INT,
        date DATE,
        quantity DECIMAL(10,2),
        cost DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ration_item_id) REFERENCES ration_item(ration_item_id),
        FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
    );

    -- Insert sample suppliers
    INSERT IGNORE INTO supplier (supplier_id, hostel_id, name, contact_info) VALUES
    (1, 1, 'Local Grocery Store', 'Phone: 9876543210'),
    (2, 1, 'Fresh Vegetables Supplier', 'Phone: 9876543211'),
    (3, 1, 'Rice & Grains Depot', 'Phone: 9876543212');

    -- Insert sample ration items
    INSERT IGNORE INTO ration_item (ration_item_id, hostel_id, name, unit, unit_cost, supplier_id) VALUES
    (1, 1, 'Rice', 'KG', 50.00, 3),
    (2, 1, 'Dal', 'KG', 120.00, 1),
    (3, 1, 'Vegetables', 'KG', 40.00, 2),
    (4, 1, 'Cooking Oil', 'LITRE', 150.00, 1),
    (5, 1, 'Spices', 'PACKET', 25.00, 1);
`;

export default sqlInit;