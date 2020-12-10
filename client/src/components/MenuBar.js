import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar() {
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)

  const [activeItem, setactiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setactiveItem(name)

    return (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
    )
}

export default MenuBar