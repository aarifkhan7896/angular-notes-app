import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-notes',
  standalone: true,
  imports: [CommonModule, AddNotesComponent, ReactiveFormsModule],
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss'],
})
export class UserNotesComponent {
  notesForm: FormGroup = this.createForm();

  constructor(private readonly fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      addNotes: this.fb.group({
        title: [],
        description: [],
      }),
    });
  }
}
