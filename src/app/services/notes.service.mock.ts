import { BehaviorSubject, Observable } from 'rxjs';
import { Notes } from '../models/notes.model';
import { PublicOnly } from '../testing/utils';
import { NotesService } from './notes.service';

export class NotesServieMock implements PublicOnly<NotesService> {
  notes$ = new BehaviorSubject<{ message: string; notes: Notes[] }>({
    message: '',
    notes: [],
  });
  getnotes = jasmine.createSpy('getnotes');
}
