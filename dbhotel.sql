create table hotel.hotels(
hotel_id serial primary key,
hotel_name varchar(85),
hotel_description varchar(500),
hotel_rating_star smallint,
hotel_phonenumber varchar(25),
hotel_modified_date TIMESTAMP,
"status" VARCHAR(10) NOT NULL CHECK ("status" IN ('active', 'disactive')),
reason varchar(100),
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