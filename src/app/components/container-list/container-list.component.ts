// src/app/components/container-list/container-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ContainerService } from '../../services/container.service';
import { Container } from '../../models/container';
import { Router } from '@angular/router'; // <<-- Importar Router

@Component({
  selector: 'app-container-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './container-list.component.html',
  styleUrl: './container-list.component.css'
})
export class ContainerListComponent implements OnInit {

  public containers;
  public availableCount;

  constructor(
    private containerService: ContainerService,
    private router: Router // <<-- Inyectar Router
  ) {
    this.containers = this.containerService.containers;
    this.availableCount = this.containerService.availableContainersCount;
  }

  ngOnInit(): void {
    this.containerService.loadContainers().subscribe({
      next: () => console.log('Containers loaded successfully from API.'),
      error: (err) => console.error('Error loading containers:', err)
    });
  }

   // Método para manejar el clic en la fila
  onRowClick(serialNumber: string): void {
    // Navegar a la ruta de visualización
    this.router.navigate(['/containers/view', serialNumber]);
  }


}
