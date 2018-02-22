/**
 * Created by 666 on 2017/5/17.
 */
import React,{Component} from 'react';
import '../common/stylus/slideUser.styl';

class slideUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: null
        }
    }

    componentDidMount() {
        this._move = {
            flag: false,
            x: 0,
            y: 0
        }
        // this.setState({userData: this.props.userData});
        this.props.handleSlide && this.props.handleSlide(this._slide);
    }

    //show sex
    swapSex() {
        let sex = this.state.userData && this.state.userData.sex;
        if( sex === 'boy') return '♂';
        if( sex === 'girl') return '♀';
        return
    }

    //same hobbies number
    sameHobbiesNumCreate() {
        if (this.state.userData ? this.state.userData.musicNum : false) {
            return <label className="musicNum"><span className="ci">★</span><span>{this.state.userData && this.state.userData.musicNum}</span></label>
        }
    }

    //set style
    setStyle(obj, _style, value) {
        obj.style[_style] = value;
    }

    mouseDown(e){
        //判断是否为第一个
        if (!this.props.index) return;
        this._move.flag = true;
        this._move.x = e.touches[0].pageX - window.getComputedStyle(this._slide, null).left.slice(0, -2);
        this._move.y = e.touches[0].pageY - window.getComputedStyle(this._slide, null).top.slice(0, -2);
    }

    mouseMove(e) {
        //判断是否为第一个
        if (!this.props.index) return;
        if (this._move.flag){
            this.setStyle(this._slide, 'left', e.touches[0].pageX - this._move.x + 'px');
            this.setStyle(this._slide, 'top', e.touches[0].pageY - this._move.y + 'px');
            //滑动时旋转
            this.setStyle(this._slide, 'transform', 'rotate(' + (window.getComputedStyle(this._slide, null).left.slice(0, -2) / 60) + 'deg)');
        }
    }

    mouseUp() {
        //判断是否为第一个
        if (!this.props.index) return;
        this._move.flag = false;
        let wrapperEndLeft = window.getComputedStyle(this._slide, null).left.slice(0, -2),
        wrapperEndTop = window.getComputedStyle(this._slide, null).top.slice(0, -2);
        if (wrapperEndLeft > -300 && wrapperEndLeft < 300) {
            this.recoverTop(this._slide, 'top', wrapperEndTop, 43, 'left', wrapperEndLeft, 0, 1, this.calculationSpeed(Math.abs(wrapperEndLeft), Math.abs(wrapperEndTop), 3));
        } else {
            this.props.likeOrDislike && this.props.likeOrDislike(this._slide, 'left', wrapperEndLeft, wrapperEndLeft > 0 ? 450 : -450, 4, 5);
        }
    }

    //It's about a speed function,match x or y.
    calculationSpeed (xLen, yLen, _short) {
        var proportion = 1;
        xLen = Math.abs(xLen);
        yLen = Math.abs(yLen);
        if (xLen > yLen) {
            proportion = xLen / yLen;
        } else if (xLen < yLen) {
            proportion = yLen / xLen;
        }
        return {
            shorObj: xLen < yLen ? 'x': 'y',
            shor: _short,
            len: Math.round(_short * proportion) < 5 ? Math.round(_short * proportion) : 5
        }
    }

    //It's a change location function.
    recoverTop (_obj, _styleTop, _moveTop, _defTop, _styleLeft, _moveLeft, _defLeft, _speed, _speedObj) {
        if (this.timer) {
            this.timer && clearInterval(this.timer);
        }
        let nowTop = Math.floor(_moveTop);
        let nowLeft = Math.floor(_moveLeft);
        this.timer = setInterval(() => {
            // console.log(nowTop + '__' + nowLeft);
            let condition1 = (_moveTop > _defTop && nowTop <= _defTop) && (_moveLeft < _defLeft && nowLeft >= _defLeft),
            condition2 = (_moveTop < _defTop && nowTop >= _defTop) && (_moveLeft < _defLeft && nowLeft >= _defLeft),
            condition3 = (_moveTop > _defTop && nowTop <= _defTop) && (_moveLeft > _defLeft && nowLeft <= _defLeft),
            condition4 = (_moveTop < _defTop && nowTop >= _defTop) && (_moveLeft > _defLeft && nowLeft <= _defLeft),
            //横向Bug
            condition5 = (_moveTop == _defTop && nowTop == _defTop) && (_moveLeft >= _defLeft && nowLeft == _defLeft) || (_moveTop == _defTop && nowTop == _defTop) && (_moveLeft <= _defLeft && nowLeft == _defLeft),
            //纵向Bug
            condition6 = (_moveTop <= _defTop && nowTop == _defTop) && (_moveLeft == _defLeft && nowLeft == _defLeft) || (_moveTop >= _defTop && nowTop == _defTop) && (_moveLeft == _defLeft && nowLeft == _defLeft);
            if (condition1 || condition2 || condition3 || condition4 || condition5 || condition6) {
                this.timer && clearInterval(this.timer);
                return;
            }
            if (_moveTop > _defTop && nowTop > _defTop) {
                if (_speedObj.shorObj === 'y') {
                    nowTop -= _speedObj.shor;
                } else {
                    nowTop -= _speedObj.len;
                }
            } else if (_moveTop < _defTop && nowTop < _defTop) {
                if (_speedObj.shorObj === 'y') {
                    nowTop += _speedObj.shor;
                } else {
                    nowTop += _speedObj.len;
                }
            }
            if (_moveLeft > _defLeft && nowLeft > _defLeft) {
                if (_speedObj.shorObj === 'x') {
                    nowLeft -= _speedObj.shor;
                } else {
                    nowLeft -= _speedObj.len;
                }
            } else if (_moveLeft < _defLeft && nowLeft < _defLeft) {
                if (_speedObj.shorObj === 'x') {
                    nowLeft += _speedObj.shor;
                } else {
                    nowLeft += _speedObj.len;
                }
            }
            //释放后反向旋转
            _obj.style.transform = 'rotate(' + (window.getComputedStyle(_obj, null).left.slice(0, -2) / 60) + 'deg)';
            if ((_moveTop > _defTop && nowTop <= _defTop) || (_moveTop < _defTop && nowTop >= _defTop)) {
                nowTop = _defTop;
            }
            if ((_moveLeft > _defLeft && nowLeft <= _defLeft) || (_moveLeft < _defLeft && nowLeft >= _defLeft)){
                nowLeft = _defLeft;
                _obj.style.transform = 'rotate(0deg)';
            }
            _obj.style[_styleTop] = nowTop + 'px';
            _obj.style[_styleLeft] = nowLeft + 'px';
        }, _speed);
    }

    render() {
        this.state.userData = this.props.userData || null;
        let picLen = this.state.userData && this.state.userData.pics.length;
        return (
            <div className="slide-box" ref={(slide) => this._slide = slide} onTouchStart={this.mouseDown.bind(this)} onTouchMove={this.mouseMove.bind(this)} onTouchEnd={this.mouseUp.bind(this)}>
                <img src={this.state.userData && this.state.userData.pics[0]} />
                <label className="picLen"><span className="icon-pictures picMarRig"></span><span>{picLen}</span></label>
                <div className="slide-userInfo">
                    <h3>{this.state.userData && this.state.userData.name}</h3>
                    <label className={this.state.userData && this.state.userData.sex}><span className="sex">{this.swapSex()}</span><span>{this.state.userData && this.state.userData.age}</span></label>
                    <label className="constellation">{this.state.userData && this.state.userData.constellation}</label>
                    {this.sameHobbiesNumCreate()}
                </div>
                <label className="industry">{this.state.userData && this.state.userData.industry}</label>
            </div>
        )
    }
}

export default slideUser;