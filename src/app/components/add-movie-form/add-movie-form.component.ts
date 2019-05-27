// Angular
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
// Services
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Models
import { User } from '../../models/user.model';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.scss']
})
export class AddMovieFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  user$: Observable<User> = this.authService.user$;
  movie$: Observable<Movie> = this.movieService.movie$;

  // Notify parent if this components was selected or not
  @Output() selectedEvent = new EventEmitter<boolean>();
  $isSelected: boolean = true;

  user: User;
  isSelected = true;
  submitted = false;

   movie: Movie = {
    movieid: '', 
    title: '',
    year: '',
    director: '',
    imageURL: '',
    rating: 0,
    description: ''
  };
  
  constructor(
    private movieService: MovieService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription.add(this.user$.subscribe(user => {this.user = user;}));
  }

  onSubmit(): void { 
    this.submitted = true;
    this.movieService.createUserMovie(this.movie, this.user);
    this.movie = {
      movieid: '', 
      title: '',
      year: '',
      director: '',
      imageURL: '',
      rating: 0,
      description: ''
    };
   }

   onExit(): void {
    this.$isSelected = false;
    this.selectedEvent.emit(this.$isSelected);
   }
   
  // get diagnostic() { return JSON.stringify(this.movie); }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
