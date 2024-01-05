import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-add-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
