import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import logo from "./img/imagen-criptos.png";
import Form from "./components/Form";
import Results from "./components/Results";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Logo = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
`;
const Heading = styled.h1`
    font-family: "Lato";
    color: #fff;
    font-weight: 700;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    &::after {
        content: "";
        width: 100px;
        height: 6px;
        background-color: #fff;
        display: block;
        margin: 10px auto 0 auto;
    }
`;

function App() {
    const [coinsSelect, setCoinsSelect] = useState({});
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(coinsSelect).length > 0) {
            const rateCryto = async () => {
                setLoading(true);
                const { coinState, cryptoState } = coinsSelect;
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoState}&tsyms=${coinState}`;

                const result = await fetch(url).then((response) =>
                    response.json()
                );
                setResult(result.DISPLAY[cryptoState][coinState]);
                setLoading(false);
            };
            rateCryto();
        }
    }, [coinsSelect]);

    return (
        <Contenedor>
            <Logo src={logo} alt="Logo" />
            <div>
                <Heading>Check your Crypto!</Heading>
                <Form setCoinsSelect={setCoinsSelect} />
                {loading && <Spinner />}
                {result.PRICE && <Results result={result} />}
            </div>
        </Contenedor>
    );
}

export default App;
