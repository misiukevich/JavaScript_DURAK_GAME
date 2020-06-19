import React, {Component} from 'react';


class PersonalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <button><a href='/personal'>Личный кабинет</a> </button>
        );
    }
}

export default PersonalButton;