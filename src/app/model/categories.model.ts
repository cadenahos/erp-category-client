export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  sortOrder?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
