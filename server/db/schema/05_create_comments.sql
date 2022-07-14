-- schema/04_create_comments.sql
DROP TABLE IF EXISTS comments CASCADE;
-- CREATE POSTS
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  commenter integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  commented integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);