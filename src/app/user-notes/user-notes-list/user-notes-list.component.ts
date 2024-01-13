import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Notes } from 'src/app/models/notes.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ActionButtonsComponent } from 'src/app/shared-components/action-buttons/action-buttons.component';
import { EditNoteComponent } from 'src/app/shared-components/edit-note/edit-note.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatButtonModule,
    ActionButtonsComponent,
  ],
  templateUrl: './user-notes-list.component.html',
  styleUrls: ['./user-notes-list.component.scss'],
})
export class UserNotesListComponent {
  @Input() notes: Notes[] | undefined = [];
  @Input() loading: boolean | null = false;

  @Output() deleteEvent = new EventEmitter<string>();
  @Output() openEditNoteModel = new EventEmitter<void>();

  panelOpenState = false;

  constructor(public dialog: MatDialog) {}

  onDelete(id: string) {
    this.deleteEvent.emit(id);
  }

  onEdit() {
    this.openEditNoteModel.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '550px', // Set the width as per your requirement
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }
}
