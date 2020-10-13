/** @format */

import { firebaseDatabase } from './firebase';

export default class DataBase {
  syncData(userId: any, category: any, onUpdate: any) {
    const ref = firebaseDatabase.ref(`${userId}/${category}`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });

    return () => ref.off();
  }

  saveData(userId: any, category: any, list: any) {
    firebaseDatabase.ref(`${userId}/${category}/${list.id}`).set(list);
  }

  removeData(userId: any, category: any, list: any) {
    firebaseDatabase.ref(`${userId}/${category}/${list.id}`).remove();
  }
}
