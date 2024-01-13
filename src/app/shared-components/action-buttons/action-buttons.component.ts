import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControlStatus } from '@angular/forms';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent {
  @Input() formStatus: FormControlStatus = 'PENDING';
  @Input() deletebuttonLabel: string = '';
  @Input() saveButtonLabel: string = '';
  @Input() cancelButtonLabel: string = '';
  @Input() editButtonLabel: string = '';

  @Output() saveOrEditbuttonEvent = new EventEmitter<MouseEvent>();
  @Output() cancelOrDeleteButtonEvent = new EventEmitter<MouseEvent>();

  saveClick(event: MouseEvent) {
    this.saveOrEditbuttonEvent.emit(event);
  }

  cancelClick(event: MouseEvent) {
    this.cancelOrDeleteButtonEvent.emit(event);
  }
}
