// Angular
import { Component, OnInit } from '@angular/core';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Services
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service'
// Models
import { Movie } from '../../models/movie.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie>;
  movie: Movie;
  addFormSelected = false;
  editFormSelected = false;
  subscription: Subscription = new Subscription();
  user: User;
  user$: Observable<User> = this.authService.user$;
  showSpinner: boolean = true;

  constructor(
    public authService: AuthService, 
    public movieService: MovieService) 
    { }

  ngOnInit(): void {
    this.subscription.add(this.user$.subscribe(user => {
      this.showSpinner = false;
      this.user = user;}));
  }

  addMovie(): void {
    this.editFormSelected = false;
    this.addFormSelected = true;
  }

  onEdit(selectedMovie): void {
    this.movie = selectedMovie;
    this.addFormSelected = false;
    this.editFormSelected = true;
    setTimeout(() => {
      document.getElementById("editForm").scrollIntoView({behavior: "smooth"});
    }, 150);
  }

  receiveIsSelectedEvent($isSelected): void {
    this.addFormSelected = $isSelected;
    this.editFormSelected = $isSelected;
  }

  onRemove(movie): void {
    this.movieService.deleteUserMovie(movie.movieid, this.user);
  }

}
