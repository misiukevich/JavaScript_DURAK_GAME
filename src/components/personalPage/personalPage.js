import React, {Component} from 'react';


class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h2>Имя: {this.props.data[0]}</h2><br/>
                <h3>Возраст:  {this.props.data[3]}</h3><br/>
                <h3>Мобильный номер телефона: +375 {this.props.data[4]}</h3><br/>
                <h3>Персональный номер:  {this.props.data[2]}</h3><br/>
                <h3>Фотография: </h3><img alt='image' src={this.props.data[1]} />
            </div>
        );
    }
}

export default PersonalPage;