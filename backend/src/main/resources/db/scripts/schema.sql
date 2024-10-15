SET TIMEZONE = 'UTC';

ALTER TABLE IF EXISTS appointments DROP CONSTRAINT fk_stylist;
ALTER TABLE IF EXISTS appointments DROP CONSTRAINT fk_client;
ALTER TABLE IF EXISTS user_roles DROP CONSTRAINT fk_user; 
ALTER TABLE IF EXISTS user_roles DROP CONSTRAINT fk_role;

DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stylists CASCADE;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user_roles;
DROP VIEW IF EXISTS appointments_view;
DROP VIEW IF EXISTS appointments_report_view;
DROP VIEW IF EXISTS stylists_report_view;
DROP VIEW IF EXISTS stylists_aggregate_report_view;

CREATE TABLE clients (
  client_id INTEGER GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  phone VARCHAR(20), 
  user_id INTEGER,
  PRIMARY KEY(client_id)
);

CREATE TABLE users (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(71) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE stylists (
  stylist_id INTEGER GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  phone VARCHAR(20), 
  PRIMARY KEY(stylist_id)
);

CREATE TABLE appointments (
  appointment_id INTEGER GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(50),
  description TEXT,
  stylist_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  user_id INTEGER NOT NULL,
  CONSTRAINT fk_stylist 
    FOREIGN KEY(stylist_id) 
      REFERENCES stylists(stylist_id),
  CONSTRAINT fk_client 
    FOREIGN KEY(client_id) 
      REFERENCES clients(client_id) 
        ON DELETE CASCADE,
  PRIMARY KEY(appointment_id)
);

CREATE TABLE roles (
  role_id INTEGER GENERATED ALWAYS AS IDENTITY,
  authority VARCHAR(25),
  PRIMARY KEY(role_id)
);

CREATE TABLE user_roles (
  user_id INTEGER,
  role_id INTEGER,
  PRIMARY KEY(user_id, role_id),
  CONSTRAINT fk_user 
    FOREIGN KEY(user_id) 
      REFERENCES users(user_id) 
        ON DELETE CASCADE,
  CONSTRAINT fk_role 
    FOREIGN KEY(role_id) 
      REFERENCES roles(role_id)
);

CREATE VIEW appointments_view AS 
  SELECT 
    a.appointment_id, 
    a.title,
    a.description, 
    c.client_id,
    c.first_name || ' ' || c.last_name AS client,
    c.email AS client_email,
    c.phone AS client_phone,
    s.first_name || ' ' || s.last_name AS stylist,
    a.start_time,
    a.end_time,
    u.username, 
    u.user_id
  FROM appointments AS a 
    JOIN clients AS c USING (client_id)
    JOIN stylists AS s USING (stylist_id) 
    JOIN users AS u ON a.user_id = u.user_id
  ORDER BY a.start_time::DATE DESC, a.start_time::TIME;

CREATE VIEW appointments_report_view AS 
  SELECT 
    a.appointment_id AS ID,
    a.title,
    a.description,
    s.stylist_id,
    s.first_name || ' ' || s.last_name AS stylist,
    s.email AS stylist_email,
    s.phone AS stylist_phone,
    c.client_id,
    c.first_name || ' ' || c.last_name AS client,
    c.email AS client_email,
    c.phone AS client_phone,
    a.start_time,
    a.end_time,
    u.user_id,
    u.username 
  FROM 
    appointments a 
  JOIN stylists s USING (stylist_id)
  JOIN clients c USING (client_id)
  JOIN users u ON a.user_id = u.user_id
  ORDER BY 
    a.start_time::DATE DESC,
    a.start_time::TIME;

CREATE VIEW stylists_report_view AS 
  SELECT 
    a.appointment_id,
    a.title,
    --s.stylist_id,
    s.first_name || ' ' || s.last_name AS stylist,
    c.first_name || ' ' || c.last_name AS client,
    a.description,
    a.start_time
  FROM appointments a 
  JOIN stylists s USING (stylist_id) 
  JOIN clients c USING (client_id) 
  ORDER BY 
    s.last_name, 
    a.start_time::DATE DESC,
    a.start_time::TIME;

CREATE VIEW stylists_aggregate_report_view AS 
  SELECT 
    s.stylist_id,
    s.first_name || ' ' || s.last_name AS stylist,
    COUNT(a.stylist_id) AS total_appointments 
  FROM stylists s 
  JOIN appointments a USING(stylist_id) 
  GROUP BY s.stylist_id 
  ORDER BY s.stylist_id;

INSERT INTO roles (authority) VALUES
('ADMIN'),
('USER');
