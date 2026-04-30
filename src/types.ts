export type Category = 'Exchange' | 'Wallet' | 'Casino' | 'P2P' | 'Tool';
export type KYCLevl = 'No KYC' | 'Partial KYC' | 'KYC Required';
export type Asset = 'BTC' | 'ETH' | 'XMR' | 'USDT' | 'SOL' | 'LTC';

export interface Platform {
  id: string;
  name: string;
  category: Category;
  description: string;
  tags: string[];
  supportedAssets: Asset[];
  trustScore: number;
  url: string;
  featured?: boolean;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  url: string;
}
