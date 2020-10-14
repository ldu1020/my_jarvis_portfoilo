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

  saveTodoData(
    userId: string,
    category: 'todoList' | 'topicList',
    list: TodoListData | TodoTopicData
  ) {
    firebaseDatabase //
      .ref(`${userId}/todoState/${category}/${list.id}`)
      .set(list);
  }

  removeTodoData(
    userId: string,
    category: 'todoList' | 'topicList',
    id: string
  ) {
    firebaseDatabase //
      .ref(`${userId}/todoState/${category}/${id}`)
      .remove();
  }
}
