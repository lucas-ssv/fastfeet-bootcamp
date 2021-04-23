import React from 'react';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { Container } from './styles';

import { updateRecipientRequest } from '~/store/modules/user/actions';

import history from '~/services/history';

function UpdateRecipient({ match }) {
    const { id } = match.params;

    const dispatch = useDispatch();
    function handleSubmit(data) {
        dispatch(updateRecipientRequest(data, id));
    }

    return (
        <Container>
            <div>
                <h1>Edição de destinatários</h1>

                <div>
                    <button
                        className="back"
                        type="button"
                        onClick={() => history.push('/recipient')}
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

            <Form id="register" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <p>Nome</p>
                    <Input name="name" placeholder="Ludwig van Beethoven" />
                </label>

                <div>
                    <label htmlFor="address">
                        <p>Rua</p>
                        <Input name="address" placeholder="Rua Beethoven" />
                    </label>

                    <label htmlFor="number">
                        <p>Número</p>
                        <Input type="number" name="number" placeholder="1729" />
                    </label>

                    <label htmlFor="complement">
                        <p>Complemento</p>
                        <Input name="complement" />
                    </label>
                </div>

                <div>
                    <label htmlFor="city">
                        <p>Cidade</p>
                        <Input name="city" placeholder="Diadema" />
                    </label>

                    <label htmlFor="state">
                        <p>Estado</p>
                        <Input name="state" placeholder="São Paulo" />
                    </label>

                    <label htmlFor="zipcode">
                        <p>CEP</p>
                        <Input name="zipcode" placeholder="09960-580" />
                    </label>
                </div>
            </Form>
        </Container>
    );
}

export default UpdateRecipient;
