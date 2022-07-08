-- schema/02_create_songs.sql
DROP TABLE IF EXISTS songs CASCADE;
-- CREATE SONGS
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  song_name VARCHAR(255) NOT NULL,
  song_artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  cover_art TEXT,
  song_url TEXT
);