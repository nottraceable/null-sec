use bip39::{Mnemonic, Language};
use zeroize::Zeroize;

pub struct SovereignSeed {
    pub phrase: String,
    pub entropy: Vec<u8>,
}

impl SovereignSeed {
    pub fn generate() -> Result<Self, String> {
        let mnemonic = Mnemonic::generate_in(Language::English, 20)
            .map_err(|e| format!("Entropy Generation Failure: {}", e))?;
        
        let phrase = mnemonic.to_string();
        let entropy = mnemonic.to_entropy().to_vec();

        Ok(Self { phrase, entropy })
    }

    pub fn validate_and_parse(phrase: &str) -> Result<Vec<u8>, String> {
        let mnemonic = Mnemonic::parse_in(Language::English, phrase)
            .map_err(|_| "Invalid BIP-39 Mnemonic Seed Phrase".to_string())?;
        
        Ok(mnemonic.to_entropy().to_vec())
    }
}

impl Drop for SovereignSeed {
    fn drop(&mut self) {
        self.phrase.zeroize();
        self.entropy.zeroize();
    }
}
