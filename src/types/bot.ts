
export type BotStatus = "online" | "offline" | "restarting" | "connecting";

export interface BotConfig {
  id: string;
  name: string;
  token: string;
  status: BotStatus;
  memory: {
    used: number;
    total: number;
  };
  cpu: number;
  uptime: string;
  location: string;
  ping: number;
}
