
import React from 'react';
import { Shield } from 'lucide-react';
import { getSignalQualityClass } from './SignalMetrics';

export interface PacketData {
  id: string;
  type: 'data' | 'audio' | 'video' | 'signaling' | 'control';
  size: number;
  strength: number;
  encrypted: boolean;
  timestamp: Date;
}

interface PacketTableProps {
  packets: PacketData[];
}

const getPacketColorClass = (type: string) => {
  switch(type) {
    case 'data': return 'bg-blue-500';
    case 'audio': return 'bg-green-500';
    case 'video': return 'bg-purple-500';
    case 'signaling': return 'bg-yellow-500';
    case 'control': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const PacketTable = ({ packets }: PacketTableProps) => {
  return (
    <div className="border-t border-sat-gray/30">
      <div className="max-h-32 overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="bg-sat-gray/20 sticky top-0">
            <tr className="text-xs text-muted-foreground">
              <th className="px-3 py-2 text-left font-medium">Time</th>
              <th className="px-3 py-2 text-left font-medium">Type</th>
              <th className="px-3 py-2 text-left font-medium">Size</th>
              <th className="px-3 py-2 text-left font-medium">Signal</th>
              <th className="px-3 py-2 text-left font-medium">Security</th>
            </tr>
          </thead>
          <tbody>
            {packets.map((packet) => (
              <tr 
                key={packet.id}
                className="border-b border-sat-gray/10 animate-fade-in hover:bg-sat-gray/10"
              >
                <td className="px-3 py-1.5 font-mono">
                  {packet.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  })}
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-1.5 ${getPacketColorClass(packet.type)}`}></div>
                    <span className="capitalize">{packet.type}</span>
                  </div>
                </td>
                <td className="px-3 py-1.5 font-mono">{packet.size} B</td>
                <td className="px-3 py-1.5 font-mono">
                  <span className={getSignalQualityClass(packet.strength)}>{packet.strength}%</span>
                </td>
                <td className="px-3 py-1.5">
                  {packet.encrypted ? (
                    <div className="flex items-center text-green-500">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>Encrypted</span>
                    </div>
                  ) : (
                    <span className="text-yellow-500">Unencrypted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PacketTable;
