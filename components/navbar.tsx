import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { BellOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import router from 'next/router';

const { Header } = Layout;

const NavBar = () => {
    const [current, setCurrent] = useState('mail');

    useEffect(() => {
        if(current === 'logout') {
            router.replace('/')
        }
    }, [current])

    const onClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        { icon: <HomeOutlined />, label: 'Home', key: 'mail'},
        { icon: <LogoutOutlined />, label: 'Sair', key: 'logout' }
    ];

    return (
        <>
        <Menu  style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </>
    );
};

export default NavBar;
