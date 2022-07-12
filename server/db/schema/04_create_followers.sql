-- schema/04_create_followers.sql
DROP TABLE IF EXISTS followers CASCADE;
-- CREATE POSTS
CREATE TABLE followers (
  id SERIAL PRIMARY KEY,
  follower integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  followed integer REFERENCES users(id) ON DELETE CASCADE NOT NULL
);