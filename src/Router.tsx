import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Home from './Pages/Home'
import Chat from './Pages/Chat'

export default function Router() {

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/chat" component={Chat}/>
            </Switch>
        </BrowserRouter>
    )

}