// Angular
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Models
import { User } from '../../models/user.model'
import { Movie } from '../../models/movie.model'
// Services
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-movie-form',
  templateUrl: './edit-movie-form.component.html',
  styleUrls: ['./edit-movie-form.component.scss']
})
export class EditMovieFormComponent implements OnInit, OnDestroy {

  // Take movie selected from parent
  @Input() movieSelected: Movie;
  // Notify parent if edit movie form was selected
  @Output() selectedEvent = new EventEmitter<boolean>();

  private subscription: Subscription = new Subscription();
  user$: Observable<User> = this.authService.user$;
  user: User;

  $isSelected: boolean = true;
  submitted: boolean = false;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.user$.subscribe(user => {this.user = user;}));
  }

  onExit(): void {
    this.$isSelected = false;
    this.selectedEvent.emit(this.$isSelected);
  }

  onSave(): void { 
    this.submitted = true;
    this.movieService.updateUserMovie(this.movieSelected.movieid, this.movieSelected, this.user);
   }
   
  // get diagnostic() { return JSON.stringify(this.movieSelected); }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
