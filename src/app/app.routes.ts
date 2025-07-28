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
  { path: 'movements', component: ContainerListComponent }, // Placeholder
  { path: 'sales', component: ContainerListComponent }, // Placeholder
  { path: 'rentals', component: ContainerListComponent }, // Placeholder
  { path: 'modifications', component: ContainerListComponent }, // Placeholder
  { path: 'third-parties', component: ContainerListComponent }, // Placeholder
  { path: 'reports', component: ContainerListComponent }, // Placeholder
  { path: 'master-data', component: ContainerListComponent }, // Placeholder
  { path: 'configuration', component: ContainerListComponent }, // Placeholder
  { path: '**', redirectTo: 'containers' } // Keep a wildcard for unmatched routes
];
