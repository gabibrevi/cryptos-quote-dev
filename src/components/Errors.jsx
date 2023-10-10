import styled from "@emotion/styled";

const Texto = styled.div`
    background-color: red;
    color: white;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    text-align: center;
`;

const Errors = ({ children }) => {
    return <Texto>{children}</Texto>;
};

export default Errors;
