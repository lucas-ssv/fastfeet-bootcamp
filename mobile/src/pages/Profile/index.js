import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Avatar, Info, Label, Text, LogoutButton } from './styles';

export default function Profile() {
    let profile = useSelector((state) => state.user.profile);

    profile = {
        ...profile,
        formattedDate: format(parseISO(profile.created_at), "dd'/'MM'/'yyyy"),
    };

    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Avatar
                source={{
                    uri: `http://10.0.2.2:3333/files/${profile.avatar.path}`,
                }}
            />

            <Info>
                <Label>Nome completo</Label>
                <Text>{profile.name}</Text>
            </Info>
            <Info>
                <Label>Email</Label>
                <Text>{profile.email}</Text>
            </Info>
            <Info>
                <Label>Data de cadastro</Label>
                <Text>{profile.formattedDate}</Text>
            </Info>

            <LogoutButton onPress={handleSignOut}>Logout</LogoutButton>
        </Container>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="account-circle" size={20} color={tintColor} />
    ),
};
