export interface UserSession {
  access: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  // Add other user properties as needed
}
