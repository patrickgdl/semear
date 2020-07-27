import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { DbService } from './db.service';

interface CredentialUser {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  isAnonymous: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private gplus: GooglePlus,
    private platform: Platform,
    private loadingController: LoadingController,
    private storage: Storage
  ) {
    this.user$ = this.afAuth.authState.pipe(switchMap((user) => (user ? db.doc$(`users/${user.uid}`) : of(null))));

    this.handleRedirect();
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
        map((u) => u && u.uid)
      )
      .toPromise();
  }

  async anonymousLogin() {
    const credential = await this.afAuth.signInAnonymously();
    return await this.updateUserData(credential.user as CredentialUser);
  }

  private updateUserData(credentialUser: CredentialUser) {
    // Sets user data to firestore on login

    const path = `users/${credentialUser.uid}`;

    const data = credentialUser;

    return this.db.updateAt(path, data);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  //// GOOGLE AUTH

  setRedirect(val: any) {
    this.storage.set('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.get('authRedirect');
  }

  async googleLogin() {
    try {
      let user;

      if (this.platform.is('cordova')) {
        user = await this.nativeGoogleLogin();
      } else {
        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.signInWithRedirect(provider);
      }

      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle login with redirect for web Google auth
  private async handleRedirect() {
    if ((await this.isRedirect()) !== true) {
      return null;
    }
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.afAuth.getRedirectResult();

    if (result.user) {
      await this.updateUserData(result.user as CredentialUser);
    }

    await loading.dismiss();

    await this.setRedirect(false);

    return result;
  }

  async nativeGoogleLogin(): Promise<any> {
    const gplusUser = await this.gplus.login({
      webClientId: '1085404550227-h1iabv9megngs4eleo7kd5khoo4fkn98.apps.googleusercontent.com',
      offline: true,
      scopes: 'profile email'
    });

    return await this.afAuth.signInWithCredential(auth.GoogleAuthProvider.credential(gplusUser.idToken));
  }
}
