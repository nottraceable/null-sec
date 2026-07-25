use ed25519_dalek::{SigningKey, VerifyingKey};
use x25519_dalek::{StaticSecret, PublicKey as X25519PublicKey};
use hkdf::Hkdf;
use sha2::Sha256;

pub struct MasterIdentityKeys {
    pub ed25519_signing: SigningKey,
    pub ed25519_verifying: VerifyingKey,
    pub x25519_secret: StaticSecret,
    pub x25519_public: X25519PublicKey,
}

impl MasterIdentityKeys {
    pub fn derive_from_entropy(entropy: &[u8]) -> Result<Self, String> {
        let hk = Hkdf::<Sha256>::new(Some(b"null-sec-v1-master-salt"), entropy);

        let mut ed_seed = [0u8; 32];
        hk.expand(b"ed25519-identity-key", &mut ed_seed)
            .map_err(|_| "HKDF Expansion Error for Ed25519".to_string())?;

        let signing_key = SigningKey::from_bytes(&ed_seed);
        let verifying_key = signing_key.verifying_key();

        let mut x_seed = [0u8; 32];
        hk.expand(b"x25519-dh-key", &mut x_seed)
            .map_err(|_| "HKDF Expansion Error for X25519".to_string())?;

        let x25519_secret = StaticSecret::from(x_seed);
        let x25519_public = X25519PublicKey::from(&x25519_secret);

        Ok(Self {
            ed25519_signing: signing_key,
            ed25519_verifying: verifying_key,
            x25519_secret,
            x25519_public,
        })
    }
}
