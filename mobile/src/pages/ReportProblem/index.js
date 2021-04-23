import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import { reportProblemSuccess } from '~/store/modules/user/actions';

import {
    Container,
    Background,
    Form,
    TextareaProblem,
    SubmitButton,
} from './styles';

export default function ReportProblem({ navigation }) {
    const { order } = navigation.state.params;
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(reportProblemSuccess(order.id, description));
    }

    return (
        <Container>
            <Background />

            <Form>
                <TextareaProblem
                    autoCorrect={false}
                    autoCapitalize="none"
                    multiline={true}
                    placeholder="Inclua aqui o problema que ocorreu na entrega."
                    numberOfLines={15}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    value={description}
                    onChangeText={setDescription}
                />

                <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
            </Form>
        </Container>
    );
}

ReportProblem.navigationOptions = ({ navigation }) => ({
    title: 'Informar problema',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={25} color="#fff" />
        </TouchableOpacity>
    ),
});
