import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectCoins from "../hooks/useSelectCoins";
import Errors from "./Errors";
import { coins } from "../data/data";

const InputStyled = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    margin-top: 30px;
    padding: 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &::hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`;
const Form = ({ setCoinsSelect }) => {
    const [cryptos, SetCryptos] = useState([]);
    const [error, SetError] = useState(false);

    const [coinState, SelectCoins] = useSelectCoins("Choose a coin", coins);
    const [cryptoState, SelectCrypto] = useSelectCoins(
        "Choose a crypto",
        cryptos
    );

    useEffect(() => {
        const requestAPI = async () => {
            const url =
                "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const result = await fetch(url).then((response) => response.json());

            const arrayCryptos = result.Data.map((crypto) => {
                const obj = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName,
                };
                return obj;
            });
            SetCryptos(arrayCryptos);
        };
        requestAPI();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if ([coinState, cryptoState].includes("" || undefined)) {
            SetError(true);
            return;
        }
        SetError(false);
        setCoinsSelect({ coinState, cryptoState });
    };
    return (
        <>
            {error && <Errors>Select both coins</Errors>}
            <form onSubmit={handleFormSubmit}>
                <SelectCoins />
                <SelectCrypto />
                <InputStyled type="submit" value="Rate" />
            </form>
        </>
    );
};

export default Form;
