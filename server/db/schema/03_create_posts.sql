-- schema/03_create_posts.sql
DROP TABLE IF EXISTS posts CASCADE;
-- CREATE POSTS
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  tag_id text NOT NULL,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  song_id integer REFERENCES songs(id) ON DELETE CASCADE NOT NULL,
  likes INTEGER DEFAULT 0
);