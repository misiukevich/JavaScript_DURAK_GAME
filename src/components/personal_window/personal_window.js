import React, {Component} from 'react';
import PersonalPage from "../personalPage/personalPage";
import EditButton from "../editButton/editButton";


class PersonalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            information: []
        }
    }

    componentDidMount() {
        this.props.socket.on('for personal', (data) => { this.setState({information: [data.user, data.pic, data.id, data.age, data.telNumber]});});
    }

    render() {
        return (
            <div>
            <PersonalPage data={this.state.information}/>
            <EditButton/>
            </div>
        );
    }
}

export default PersonalWindow;