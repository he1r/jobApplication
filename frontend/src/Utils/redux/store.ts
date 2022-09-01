import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@utils/redux/features/user'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import jobListingsReducer from '@utils/redux/features/jobListings';
import usersReducer from "@utils/redux/features/users"
import userJobListingsReducer from '@utils/redux/features/userJobListings';
import favouriteJobListings from '@utils/redux/features/favouriteJobListings';
import userJobApplications from "@utils/redux/features/jobApplications"
//PERSIST CONFIG -- SAVE REDUX STORE TO LOCAL STORAGE
const persistConfig = {
    key: 'root',
    storage,
}

//PERSIST THE USER REDUCER
const persisted_userReducer = persistReducer(persistConfig, userReducer)
const persisted_jobListings = persistReducer(persistConfig, jobListingsReducer)
const persisted_usersReducer = persistReducer(persistConfig, usersReducer)
const persisted_userJobListings = persistReducer(persistConfig, userJobListingsReducer)
const persisted_favouriteJobListings = persistReducer(persistConfig, favouriteJobListings)
const persisted_userJobApplications = persistReducer(persistConfig, userJobApplications)

//CREATE STORE
const store = configureStore(
    {
        //REDUCERS
        reducer: {
            user: persisted_userReducer,
            jobListings: persisted_jobListings,
            users: persisted_usersReducer,
            userJobListings: persisted_userJobListings,
            favouriteJobListings: persisted_favouriteJobListings,
            jobApplications: persisted_userJobApplications
        },

        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    }
)

//CREATE THE STORE PERSISTOR TO SAVE THE STORE IN LOCAL STORAGE
const Persistor = persistStore(store)

export { Persistor };

export default store;