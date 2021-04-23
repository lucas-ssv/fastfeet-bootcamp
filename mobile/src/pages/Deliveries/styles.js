import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #fff;
    padding: 30px 20px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Info = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image`
    height: 68px;
    width: 68px;
    border-radius: 34px;
    margin-right: 10px;
`;

export const Title = styled.View`
    flex-direction: column;
    justify-content: center;
`;

export const Text = styled.Text`
    font-size: 12px;
    color: #666;
`;

export const Name = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #444;
`;

export const HeaderDeliveries = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 10px;
`;

export const Status = styled.View`
    flex-direction: row;
`;

export const StatusText = styled.Text`
    font-size: 13px;
    color: #999;
    margin: 0 5px;
`;

export const ListOrders = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})``;

export const CardOrder = styled.View`
    border: 1px solid #0000001a;
    border-radius: 4px;
    margin-bottom: 15px;
    /* padding: 10px; */
`;

export const Order = styled.View`
    padding: 10px;
`;

export const OrderText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #7d40e7;
    margin-left: 10px;
`;

export const LineStatus = styled.View`
    padding: 0 40px;
    margin-top: 10px;
`;

export const Line = styled.View`
    flex: 1;
    height: 1px;
    background: #7d40e7;
`;

export const CurrentStatus = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ViewTextStatus = styled.View`
    padding: 0 15px;
`;

export const TextStatus = styled.Text`
    width: 60px;
    font-size: 10px;
    color: #999;
    text-align: center;
    margin: 5px 0;
`;

export const InfoOrder = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fd;
    margin-top: 10px;
    padding: 18px;
`;

export const InfoTitle = styled.Text`
    font-size: 10px;
    font-weight: bold;
    color: #999;
`;

export const InfoText = styled.Text`
    font-size: 12px;
    font-weight: bold;
`;

export const ButtonDetails = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: #7d40e7;
`;
