-- Создание ENUM типов для фиксированных значений
CREATE TYPE gender_type AS ENUM ('М', 'Ж');
CREATE TYPE appointment_status AS ENUM ('Запланирован', 'Завершен', 'Отменен', 'Неявка');

-- Таблица участков
CREATE TABLE districts (
    district_id SERIAL PRIMARY KEY,
    district_number INT NOT NULL UNIQUE,
    description VARCHAR(100),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица специальностей врачей
CREATE TABLE specialties (
    specialty_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Таблица типов процедур
CREATE TABLE procedure_types (
    procedure_type_id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    is_diagnostic BOOLEAN DEFAULT FALSE
);

-- Таблица адресов с привязкой к участкам
CREATE TABLE address_districts (
    address_id SERIAL PRIMARY KEY,
    street VARCHAR(100) NOT NULL,
    house VARCHAR(10) NOT NULL,
    apartment VARCHAR(10),
    district_id INT NOT NULL REFERENCES districts(district_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица врачей
CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    phone VARCHAR(20),
    district_id INT REFERENCES districts(district_id),
    office VARCHAR(10) NOT NULL,
    specialty_id INT NOT NULL REFERENCES specialties(specialty_id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица пациентов
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    birth_date DATE NOT NULL,
    address_id INT NOT NULL REFERENCES address_districts(address_id),
    gender gender_type NOT NULL,
    phone VARCHAR(20),
    parent_last_name VARCHAR(50),
    parent_first_name VARCHAR(50),
    parent_middle_name VARCHAR(50),
    parent_phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица типов приемов
CREATE TABLE appointment_types (
    type_id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    duration INTERVAL NOT NULL DEFAULT '15 minutes'
);

-- Таблица причин визитов
CREATE TABLE appointment_reasons (
    reason_id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица записей на прием
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL REFERENCES doctors(doctor_id),
    patient_id INT NOT NULL REFERENCES patients(patient_id),
    type_id INT NOT NULL REFERENCES appointment_types(type_id),
    reason_id INT REFERENCES appointment_reasons(reason_id),
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status appointment_status DEFAULT 'Запланирован',
    diagnosis VARCHAR(200),
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица болезней
CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    procedure_type_id INT NOT NULL REFERENCES procedure_types(procedure_type_id),
    doctor_id INT REFERENCES doctors(doctor_id),
    patient_id INT REFERENCES patients(patient_id),
    diagnosis VARCHAR(200),
    treatment TEXT,
    prescriptions TEXT,
    notes TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для ускорения запросов
CREATE INDEX idx_doctors_name ON doctors (last_name, first_name);
CREATE INDEX idx_doctors_district ON doctors (district_id);
CREATE INDEX idx_patients_name ON patients (last_name, first_name);
CREATE INDEX idx_patients_birth_date ON patients (birth_date);
CREATE INDEX idx_patients_address ON patients (address_id);
CREATE INDEX idx_medical_records_patient ON medical_records (patient_id);
CREATE INDEX idx_medical_records_doctor ON medical_records (doctor_id);
CREATE INDEX idx_appointments_doctor_date ON appointments (doctor_id, appointment_date);
CREATE INDEX idx_appointments_patient_date ON appointments (patient_id, appointment_date);

