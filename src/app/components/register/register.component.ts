import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Import Router
import { AuthService } from '../../services/auth.service'; // Adjust path if needed

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  bikeNumber = '';
  carNumber = '';

  constructor(private authService: AuthService, private router: Router) {} // 👈 Inject Router

  register(): void {
    const payload = {
      username: this.username,
      password: this.password,
      bikeNumber: this.bikeNumber || null,
      carNumber: this.carNumber || null
    };

    this.authService.register(payload).subscribe({
      next: () => {
        alert('Registered successfully!');
        this.router.navigate(['/login']); // 👈 Redirect to login after success
      },
      error: err => alert(err.error.message || 'Registration failed')
    });
  }
}
