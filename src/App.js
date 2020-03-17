import React, {useState} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import ShopContent from "./hoc/ShopContent";
import Main from "./pages/main/Main";
import Bucket from "./pages/bucket/Bucket";

function App(props) {

    return (
        <div className="App">
            <Route exact path='/' render={() =>
                <ShopContent component={Main} goal='list'/>
            }>
            </Route>
            <Route path='/bucket' render={() =>
                <ShopContent component={Bucket} goal='bucket'/>
            }>
            </Route>
        </div>
    );
}

export default App;
