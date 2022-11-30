import React from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  }
  return (
    <Menu color="grey" inverted>
      <Menu.Item>
        <img className="logoNavbar" src="../icon.png" />
      </Menu.Item>
      <Menu.Item
          name='home'
          onClick={handleHomeClick}
        >
          Home
        </Menu.Item>
    </Menu>
  );
};

export default NavBar;
