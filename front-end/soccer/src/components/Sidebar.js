// sidebar.js

import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default function Sidebar(props) {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="Field 1" href="/">
        Laravel
      </a>

      <a className="Field 2" href="/">
        Angular
      </a>

      <a className="Field 3" href="/">
        React
      </a>

      <a className="Field 4" href="/">
        Vue
      </a>

      <a className="Field 5" href="/">
        Node
      </a>
    </Menu>
  );
};
