import { Menu } from 'antd';
import { useState } from "react"
import type { MenuProps } from 'antd';
import { BellOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
    { icon: <HomeOutlined />, label: 'Home', key: 'mail'},
    { icon:  <BellOutlined />, key: 'notify' },
    { icon: <UserOutlined />, label: 'User' , key: 'user'}
  ];

const NavBar = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
  
    return ( <> <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> </> )

  }

export default NavBar;