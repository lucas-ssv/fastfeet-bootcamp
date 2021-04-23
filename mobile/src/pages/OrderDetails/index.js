import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';

import {
    Container,
    Background,
    Order,
    InfoOrder,
    View,
    ViewText,
    BlockInfo,
    Title,
    Text,
    ViewDate,
    OrderActions,
    ProblemButton,
    ViewButton,
    ButtonText,
} from './styles';

export default function OrderDetails({ navigation }) {
    let { order } = navigation.state.params;

    order = {
        ...order,
        formattedDate_start: order.start_date
            ? format(parseISO(order.start_date), "dd'/'MM'/'yyyy")
            : null,
        formattedDate_end: order.end_date
            ? format(parseISO(order.end_date), "dd'/'MM'/'yyyy")
            : null,
    };

    return (
        <Container>
            <Background />

            <Order>
                <InfoOrder>
                    <View>
                        <Icon name="local-shipping" size={20} color="#7d40e7" />
                        <ViewText>Informações da entrega</ViewText>
                    </View>

                    <BlockInfo>
                        <Title>DESTINATÁRIO</Title>
                        <Text>{order.recipient.name}</Text>
                    </BlockInfo>
                    <BlockInfo>
                        <Title>ENDEREÇO DE ENTREGA</Title>
                        <Text>
                            {order.recipient.address}, {order.recipient.number},{' '}
                            {order.recipient.city} - {order.recipient.state},{' '}
                            {order.recipient.zipcode}
                        </Text>
                    </BlockInfo>
                    <BlockInfo>
                        <Title>PRODUTO</Title>
                        <Text>{order.product}</Text>
                    </BlockInfo>
                </InfoOrder>

                <InfoOrder>
                    <View>
                        <Icon name="event" size={20} color="#7d40e7" />
                        <ViewText>Situação da entrega</ViewText>
                    </View>

                    <BlockInfo>
                        <Title>STATUS</Title>
                        <Text>{order.status}</Text>
                    </BlockInfo>

                    <ViewDate>
                        <BlockInfo>
                            <Title>DATA DE RETIRADA</Title>
                            <Text>
                                {order.start_date
                                    ? order.formattedDate_start
                                    : '--/--/--'}
                            </Text>
                        </BlockInfo>
                        <BlockInfo>
                            <Title>DATA DE ENTREGA</Title>
                            <Text>
                                {order.end_date
                                    ? order.formattedDate_end
                                    : '--/--/--'}
                            </Text>
                        </BlockInfo>
                    </ViewDate>
                </InfoOrder>

                <OrderActions>
                    <ProblemButton>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ReportProblem', { order })
                            }
                        >
                            <ViewButton>
                                <Icon
                                    name="highlight-off"
                                    size={22}
                                    color="#e74040"
                                />
                                <ButtonText>Informar problema</ButtonText>
                            </ViewButton>
                        </TouchableOpacity>
                    </ProblemButton>

                    <ProblemButton>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ViewProblem', { order })
                            }
                        >
                            <ViewButton>
                                <Icon
                                    name="info-outline"
                                    size={22}
                                    color="#e7ba40"
                                />
                                <ButtonText>Visualizar problema</ButtonText>
                            </ViewButton>
                        </TouchableOpacity>
                    </ProblemButton>

                    <ProblemButton>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ConfirmDelivery', {
                                    order,
                                })
                            }
                        >
                            <ViewButton>
                                <Icon
                                    name="check-circle-outline"
                                    size={22}
                                    color="#7d40e7"
                                />
                                <ButtonText>Confirmar entrega</ButtonText>
                            </ViewButton>
                        </TouchableOpacity>
                    </ProblemButton>
                </OrderActions>
            </Order>
        </Container>
    );
}

OrderDetails.navigationOptions = ({ navigation }) => ({
    title: 'Detalhes da encomenda',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={25} color="#fff" />
        </TouchableOpacity>
    ),
});
