export interface SnackType {
  id: number;
  created_at: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  locationsAvailableAt: string;
}

export interface SnackFormType {
  title: string;
  description: string;
  rating: number | string;
  price: number | string;
  locationsAvailableAt: string[] | string;
}
