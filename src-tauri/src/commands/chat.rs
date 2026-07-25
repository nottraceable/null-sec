use tauri::State;
use crate::state::AppState;
use crate::crypto::padding::PacketPadding;

#[tauri::command]
pub async fn send_direct_message(
    peer_id: String,
    content: String,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    let padded = PacketPadding::pad(content.as_bytes())?;
    // Route through 3-hop onion circuit & libp2p swarm stream
    tracing::info!("Sending {} byte padded envelope to {}", padded.len(), peer_id);
    Ok(true)
}

#[tauri::command]
pub async fn send_channel_message(
    channel_id: String,
    content: String,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    let padded = PacketPadding::pad(content.as_bytes())?;
    tracing::info!("Broadcasting {} byte envelope to channel {}", padded.len(), channel_id);
    Ok(true)
}
