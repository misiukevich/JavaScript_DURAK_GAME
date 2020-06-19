import React, {Component} from 'react';


class EditButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <button><a href='/edit'>Изменить данные</a></button>
        );
    }
}

export default EditButton;