/**
 * Created by 666 on 2017/5/19.
 */
import React,{Component} from 'react';
import '../common/stylus/chatWrapper.styl';
import friendsCircle from '../../build/images/pyq.png';
import Chat from './chat.jsx';

class chatWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchChat: true,
            sel: 'sel',
            chatLen: 0
        }
    }

    chats(matchAll) {
        if (matchAll === null) {
            return false
        }
        let chatArr = [];
        for (let i = 0; i < matchAll.length; i++) {
            if (!this.state.matchChat && !matchAll[i].chat) {
                continue;
            }
            chatArr.push(<Chat match={matchAll[i]} key={i} />);
        }
        return chatArr;
    };

    chatLen(matchAll) {
        let len = 0;
        matchAll.map((item) => {
            len = item.chat ? len + 1 : len;
        });
        return len;
    }

    render() {
        let _userInfoUser = this.props.chatData.userData || null;
        return (
            <div className="chat-wrapper">
                <img className='chat-wrapper-bg' src={_userInfoUser && _userInfoUser.user.pic} />
                <div className="chat-wrapper-box">
                    <h3 className="match-num">{this.state.matchChat ? _userInfoUser && _userInfoUser.matchAll.length + '个配对' : this.chatLen(_userInfoUser && _userInfoUser.matchAll) + '个聊天'}</h3>
                    <div className="friends-circle">
                        <img className="clearfix" src={friendsCircle} />
                        <label className="clearfix">朋友圈</label>
                        <span className="icon-lnr-chevron-right icon-right clearfix"></span>
                    </div>
                    <div className="circle-chat">
                        <label className={this.state.matchChat ? 'sel' : ''} onClick={() => {this.setState({matchChat: true});}}>所有配对</label>
                        <label className={!this.state.matchChat ? 'sel' : ''} onClick={() => {this.setState({matchChat: false});}}>聊天</label>
                    </div>
                    <div className="chats">
                        {this.chats(_userInfoUser && _userInfoUser.matchAll)}
                    </div>
                </div>
            </div>
        )
    }
}

export default chatWrapper;