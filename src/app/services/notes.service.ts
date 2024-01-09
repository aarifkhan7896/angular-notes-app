import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Notes } from '../models/notes.model';

@Injectable()
export class NotesService {
  #notes$ = new BehaviorSubject<{ message: string; notes: Notes[] }>({
    message: '',
    notes: [],
  });
  notes$ = this.#notes$.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  getnotes() {
    return this.httpClient
      .get<{ message: string; notes: Notes[] }>(
        'http://localhost:3000/api/notes'
      )
      .pipe(tap((notes) => this.#notes$.next(notes)))
      .subscribe();
  }
}
