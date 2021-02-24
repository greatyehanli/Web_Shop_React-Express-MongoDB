//cores
import React, { Component } from 'react'
import {connect} from 'react-redux'


//actions
import {toggleDisplay} from '../../../redux/actions/side_menu'

//css
import './index.css'

class BackDrop extends Component {
    render() {
        return (
            // backdrop onClick to send action to toggle redux state{ display : bool}
            <div className='backdrop' onClick={this.props.toggleDisplay}>
                
            </div>
        )
    }
}

export default connect(
    state => ({
        display: state.display
    }),

    {
        toggleDisplay 
    }
)(BackDrop)