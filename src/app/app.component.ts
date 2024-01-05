import { Component } from '@angular/core';
import { UserNotesComponent } from './user-notes/user-notes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserNotesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project';
}
