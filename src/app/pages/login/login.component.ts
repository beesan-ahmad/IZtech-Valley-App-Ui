import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = { email: this.email, password: this.password };
    
    this.http.post<LoginResponse>('http://localhost:3000/api/login', loginData).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
