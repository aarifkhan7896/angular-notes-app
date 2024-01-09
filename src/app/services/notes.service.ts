import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { Notes } from '../models/notes.model';

@Injectable()
export class NotesService {
  #notes$ = new BehaviorSubject<{ message: string; notes: Notes[] }>({
    message: '',
    notes: [],
  });
  #loading$ = new BehaviorSubject<boolean>(false);

  notes$ = this.#notes$.asObservable();
  loading$ = this.#loading$.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  getnotes() {
    this.#loading$.next(true);

    return this.httpClient
      .get<{ message: string; notes: Notes[] }>(
        'http://localhost:3000/api/notes'
      )
      .pipe(
        tap((notes) => this.#notes$.next(notes)),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.#loading$.next(false))
      )
      .subscribe();
  }
}
