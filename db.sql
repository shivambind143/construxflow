-- Create Database
CREATE DATABASE IF NOT EXISTS construxflow;
USE construxflow;
SHOW DATABASES;


-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'contractor', 'worker', 'supplier') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Posts Table
CREATE TABLE IF NOT EXISTS project_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    workers_required INT NOT NULL,
    worker_type VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    contractor_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contractor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    worker_id INT NOT NULL,
    project_post_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_post_id) REFERENCES project_posts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (worker_id, project_post_id)
);

-- Materials Table
CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    supplier_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Material Requests Table
CREATE TABLE IF NOT EXISTS material_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_post_id INT NOT NULL,
    material_id INT NOT NULL,
    supplier_id INT NOT NULL,
    contractor_id INT NOT NULL,
    quantity INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_post_id) REFERENCES project_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (contractor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@construxflow.com', '$2b$10$xQJ5YnKZRp7yFzVX4qGZK.W7RUvqJZ4CnRqy1X3QkGZvH3YnKZRp7y', 'admin');
