import React, {Component} from 'react';
import EditPage from "../editPage/editPage";


class EditWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            information: []
        }
    }

    componentDidMount() {
        this.props.socket.on('for personal', (data) => { this.setState(
            {information: [data.user, data.pic, data.id, data.age, data.telNumber]});
        });
    }

    render() {
        return (
            <div>
                <EditPage data={this.state.information}/>
            </div>
        );
    }
}

export default EditWindow;