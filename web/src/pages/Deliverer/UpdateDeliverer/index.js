import React from 'react';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { Container } from './styles';

import AvatarInput from '../AvatarInput';

import { updateDelivererRequest } from '~/store/modules/user/actions';

import history from '~/services/history';

const schema = Yup.object().shape({
    avatar_id: Yup.number().required('O campo avatar é obrigatório'),
    email: Yup.string().required('O campo email é obrigatório'),
});

function UpdateDeliverer({ match }) {
    const { id } = match.params;

    const dispatch = useDispatch();

    function handleSubmit({ name, email, avatar_id }) {
        dispatch(updateDelivererRequest(name, email, avatar_id, id));
    }

    return (
        <Container>
            <div>
                <h1>Edição de entregadores</h1>

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

export default UpdateDeliverer;
