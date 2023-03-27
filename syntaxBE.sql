create table hotel.hotels(
hotel_id serial primary key,
hotel_name varchar(85),
hotel_description varchar(500),
hotel_rating_star smallint,
hotel_phonenumber varchar(25),
hotel_modified_date TIMESTAMP,
"status" VARCHAR(10) NOT NULL CHECK (name IN ('active', 'disactive'))
hotel_addr_id int,
CONSTRAINT fk_hotel_addr_id FOREIGN KEY (hotel_addr_id) REFERENCES master.address (addr_id) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE hotel.hotel_reviews (
  hore_id SERIAL PRIMARY KEY,
  hore_user_review VARCHAR(125),
  hore_rating SMALLINT CHECK (hore_rating IN (1,2,3,4,5)),
  hore_created_on TIMESTAMP,
  hore_user_id INTEGER REFERENCES users.users(user_id),
  horeriotelid INTEGER REFERENCES hotel.hotels(hotel_id)
);

CREATE TABLE hotel.facilities (
  faci_id SERIAL PRIMARY KEY,
  faci_name VARCHAR(125),
  faci_description VARCHAR(255),
  faci_max_number INTEGER,
  faci_measure_unit VARCHAR(15) CHECK (faci_measure_unit IN ('people', 'beds')),
  faci_room_number VARCHAR(6) UNIQUE,
  faci_startdate TIMESTAMP,
  faci_enddate TIMESTAMP,
  faci_low_price MONEY,
  faci_high_price MONEY,
  faci_rate_price MONEY,
  faci_discount MONEY,
  faci_tax_rate MONEY,
  facimodifieddate TIMESTAMP,
  faci_cagro_id INTEGER REFERENCES master.category_group(cagro_id),
  facihotelid INTEGER REFERENCES hotel.hotels(hotel_id)
);

CREATE TABLE hotel.facility_photos (
  fapho_id SERIAL PRIMARY KEY,
  fapho_faci_id INTEGER REFERENCES hotel.facilities(faci_id),
  fapho_thumbnail_filename VARCHAR(50),
  fapho_photo_filename VARCHAR(50),
  fapho_primary BOOLEAN,
  fapho_modified_date TIMESTAMP
);

CREATE TABLE hotel.facility_price_history (
  faph_id SERIAL PRIMARY KEY,
  faph_startdate TIMESTAMP,
  faph_enddate TIMESTAMP,
  faph_low_price MONEY,
  faph_high_price MONEY,
  faph_rate_price MONEY,
  faph_discount MONEY,
  faph_tax_rate MONEY,
  faph_modified_date TIMESTAMP,
  fapri_user_id INTEGER REFERENCES users.users(user_id),
  faph_faci_id INTEGER REFERENCES hotel.facilities(faci_id)
);

-- -------------------------------------- moudul luar --------------------------------------
-- -------------------------- users -------------------------- 
CREATE SEQUENCE sequence_for_user_full_name
INCREMENT 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

CREATE TABLE users.users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_full_name VARCHAR DEFAULT 'guest' || nextval('sequence_for_user_full_name'),
  user_type VARCHAR(15) NOT NULL,
  user_company_name VARCHAR(225),
  user_email VARCHAR(256),
  user_phone_number VARCHAR(25) UNIQUE,
  user_modified_date TIMESTAMP
)


-- with username
INSERT INTO users.users
  (user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
VALUES
  ('Rifqi Pratama', 'T', 'CodeX', 'mail@gmail.com', '082132184219', '2023-01-01 16:10:55');

-- without username
INSERT INTO users.users
  (user_type, user_company_name, user_email, user_phone_number, user_modified_date)
VALUES
  ('T', 'Samsung', 'mail@gmail.com', '79879732189', '2023-01-01 16:10:55');
  
 
-- -------------------------- master -------------------------- 
-- --------- category_group ---------
CREATE TABLE category_group (
  cagro_id SERIAL PRIMARY KEY,
  cagro_name VARCHAR(25) UNIQUE,
  cagro_description VARCHAR(255),
  cagro_type VARCHAR(25) CHECK (cagro_type IN ('category', 'service', 'facility')),
  cagro_icon VARCHAR(255),
  cagro_icon_url VARCHAR(255)
);

-- Insert dummy data for table category_group
INSERT INTO category_group (cagro_name, cagro_description, cagro_type, cagro_icon, cagro_icon_url)
VALUES ('Food', 'Food items', 'category', 'icon.png', 'http://example.com/icon.png'),
       ('Facility', 'Facility items', 'facility', 'icon.png', 'http://example.com/icon.png');
	   

-- --------- policy ---------
CREATE TABLE policy (
  poli_id SERIAL PRIMARY KEY,
  poli_name VARCHAR(55),
  poli_description VARCHAR(255)
);
-- Insert dummy data for table policy
INSERT INTO policy (poli_name, poli_description)
VALUES ('Privacy Policy', 'Our privacy policy'),
       ('Terms of Service', 'Our terms of service');

-- --------- policy_category_group ---------
CREATE TABLE policy_category_group (
  poca_poli_id INTEGER REFERENCES policy (poli_id),
  poca_cagro_id INTEGER REFERENCES category_group (cagro_id),
  PRIMARY KEY (poca_poli_id, poca_cagro_id)
);
-- Insert dummy data for table policy_category_group
INSERT INTO policy_category_group (poca_poli_id, poca_cagro_id)
VALUES (1, 1),
       (2, 2);

-- --------- regions ---------
CREATE TABLE regions (
  region_code SERIAL PRIMARY KEY,
  region_name VARCHAR(35) UNIQUE
);

-- Insert dummy data for table regions
INSERT INTO regions (region_name)
VALUES ('North America');

-- --------- country ---------
CREATE TABLE country (
  country_id SERIAL PRIMARY KEY,
  country_name VARCHAR(55) UNIQUE,
  country_region_id INTEGER REFERENCES regions (region_code)
);
-- Insert dummy data for table country
INSERT INTO country (country_name, country_region_id)
VALUES ('Canada', 1),
       ('United States', 1);
	   
-- --------- province ---------

CREATE TABLE provinces (
  prov_id SERIAL PRIMARY KEY,
  prov_name VARCHAR(85),
  prov_country_id INTEGER REFERENCES country (country_id)
);
-- Insert dummy data for table provinces
INSERT INTO provinces (prov_name, prov_country_id)
VALUES ('Ontario', 1),
       ('California', 2),
       ('Illinois', 2);


-- --------- address ---------
CREATE TABLE address (
  addr_id SERIAL PRIMARY KEY,
  addr_line1 VARCHAR(225),
  addr_line2 VARCHAR(225),
  addr_postal_code VARCHAR(5),
  addr_spatial_location GEOGRAPHY,
  addr_prov_id INTEGER REFERENCES provinces (prov_id)
);
-- Insert dummy data for table address
INSERT INTO address (addr_line1, addr_line2, addr_postal_code, addr_spatial_location, addr_prov_id)
VALUES ('123 Main St', 'Apt 4B', '10001', 'POINT(-73.9857 40.7484)', 1),
       ('456 Elm St', NULL, '90210', 'POINT(-118.4065 34.0900)', 2),
       ('789 Oak St', 'Unit 7', '60601', 'POINT(-87.6298 41.8781)', 3);
	   
DROP TABLE hotel.hotels;
