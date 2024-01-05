import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActionButtonsComponent } from 'src/app/shared-components/action-buttons/action-buttons.component';

@Component({
  selector: 'app-add-notes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ActionButtonsComponent,
  ],
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent {
  @Input() formGroupName!: string;

  notesForm!: FormGroup;

  constructor(private readonly rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.notesForm = this.rootFormGroup.control.get(
      this.formGroupName
    ) as FormGroup;
  }
}
