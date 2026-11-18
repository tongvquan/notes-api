CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  content VARCHAR NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);
INSERT INTO notes (content) VALUES ('seed tu init script');