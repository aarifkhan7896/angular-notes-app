import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { Notes } from 'src/app/models/notes.model';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ActionButtonsComponent,
  ],
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent {
  editNoteForm: FormGroup = this.createForm();

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Notes
  ) {}

  createForm(): FormGroup {
    return this.fb.group({
      title: [this.data.title, [Validators.required]],
      description: [this.data.description],
    });
  }
}
