pub const INITIAL_SCHEMA: &str = "
CREATE TABLE IF NOT EXISTS user_profile (
    peer_id TEXT PRIMARY KEY,
    alias TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS direct_messages (
    id TEXT PRIMARY KEY,
    sender_peer_id TEXT NOT NULL,
    sender_alias TEXT NOT NULL,
    recipient_peer_id TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS servers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    owner_peer_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS channels (
    id TEXT PRIMARY KEY,
    server_id TEXT NOT NULL,
    category_id TEXT NOT NULL,
    name TEXT NOT NULL,
    topic TEXT
);
";
