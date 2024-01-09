import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Notes } from 'src/app/models/notes.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-notes-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatProgressBarModule],
  templateUrl: './user-notes-list.component.html',
  styleUrls: ['./user-notes-list.component.scss'],
})
export class UserNotesListComponent {
  @Input() notes: Notes[] | undefined = [];
  @Input() loading: boolean | null = false;

  panelOpenState = false;
}
