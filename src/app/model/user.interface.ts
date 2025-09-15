export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: { id: string };
  status: { id: string };
  createdAt: string;
  updatedAt: string;
}
