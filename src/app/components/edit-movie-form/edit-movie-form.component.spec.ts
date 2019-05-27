import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieFormComponent } from './edit-movie-form.component';

describe('EditMovieFormComponent', () => {
  let component: EditMovieFormComponent;
  let fixture: ComponentFixture<EditMovieFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMovieFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
