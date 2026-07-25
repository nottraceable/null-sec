export interface PeerUser {
  peer_id: string;
  alias: string;
  avatar_url?: string;
  is_online: boolean;
  onion_hops: number;
  last_seen: string;
}

export interface ChatMessage {
  id: string;
  sender_peer_id: string;
  sender_alias: string;
  content: string;
  timestamp: string;
  padded_size_bytes: number;
  is_verified_ratchet: boolean;
  channel_id?: string;
}

export interface ServerCategory {
  id: string;
  name: string;
  channels: ServerChannel[];
}

export interface ServerChannel {
  id: string;
  name: string;
  category_id: string;
  topic: string;
  is_private: boolean;
}

export interface ServerRole {
  id: string;
  name: string;
  color: string;
  permissions: {
    manage_channels: boolean;
    manage_roles: boolean;
    kick_members: boolean;
    send_messages: boolean;
  };
}

export interface MeshServer {
  id: string;
  name: string;
  icon_url?: string;
  owner_peer_id: string;
  categories: ServerCategory[];
  roles: ServerRole[];
  members_count: number;
}
