use std::sync::Arc;
use tokio::sync::Mutex;
use crate::storage::db::Database;
use crate::p2p::network::SwarmHandle;

pub struct AppState {
    pub db: Arc<Mutex<Option<Database>>>,
    pub swarm: Arc<Mutex<Option<SwarmHandle>>>,
    pub peer_id: Arc<Mutex<Option<String>>>,
    pub alias: Arc<Mutex<Option<String>>>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            db: Arc::new(Mutex::new(None)),
            swarm: Arc::new(Mutex::new(None)),
            peer_id: Arc::new(Mutex::new(None)),
            alias: Arc::new(Mutex::new(None)),
        }
    }
}
