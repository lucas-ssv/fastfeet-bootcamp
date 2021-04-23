import styled from 'styled-components/native';

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

export const Order = styled.View`
    position: relative;
    bottom: 70px;
    margin: 0 20px;
`;

export const InfoOrder = styled.View`
    background: #fff;
    border: 1px solid #0000001a;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 10px;
`;

export const View = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ViewText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #7d40e7;
    margin-left: 10px;
`;

export const BlockInfo = styled.View`
    margin: 8px 0;
`;

export const Title = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #999;
`;

export const Text = styled.Text`
    font-size: 14px;
    color: #666;
`;

export const ViewDate = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const OrderActions = styled.View`
    flex-direction: row;
    background: #f8f9fd;
    border: 1px solid #0000001a;
    border-radius: 4px;
`;

export const ProblemButton = styled.View`
    flex: 1;
    padding: 16px;
`;

export const ViewButton = styled.View`
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-size: 12px;
    text-align: center;
    color: #999;
`;
