import React, { Component } from 'react';

import AppHeader from './AppHeader';

import { connect } from 'react-redux';

class AppHeaderContainer extends Component {
    render() {
        return (
            <AppHeader todo={this.props.todo} done={this.props.done} />
        )
    }
}


// const mapStateToProps = (state) => {
//     console.log('IM STATE');
//     console.log(state);
//     return {
//         todoData: state.todoData
//     }
// }

const mapStateToProps = ({ todoData }) => ({
    todoData
})


export default connect(mapStateToProps)(AppHeaderContainer);