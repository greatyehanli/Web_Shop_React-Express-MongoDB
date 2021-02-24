import React, { Component } from 'react'
import NavBar from './containers/NavBar'
import SideMenu from './containers/SideMenu'

export default class App extends Component {

  render() {
    return (
      <div className='app'>
      {/* 
        For all platform
          1.Navbar 
          2.homepage component
          3.products display component
            Child components:
              - item display component
          4.Shopping Cart Component
        
        For mobile:
          1.sideMenu
          2.Background

        */}
        
        <NavBar/>
        <SideMenu/>
      </div>
    )
  }
}
