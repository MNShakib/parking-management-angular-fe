import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [
    {
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    },
    {
      username: 'user1',
      password: 'user123',
      role: 'user'
    }
  ];

  constructor(private router: Router) {}

  login(username: string, password: string, role: 'admin' | 'user'): boolean {
    // simulate backend
    const user = this.mockUsers.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      return true;
    }

    return false;
  }

  register(username: string, password: string): boolean {
    // In future: send POST to /api/register
    const exists = this.mockUsers.find(u => u.username === username);
    if (exists) return false;

    this.mockUsers.push({ username, password, role: 'user' });
    return true;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
