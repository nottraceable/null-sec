use tauri::State;
use crate::state::AppState;

#[tauri::command]
pub async fn update_profile(alias: String, state: State<'_, AppState>) -> Result<bool, String> {
    let mut current_alias = state.alias.lock().await;
    *current_alias = Some(alias);
    Ok(true)
}

#[tauri::command]
pub async fn export_identity_keys(state: State<'_, AppState>) -> Result<String, String> {
    let peer_id = state.peer_id.lock().await;
    peer_id.clone().ok_or_else(|| "Identity Session Not Initialized".to_string())
}
