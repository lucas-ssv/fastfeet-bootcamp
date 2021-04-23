import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';
import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, TableDeliverer, Actions } from './styles';

import api from '~/services/api';

import { deleteDelivererRequest } from '~/store/modules/user/actions';

function Deliverer() {
    const [deliverers, setDeliverers] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadDeliverers() {
            const response = await api.get('/deliverer', {
                params: { q: search },
            });

            setDeliverers(response.data);
        }

        loadDeliverers();
    }, [search]);

    function handleActionsVisible(id) {
        const action = document.querySelectorAll('.actions');

        action[id].classList.toggle('visible');
    }

    function handleDeleteDeliverer(id) {
        const confirmDelete = window.confirm(
            'Tem certeza que deseja excluir este entregador?'
        );

        if (confirmDelete) {
            dispatch(deleteDelivererRequest(id));
        }
    }

    return (
        <Container>
            <h1>Gerenciando entregadores</h1>

            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por entregadores"
                />

                <Link to="/deliverer/register">
                    <AiOutlinePlus color="#fff" size={18} />
                    CADASTRAR
                </Link>
            </div>

            <TableDeliverer>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {deliverers.map((deliverer, index) => (
                        <tr key={deliverer.id}>
                            <td>{deliverer.id}</td>
                            <td>
                                <img
                                    src={deliverer.avatar.url}
                                    alt={deliverer.name}
                                />
                            </td>
                            <td>{deliverer.name}</td>
                            <td>{deliverer.email}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleActionsVisible(index)}
                                >
                                    <FaEllipsisH color="#c6c6c6" size={16} />
                                </button>

                                <Actions className="actions">
                                    <Link
                                        to={`/deliverer/update/${deliverer.id}`}
                                    >
                                        <MdEdit color="#4d85ee" size={15} />
                                        Editar
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteDeliverer(deliverer.id)
                                        }
                                    >
                                        <MdDeleteForever
                                            color="#de3b3b"
                                            size={15}
                                        />
                                        Excluir
                                    </button>
                                </Actions>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableDeliverer>
        </Container>
    );
}

export default Deliverer;
