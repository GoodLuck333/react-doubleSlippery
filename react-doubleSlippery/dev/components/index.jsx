/**
 * Created by 666 on 2017/5/11.
 */

import React,{Component} from 'react';
import Langage from '../common/language/language.json';
import axios from 'axios';
import PersonInfo from './personInfo.jsx';
import Slide from './slide.jsx';
import Chat from  './chatWrapper.jsx';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            homePage: 0,
            userData: null,
            selLangage: {
                type: true,
                nowLangage: Langage
            }
        };
    }

    componentDidMount(){
        // axios.get('http://127.0.0.1:8081/userData')
        axios.get('./data/user_data.json')
            .then((response) => {
                this.setState({
                    userData: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let wrapper = {
            personWrapper: this._personWrapper,
            chatWrapper: this._chatWrapper
        }
        return (
            <div>
                <div className="person-wrapper" ref={(personWrapper) => this._personWrapper = personWrapper}>
                    <PersonInfo dataInfo={this.state} ss={this._personWrapper} />
                </div>
                <Slide wrapper={wrapper} />
                <div className="chat-wrapper" ref={(chatWrapper) => this._chatWrapper = chatWrapper}>
                    <Chat chatData={this.state} />
                </div>
            </div>
        )
    }
}

export default App;