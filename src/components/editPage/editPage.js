import React, {Component} from 'react';


class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h1>Редактирование пользователя</h1>
                <form method="POST" encType="multipart/form-data" >
                    <div>
                        <label>Имя (текущее имя {this.props.data[0]})</label><br/>
                        <input type="text" name="userName" required placeholder={this.props.data[0]}/><br/><br/>
                        <label>Возраст (текущий возраст: {this.props.data[3]})</label><br/>
                        <input type="number" name="userAge" placeholder={this.props.data[3]} required/><br/><br/>
                        <label>Номер телефона (текущий номер: +375 {this.props.data[4]})</label><br/>
                        +375  <input type="tel" id="phone" name="userNumber" placeholder={this.props.data[4]} pattern='(29|25|44|33)\d{7}' required /><br /><br />
                        <label htmlFor="file">Загрузите Вашу фотографию если хотите поменять ее</label> <br/><br/>
                        <input type="file" id="file" name="myFile" /><br/><br/>
                    </div>
                    <div>
                        <button>Отправить</button>
                    </div>
                </form>
            </div>

        );
    }
}

export default EditPage;