import { Movie } from '../models/movie.model';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    movies?: AngularFirestoreCollection<Movie>;
}