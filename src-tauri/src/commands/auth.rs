use tauri::State;
use crate::state::AppState;
use crate::identity::seed::SovereignSeed;
use crate::identity::keypair::MasterIdentityKeys;
use crate::storage::db::Database;
use chrono::Utc;

#[tauri::command]
pub async fn generate_seed_phrase() -> Result<Vec<String>, String> {
    let seed = SovereignSeed::generate()?;
    let words = seed.phrase.split_whitespace().map(|s| s.to_string()).collect();
    Ok(words)
}

#[tauri::command]
pub async fn verify_and_initialize(
    alias: String,
    seed_phrase: String,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let entropy = SovereignSeed::validate_and_parse(&seed_phrase)?;
    let keys = MasterIdentityKeys::derive_from_entropy(&entropy)?;
    let peer_id_str = format!("12D3K3wX{}", hex::encode(&keys.ed25519_verifying.to_bytes()[0..8]));

    // Initialize Encrypted SQLCipher Storage
    let db = Database::init_encrypted("null_sec_vault.db", &seed_phrase)
        .map_err(|e| format!("Database Initialization Failed: {}", e))?;
    
    db.insert_profile(&peer_id_str, &alias, &Utc::now().to_rfc3339())
        .map_err(|e| format!("Profile Creation Failed: {}", e))?;

    *state.db.lock().await = Some(db);
    *state.peer_id.lock().await = Some(peer_id_str.clone());
    *state.alias.lock().await = Some(alias);

    Ok(peer_id_str)
}
