/**
 * Created by 666 on 2017/5/20.
 */
import React,{Component} from 'react';
import imgSrc from '../../build/images/userImg/slide001.png'
import '../common/stylus/chat.styl'

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let chat = this.props.match;
        return (
            <div className="chat-box">
                <ul>
                    <li><img src={chat.pic} /></li>
                    <li className="clearfix">
                        <h3>{chat.name}</h3>
                        <p>{chat.remark}</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Chat