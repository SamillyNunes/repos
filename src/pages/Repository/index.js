import { useState, useEffect } from "react";

import { Container, Owner, Loading, BackButton,IssuesList, PageActions, IssueStatusList } from "./styles";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repository({match}){

    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [issueStatus, setIssueStatus] = useState('open');

    useEffect(()=>{
        async function loadRepo(){
            const repoName = decodeURIComponent(match.params.repository);

            const [repoData, issuesData] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: 'open',
                        per_page:5
                    }
                }),
            ]);

            setRepository(repoData.data);
            setIssues(issuesData.data);

            setLoading(false);

        }

        loadRepo();
    },[match.params.repository]);

    useEffect(()=>{
        async function loadIssues(){
            const repoName = decodeURIComponent(match.params.repository);

            const response = await api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: issueStatus,
                    page, // como o nome e o valor sao iguais, pode passar assim
                    per_page: 5,
                }
            });

            setIssues(response.data);

        }

        loadIssues();
    }, [match.params.repository, page, issueStatus]);

    function handlePage(action){
        if(page===1 && action ==='back') return;

        const nextPage = action === 'back' ? page-1 : page+1;
        setPage(nextPage);
    }

    if(loading){
        return (
            <Loading>
                <h1> Carregando... </h1>
            </Loading>
        );
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30} />
            </BackButton>

            <Owner>
                <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                <h1> {repository.name} </h1>
                <p> {repository.description} </p>
            </Owner>

            <IssuesList>

                <IssueStatusList>
                    <button type="button" onClick={()=>setIssueStatus('open')} >Abertas</button>
                    <button type="button" onClick={()=>setIssueStatus('closed')} >Fechadas</button>
                    <button type="button" onClick={()=>setIssueStatus('all')} >Todas</button>
                </IssueStatusList>
                
                {issues.map(issue=>(
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />

                        <div>
                            <strong>
                                <a href={issue.html_url}> {issue.title} </a>
                            </strong> <br/>
                            
                            {issue.labels.map(label => (
                                <span key={String(label.id)} > {label.name} </span>
                            ))}

                            <p> {issue.user.login} </p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            {issues.length > 0 && (
                <PageActions>
                    <button 
                        type="button" 
                        onClick={()=>handlePage('back')} 
                        disabled={page<2}
                    >
                        Voltar
                    </button>
                    <button type="button" onClick={()=>handlePage('next')} >Próxima</button>
                </PageActions>
            )}

        </Container>
    );
}