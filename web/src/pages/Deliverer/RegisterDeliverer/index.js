import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { Container } from './styles';

import AvatarInput from '../AvatarInput';

import { registerDelivererRequest } from '~/store/modules/user/actions';
import history from '~/services/history';

const schema = Yup.object().shape({
    avatar_id: Yup.number().required('O campo avatar é obrigatório'),
    name: Yup.string().required('O campo nome é obrigatório'),
    email: Yup.string().email().required('O campo e-mail é obrigatório'),
});

function RegisterDeliverer() {
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(registerDelivererRequest(data));
    }

    return (
        <Container>
            <div>
                <h1>Cadastro de entregadores</h1>

                <div>
                    <button
                        className="back"
                        type="button"
                        onClick={() => history.push('/deliverer')}
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
                <AvatarInput name="avatar_id" />

                <label htmlFor="name">Nome</label>
                <Input name="name" placeholder="Digite o seu nome" />

                <label htmlFor="email">Email</label>
                <Input
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                />
            </Form>
        </Container>
    );
}

export default RegisterDeliverer;
