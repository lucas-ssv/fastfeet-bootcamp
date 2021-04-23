import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    background: #fff;
    padding: 12px 30px;

    div {
        display: flex;
        flex-direction: column;

        strong {
            color: #666;
        }

        button {
            background: none;
            border: 0;
            color: #de3b3b;
            margin: 10px 0 0;
        }
    }
`;

export const Menu = styled.nav`
    display: flex;

    a {
        display: flex;
        align-items: center;
    }

    img {
        padding: 0 30px 0 0;
        border-right: 1px solid #ddd;
    }

    ul {
        display: flex;
        align-items: center;

        a:first-child {
            margin-left: 30px;
        }

        a {
            margin: 0 12px;

            li {
                font-size: 14px;
                color: #999;
                font-weight: bold;
            }
        }
    }
`;
