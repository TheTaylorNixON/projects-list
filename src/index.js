import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

import { addProject } from './actions';
import { bindActionCreators } from 'redux';

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(addProject({ key1: 'new Project1' }));
store.dispatch(addProject({ key2: 'new Project2' }));

console.log(bindActionCreators(addProject, store.dispatch)({ key3: 'newProject3' }));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
