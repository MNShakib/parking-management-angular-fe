import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  role = 'user';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    const success = this.auth.login(this.username, this.password, this.role as 'admin' | 'user');
    if (success) {
      const route = this.role === 'admin' ? '/admin' : '/user';
      this.router.navigate([route]);
    } else {
      alert('Invalid credentials');
    }
  }
}
