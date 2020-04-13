import firebase from 'firebase/app'
import { isNil } from 'lodash'

let asyncFirestore = null
let persistenceEnabled = false
let currentSettings = null;

// Lazy load firestore with async import is important for performance

export default (settings = {}, enablePersistence = true) => {
  if (isNil(asyncFirestore)) {
    asyncFirestore = import(/* webpackChunkName: "chunk-firestore" */ 'firebase/firestore').then(
      () => {        
        return firebase.firestore()
      }
    )
  }
  if (Object.keys(settings).length) {
    if (currentSettings != null) {
      if (JSON.parse(currentSettings) !== JSON.parse(settings)) {
        firebase.firestore().settings(settings)
      }
    }
    else {
      firebase.firestore().settings(settings)
    }
  }

  if (enablePersistence && persistenceEnabled !== enablePersistence) {
    firebase.firestore().enablePersistence({ synchronizeTabs: true });
    persistenceEnabled = enablePersistence;
  }
    
  return asyncFirestore
}