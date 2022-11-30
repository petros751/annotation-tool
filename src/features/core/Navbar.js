import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  }
  return (
    <Menu color="grey" inverted data-testid='navbar'>
      <Menu.Item>
        <img alt="logo" data-testid='img' className="logoNavbar" src="../logo192.png" />
      </Menu.Item>
      <Menu.Item
          name='home'
          onClick={handleHomeClick}
          data-testid='home'
        >
          Home
        </Menu.Item>
    </Menu>
  );
};

export default NavBar;
