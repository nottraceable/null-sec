use libp2p::{
    gossipsub::{Behaviour as Gossipsub, Config as GossipsubConfig},
    kad::store::MemoryStore,
    kad::Behaviour as Kademlia,
    ping::Behaviour as Ping,
    identify::Behaviour as Identify,
    swarm::NetworkBehaviour,
};

#[derive(NetworkBehaviour)]
pub struct NullSecBehaviour {
    pub gossipsub: Gossipsub,
    pub kademlia: Kademlia<MemoryStore>,
    pub ping: Ping,
    pub identify: Identify,
}
