/**
 * <Provider> 组件
 *    connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数
 *    React-Redux 提供Provider组件，可以让容器组件拿到state
 *    下面代码中，Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了
 */
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import rootSaga from "./sagas/index";
import App from "./containers/app";

const store = configureStore;

// run root saga
store.runSaga(rootSaga);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
