import { Routes } from '@angular/router';
import { ConnectionComponent } from './pages/device/connection/connection.component';
import { ControllerComponent } from './pages/device/controller/controller.component';

export const routes: Routes = [
    { path: '', redirectTo: 'connection', pathMatch: 'full'},
    { path: 'controller', component: ControllerComponent },
    { path: 'connection', component: ConnectionComponent }
];

