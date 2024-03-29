import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNotesComponent } from './add-notes/add-notes.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NotesService } from '../services/notes.service';
import { UserNotesListComponent } from './user-notes-list/user-notes-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Notes } from '../models/notes.model';

@Component({
  selector: 'app-user-notes',
  standalone: true,
  imports: [
    CommonModule,
    AddNotesComponent,
    ReactiveFormsModule,
    MatCardModule,
    UserNotesListComponent,
    MatDialogModule,
  ],
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss'],
  providers: [NotesService],
})
export class UserNotesComponent implements OnInit, OnDestroy {
  @ViewChild('userNotesList') userNotesList!: UserNotesListComponent;

  usernotes$ = this.notesService.notes$;
  loading$ = this.notesService.loading$;
  #destroy$ = new Subject<void>();
  notesForm: FormGroup = this.createForm();

  constructor(
    private readonly fb: FormBuilder,
    private readonly notesService: NotesService
  ) {
    this.notesService.getnotes();
  }

  get descriptionControl(): AbstractControl | null {
    return this.notesForm.get('addNotes.description');
  }

  createForm(): FormGroup {
    return this.fb.group({
      addNotes: this.fb.group({
        title: [null, [Validators.required, Validators.maxLength(20)]],
        description: [null],
      }),
    });
  }

  save(form: FormGroup) {
    this.notesService.addNote(form.getRawValue());
    this.notesForm.reset();
  }

  reset() {
    this.notesForm.reset();
  }

  delete(id: string) {
    this.notesService.deleteNote(id);
  }

  openDialog(note: Notes) {
    this.userNotesList.openDialog(note);
  }

  ngOnInit(): void {
    if (this.notesForm.status === 'INVALID') {
      this.descriptionControl?.disable();
    }

    //takeUntil is used to complete or unsubscribe from the observable
    //when the this.#destroy$ observable emits a value.
    //debounceTime(200) introduces a delay of 200 milliseconds before emitting the status change,
    //ensuring that it doesn't emit changes too rapidly.

    this.notesForm.statusChanges
      .pipe(takeUntil(this.#destroy$), debounceTime(200))
      .subscribe((status) => {
        if (status === 'VALID') {
          this.descriptionControl?.enable();
        } else {
          this.descriptionControl?.disable();
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
