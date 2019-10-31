import React from "react"
import { Provider } from "react-redux"
import reduxThunk from "redux-thunk"
import { createStore as reduxCreateStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createStore = () =>
  reduxCreateStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)))

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
)
