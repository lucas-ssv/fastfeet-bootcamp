import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #fff;
`;

export const Background = styled.View`
    height: 100px;
    background: #7d40e7;
`;

export const OrderTextId = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    position: relative;
    bottom: 80px;
    color: #fff;
    margin-bottom: 5px;
`;

export const ListOrderProblems = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    padding: 0 20px;
    position: relative;
    bottom: 80px;
`;

export const OrderProblem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border: 1px solid #0000001a;
    border-radius: 4px;
    margin: 8px 0;
    padding: 20px;
`;

export const Description = styled.Text`
    flex: 1;
    font-size: 16px;
    color: #999;
    line-height: 22px;
    margin-right: 10px;
`;

export const Date = styled.Text`
    font-size: 12px;
    color: #c1c1c1;
`;
