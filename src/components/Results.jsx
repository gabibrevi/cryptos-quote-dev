import styled from "@emotion/styled";

const Container = styled.div`
    color: #fff;
    font-family: "Lato", sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`;

const Img = styled.img`
    display: block;
    width: 120px;
`;

const Text = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`;

const Price = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`;

const Results = ({ result }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
        result;
    return (
        <Container>
            <Img
                src={`https://cryptocompare.com/${IMAGEURL}`}
                alt="image crypto"
            />
            <div>
                <Price>
                    Price: <span>{PRICE}</span>
                </Price>
                <Text>
                    Today highest price: <span>{HIGHDAY}</span>
                </Text>
                <Text>
                    Today lowest price: <span>{LOWDAY}</span>
                </Text>
                <Text>
                    Variation last 24hs: <span>{CHANGEPCT24HOUR}</span>
                </Text>
                <Text>
                    Last update: <span>{LASTUPDATE}</span>
                </Text>
            </div>
        </Container>
    );
};

export default Results;
