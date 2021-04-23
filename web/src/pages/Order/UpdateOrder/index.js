import React from 'react';
import { useDispatch } from 'react-redux';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';

import { updateOrderRequest } from '~/store/modules/user/actions';

import { Container, Register } from './styles';
import Select from '../AsyncSelect';

import history from '~/services/history';

function UpdateOrder({ match }) {
    const dispatch = useDispatch();

    const { id } = match.params;

    function handleSubmit(data) {
        dispatch(updateOrderRequest(data, id));
    }

    return (
        <Container>
            <div>
                <h1>Edição de encomendas</h1>

                <div>
                    <button
                        className="back"
                        type="button"
                        onClick={() => history.push('/order')}
                    >
                        <FaChevronLeft color="#fff" size={16} />
                        VOLTAR
                    </button>
                    <button className="save" type="submit" form="register">
                        <FaCheck color="#fff" size={16} />
                        SALVAR
                    </button>
                </div>
            </div>

            <Register>
                <Form id="register" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="recipient">
                            <p>Destinatário</p>
                            <Select name="recipient_id" request="recipient" />
                        </label>
                        <label htmlFor="deliverer">
                            <p>Entregador</p>
                            <Select name="deliveryman_id" request="deliverer" />
                        </label>
                    </div>

                    <label htmlFor="product">
                        <p>Nome do produto</p>
                        <Input
                            name="product"
                            placeholder="Digite o nome do produto"
                        />
                    </label>
                </Form>
            </Register>
        </Container>
    );
}

export default UpdateOrder;
