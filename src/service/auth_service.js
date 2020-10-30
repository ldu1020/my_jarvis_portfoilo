/** @format */

import {
  firebaseAuth,
  githubProvider,
  googleProvider
} from './firebase';

class AuthService {
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  loginAnonymous(){
    return firebaseAuth.signInAnonymously()
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
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

export default AuthService;