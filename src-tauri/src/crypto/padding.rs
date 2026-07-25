use rand::RngCore;

pub const FIXED_PACKET_SIZE: usize = 4096;

pub struct PacketPadding;

impl PacketPadding {
    pub fn pad(payload: &[u8]) -> Result<Vec<u8>, String> {
        if payload.len() > FIXED_PACKET_SIZE - 4 {
            return Err("Payload exceeds maximum 4KB chunk boundary".to_string());
        }

        let mut padded = vec![0u8; FIXED_PACKET_SIZE];
        let len_bytes = (payload.len() as u32).to_be_bytes();
        padded[0..4].copy_from_slice(&len_bytes);
        padded[4..4 + payload.len()].copy_from_slice(payload);

        // Fill remaining byte buffer with pseudo-random noise
        rand::thread_rng().fill_bytes(&mut padded[4 + payload.len()..]);

        Ok(padded)
    }

    pub fn unpad(padded: &[u8]) -> Result<Vec<u8>, String> {
        if padded.len() != FIXED_PACKET_SIZE {
            return Err("Invalid padded packet frame dimension".to_string());
        }

        let mut len_bytes = [0u8; 4];
        len_bytes.copy_from_slice(&padded[0..4]);
        let original_len = u32::from_be_bytes(len_bytes) as usize;

        if original_len > FIXED_PACKET_SIZE - 4 {
            return Err("Malformed length indicator header".to_string());
        }

        Ok(padded[4..4 + original_len].to_vec())
    }
}
