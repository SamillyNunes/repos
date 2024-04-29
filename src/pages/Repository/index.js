export default function Repository({match}){
    return (
        <div>
            <h1 style={{ color: '#FFF' }} >
                Repository 
                {decodeURIComponent(match.params.repository)}
            </h1>

        </div>
    );
}