CREATE TABLE visitors (
    id TEXT PRIMARY KEY,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT,
    geolocation_json TEXT,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY(visitor_id) REFERENCES visitors(id)
);

CREATE TABLE links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id TEXT,
    link_type TEXT,
    url TEXT UNIQUE,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    UNIQUE(book_id, link_type)
);

CREATE TABLE link_clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT,
    link_id INTEGER,
    geolocation_json TEXT,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY(visitor_id) REFERENCES visitors(id),
    FOREIGN KEY(link_id) REFERENCES links(id)
);

CREATE INDEX idx_link_clicks_visitor ON link_clicks(visitor_id);
CREATE INDEX idx_link_clicks_link ON link_clicks(link_id);
CREATE INDEX idx_link_clicks_created_at ON link_clicks(created_at);
CREATE INDEX idx_visits_created_at ON visits(created_at);
CREATE INDEX idx_links_created_at ON links(created_at);