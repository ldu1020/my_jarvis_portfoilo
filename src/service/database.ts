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

  //Todo

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

  // WhatDone

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
    id: string | 'removeAll'
  ) {
    id === 'removeAll'
      ? firebaseDatabase.ref(`${userId}/whatDoneState/${category}`).set(null)
      : firebaseDatabase //
          .ref(`${userId}/whatDoneState/${category}/${id}`)
          .remove();
  }

  //Performence

  findTodayData(
    userId: string,
    category: 'todoPerformence' | 'whatDonePerformence',
    today: string,
    callback: any
  ) {
    console.log('FIND!!!!!!');
    const ref = firebaseDatabase.ref(`${userId}/performence/${category}`);
    ref
      .orderByKey()
      .equalTo(today)
      .on('value', (snapshot) => {
        const value = snapshot.val();
        callback(value);
      });

    return () => ref.off();
  }

  async savePerformence(
    userId: string,
    category: 'todoPerformence' | 'whatDonePerformence',
    date: string,
    list: any
  ) {
    firebaseDatabase //
      .ref(`${userId}/performence/${category}/${date}`)
      .set(list);
  }
}
