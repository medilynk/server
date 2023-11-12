-- Database: medilynk

-- Table: Admin
CREATE TABLE Admin (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL
);

-- Table: Patient
CREATE TABLE Patient (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    email VARCHAR(50) NOT NULL,
    phone INT NOT NULL
);

-- Table: Department
CREATE TABLE Department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: Shift
CREATE TABLE Shift (
    id SERIAL PRIMARY KEY,
    day_of_week VARCHAR(20) NOT NULL,
    timings VARCHAR(50) NOT NULL
);

-- Table: Doctor
CREATE TABLE Doctor (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone INT NOT NULL,
    dept_id INT,
    shift_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(id)
);

-- Table: Appointment
CREATE TABLE Appointment (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    shift_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patient(id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(id),
    FOREIGN KEY (shift_id) REFERENCES Shift(id)
);

-- Table: Prescription
CREATE TABLE Prescription (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    instructions TEXT,
    date_prescribed DATE NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patient(id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(id)
);

-- Table: Staff
CREATE TABLE Staff (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    phone INT NOT NULL
);