-- Database: medilynk

-- Table: Admin
CREATE TABLE Admin (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL
)

-- Table: Patient
CREATE TABLE Patient (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    email VARCHAR(50) NOT NULL,
    phone INT NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 000001;

-- Table: Department
CREATE TABLE Department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 000001;

-- Table: Shift
CREATE TABLE Shift (
    id INT NOT NULL AUTO_INCREMENT,
    day_of_week VARCHAR(20) NOT NULL,
    timings VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 000001;

-- Table: Doctor
CREATE TABLE Doctor (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone INT NOT NULL,
    dept_id INT,
    shift_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (dept_id) REFERENCES Department(id)
) AUTO_INCREMENT = 000001;

-- Table: Appointment
CREATE TABLE Appointment (
    id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    shift_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (patient_id) REFERENCES Patient(id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(id)
) AUTO_INCREMENT = 000001;

-- Table: Prescription
CREATE TABLE Prescription (
    id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    instructions TEXT,
    date_prescribed DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (patient_id) REFERENCES Patient(id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(id)
) AUTO_INCREMENT = 000001;

-- Table: Staff
CREATE TABLE Staff (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    phone INT NOT NULL
)