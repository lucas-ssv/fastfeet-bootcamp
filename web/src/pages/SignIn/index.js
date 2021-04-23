import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

// import { Container } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string().email().required('O e-mail é obrigatório'),
    password: Yup.string()
        .min(6, 'A senha precisa de 6 ou mais caracteres')
        .required('A senha é obrigatória'),
});

function SignIn() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <>
            <div>
                <img src={logo} alt="FastFeet" />

                <Form schema={schema} onSubmit={handleSubmit}>
                    <label htmlFor="email">SEU E-MAIL</label>
                    <Input type="email" name="email" placeholder="Seu e-mail" />

                    <label htmlFor="password">SUA SENHA</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Sua senha"
                    />

                    <button type="submit">
                        {loading ? 'Carregando...' : 'Entrar no sistema'}
                    </button>
                </Form>
            </div>
        </>
    );
}

export default SignIn;
