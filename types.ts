
export interface GameValue {
  id: string;
  name: string;
  value: string;
}

export interface GeneratedCurrency {
  game: 'Roblox' | 'Free Fire';
  userId: string;
  amount: number;
  timestamp: string;
}
    