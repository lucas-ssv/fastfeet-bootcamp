import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background: #fff;
`;

export const Background = styled.View`
    height: 100px;
    background: #7d40e7;
`;

export const GetPhoto = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    background: #0000004d;
    position: absolute;
    bottom: 20px;
    margin: 0 auto;
    border-radius: 40px;
`;

export const ViewImage = styled.View`
    flex: 1;
    position: relative;
    bottom: 80px;
    margin: 0 20px;
`;

export const ImagePreview = styled.Image`
    flex: 1;
    border-radius: 4px;
`;

export const SubmitButton = styled(Button)`
    background: #7d40e7;
    margin-top: 10px;
`;
