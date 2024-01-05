import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNotesComponent } from './add-notes/add-notes.component';

@Component({
  selector: 'app-user-notes',
  standalone: true,
  imports: [CommonModule, AddNotesComponent],
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss'],
})
export class UserNotesComponent {}
