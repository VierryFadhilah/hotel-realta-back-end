-- --------- category_group ---------
CREATE TABLE master.category_group (
  cagro_id SERIAL PRIMARY KEY,
  cagro_name VARCHAR(25) UNIQUE,
  cagro_description VARCHAR(255),
  cagro_type VARCHAR(25) CHECK (cagro_type IN ('category', 'service', 'facility')),
  cagro_icon VARCHAR(255),
  cagro_icon_url VARCHAR(255)
);

-- Insert dummy data for table category_group
INSERT INTO master.category_group (cagro_name, cagro_description, cagro_type, cagro_icon, cagro_icon_url)
VALUES ('Food', 'Food items', 'category', 'icon.png', 'http://example.com/icon.png'),
       ('Facility', 'Facility items', 'facility', 'icon.png', 'http://example.com/icon.png');
	   

-- --------- policy ---------
CREATE TABLE master.policy (
  poli_id SERIAL PRIMARY KEY,
  poli_name VARCHAR(55),
  poli_description VARCHAR(255)
);
-- Insert dummy data for table policy
INSERT INTO master.policy (poli_name, poli_description)
VALUES ('Privacy Policy', 'Our privacy policy'),
       ('Terms of Service', 'Our terms of service');

-- --------- policy_category_group ---------
CREATE TABLE master.policy_category_group (
  poca_poli_id INTEGER REFERENCES master.policy (poli_id),
  poca_cagro_id INTEGER REFERENCES master.category_group (cagro_id),
  PRIMARY KEY (poca_poli_id, poca_cagro_id)
);
-- Insert dummy data for table policy_category_group
INSERT INTO master.policy_category_group (poca_poli_id, poca_cagro_id)
VALUES (1, 1),
       (2, 2);

-- --------- regions ---------
CREATE TABLE master.regions (
  region_code SERIAL PRIMARY KEY,
  region_name VARCHAR(35) UNIQUE
);

-- Insert dummy data for table regions
INSERT INTO master.regions (region_name)
VALUES ('North America');

-- --------- country ---------
CREATE TABLE master.country (
  country_id SERIAL PRIMARY KEY,
  country_name VARCHAR(55) UNIQUE,
  country_region_id INTEGER REFERENCES regions (region_code)
);
-- Insert dummy data for table country
INSERT INTO master.country (country_name, country_region_id)
VALUES ('Canada', 1),
       ('United States', 1);
	   
-- --------- province ---------

CREATE TABLE master.provinces (
  prov_id SERIAL PRIMARY KEY,
  prov_name VARCHAR(85),
  prov_country_id INTEGER REFERENCES country (country_id)
);
-- Insert dummy data for table provinces
INSERT INTO master.provinces (prov_name, prov_country_id)
VALUES ('Ontario', 1),
       ('California', 2),
       ('Illinois', 2);


-- --------- address ---------
CREATE TABLE master.address (
  addr_id SERIAL PRIMARY KEY,
  addr_line1 VARCHAR(225),
  addr_line2 VARCHAR(225),
  addr_postal_code VARCHAR(5),
  addr_spatial_location GEOGRAPHY,
  addr_prov_id INTEGER REFERENCES master.provinces (prov_id)
);

SELECT postgis_version();
CREATE EXTENSION postgis
SELECT * FROM pg_extension WHERE extname = 'postgis'
-- Insert dummy data for table address
INSERT INTO master.address (addr_line1, addr_line2, addr_postal_code, addr_spatial_location, addr_prov_id)
VALUES ('123 Main St', 'Apt 4B', '10001', 'POINT(-73.9857 40.7484)', 1),
       ('456 Elm St', NULL, '90210', 'POINT(-118.4065 34.0900)', 2),
       ('789 Oak St', 'Unit 7', '60601', 'POINT(-87.6298 41.8781)', 3);
	   
DROP TABLE hotel.hotels;


CREATE TABLE master.members (
  memb_name VARCHAR(15) PRIMARY KEY
)


INSERT INTO master.members values ('rifqi')