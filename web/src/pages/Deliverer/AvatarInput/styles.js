import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        div {
            width: 150px;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border: 1px dashed #ddd;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
                z-index: 1;
                border-radius: 50%;
            }

            strong {
                color: #ddd;
            }

            input {
                display: none;
            }
        }
    }
`;
