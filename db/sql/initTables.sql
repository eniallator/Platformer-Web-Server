CREATE TABLE IF NOT EXISTS game_maps
(
  id SERIAL,
  map_name text NOT NULL,
  map_data bytea NOT NULL,
  created_by integer NOT NULL,
  CONSTRAINT pk_game_maps PRIMARY KEY (id)
)
