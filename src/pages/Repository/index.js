import { useState, useEffect } from "react";

import { Container, Owner, Loading, BackButton,IssuesList } from "./styles";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repository({match}){

    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadRepo(){
            const nomeRepo = decodeURIComponent(match.params.repository);

            const [repoData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
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

        </Container>
    );
}