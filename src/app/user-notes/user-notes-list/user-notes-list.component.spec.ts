import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotesListComponent } from './user-notes-list.component';

describe('UserNotesListComponent', () => {
  let component: UserNotesListComponent;
  let fixture: ComponentFixture<UserNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserNotesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
