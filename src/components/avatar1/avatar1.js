import React, {Component} from 'react';


class Avatar1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='avatar1'>
                <h3>{this.props.data[0]}</h3>
                <img alt='person' className='avatar' src={this.props.data[1]}/>
            </div>
        );
    }
}

export default Avatar1;