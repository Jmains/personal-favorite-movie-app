// Angular imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// AngularFire 
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore,
AngularFirestoreDocument,
AngularFirestoreCollection } from '@angular/fire/firestore';
// RxJS
import { Observable, of } from 'rxjs';
import {switchMap } from 'rxjs/operators';
//Models
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor( private afauth: AngularFireAuth,
     private afs: AngularFirestore, 
     private router: Router
  ) { 
      // If the user is logged in return credentials of user
      // else return an observable of type null
      this.user$ = this.afauth.authState.pipe(
        switchMap(user => {
          if (user) {
            // console.log('user logged in from authService returning: user data');
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // console.log('user is not logged in from authService returning: null');
            return of(null);
          }
        })
      );
    }
  
  googleSignin(): void {
    const provider = new auth.GoogleAuthProvider();
    this.afauth.auth.signInWithPopup(provider)
    .then(credential => {
      localStorage.setItem("user", JSON.stringify(credential.user));
      if (credential.additionalUserInfo.isNewUser) {
        this.updateUserData(credential.user);
      }
      this.router.navigate([`/movies/${credential.user.uid}`]); 
    })
    .catch(err => {
       window.alert(err);
    });  
  }

  logout(): void {
    this.afauth.auth.signOut()
      .then(res => {
        localStorage.removeItem("user");
        console.log('removed user from local storage');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        window.alert(err);
      });
  }

  private updateUserData(user): void {
    this.userDoc = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    // Merge data with only data that has been changed 
    this.userDoc.set(userData, {merge: true})
    .then(res => {
      console.log("data successfully written with id: " + this.userDoc.ref.id);
    })
    .catch(err => {
      console.log(err);
    });
  }

  private deleteUserData(user) {

  }
}
