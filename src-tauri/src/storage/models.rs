use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct LocalUserProfile {
    pub peer_id: String,
    pub alias: String,
    pub created_at: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct StoredMessage {
    pub id: String,
    pub sender_peer_id: String,
    pub sender_alias: String,
    pub channel_or_peer_id: String,
    pub content: String,
    pub timestamp: String,
}
