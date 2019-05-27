// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AddMovieFormComponent } from './components/add-movie-form/add-movie-form.component';
import { EditMovieFormComponent } from './components/edit-movie-form/edit-movie-form.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
// Services
import { AuthService } from './services/auth.service';
import { MovieService } from './services/movie.service';
// AngularFire Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    LoginComponent,
    NavbarComponent,
    AddMovieFormComponent,
    EditMovieFormComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFirestoreModule,
    //AngularFireModule.initializeApp(config),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
