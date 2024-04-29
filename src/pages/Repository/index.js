import { useState, useEffect } from "react";

import { Container } from "./styles";
import api from "../../services/api";

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

            console.log(repoData.data);
            console.log(issuesData.data);

            setRepository(repoData.data);
            setIssues(issuesData.data);

            setLoading(false);

        }

        loadRepo();
    },[match.params.repository]);

    return (
        <Container>

        </Container>
    );
}