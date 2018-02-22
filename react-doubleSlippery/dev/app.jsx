/**
 * Created by 666 on 2017/5/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import App from './components/index.jsx';
import "./common/stylus/Main.styl";
import "./common/js/MetaHandler";

ReactDOM.render((
    <Router history="BrowserRouter">
        <div className="home-box">
            <Route exact path='/'component={App} />
        </div>
    </Router>
),document.getElementById('content'));