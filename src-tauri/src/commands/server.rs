use tauri::State;
use crate::state::AppState;

#[tauri::command]
pub async fn create_server(name: String, _state: State<'_, AppState>) -> Result<String, String> {
    let server_id = format!("srv-{}", rand::random::<u32>());
    Ok(server_id)
}

#[tauri::command]
pub async fn create_channel(
    server_id: String,
    category_id: String,
    name: String,
    _state: State<'_, AppState>,
) -> Result<String, String> {
    let channel_id = format!("chan-{}", rand::random::<u32>());
    Ok(channel_id)
}

#[tauri::command]
pub async fn update_role_matrix(
    server_id: String,
    role_id: String,
    permissions_mask: u32,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    Ok(true)
}
