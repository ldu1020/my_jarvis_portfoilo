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
    category: 'todoList' | 'topicList' | 'todoPerformence',
    list: TodoListData | TodoTopicData | TodoPerformenceData
  ) {
    firebaseDatabase //
      .ref(`${userId}/todoState/${category}/${list.id}`)
      .set(list);
  }

  removeTodoData(
    userId: string,
    category: 'todoList' | 'topicList' | 'todoPerformence',
    id: string
  ) {
    firebaseDatabase //
      .ref(`${userId}/todoState/${category}/${id}`)
      .remove();
  }

  saveWhatDoneData(
    userId: string,
    category: 'whatDoneList' | 'customCategoryList' | 'donePerformence',
    list: WhatDoneData | CustomCategoryData
  ) {
    firebaseDatabase //
      .ref(`${userId}/whatDoneState/${category}/${list.id}`)
      .set(list);
  }

  removeWhatDoneData(
    userId: string,
    category: 'whatDoneList' | 'customCategoryList' | 'donePerformence',
    id: string
  ) {
    firebaseDatabase //
      .ref(`${userId}/whatDoneState/${category}/${id}`)
      .remove();
  }
}
