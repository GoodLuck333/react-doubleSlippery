/**
 * Created by 666 on 2017/5/12.
 */
import React,{Component} from 'react';
import "../common/stylus/personInfo.styl";

class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            selLangage: null,
            user: null
        }
    }

    componentWillMount() {
        this.state = {
            type: this.props.dataInfo.selLangage.type,
            selLangage: this.props.dataInfo.selLangage.nowLangage
        }
    }

    langageSwap() {
        this.props.dataInfo.selLangage.type = !this.props.dataInfo.selLangage.type;
        this.setState({type: !this.state.type});
    }

    selLanage(type) {
        return type ? this.state.selLangage.zh : this.state.selLangage.en;
    }

    render() {
        let _userInfoData = this.props.dataInfo.userData ? this.props.dataInfo.userData.user : '';
        return (
            <div className="person-info">
                <img className='person-info-bg' src={_userInfoData && _userInfoData.pic} />
                <div className="person-info-box">
                    <div className="center">
                        <div className="person-info-head" style={{backgroundImage: 'url(' + (_userInfoData && _userInfoData.pic) + ')'}}></div>
                        <h3>{_userInfoData && _userInfoData.name}</h3>
                        <h4>{this.selLanage(this.state.type).seekEdit}</h4>
                    </div>
                    <ul>
                        <li><span className="icon-pictures"></span><label>{this.selLanage(this.state.type).leftTitle}</label></li>
                        <li><span className="icon-mail-envelope-open"></span><label>{this.selLanage(this.state.type).anyConfession}</label></li>
                        <li><span className="icon-cog"></span><label>{this.selLanage(this.state.type).site}</label></li>
                        <li><span className="icon-info"></span><label>{this.selLanage(this.state.type).beginnerGuide}</label></li>
                        <li><span className="icon-lnr-exit-up"></span><label>{this.selLanage(this.state.type).recommend}</label></li>
                        <li onClick={() => this.langageSwap()}><span className="icon-heart"></span><label>{this.selLanage(this.state.type).swapLangage}</label></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default PersonInfo;