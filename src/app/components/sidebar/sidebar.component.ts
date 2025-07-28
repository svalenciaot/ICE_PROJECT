import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  navigationItems = [
    { label: 'Containers', icon: '📦', route: '/containers' },
    { label: 'Movimientos', icon: '🚚', route: '/movements' },
    { label: 'Sales', icon: '💰', route: '/sales' },
    { label: 'Rentals', icon: '🏠', route: '/rentals' },
    { label: 'Modifications', icon: '🛠️', route: '/modifications' },
    { label: 'Third Parties', icon: '🤝', route: '/third-parties' },
    { label: 'Reports', icon: '📊', route: '/reports' },
    { label: 'Master Data', icon: '⚙️', route: '/master-data' },
    { label: 'Configuration', icon: '🔒', route: '/configuration' },
  ];
}
