---!> MARINER:MIGRATE:UP:
BEGIN;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name text,
  last_name text,
  email text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz
);

INSERT INTO users (first_name, last_name, email) VALUES ('Jason', 'Walsh', 'jason@knledg.com');

COMMIT;

---!> MARINER:MIGRATE:DOWN:
BEGIN;

DROP TABLE users;

COMMIT;
