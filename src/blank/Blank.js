import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Blank extends Component {
    render() {
        return(
            // eslint-disable-next-line react/react-in-jsx-scope
            <div>
                Hello, World!
            </div>
        );
    }
}

export default withRouter(Blank);