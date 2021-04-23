import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 1200px;
    margin: 30px auto;

    .visible {
        display: flex;
    }

    h1 {
        font-size: 24px;
        color: #444;
    }

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0 0;

        input {
            width: 237px;
            height: 36px;
            border: 1px solid #ddd;
            padding: 5px 25px;
            border-radius: 4px;
            color: #444;
            font-size: 14px;

            &::placeholder {
                color: #999;
            }
        }

        a {
            display: flex;
            align-items: center;
            border: 0;
            background: #7d40e7;
            color: #fff;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 4px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#7d40e7')};
            }

            svg {
                margin-right: 5px;
            }
        }
    }
`;

export const TableRecipient = styled.table`
    width: 100%;
    border-spacing: 0 20px;

    th {
        font-size: 16px;
        text-align: left;
    }

    tbody tr {
        background: #fff;

        td {
            color: #666;
            padding: 15px 0;
            margin: 10px 0;
            font-size: 16px;

            &:first-child {
                padding-left: 30px;
            }

            &:last-child {
                padding-right: 30px;
            }

            > button {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                background: none;
                border: 0;
            }
        }
    }
`;

export const Actions = styled.section`
    width: 150px;
    position: absolute;
    display: none;
    flex-direction: column;
    background: #fff;
    border: 1px solid #eee;
    padding: 15px;
    border-radius: 4px;

    &::before {
        content: '';
        position: absolute;
        left: calc(50% - 10px);
        top: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
    }

    button,
    a {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: none;
        font-size: 16px;
        border: 0;
        border-bottom: 1px solid #eee;
        color: #999;
        padding: 8px 0;

        &:last-child {
            border: 0;
        }

        svg {
            margin-right: 5px;
        }
    }
`;
