import { useState, useCallback } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";

import { Container, Form, SubmitButton } from "./styles";
import api from "../../services/api";


export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState('');

    function handleInputChange(e){
        setNewRepo(e.target.value);
    }
    
    // Usando o useCallback porque ha a manipulacao de estados dentro da funcao
    const handleSubmit = useCallback((e)=>{
        e.preventDefault();

        async function submit(){
            const response = await api.get(`repos/${newRepo}`);
    
            const data = {
                name: response.data.full_name,
            }
    
            setRepositories([...repositories, data]);
    
            setNewRepo('');
    
            console.log(repositories);
            
        }

        submit();

    }, [newRepo, repositories]);

    return (
        <div>
            <Container>
                <h1>
                    <FaGithub size={25} />
                    Meus repositórios
                </h1>

                <Form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Adicionar Repositorios" 
                        value={newRepo}
                        onChange={handleInputChange}
                    />

                    <SubmitButton>
                        <FaPlus color="#FFF" size={14} />
                    </SubmitButton>
                </Form>
            </Container>
        </div>
    );
}