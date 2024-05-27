import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { BellOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const NavBar = () => {
    const [current, setCurrent] = useState('mail');

    const onClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        { icon: <HomeOutlined />, label: 'Home', key: 'mail'},
        { icon: <BellOutlined />, key: 'notify' },
    ];

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ flex: 1 }} />
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={[{ icon: <UserOutlined />, label: 'User', key: 'user' }]} />
        </Header>
    );
};

export default NavBar;
