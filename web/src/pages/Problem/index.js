import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import Modal from 'react-modal';

import { cancelOrderRequest } from '~/store/modules/user/actions';

import { Container, TableProblem, Actions } from './styles';

import api from '~/services/api';

function Problem() {
    const [problems, setProblems] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [problemView, setProblemView] = useState(null);

    const dispatch = useDispatch();

    function openModal(id) {
        const problem = problems.find((problem) => problem.id === id);

        if (problem) {
            setProblemView(problem);
            setIsOpen(true);
        }
    }

    useEffect(() => {
        async function loadProblems() {
            const response = await api.get('/problems');

            setProblems(response.data);
        }

        loadProblems();
    }, []);

    function closeModal() {
        setIsOpen(false);
    }

    function handleActionsVisible(id) {
        const action = document.querySelectorAll('.actions');

        action[id].classList.toggle('visible');
    }

    function handleCancelOrder(id) {
        dispatch(cancelOrderRequest(id));
    }

    return (
        <Container>
            <h1>Problemas na entrega</h1>

            <TableProblem>
                <thead>
                    <tr>
                        <th>Encomenda</th>
                        <th>Problema</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem, index) => (
                        <tr key={problem.id}>
                            <td>{problem.id}</td>
                            <td>{problem.description}</td>
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
                                        onClick={() => openModal(problem.id)}
                                    >
                                        <MdEdit color="#4d85ee" size={15} />
                                        Visualizar
                                    </button>

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
                                        <strong>VISUALIZAR PROBLEMA</strong>
                                        {problemView && (
                                            <p
                                                style={{
                                                    color: '#666',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                {problemView.description}
                                            </p>
                                        )}
                                    </Modal>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCancelOrder(problem.id)
                                        }
                                    >
                                        <MdDeleteForever
                                            color="#de3b3b"
                                            size={15}
                                        />
                                        Cancelar encomenda
                                    </button>
                                </Actions>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableProblem>
        </Container>
    );
}

export default Problem;
