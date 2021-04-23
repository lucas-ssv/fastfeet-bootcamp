import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';
import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, TableRecipient, Actions } from './styles';

import api from '~/services/api';

import { deleteRecipientRequest } from '~/store/modules/user/actions';

function Recipient() {
    const [recipients, setRecipients] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadRecipients() {
            const response = await api.get('/recipient', {
                params: { q: search },
            });

            setRecipients(response.data);
        }

        loadRecipients();
    }, [search]);

    function handleActionsVisible(id) {
        const action = document.querySelectorAll('.actions');

        action[id].classList.toggle('visible');
    }

    function handleDeleteRecipient(id) {
        const confirmDelete = window.confirm(
            'Tem certeza que deseja excluir este destinatário?'
        );

        if (confirmDelete) {
            dispatch(deleteRecipientRequest(id));
        }
    }

    return (
        <Container>
            <h1>Gerenciando destinatários</h1>

            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por destinatários"
                />

                <Link to="/recipient/register">
                    <AiOutlinePlus color="#fff" size={18} />
                    CADASTRAR
                </Link>
            </div>

            <TableRecipient>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {recipients.map((recipient, index) => (
                        <tr key={recipient.id}>
                            <td>{recipient.id}</td>
                            <td>{recipient.name}</td>
                            <td>{recipient.address}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleActionsVisible(index)}
                                >
                                    <FaEllipsisH color="#c6c6c6" size={16} />
                                </button>

                                <Actions className="actions">
                                    <Link
                                        to={`/recipient/update/${recipient.id}`}
                                    >
                                        <MdEdit color="#4d85ee" size={15} />
                                        Editar
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteRecipient(recipient.id)
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
            </TableRecipient>
        </Container>
    );
}

export default Recipient;
