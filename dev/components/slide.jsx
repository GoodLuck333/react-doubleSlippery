/**
 * Created by 666 on 2017/5/17.
 */
import React,{Component} from 'react';
import SlideContent from './slideContent.jsx';
import '../common/stylus/slide.styl'

class Slide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personWrapper: null,
            slideWrapper: null,
            chatWrapper: null,
            fold: null,
            location: 1
        }
    }

    //set state default value
    componentDidMount() {
        this.setState({
            personWrapper: this.props.wrapper.personWrapper,
            slideWrapper: this._slideWrapper,
            chatWrapper: this.props.wrapper.chatWrapper,
            location: 1
        });
    }

    //set style
    setStyle(obj, _style, value) {
        obj.style[_style] = value;
    }

    //personInfo && matchChat switch tab
    // obj is DOM, willSetStyle is will set Style, startVal is start location, endVal is end location,
    // diff is difference, direction is Boundary value, speed is run speed
    animation(obj, willSetStyle, startVal, endVal, diff, direction, speed) {
        let run = startVal;
        this.timer = setInterval(() => {
            if ((run >= endVal && direction) || (run <= endVal && !direction)) {
                this.setStyle(obj, willSetStyle, endVal + 'rem');
                this.timer && clearTimeout(this.timer);
                return;
            }
            this.setStyle(obj, willSetStyle, run + 'rem');
            direction ?  run += diff : run -= diff;
        }, speed);
    }

    //personInfo && matchChat switch tab (deputy)
    animationDeputy(obj, willSetStyle, startVal, endVal, diff, direction, speed) {
        let run = startVal;
        this.timerDeputy = setInterval(() => {
            if ((run >= endVal && direction) || (run <= endVal && !direction)) {
                this.timerDeputy && clearTimeout(this.timerDeputy);
                return;
            }
            this.setStyle(obj, willSetStyle, run + 'rem');
            direction ?  run += diff : run -= diff;
        }, speed);
    }

    //run unfold tab
    unfoldAnimation(personOrChat, location) {
        if (location !== 1) return;
        if (personOrChat === 'person') {
            this.setStyle(this.props.wrapper.chatWrapper, 'display', 'none');
            this.setStyle(this.props.wrapper.personWrapper, 'display', 'inline-block');
            this.animation(this._slideWrapper, 'left', 0, 8.1, 0.15, true, 2);
            this.animationDeputy(this.props.wrapper.personWrapper, 'left', -3, 0, 0.1, true, 3);
            this.setState({location: 0});
        } else if (personOrChat === 'chat') {
            this.setStyle(this.props.wrapper.personWrapper, 'display', 'none');
            this.setStyle(this.props.wrapper.chatWrapper, 'display', 'inline-block');
            this.animation(this._slideWrapper, 'left', 0, -8.2, 0.15, false, 2);
            this.animationDeputy(this.props.wrapper.chatWrapper, 'right', -3, 0, 0.1, true, 3);
            this.setState({location: 2});
        }
    }

    //run fold tab
    foldAnimation(location) {
        switch (location) {
            case 1:
                return;
            case 0:
                this.animation(this._slideWrapper, 'left', 8.1, 0, 0.2, false, 1);
                this.setState({location: 1});
                break;
            case 2:
                this.animation(this._slideWrapper, 'left', -8.2, 0, 0.2, true, 1);
                this.setState({location: 1});
                break;
        }
    }

    render() {
        return (
            <div className='productBox' ref={(slideWrapper) => this._slideWrapper = slideWrapper} onClick={() => this.foldAnimation(this.state.location)}>
                <div className="title-box">
                    <span className="icon-lnr-menu header-menu" onClick={() => this.unfoldAnimation('person', this.state.location)}></span>
                    <h4>滑滑</h4>
                    <span className="icon-lnr-bubble header-chat" onClick={() => this.unfoldAnimation('chat', this.state.location)}></span>
                </div>
                <SlideContent/>
            </div>
        )
    }
}

export default Slide;