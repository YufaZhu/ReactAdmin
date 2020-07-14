import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import {Provider} from 'react-redux'
import store from './redux/store'
// 如果 本地 保存了 user, 将 user 保存到内存中
const user = storageUtils.getUser()
if (user && user._id) {
    memoryUtils.user = user
}
ReactDOM.render(
    <Prodover store={store}>
        <App />
    </Prodover>
    , document.getElementById('root'));


