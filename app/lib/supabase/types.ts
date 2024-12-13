export interface DatabaseUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  image_url: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
}

export interface Revenue {
  id: string;
  month: string;
  revenue: number;
  created_at: string;
}