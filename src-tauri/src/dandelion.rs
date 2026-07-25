use rand::Rng;

#[derive(Debug, PartialEq)]
pub enum DandelionRoutingState {
    Stem,  // Anonymization Stem Phase: Single peer linear hop
    Fluff, // Broadcast Phase: Network-wide Gossipsub expansion
}

pub struct DandelionRouter {
    pub stem_probability: f64, // Default 0.90 stem routing ratio
}

impl DandelionRouter {
    pub fn new() -> Self {
        Self { stem_probability: 0.90 }
    }

    pub fn evaluate_phase(&self) -> DandelionRoutingState {
        let mut rng = rand::thread_rng();
        let val: f64 = rng.gen();
        if val < self.stem_probability {
            DandelionRoutingState::Stem
        } else {
            DandelionRoutingState::Fluff
        }
    }
}
