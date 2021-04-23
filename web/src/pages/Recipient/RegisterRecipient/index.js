import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';

import { registerRecipientRequest } from '~/store/modules/user/actions';

import history from '~/services/history';

const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    address: Yup.string().required('O campo endereço é obrigatório'),
    number: Yup.number().required().typeError('O campo número é obrigatório'),
    complement: Yup.string(),
    city: Yup.string().required('O campo cidade é obrigatório'),
    state: Yup.string().required('O campo estado é obrigatório'),
    zipcode: Yup.string().required('O campo cep é obrigatório'),
});

function RegisterRecipient() {
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(registerRecipientRequest(data));
    }

    return (
        <Container>
            <div>
                <h1>Cadastro de destinatários</h1>

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

            <Form schema={schema} id="register" onSubmit={handleSubmit}>
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

export default RegisterRecipient;
