import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Menu } from './styles';

import logo from '~/assets/images/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

import menuItems from '~/utils/menuItems';

function Header() {
    const [menuItem, setMenuItem] = useState('ENCOMENDAS');

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.profile);

    function handleSignOut() {
        dispatch(signOut());
    }

    function handleClick(item) {
        setMenuItem(item);
    }

    const activeStyle = { color: '#444' };

    return (
        <Container>
            <Menu>
                <Link to="/order">
                    <img src={logo} alt="FastFeet" />
                </Link>

                <ul>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={`/${item.path}`}
                            onClick={() => handleClick(item.name)}
                        >
                            <li
                                style={
                                    item.name === menuItem ? activeStyle : {}
                                }
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </Menu>

            <div>
                <strong>{user.name}</strong>
                <button type="button" onClick={handleSignOut}>
                    sair do sistema
                </button>
            </div>
        </Container>
    );
}

export default Header;
