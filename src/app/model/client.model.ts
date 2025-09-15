import { Category } from './categories.model';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}
