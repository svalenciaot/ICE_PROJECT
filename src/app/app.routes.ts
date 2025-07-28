// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { ContainerFormComponent } from './components/container-form/container-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'containers', pathMatch: 'full' },
  { path: 'containers', component: ContainerListComponent },
  { path: 'containers/add', component: ContainerFormComponent },
  { path: 'containers/edit/:serialNumber', component: ContainerFormComponent },
  { path: 'containers/view/:serialNumber', component: ContainerFormComponent },
  { path: '**', redirectTo: 'containers' }
];
