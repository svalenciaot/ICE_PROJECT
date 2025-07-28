// src/app/components/container-form/container-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContainerService } from '../../services/container.service';
import { Container } from '../../models/container';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-container-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './container-form.component.html',
  styleUrl: './container-form.component.css'
})
export class ContainerFormComponent implements OnInit {

  containerForm: FormGroup;
  formMode: 'add' | 'view' | 'edit' = 'add';
  currentSerialNumber: string | null = null;

  conditions = ['NEW', 'IICL', 'CW', 'WWT', 'AS IS', 'SCRAP'];
  statuses = ['Available', 'Purchase in progress', 'In transit', 'Damaged', 'Reserved'];
  customsStatuses = ['Yes', 'No', 'In process'];
  containerTypes = ['Dry Van', 'Reefer', 'Open Top', 'Flat Rack'];

  constructor(
    private fb: FormBuilder,
    private containerService: ContainerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.containerForm = this.fb.group({
      serialNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}\d{7}$/)]],
      productCode: ['', Validators.required],
      size: ['', [Validators.required, Validators.min(10), Validators.max(53)]],
      containerType: ['', Validators.required],
      condition: ['', Validators.required],
      isoCode: [''],
      status: ['', Validators.required],
      yom: ['', [Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      customsStatus: [''],
      ral: [''],
      purchaseValue: ['', [Validators.required, Validators.min(0)]],
      currentValue: ['', [Validators.required, Validators.min(0)]],
      vendor: [''],
      owner: ['', Validators.required],
      entryDate: [new Date().toISOString().split('T')[0], Validators.required],
      currentLocation: ['', Validators.required],
      entryDateCurrentLocation: ['', Validators.required],
      attachedDocuments: [[]]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/');

      if (path.includes('add')) {
        this.formMode = 'add';
        this.containerForm.enable();
        this.containerForm.reset();
        this.containerForm.patchValue({
          entryDate: new Date().toISOString().split('T')[0]
        });
        this.containerForm.get('entryDateCurrentLocation')?.disable();
        this.containerForm.get('serialNumber')?.enable();
      } else if (path.includes('edit')) {
        this.formMode = 'edit';
        this.currentSerialNumber = this.route.snapshot.paramMap.get('serialNumber');
        this.loadContainerData(this.currentSerialNumber);
        this.containerForm.enable();
        this.containerForm.get('serialNumber')?.disable();
        this.containerForm.get('entryDateCurrentLocation')?.disable();
      } else if (path.includes('view')) {
        this.formMode = 'view';
        this.currentSerialNumber = this.route.snapshot.paramMap.get('serialNumber');
        this.loadContainerData(this.currentSerialNumber);
        this.containerForm.disable();
      }
    });
  }

  private loadContainerData(serialNumber: string | null): void {
    if (serialNumber) {
      const container = this.containerService.getContainerBySerialNumber(serialNumber);
      if (container) {
        const formattedEntryDate = container.entryDate ? new Date(container.entryDate).toISOString().split('T')[0] : '';
        const formattedEntryDateCurrentLocation = container.entryDateCurrentLocation ? new Date(container.entryDateCurrentLocation).toISOString().split('T')[0] : '';

        this.containerForm.patchValue({
          ...container,
          entryDate: formattedEntryDate,
          entryDateCurrentLocation: formattedEntryDateCurrentLocation,
          attachedDocuments: container.attachedDocuments?.join(', ') || ''
        });
      } else {
        console.warn(`Container with serial number ${serialNumber} not found.`);
        this.router.navigate(['/containers']);
      }
    }
  }

  onSubmit(): void {
    if (this.formMode === 'add') {
      this.containerForm.get('entryDateCurrentLocation')?.setValue(this.containerForm.get('entryDate')?.value);
    }

    if (this.containerForm.valid) {
      let containerData: Container = {
        ...this.containerForm.getRawValue()
      };

      if ((this.formMode === 'edit' || this.formMode === 'view') && this.currentSerialNumber) {
        containerData.serialNumber = this.currentSerialNumber;
      }

      containerData.entryDate = new Date(this.containerForm.getRawValue().entryDate);
      containerData.entryDateCurrentLocation = new Date(this.containerForm.getRawValue().entryDateCurrentLocation);

      if (typeof this.containerForm.getRawValue().attachedDocuments === 'string') {
        containerData.attachedDocuments = this.containerForm.getRawValue().attachedDocuments
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0);
      } else {
        containerData.attachedDocuments = [];
      }

      if (this.formMode === 'edit') {
        this.containerService.updateContainer(containerData).subscribe({
          next: () => {
            alert('Container updated successfully!');
            this.router.navigate(['/containers/view', this.currentSerialNumber]);
          },
          error: (err) => console.error('Error updating container:', err)
        });
      } else if (this.formMode === 'add') {
        this.containerService.addContainer(containerData).subscribe({
          next: () => {
            alert('Container added successfully!');
            this.containerForm.reset();
            this.router.navigate(['/containers']);
          },
          error: (err) => console.error('Error adding container:', err)
        });
      }
    } else {
      console.log('Form is invalid');
      this.containerForm.markAllAsTouched();
    }
  }

  onEditClick(): void {
    if (this.currentSerialNumber) {
      this.router.navigate(['/containers/edit', this.currentSerialNumber]);
    }
  }

  onDeleteClick(): void {
    if (this.currentSerialNumber && confirm(`Are you sure you want to delete container ${this.currentSerialNumber}?`)) {
      this.containerService.deleteContainer(this.currentSerialNumber).subscribe({
        next: () => {
          alert('Container deleted successfully!');
          this.router.navigate(['/containers']);
        },
        error: (err) => console.error('Error deleting container:', err)
      });
    }
  }

  onBackToList(): void {
    this.router.navigate(['/containers']);
  }

  onCancelEdit(): void {
    if (this.currentSerialNumber) {
      this.router.navigate(['/containers/view', this.currentSerialNumber]);
    } else {
      this.router.navigate(['/containers']);
    }
  }

  get fc() {
    return this.containerForm.controls;
  }
}