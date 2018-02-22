/**
 * Created by 666 on 2017/5/17.
 */
import React,{Component} from 'react';
import SlideUser from './slideUser.jsx';
import '../common/stylus/slideContent.styl';
import axios from 'axios';

class SlideContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideUserData: null,
            slide: null
        }
    }

    //pull slide_data
    componentDidMount() {
        axios.get('./data/slide_data.json')
            .then((response) => {
                this.setState({
                    slideUserData: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //回调给子组件调用（取子组件内DOM节点）
    handleSlide(slide) {
        this.setState({slide: slide});
    }

    //set style
    setStyle(obj, _style, value) {
        obj.style[_style] = value;
    }

    //delete slide
    delSlide(arr, stateAttr) {
        arr.splice(0, 1);
        this.setState({stateAttr: arr});
    }

    //like or dislike
    likeOrDislike(_obj, _style, _moveStart, _moveEnd, _moveVal, _speed) {
        if(!_obj) return;
        if (this.timer) {
            this.timer && clearInterval(this.timer);
        }
        let move = Math.floor(_moveStart);
        this.timer = setInterval(() => {
            if (_moveEnd < 0 && move <= _moveEnd || _moveEnd > 0 && move >= _moveEnd) {
                this.timer && clearInterval(this.timer);
                this.delSlide(this.state.slideUserData,'slideUserData');
                this.setStyle(_obj, _style, 0);
                this.setStyle(_obj, 'top', '43px');
                this.setStyle(_obj, 'transform', 'rotate(0deg)');
                return;
            }
            move = _moveEnd < 0 ? move - _moveVal : move + _moveVal;
            this.setStyle(_obj, _style, move + 'px');
            this.setStyle(_obj, 'transform', 'rotate(' + (window.getComputedStyle(_obj, null).left.slice(0, -2) / 60) + 'deg)');
        }, _speed);
    }

    //show slide Array
    slideShow() {
        let slideArr = [];
        if (this.state.slideUserData && this.state.slideUserData[0]) {
            slideArr.push(<SlideUser key={0} userData={this.state.slideUserData && this.state.slideUserData[0]} index={true} handleSlide={this.handleSlide.bind(this)} likeOrDislike={this.likeOrDislike.bind(this)} />);
        }
        for (let i = 1; i < 3; i++) {
            if (!(this.state.slideUserData && this.state.slideUserData[i])) continue;
            slideArr.push(<SlideUser key={i} userData={this.state.slideUserData && this.state.slideUserData[i]} />);
        }
        return slideArr;
    }

    render() {
        return (
            <div>
                {this.slideShow()}
                <ul className="fun-box">
                    <li onClick={() => this.likeOrDislike(this.state.slide, 'left', 0, -450, 4, 5)}><span className="icon-cross no-like"></span></li>
                    <li onClick={() => this.likeOrDislike(this.state.slide, 'left', 0, 450, 4, 5)}><span className="icon-heart yes-like"></span></li>
                </ul>
            </div>
        )
    }
}

export default SlideContent;