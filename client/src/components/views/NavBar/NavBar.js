import React, { useState } from 'react';

import RightMenu from './Section/RightMenu';
import { Drawer, Button } from 'antd';
import './Section/Navbar.css';


function NavBar() {
  const [visible, setVisible] = useState(false)
  
  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed-top', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Blind Chatting</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">

        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >

        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >

          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar