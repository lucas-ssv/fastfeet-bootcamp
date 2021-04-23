import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Logo, Form, TextInput, SubmitButton } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
    const [id, setId] = useState('');

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.auth.loading);

    function handleSubmit() {
        dispatch(signInRequest(id));
    }

    return (
        <Container>
            <Logo source={require('~/assets/logo.png')}></Logo>

            <Form>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Informe seu ID de cadastro"
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    value={id}
                    onChangeText={setId}
                />

                <SubmitButton loading={loading} onPress={handleSubmit}>
                    Entrar no sistema
                </SubmitButton>
            </Form>
        </Container>
    );
}
