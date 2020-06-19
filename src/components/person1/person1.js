import React, {Component} from 'react';
import './person1.css'


class FirstPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className='firstPerson' id="person1">
                {this.props.cards}
            </div>
        );
    }
}

export default FirstPerson;