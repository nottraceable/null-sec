use tokio::sync::mpsc;

pub struct SwarmHandle {
    pub command_sender: mpsc::Sender<SwarmCommand>,
}

pub enum SwarmCommand {
    SendMessage { peer_id: String, payload: Vec<u8> },
    BroadcastChannel { channel_id: String, payload: Vec<u8> },
}

impl SwarmHandle {
    pub fn new() -> (Self, mpsc::Receiver<SwarmCommand>) {
        let (tx, rx) = mpsc::channel(100);
        (Self { command_sender: tx }, rx)
    }
}
