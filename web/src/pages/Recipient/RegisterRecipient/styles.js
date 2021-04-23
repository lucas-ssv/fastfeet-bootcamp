import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 1200px;
    margin: 30px auto;

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 24px;
            color: #444;
        }

        .back {
            background: #cccccc;

            &:hover {
                background: ${darken(0.03, '#cccccc')};
            }
        }

        .save {
            background: #7d40e7;

            &:hover {
                background: ${darken(0.03, '#7d40e7')};
            }
        }

        button {
            display: flex;
            align-items: center;
            border-radius: 4px;
            border: 0;
            padding: 12px 24px;
            color: #fff;
            font-weight: bold;
            transition: background 0.2s;

            &:first-child {
                margin-right: 15px;
            }

            svg {
                margin-right: 5px;
            }
        }
    }

    span {
        color: #ff3333;
        margin: 0 0 10px;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 24px;
        border-radius: 4px;
        margin: 30px 0 0;

        label {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &:nth-child(2n) {
                margin: 0 15px;
            }

            p {
                color: #444;
                font-size: 14px;
                font-weight: bold;
            }

            input {
                width: 100%;
                border: 1px solid #ddd;
                color: #444;
                border-radius: 4px;
                padding: 10px;
                margin: 10px 0;

                &::placeholder {
                    color: #999;
                }
            }
        }
    }
`;
