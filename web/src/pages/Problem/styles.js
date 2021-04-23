import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1200px;
    margin: 30px auto;

    .visible {
        display: flex;
    }

    h1 {
        font-size: 24px;
        color: #444;
        margin: 0 0 30px;
    }
`;

export const TableProblem = styled.table`
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

            img {
                border-radius: 50%;
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
    width: 190px;
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
        left: calc(50% + 10px);
        top: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
    }

    button {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: none;
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
