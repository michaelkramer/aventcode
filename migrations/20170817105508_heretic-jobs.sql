---!> MARINER:MIGRATE:UP:
BEGIN;

CREATE TABLE heretic_jobs (
  id SERIAL NOT NULL PRIMARY KEY,
  queue_name text NOT NULL,
  status text DEFAULT 'pending',
  payload jsonb,
  attempt_logs jsonb[] DEFAULT '{}',
  max_attempts int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_attempted_at timestamptz
);

CREATE INDEX ON heretic_jobs (queue_name);
CREATE INDEX ON heretic_jobs (status);

CREATE FUNCTION heretic_updated_at_timestamp() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_heretic_jobs_updated_at
  BEFORE UPDATE ON heretic_jobs
  FOR EACH ROW EXECUTE PROCEDURE heretic_updated_at_timestamp();

COMMIT;

---!> MARINER:MIGRATE:DOWN:
BEGIN;

DROP TABLE heretic_jobs;
DROP FUNCTION hereitC_updated_at_timestamp();

COMMIT;
