import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})`
    flex: 1;
    background: #fff;
`;

export const Background = styled.View`
    height: 100px;
    background: #7d40e7;
`;

export const Form = styled.View`
    align-self: stretch;
    position: relative;
    bottom: 80px;
    padding: 0 20px;
`;

export const TextareaProblem = styled.TextInput.attrs({
    textAlignVertical: 'top',
    placeholderTextColor: '#999'
})`
    font-size: 16px;
    background: #fff;
    color: #666;
    border-radius: 4px;
    border: 1px solid #0000001a;
    padding: 20px;
`;

export const SubmitButton = styled(Button)`
    background: #7d40e7;
    margin-top: 15px;
`;
