import { Injectable } from '@angular/core';
import { User, UserStorage } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { File } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;
  private filePath: string;

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  login(user: User) {
    return this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        console.log('registar response: ', response);

        this.setUserData(response.user);
      })
      .catch((error) => {
        console.log('Error al registrase: ', error.message);
      });
  }

  register(user: User) {
    return this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        console.log('registar response: ', response);

        this.setUserData(response.user);
      })
      .catch((error) => {
        console.log('Error al registrase: ', error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  setUserData(user) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${user.uid}`);
    const userData: UserStorage = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    });
  }

  logout() {
    return this.angularFireAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch((error) => {
        console.log('Error al cerrar seción: ', error.message);
      });
  }
}
