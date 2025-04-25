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
    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.auth.setSession(res.token);
          const role = this.auth.getUserRole();
          const route = role === 'admin' ? '/admin' : '/user';
          this.router.navigate([route]);
        },
        error: err => {
          alert(err.error?.message || 'Invalid credentials');
        }
      });
  }
  
}
