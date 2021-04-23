import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import {
    Container,
    Background,
    OrderTextId,
    ListOrderProblems,
    OrderProblem,
    Description,
    Date,
} from './styles';

export default function ViewProblem({ navigation }) {
    const { order } = navigation.state.params;
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        async function loadProblems() {
            const response = await api.get(`/delivery/${order.id}/problems`);

            const data = response.data.map((problem) => ({
                ...problem,
                formattedDate_start: format(
                    parseISO(problem.created_at),
                    "dd'/'MM'/'yyyy"
                ),
            }));

            setProblems(data);
        }

        loadProblems();
    }, []);

    return (
        <Container>
            <Background />

            <OrderTextId>Encomenda {order.id}</OrderTextId>
            <ListOrderProblems
                data={problems}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <OrderProblem key={item.id}>
                        <Description>{item.description}</Description>
                        <Date>{item.formattedDate_start}</Date>
                    </OrderProblem>
                )}
            />
        </Container>
    );
}

ViewProblem.navigationOptions = ({ navigation }) => ({
    title: 'Visualizar problemas',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={25} color="#fff" />
        </TouchableOpacity>
    ),
});
