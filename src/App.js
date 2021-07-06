import './index.css'
import { Component } from 'react'
import Logo from './assets/logo/logo1.png'
import BackOfficeApp from './Extends/BackOfficeApp'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
    render() {
        return ( < BrowserRouter >
            <BackOfficeApp logo = { Logo } /> </BrowserRouter>            
        );
    }
}

export default App;