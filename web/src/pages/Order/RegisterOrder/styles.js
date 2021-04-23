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
`;

export const Register = styled.div`
    background: #fff;
    padding: 24px;
    border-radius: 4px;
    margin: 30px 0 0;

    form {
        width: 100%;

        p {
            color: #444;
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 10px;
        }

        > div {
            display: flex;
            justify-content: space-between;
            margin: 0 0 15px;

            label {
                width: 100%;

                &:first-child {
                    margin-right: 30px;
                }

                .css-2b097c-container {
                    width: 100%;
                }

                .css-1pahdxg-control {
                    width: 100%;
                }

                .css-yk16xz-control {
                    width: 100%;
                    border-color: #ddd;
                }
            }
        }

        input {
            width: 100%;
            border: 1px solid #ddd;
            color: #444;
            border-radius: 4px;
            padding: 10px;

            &::placeholder {
                color: #999;
            }
        }
    }
`;
