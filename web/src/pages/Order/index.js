import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns';

import { AiOutlinePlus } from 'react-icons/ai';
import { FaCircle, FaEllipsisH } from 'react-icons/fa';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, TableOrder, Actions } from './styles';

import api from '~/services/api';

import { deleteOrderRequest } from '~/store/modules/user/actions';

import { statusColor } from '~/utils/statusColor';

function Order() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [orderView, setOrderView] = useState(null);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(id) {
        const order = orders.find((order) => order.id === id);

        if (order) {
            setOrderView({
                ...order,
                formattedDate_start: order.start_date
                    ? format(parseISO(order.start_date), "dd'/'MM'/'yyyy")
                    : null,
                formattedDate_end: order.end_date
                    ? format(parseISO(order.end_date), "dd'/'MM'/'yyyy")
                    : null,
            });
            setIsOpen(true);
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadOrders() {
            const response = await api.get('/order', {
                params: { q: search },
            });

            const data = response.data.map((order) => ({
                ...order,
                statusColor: statusColor(order.status),
            }));

            setOrders(data);
        }

        loadOrders();
    }, [search]);

    function handleActionsVisible(id) {
        const action = document.querySelectorAll('.actions');

        action[id].classList.toggle('visible');
    }

    function handleDeleteOrder(id) {
        const confirmDelete = window.confirm(
            'Tem certeza que deseja excluir esta encomenda?'
        );

        if (confirmDelete) {
            dispatch(deleteOrderRequest(id));
        }
    }

    return (
        <Container>
            <h1>Gerenciando encomendas</h1>

            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por encomendas"
                />

                <Link to="/order/register">
                    <AiOutlinePlus color="#fff" size={18} />
                    CADASTRAR
                </Link>
            </div>

            <TableOrder>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Destinatário</th>
                        <th>Entregador</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.recipient.name}</td>
                            <td>
                                <div>
                                    <img
                                        src={
                                            order.deliveryman.avatar.url ||
                                            'https://images.unsplash.com/photo-1602620502036-e52519d58d92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&h=35&w=35&q=80'
                                        }
                                        alt="avatar"
                                    />
                                    {order.deliveryman.name}
                                </div>
                            </td>
                            <td>{order.recipient.city}</td>
                            <td>{order.recipient.state}</td>
                            <td>
                                <div
                                    className="status"
                                    statustype={order.statusColor.type}
                                >
                                    <FaCircle
                                        color={order.statusColor.color}
                                        size={10}
                                    />
                                    <p>{order.status}</p>
                                </div>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleActionsVisible(index)}
                                >
                                    <FaEllipsisH color="#c6c6c6" size={16} />
                                </button>

                                <Actions className="actions">
                                    <button
                                        type="button"
                                        onClick={() => openModal(order.id)}
                                    >
                                        <MdRemoveRedEye
                                            color="#8e5be8"
                                            size={15}
                                        />
                                        Visualizar
                                    </button>

                                    {orderView && (
                                        <Modal
                                            isOpen={modalIsOpen}
                                            ariaHideApp={false}
                                            onRequestClose={closeModal}
                                            style={{
                                                content: {
                                                    top: '50%',
                                                    left: '50%',
                                                    right: 'auto',
                                                    bottom: 'auto',
                                                    marginRight: '-50%',
                                                    transform:
                                                        'translate(-50%, -50%)',
                                                    border: 0,
                                                    width: '450px',
                                                },
                                                overlay: {
                                                    position: 'fixed',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background:
                                                        'rgba(0, 0, 0, 0.2)',
                                                },
                                            }}
                                            contentLabel="Example Modal"
                                        >
                                            <strong style={{ color: '#444' }}>
                                                Informações da encomenda
                                            </strong>
                                            <p
                                                style={{
                                                    margin: '5px 0',
                                                    color: '#666',
                                                }}
                                            >
                                                {orderView.recipient.address},{' '}
                                                {orderView.recipient.number}
                                            </p>
                                            <p
                                                style={{
                                                    margin: '5px 0',
                                                    color: '#666',
                                                }}
                                            >
                                                {orderView.recipient.city} -{' '}
                                                {orderView.recipient.state}
                                            </p>
                                            <p
                                                style={{
                                                    margin: '5px 0',
                                                    color: '#666',
                                                }}
                                            >
                                                {orderView.recipient.zipcode}
                                            </p>
                                            <hr
                                                style={{
                                                    margin: '5px 0',
                                                    border: '1px solid #eee',
                                                }}
                                            />

                                            <strong style={{ color: '#444' }}>
                                                Datas
                                            </strong>
                                            <div style={{ margin: '5px 0' }}>
                                                <strong
                                                    style={{ color: '#444' }}
                                                >
                                                    Retirada:{' '}
                                                </strong>
                                                <span style={{ color: '#666' }}>
                                                    {
                                                        orderView.formattedDate_start
                                                    }
                                                </span>
                                            </div>
                                            <div style={{ margin: '5px 0' }}>
                                                <strong
                                                    style={{ color: '#444' }}
                                                >
                                                    Entrega:{' '}
                                                </strong>
                                                <span style={{ color: '#666' }}>
                                                    {
                                                        orderView.formattedDate_end
                                                    }
                                                </span>
                                            </div>
                                            <hr
                                                style={{
                                                    margin: '5px 0',
                                                    border: '1px solid #eee',
                                                }}
                                            />
                                            <strong
                                                style={{
                                                    display: 'block',
                                                    color: '#444',
                                                }}
                                            >
                                                Assinatura do destinatário
                                            </strong>
                                            {orderView.signature && (
                                                <img
                                                    style={{
                                                        display: 'flex',
                                                        width: '234px',
                                                        margin: '10px auto',
                                                    }}
                                                    src={
                                                        orderView.signature.url
                                                    }
                                                    alt="Assinatura"
                                                />
                                            )}
                                        </Modal>
                                    )}

                                    <Link to={`/order/update/${order.id}`}>
                                        <MdEdit color="#4d85ee" size={15} />
                                        Editar
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteOrder(order.id)
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
            </TableOrder>
        </Container>
    );
}

export default Order;
