import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import * as Yup from 'yup';

import { registerOrderRequest } from '~/store/modules/user/actions';

import { Container, Register } from './styles';
import Select from '../AsyncSelect';

import history from '~/services/history';

const schema = Yup.object().shape({
    recipient_id: Yup.number().required('O campo destinatário é obrigatório'),
    deliveryman_id: Yup.number().required('O campo entregador é obrigatório'),
    product: Yup.string().required('O campo produto é obrigatório'),
});

function RegisterOrder() {
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(registerOrderRequest(data));
    }

    return (
        <Container>
            <div>
                <h1>Cadastro de encomendas</h1>

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
                <Form schema={schema} id="register" onSubmit={handleSubmit}>
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

export default RegisterOrder;
