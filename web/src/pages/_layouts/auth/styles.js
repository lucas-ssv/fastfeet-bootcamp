import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #7d40e7;

    div {
        max-width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;
        border-radius: 4px;
        padding: 50px 30px;

        img {
            width: 270px;
            margin: 0 0 30px;
        }

        form {
            width: 100%;
            display: flex;
            flex-direction: column;

            label {
                font-size: 14px;
                color: #444;
                font-weight: bold;
                margin: 12px 0;
            }

            input {
                color: #333;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 10px 14px;
            }

            span {
                color: #ff3333;
                margin: 5px 0 0;
            }

            button {
                border: 0;
                background: #7d40e7;
                color: #fff;
                border-radius: 4px;
                font-weight: bold;
                padding: 12px;
                margin: 12px 0 0;
                transition: background 0.2s;

                &:hover {
                    background: ${darken(0.03, '#7d40e7')};
                }
            }
        }
    }
`;
