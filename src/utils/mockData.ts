
import { LucideIcon } from "lucide-react";

export type Protocol = 'RTP' | 'HTTP' | 'SIP' | 'FTP' | 'SMTP' | 'TS' | 'GSE' | 'BBFrame' | 'UNKNOWN';
export type PacketStatus = 'RECEIVED' | 'LOST' | 'RETRANSMITTED';

export interface Packet {
  id: string;
  timestamp: Date;
  protocol: Protocol;
  hSeq: number;
  status: PacketStatus;
  size: number;
}

export interface ProtocolStat {
  protocol: Protocol;
  count: number;
  percentage: number;
}

export interface LossStats {
  total: number;
  lost: number;
  retransmitted: number;
  lossRate: number;
  burstEvents: number;
}

let packetCount = 0;
let lostCount = 0;
let retransmittedCount = 0;
let burstEvents = 0;
let inBurst = false;

export const getProtocolColor = (protocol: Protocol): string => {
  switch (protocol) {
    case 'RTP':
      return '#FF5733';
    case 'HTTP':
      return '#33FF57';
    case 'SIP':
      return '#3357FF';
    case 'FTP':
      return '#F033FF';
    case 'SMTP':
      return '#FF33F0';
    case 'TS':
      return '#FFBD33';
    case 'GSE':
      return '#33FFBD';
    case 'BBFrame':
      return '#BD33FF';
    default:
      return '#C0C0C0';
  }
};

export const getStatusColor = (status: PacketStatus): string => {
  switch (status) {
    case 'RECEIVED':
      return '#36D1DC';
    case 'LOST':
      return '#FF5733';
    case 'RETRANSMITTED':
      return '#FFBD33';
    default:
      return '#C0C0C0';
  }
};

export const generateRandomPacket = (): Packet => {
  const protocols: Protocol[] = ['RTP', 'HTTP', 'SIP', 'FTP', 'SMTP', 'TS', 'GSE', 'BBFrame'];
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  
  // Create a bursty pattern for loss simulation
  const lossChance = inBurst ? 0.4 : 0.05;
  let status: PacketStatus = Math.random() < lossChance ? 'LOST' : 'RECEIVED';
  
  // Start or end burst based on probability
  if (!inBurst && status === 'LOST' && Math.random() < 0.3) {
    inBurst = true;
    burstEvents++;
  } else if (inBurst && Math.random() < 0.2) {
    inBurst = false;
  }
  
  // Some lost packets get retransmitted
  if (status === 'LOST' && Math.random() < 0.6) {
    status = 'RETRANSMITTED';
    retransmittedCount++;
  } else if (status === 'LOST') {
    lostCount++;
  }
  
  packetCount++;
  
  return {
    id: `packet-${packetCount}`,
    timestamp: new Date(),
    protocol,
    hSeq: packetCount,
    status,
    size: Math.floor(Math.random() * 1000) + 100
  };
};

export const generatePackets = (count: number): Packet[] => {
  const packets: Packet[] = [];
  for (let i = 0; i < count; i++) {
    packets.push(generateRandomPacket());
  }
  return packets;
};

export const getProtocolStats = (packets: Packet[]): ProtocolStat[] => {
  const stats = new Map<Protocol, number>();
  
  packets.forEach(packet => {
    const current = stats.get(packet.protocol) || 0;
    stats.set(packet.protocol, current + 1);
  });
  
  const results: ProtocolStat[] = [];
  let total = packets.length;
  
  stats.forEach((count, protocol) => {
    results.push({
      protocol,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0
    });
  });
  
  return results.sort((a, b) => b.count - a.count);
};

export const getLossStats = (): LossStats => {
  return {
    total: packetCount,
    lost: lostCount,
    retransmitted: retransmittedCount,
    lossRate: packetCount > 0 ? (lostCount / packetCount) * 100 : 0,
    burstEvents
  };
};

export const resetStats = () => {
  packetCount = 0;
  lostCount = 0;
  retransmittedCount = 0;
  burstEvents = 0;
  inBurst = false;
};

export const getCurrentStreamSource = (): string => {
  return "DVB-S2 Stream Simulator";
};
