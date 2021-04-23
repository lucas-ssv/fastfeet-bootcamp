import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { parseISO, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

import {
    Container,
    Header,
    Info,
    Avatar,
    Title,
    Text,
    Name,
    HeaderDeliveries,
    Status,
    StatusText,
    ListOrders,
    CardOrder,
    Order,
    OrderText,
    LineStatus,
    Line,
    CurrentStatus,
    ViewTextStatus,
    TextStatus,
    InfoOrder,
    InfoTitle,
    InfoText,
    ButtonDetails,
} from './styles';

const itemsSearch = [
    { name: 'Pendentes', search: 'Pendente' },
    { name: 'Entregues', search: 'Entregue' },
];

export default function Deliveries({ navigation }) {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [searchItem, setSearchItem] = useState('');

    const profile = useSelector((state) => state.user.profile);

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadOrders() {
            const response = await api.get(`/orders/${profile.id}`, {
                params: { q: search },
            });

            const data = response.data.map((order) => ({
                ...order,
                formattedDate_start: order.start_date
                    ? format(parseISO(order.start_date), "dd'/'MM'/'yyyy")
                    : null,
            }));

            setOrders(data);
        }

        loadOrders();
    }, [search]);

    function handleSignOut() {
        dispatch(signOut());
    }

    function handleChangeStatusOfSearch(name, search) {
        setSearch(search);
        setSearchItem(name);
    }

    const activeStyle = {
        color: '#7d40e7',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    };

    return (
        <Container>
            <Header>
                <Info>
                    <Avatar
                        source={{
                            uri: `http://10.0.2.2:3333/files/${profile.avatar.path}`,
                        }}
                    />

                    <Title>
                        <Text>Bem vindo de volta,</Text>
                        <Name>{profile.name}</Name>
                    </Title>
                </Info>

                <TouchableOpacity onPress={handleSignOut}>
                    <Icon name="exit-to-app" size={24} color="#e74040" />
                </TouchableOpacity>
            </Header>

            <HeaderDeliveries>
                <Name>Entregas</Name>

                <Status>
                    {itemsSearch.map(({ name, search }) => (
                        <TouchableOpacity
                            key={search}
                            onPress={() =>
                                handleChangeStatusOfSearch(name, search)
                            }
                        >
                            <StatusText
                                style={name === searchItem ? activeStyle : {}}
                            >
                                {name}
                            </StatusText>
                        </TouchableOpacity>
                    ))}
                </Status>
            </HeaderDeliveries>

            <ListOrders
                data={orders}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <CardOrder>
                        <Order>
                            <Info>
                                <Icon
                                    name="local-shipping"
                                    size={25}
                                    color="#7d40e7"
                                />
                                <OrderText>Encomenda {item.id}</OrderText>
                            </Info>
                        </Order>

                        <LineStatus>
                            <CurrentStatus>
                                <Icon name="circle" size={12} color="#7d40e7" />
                                <Line />

                                {item.status === 'RETIRADA' ||
                                item.status === 'ENTREGUE' ? (
                                    <Icon
                                        name="circle"
                                        size={12}
                                        color="#7d40e7"
                                    />
                                ) : (
                                    <Icon
                                        name="panorama-fish-eye"
                                        size={12}
                                        color="#7d40e7"
                                    />
                                )}

                                <Line />

                                {item.status === 'ENTREGUE' ? (
                                    <Icon
                                        name="circle"
                                        size={12}
                                        color="#7d40e7"
                                    />
                                ) : (
                                    <Icon
                                        name="panorama-fish-eye"
                                        size={12}
                                        color="#7d40e7"
                                    />
                                )}
                            </CurrentStatus>
                        </LineStatus>

                        <ViewTextStatus>
                            <CurrentStatus>
                                <TextStatus>Aguardando retirada</TextStatus>
                                <TextStatus>Retirada</TextStatus>
                                <TextStatus>Entregue</TextStatus>
                            </CurrentStatus>
                        </ViewTextStatus>

                        <InfoOrder>
                            <View>
                                <InfoTitle>Data</InfoTitle>
                                <InfoText>
                                    {item.start_date
                                        ? item.formattedDate_start
                                        : '--/--/----'}
                                </InfoText>
                            </View>
                            <View>
                                <InfoTitle>Cidade</InfoTitle>
                                <InfoText>{item.recipient.city}</InfoText>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('OrderDetails', {
                                            order: item,
                                        })
                                    }
                                >
                                    <ButtonDetails>Ver detalhes</ButtonDetails>
                                </TouchableOpacity>
                            </View>
                        </InfoOrder>
                    </CardOrder>
                )}
            ></ListOrders>
        </Container>
    );
}

Deliveries.navigationOptions = {
    headerShown: false,
    tabBarLabel: 'Entregas',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="view-headline" size={20} color={tintColor} />
    ),
};
