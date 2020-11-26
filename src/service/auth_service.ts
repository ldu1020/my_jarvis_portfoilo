/** @format */

import { firebaseAuth, githubProvider, googleProvider } from './firebase';

export class AuthService {
  login(providerName: string) {
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  loginAnonymous() {
    return firebaseAuth.signInAnonymously();
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged: (user: firebase.User | null) => void) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName: string) {
    switch (providerName) {
      case 'Google':
        return googleProvider;

      case 'Github':
        return githubProvider;
      default:
        throw new Error(`not suported provider : ${providerName}`);
    }
  }
}

export type AuthServiceType = InstanceType<typeof AuthService>;
