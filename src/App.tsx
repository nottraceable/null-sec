import React, { useState } from 'react';
import { Step1Alias } from './components/auth/Step1Alias';
import { Step2Seed } from './components/auth/Step2Seed';
import { Step3Verify } from './components/auth/Step3Verify';
import { TopHeader } from './components/layout/TopHeader';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { ProfilePill } from './components/layout/ProfilePill';
import { PeerHeader } from './components/chat/PeerHeader';
import { MessageThread } from './components/chat/MessageThread';
import { MessageInput } from './components/chat/MessageInput';
import { UserSettingsModal } from './components/modals/UserSettingsModal';
import { ServerSettingsModal } from './components/modals/ServerSettingsModal';
import { AddPeerModal } from './components/modals/AddPeerModal';
import { JoinServerModal } from './components/modals/JoinServerModal';
import { ChatMessage, MeshServer, PeerUser } from './types';
import { UserPlus, Hash } from 'lucide-react';

export const App: React.FC = () => {
  // Auth state wizard
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState<1 | 2 | 3>(1);
  const [userAlias, setUserAlias] = useState('');
  const [seedWords, setSeedWords] = useState<string[]>([]);
  const [myPeerId] = useState('12D3K3wX9zKqM84v1A0xL7P9q2n4m3B5c6v7b8n9m0');

  // UI Navigation state
  const [activeTab, setActiveTab] = useState<'dms' | string>('dms');
  const [activeChannelId, setActiveChannelId] = useState<string>('gen-1');

  // Modals state
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [isServerSettingsOpen, setIsServerSettingsOpen] = useState(false);
  const [isAddPeerOpen, setIsAddPeerOpen] = useState(false);
  const [isJoinServerOpen, setIsJoinServerOpen] = useState(false);

  // Mock State
  const [peers, setPeers] = useState<PeerUser[]>([
    {
      peer_id: '12D3K3wX...8A',
      alias: 'cipher_ghost',
      is_online: true,
      onion_hops: 3,
      last_seen: 'Now',
    },
  ]);

  const [servers, setServers] = useState<MeshServer[]>([
    {
      id: 'srv-1',
      name: 'NullSec Core Mesh',
      owner_peer_id: myPeerId,
      categories: [
        {
          id: 'cat-1',
          name: 'TEXT CHANNELS',
          channels: [
            { id: 'gen-1', name: 'general', category_id: 'cat-1', topic: 'Decentralized discussion', is_private: false },
            { id: 'dev-2', name: 'development', category_id: 'cat-1', topic: 'Rust & libp2p architecture', is_private: false },
          ],
        },
      ],
      roles: [{ id: 'role-1', name: 'Admin', color: '#00ff9d', permissions: { manage_channels: true, manage_roles: true, kick_members: true, send_messages: true } }],
      members_count: 12,
    },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Auth flow callbacks
  const handleAliasSubmit = (alias: string) => {
    setUserAlias(alias);
    // Mock 20-word BIP-39 seed phrase derivation
    setSeedWords([
      'matrix', 'shadow', 'quantum', 'cipher', 'network',
      'vector', 'entropy', 'orbit', 'circuit', 'node',
      'protocol', 'pulse', 'terminal', 'signal', 'phantom',
      'relay', 'beacon', 'stealth', 'kernel', 'horizon',
    ]);
    setAuthStep(2);
  };

  const handleSendMessage = (content: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender_peer_id: myPeerId,
      sender_alias: userAlias,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      padded_size_bytes: 4096,
      is_verified_ratchet: true,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-screen h-screen bg-[#06090e] flex items-center justify-center p-4 relative scanline">
        {authStep === 1 && <Step1Alias onNext={handleAliasSubmit} />}
        {authStep === 2 && <Step2Seed seedWords={seedWords} onNext={() => setAuthStep(3)} />}
        {authStep === 3 && (
          <Step3Verify
            seedWords={seedWords}
            onComplete={() => setIsAuthenticated(true)}
            onBack={() => setAuthStep(2)}
          />
        )}
      </div>
    );
  }

  const currentServer = servers.find((s) => s.id === activeTab);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#06090e] overflow-hidden text-emerald-400 select-none">
      <TopHeader connectedPeersCount={peers.length} />

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar
          servers={servers}
          peers={peers}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenAddPeer={() => setIsAddPeerOpen(true)}
          onOpenJoinServer={() => setIsJoinServerOpen(true)}
          onOpenCreateServer={() => {}}
        />

        {/* Secondary Navigation (Channels / DM list) */}
        <div className="w-60 bg-[#070b12] border-r border-emerald-500/20 flex flex-col justify-between font-mono">
          <div>
            <div className="h-14 px-4 border-b border-emerald-500/20 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-200 uppercase tracking-wider truncate">
                {activeTab === 'dms' ? 'Direct Messages' : currentServer?.name}
              </span>
              {activeTab !== 'dms' && (
                <button
                  onClick={() => setIsServerSettingsOpen(true)}
                  className="text-xs text-emerald-500 hover:text-emerald-300"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="p-3 space-y-4">
              {activeTab === 'dms' ? (
                <div>
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Active Peers</span>
                    <button
                      onClick={() => setIsAddPeerOpen(true)}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {peers.map((peer) => (
                    <div
                      key={peer.peer_id}
                      className="px-2 py-2 rounded bg-emerald-950/20 border border-emerald-500/20 flex items-center space-x-2 text-xs text-emerald-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{peer.alias}</span>
                    </div>
                  ))}
                </div>
              ) : (
                currentServer?.categories.map((cat) => (
                  <div key={cat.id}>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      {cat.name}
                    </span>
                    {cat.channels.map((chan) => (
                      <button
                        key={chan.id}
                        onClick={() => setActiveChannelId(chan.id)}
                        className={`w-full px-2 py-1.5 rounded flex items-center space-x-2 text-xs font-mono transition-all ${
                          activeChannelId === chan.id
                            ? 'bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-500/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Hash className="w-3.5 h-3.5 text-slate-500" />
                        <span>{chan.name}</span>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>

          <ProfilePill
            alias={userAlias}
            peerId={myPeerId}
            onOpenSettings={() => setIsUserSettingsOpen(true)}
          />
        </div>

        {/* Main Conversation Canvas */}
        <div className="flex-1 flex flex-col bg-[#06090e]">
          <PeerHeader
            title={activeTab === 'dms' ? 'Direct P2P Session' : `# general`}
            subtitle="Signal Double Ratchet • Constant Packet Padding • 3-Hop Circuit Relay"
          />
          <MessageThread messages={messages} currentPeerId={myPeerId} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Settings & Interaction Modals */}
      <UserSettingsModal
        isOpen={isUserSettingsOpen}
        onClose={() => setIsUserSettingsOpen(false)}
        currentAlias={userAlias}
        peerId={myPeerId}
        onSaveProfile={(newAlias) => setUserAlias(newAlias)}
      />

      {currentServer && (
        <ServerSettingsModal
          isOpen={isServerSettingsOpen}
          onClose={() => setIsServerSettingsOpen(false)}
          server={currentServer}
        />
      )}

      <AddPeerModal
        isOpen={isAddPeerOpen}
        onClose={() => setIsAddPeerOpen(false)}
        onAddPeer={(id) => {
          setPeers((prev) => [
            ...prev,
            { peer_id: id, alias: 'peer_' + id.substring(0, 4), is_online: true, onion_hops: 3, last_seen: 'Now' },
          ]);
        }}
      />

      <JoinServerModal
        isOpen={isJoinServerOpen}
        onClose={() => setIsJoinServerOpen(false)}
        onJoinServer={() => {}}
      />
    </div>
  );
};

export default App;
