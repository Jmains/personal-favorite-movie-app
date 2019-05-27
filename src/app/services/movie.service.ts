// Angular
import { Injectable } from '@angular/core';
// AngularFire
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// Models
import { Movie } from '../models/movie.model';
import { User } from '../models/user.model';
// RxJS
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies = [];
  movieCollection: AngularFirestoreCollection<Movie>;
  movieDoc: AngularFirestoreDocument<Movie>;
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  movie$: Observable<Movie>;

  constructor(
  private afs: AngularFirestore,
  private afauth: AngularFireAuth) {
 
    this.movieCollection = this.afs.collection('movies');
    this.userCollection = this.afs.collection('users');
    
    // Return the observable list of movies
    this.movie$ = this.afauth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection<Movie>(`users/${user.uid}/movies`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
   }

  createUserMovie(movie, user): void {
    const data = {
      movieid: '',
      title: movie.title,
      year: movie.year,
      director: movie.director,
      imageURL: movie.imageURL,
      rating: movie.rating,
      description: movie.description
    };
    this.afs.collection('users').doc(`${user.uid}`).collection('movies').add(data)
    .then(res => { 
      console.log('movie successfully added with doc id: ', res.id);
      this.updateUserMovie(res.id, movie, user); 
    })
    .catch(err => {
      console.log('failed to add movie ', err);
    });
  }
  
  updateUserMovie(movieid, movie, user): void {
    this.movieDoc = this.afs.doc(`users/${user.uid}/movies/${movieid}`);
    const data = {
      movieid: movieid,
      title: movie.title,
      year: movie.year,
      director: movie.director,
      imageURL: movie.imageURL,
      rating: movie.rating,
      description: movie.description
    };
    this.movieDoc.set(data,{merge: true});
    console.log(`movie with id ${movieid} successfully updated`);
  }

  deleteUserMovie(movieid, user): void {
   this.afs.doc(`users/${user.uid}/movies/${movieid}`).delete()
   .then(res => {
     console.log(`deletion of doc id: ${movieid} was successful`);
   })
   .catch(err => {
     console.log('failed to delete', err);
   });
  }
}
