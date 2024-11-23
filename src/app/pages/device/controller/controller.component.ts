import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovementService } from '../service/movement.service';
import { RobotService } from '../service/robot.service';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.css'
})
export class ControllerComponent implements OnInit{
  errorMessage: string | null = null
  uuid: string = ""
  robot: any = {}
  robotButtons: any[] =[]
  constructor(
    private robotService: RobotService,
    private movementService: MovementService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uuid = params['uuid'];
      if (!this.uuid) {
        this.router.navigate(['/connection']);
        return;
      }
      console.log('Robot Token or UUID:', this.uuid);
      this.getRobot();
    });
  }

  getRobot(){
    this.robotService.getRobotByToken(this.uuid!).subscribe({
      next: (response: any) => {
        console.log(response);
        this.robot=response
        this.getButtons();
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.router.navigate(['/connection']);
      }
    })
  }

  getButtons(){
    this.movementService.getAllByRobotId(this.robot.id).subscribe({
      next: (response: any[]) => {
        console.log(response);
        this.robotButtons=response
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.router.navigate(['/connection']);
      }
    })
  }  

  exacuteMovementById(movementId: number){
    this.robotService.exacuteMovement(movementId, this.uuid).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      }
    })
  }  

  moveToInitialPosition(){
    this.robotService.moveToInitialPosition(this.uuid).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      }
    })
  }
}
