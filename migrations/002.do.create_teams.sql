CREATE TABLE teams (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    creator_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL
);