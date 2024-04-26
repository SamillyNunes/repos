import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;

        //significa que quando houver uma margem dentro de uma div, a margem nao vai passar da largura da div, vai tentar
        // se expremer dentro
        box-sizing: border-box;
    }

    html, body, #root{
        min-height: 100%;
    }

    body{
        background-color: #0d2636;
        font-size: 14px;

        // Isso abaixo significa que, caso o navegador tente remover essa propriedade (antialiased - fonte 
        // fica mais bonita, arredondada) o codigo vai tentar obriga-lo a usar
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button{
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    button{
        cursor: pointer;
    }
`;