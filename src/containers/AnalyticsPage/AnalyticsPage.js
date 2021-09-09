import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

export class AnalyticsPage extends Component {
    state = {
        
    }


    render() {

        return (
            <div>
                <p>analytics</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
