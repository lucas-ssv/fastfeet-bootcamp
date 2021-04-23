import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.ScrollView`
    background: #fff;
    flex: 1;
    padding: 0 30px;
`;

export const Avatar = styled.Image`
    width: 136px;
    height: 136px;
    border-radius: 68px;
    margin: 30px auto;
`;

export const Info = styled.View`
    margin: 10px 0;
`;

export const Label = styled.Text`
    font-size: 12px;
    color: #666;
`;

export const Text = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #444;
`;

export const LogoutButton = styled(Button)`
    background: #e74040;
    margin-top: 20px;
`;
