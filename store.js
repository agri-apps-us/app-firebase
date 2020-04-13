import { MakeStore } from "@agri-apps-us/app-core"
import firestoreDb from "./firestore-db";

const store = ({ data, getField, updateField, calculate, collectionPath }) => {
  
  let db = new firestoreDb(collectionPath);

  const initializeStore = (state, storeName) => {
    db.read(`${collectionPath}.${storeName}`).then(data => {
        this.replaceState(
            Object.assign(state, {
              ...data,
              initialized: true,
            })            
          );

          state.initialized = true;
    })
    
    return true;
  };

  let firestoreStore = MakeStore({
    data,
    getField,
    updateField,
    initializeStore,
  });

  firestoreStore.subscribe((mutation, state) => {
    if (mutation.type === "updateField") {
      //localStorage.setItem(storeName, JSON.stringify(state));
      
      if (calculate && typeof calculate === "function") {
        calculate(state).then((result) => {
          store.dispatch("updateResults", result);
        });
      }
    }
  });
};

export default store;
