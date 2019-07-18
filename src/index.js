import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';

// import { bindActionCreators } from 'redux';
// import { addProject } from './actions';

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log(store.getState());
})

console.log(store);
console.log(store.getState());

// store.dispatch(addProject({ key1: 'new Project1' }));
// store.dispatch(addProject({ key2: 'new Project2' }));

// console.log(bindActionCreators(addProject, store.dispatch)({ key3: 'newProject3' }));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)