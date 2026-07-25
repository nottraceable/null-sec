use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce
};
use hkdf::Hkdf;
use sha2::Sha256;
use rand::RngCore;

pub struct DoubleRatchetSession {
    pub root_key: [u8; 32],
    pub chain_key_send: [u8; 32],
    pub chain_key_recv: [u8; 32],
    pub step: u64,
}

impl DoubleRatchetSession {
    pub fn init(shared_dh_secret: &[u8; 32]) -> Self {
        let hk = Hkdf::<Sha256>::new(Some(b"null-sec-ratchet-salt"), shared_dh_secret);
        let mut rk = [0u8; 32];
        let mut cks = [0u8; 32];
        let mut ckr = [0u8; 32];

        hk.expand(b"root-key", &mut rk).unwrap();
        hk.expand(b"chain-send", &mut cks).unwrap();
        hk.expand(b"chain-recv", &mut ckr).unwrap();

        Self {
            root_key: rk,
            chain_key_send: cks,
            chain_key_recv: ckr,
            step: 0,
        }
    }

    pub fn encrypt_payload(&mut self, plaintext: &[u8]) -> Result<Vec<u8>, String> {
        let mut message_key = [0u8; 32];
        let hk = Hkdf::<Sha256>::new(Some(&self.chain_key_send), b"msg-step");
        hk.expand(b"message-key", &mut message_key).map_err(|e| e.to_string())?;

        let cipher = Aes256Gcm::new_from_slice(&message_key).map_err(|e| e.to_string())?;
        let mut nonce_bytes = [0u8; 12];
        rand::thread_rng().fill_bytes(&mut nonce_bytes);
        let nonce = Nonce::from_slice(&nonce_bytes);

        let mut ciphertext = cipher.encrypt(nonce, plaintext).map_err(|_| "AES-GCM Encryption Failed".to_string())?;
        
        let mut packet = nonce_bytes.to_vec();
        packet.append(&mut ciphertext);
        self.step += 1;

        Ok(packet)
    }

    pub fn decrypt_payload(&mut self, packet: &[u8]) -> Result<Vec<u8>, String> {
        if packet.len() < 13 {
            return Err("Corrupted ciphertext packet size".to_string());
        }

        let (nonce_bytes, ciphertext) = packet.split_at(12);
        let mut message_key = [0u8; 32];
        let hk = Hkdf::<Sha256>::new(Some(&self.chain_key_recv), b"msg-step");
        hk.expand(b"message-key", &mut message_key).map_err(|e| e.to_string())?;

        let cipher = Aes256Gcm::new_from_slice(&message_key).map_err(|e| e.to_string())?;
        let nonce = Nonce::from_slice(nonce_bytes);

        cipher.decrypt(nonce, ciphertext).map_err(|_| "Decryption Authentication Failed (MAC Mismatch)".to_string())
    }
}
