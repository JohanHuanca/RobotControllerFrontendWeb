import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RobotService } from '../service/robot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements OnInit {

  errorMessage: string | null = null;
  robots: any[] = [];

  constructor(
    private authService: AuthService,
    private robotService: RobotService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Obtener el token directamente

    if (token && !this.isTokenExpired(token)) {
      // Si el token es válido, obtener los robots
      this.loadRobots();
    } else {
      // Si no hay token o está expirado, iniciar sesión
      this.loginAndLoadRobots();
    }
  }

  loginAndLoadRobots(): void {
    const data = {
      email: "j.huanca4141@gmail.com",
      password: "Arduino4141!"
    };

    this.authService.login(data).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);
        this.loadRobots();
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        console.error('Error al iniciar sesión:', error);
      }
    });
  }

  loadRobots(): void {
    this.robotService.getAllRobotByMy().subscribe({
      next: (response: any[]) => {
        this.robots = response;
        console.log('Robots cargados:', response);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        console.error('Error al cargar robots:', error);
      }
    });
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      return payload.exp < currentTime; // Verificar si está expirado
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return true; // Si hay un error, considerar el token como expirado
    }
  }

  selectRobot(robotSelected: any): void {
    this.router.navigate(['/controller'], { queryParams: { uuid: robotSelected.token } });
  }
}