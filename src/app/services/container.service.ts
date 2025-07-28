// src/app/services/container.service.ts

import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <<-- ESTA LÍNEA ES CORRECTA AQUÍ
import { Observable, tap } from 'rxjs';
import { Container } from '../models/container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private apiUrl = 'http://localhost:3000/containers';

  private containersSignal: WritableSignal<Container[]> = signal([]);
  public containers = this.containersSignal.asReadonly();

  public availableContainersCount = computed(() =>
    this.containersSignal().filter(c => c.status === 'Available').length
  );

  private selectedContainerSignal: WritableSignal<Container | null> = signal(null);
  public selectedContainer = this.selectedContainerSignal.asReadonly();

  constructor(private http: HttpClient) {
    // Ya no cargamos datos iniciales aquí. La carga se hará explícitamente.
    // this.loadInitialContainers();
  }

  loadContainers(): Observable<Container[]> {
    return this.http.get<Container[]>(this.apiUrl).pipe(
      tap(data => {
        const parsedData = data.map(container => ({
          ...container,
          entryDate: new Date(container.entryDate),
          entryDateCurrentLocation: new Date(container.entryDateCurrentLocation)
        }));
        this.containersSignal.set(parsedData);
        console.log('Containers loaded and signal updated:', parsedData);
      })
    );
  }

  getContainerBySerialNumber(serialNumber: string): Container | undefined {
    return this.containersSignal().find(c => c.serialNumber === serialNumber);
  }

  addContainer(newContainer: Container): Observable<Container> {
    const containerToSend = { ...newContainer, id: newContainer.serialNumber };
    return this.http.post<Container>(this.apiUrl, containerToSend).pipe(
      tap(addedContainer => {
        const parsedAddedContainer = {
          ...addedContainer,
          entryDate: new Date(addedContainer.entryDate),
          entryDateCurrentLocation: new Date(addedContainer.entryDateCurrentLocation)
        };
        this.containersSignal.update(containers => [...containers, parsedAddedContainer]);
        console.log('Container added via API and signal updated:', parsedAddedContainer);
      })
    );
  }

  updateContainer(updatedContainer: Container): Observable<Container> {
    const url = `${this.apiUrl}/${updatedContainer.serialNumber}`;
    const containerToSend = { ...updatedContainer, id: updatedContainer.serialNumber };
    return this.http.put<Container>(url, containerToSend).pipe(
      tap(resultContainer => {
        const parsedResultContainer = {
          ...resultContainer,
          entryDate: new Date(resultContainer.entryDate),
          entryDateCurrentLocation: new Date(resultContainer.entryDateCurrentLocation)
        };
        this.containersSignal.update(containers =>
          containers.map(c =>
            c.serialNumber === parsedResultContainer.serialNumber ? parsedResultContainer : c
          )
        );
        console.log('Container updated via API and signal updated:', parsedResultContainer);
      })
    );
  }

  deleteContainer(serialNumber: string): Observable<Object> {
    const url = `${this.apiUrl}/${serialNumber}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.containersSignal.update(containers =>
          containers.filter(c => c.serialNumber !== serialNumber)
        );
        console.log('Container deleted via API and signal updated:', serialNumber);
      })
    );
  }

  selectContainer(container: Container | null): void {
    this.selectedContainerSignal.set(container);
  }

  clearSelection(): void {
    this.selectedContainerSignal.set(null);
  }
}
