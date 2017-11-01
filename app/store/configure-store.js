/**
 * Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store
 * Redux 提供createStore这个函数，用来生成 Store
 * 
 * 
 * 中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能
 * applyMiddlewares()是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行
 */
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import createLogger from "redux-logger";

import rootReducer from "../reducers/index";

const middlewares = [];
const logger = createLogger();

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
/* global __DEV__  */
if (__DEV__) {
  middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  // 实际应用中，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法
  const store = createStoreWithMiddleware(rootReducer, initialState);
  // install saga run
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
