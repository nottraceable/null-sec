use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct OnionCircuitHop {
    pub peer_id: String,
    pub relay_address: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct OnionRoute {
    pub guard_node: OnionCircuitHop,
    pub transit_relay: OnionCircuitHop,
    pub exit_gateway: OnionCircuitHop,
}

impl OnionRoute {
    pub fn construct_3_hop(hops: Vec<OnionCircuitHop>) -> Result<Self, String> {
        if hops.len() < 3 {
            return Err("Insufficient network peers to form 3-hop onion circuit".to_string());
        }
        Ok(Self {
            guard_node: hops[0].clone(),
            transit_relay: hops[1].clone(),
            exit_gateway: hops[2].clone(),
        })
    }
}
