import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

import { addProject } from './actions';
import projects from './reducers/projects';

// const store = createStore(rootReducer);
const store = createStore(projects);
store.subscribe(() => {
    console.log(store.getState());
})

console.log(addProject('newPr'));

store.dispatch(addProject('newPr'));
store.dispatch(addProject('newPr2'));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
