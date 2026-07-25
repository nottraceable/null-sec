use rusqlite::{Connection, Result as SqlResult};
use crate::storage::schema::INITIAL_SCHEMA;

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn init_encrypted(db_path: &str, master_key: &str) -> SqlResult<Self> {
        let conn = Connection::open(db_path)?;
        
        // Configure SQLCipher Encryption Cipher Engine
        let pragma_cmd = format!("PRAGMA key = '{}';", master_key);
        conn.execute_batch(&pragma_cmd)?;
        conn.execute_batch(INITIAL_SCHEMA)?;

        Ok(Self { conn })
    }

    pub fn insert_profile(&self, peer_id: &str, alias: &str, created_at: &str) -> SqlResult<()> {
        self.conn.execute(
            "INSERT OR REPLACE INTO user_profile (peer_id, alias, created_at) VALUES (?1, ?2, ?3)",
            (peer_id, alias, created_at),
        )?;
        Ok(())
    }
}
