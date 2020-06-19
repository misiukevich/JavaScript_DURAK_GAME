import React, {Component} from 'react';
import './person2.css'


class SecondPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className='secondPerson' id="person2" >
                {this.props.cards}
            </div>
        );
    }
}

export default SecondPerson;