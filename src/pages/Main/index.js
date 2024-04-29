import { useState, useCallback, useEffect } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import api from "../../services/api";


export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);

    function handleInputChange(e){
        setNewRepo(e.target.value);
        setAlertMsg(null);
    }

    // Did Mount
    useEffect(()=>{
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setRepositories(JSON.parse(repoStorage));
        }
    },[]);

    // Update
    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositories));
    }, [repositories]);
    
    // Usando o useCallback porque ha a manipulacao de estados dentro da funcao
    const handleSubmit = useCallback((e)=>{
        e.preventDefault();

        async function submit(){
            setLoading(true);
            setAlertMsg(null);

            try {

                if(newRepo===''){
                    throw new Error('É necessário indicar um repositório');
                }

                const hasRepo = repositories.find(repo => repo.name === newRepo);
                if(hasRepo){
                    throw new Error('Repositório duplicado');
                }
                
                const response = await api.get(`repos/${newRepo}`);
        
                const data = {
                    name: response.data.full_name,
                }
        
                setRepositories([...repositories, data]);
        
                setNewRepo('');
        
                console.log(repositories);
                
            } catch (error) {
                setAlertMsg(error);
                console.log(error);
            } finally{
                
                setLoading(false);
            }

        }

        submit();

    }, [newRepo, repositories]);

    const handleDelete = useCallback((repoName)=>{
        const findRepoWithoutRepo = repositories.filter(r => r.name!==repoName);
        setRepositories(findRepoWithoutRepo);
    },[repositories]);

    return (
        <div>
            <Container>
                <h1>
                    <FaGithub size={25} />
                    Meus repositórios
                </h1>

                <Form onSubmit={handleSubmit} error={alertMsg}>
                    <input 
                        type="text" 
                        placeholder="Adicionar Repositorios" 
                        value={newRepo}
                        onChange={handleInputChange}
                    />

                    <SubmitButton loading={loading ? 1 : 0} >
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />

                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repo => (
                        <li key={repo.name} >
                            <span>
                                <DeleteButton onClick={()=>handleDelete(repo.name)} >
                                    <FaTrash size={14} />
                                </DeleteButton>
                                {repo.name}
                            </span>
                            <Link to={`/repository/${encodeURIComponent(repo.name)}`} >
                                <FaBars size={20} />
                            </Link>
                        </li>
                    ))}
                </List>

            </Container>
        </div>
    );
}