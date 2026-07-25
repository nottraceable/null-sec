pub mod commands;
pub mod crypto;
pub mod identity;
pub mod p2p;
pub mod state;
pub mod storage;

use state::AppState;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(AppState::new())
        .invoke_handler(tauri::generate_handler![
            commands::auth::generate_seed_phrase,
            commands::auth::verify_and_initialize,
            commands::chat::send_direct_message,
            commands::chat::send_channel_message,
            commands::server::create_server,
            commands::server::create_channel,
            commands::server::update_role_matrix,
            commands::user::update_profile,
            commands::user::export_identity_keys
        ])
        .run(tauri::generate_context!())
        .expect("error while running NULL SEC tauri application");
}
