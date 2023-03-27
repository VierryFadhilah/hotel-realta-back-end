 CREATE TABLE users.user_members (
  usme_user_id SERIAL,
  usme_memb_name VARCHAR(15),
  usme_promote_date TIMESTAMP,
  usme_points SMALLINT,
  usme_type VARCHAR(15),
  CONSTRAINT pkey_user_members PRIMARY KEY (usme_user_id, usme_memb_name),
  CONSTRAINT fkey_user_members_users FOREIGN KEY (usme_user_id) REFERENCES users.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fkey_user_members_master_members FOREIGN KEY (usme_memb_name) REFERENCES master.members(memb_name) ON DELETE CASCADE ON UPDATE CASCADE
)


INSERT INTO users.user_members
  (usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES
  ('rifqi', '2023-01-01 12:10:55', 100, 'default');

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
  
