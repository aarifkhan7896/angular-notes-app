import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent {
  @Output() saveButtonEvent = new EventEmitter<MouseEvent>();

  saveClick(event: MouseEvent) {
    this.saveButtonEvent.emit(event);
  }
}
