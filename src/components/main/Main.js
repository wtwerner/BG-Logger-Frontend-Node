import React from 'react'
import { Jumbotron, Container} from 'react-bootstrap'
import RecentGames from './RecentGames'
import { connect } from 'react-redux'

const Main = ({recentGames, popularGames, currentUser}) => {

    return (
        <>
            <Container style={{width: "750px", padding: "30px", textAlign: "center"}}>
                <Jumbotron className="border rounded" style={{padding: "25px"}}>
                    {currentUser
                        ? <h1>Welcome to BG Logger, {currentUser.user.name}</h1>
                        : <h1>Welcome to BG Logger</h1>
                    }
                    <p>
                        A simple app to search for and collect board games.
                    </p>
                </Jumbotron>            
            </Container>
            <Container>
                {currentUser 
                    ? (recentGames.length > 2) ? <RecentGames games={recentGames} recent={true} /> : <RecentGames games={popularGames} recent={false} />
                    : null
                }
                
            </Container>
        </>
    )
}

const mapStateToProps = ({ games, currentUser }) => {
    return {
        recentGames: games.recent,
        popularGames: games.discover.slice(0,3),
        currentUser
    }
}

export default connect(mapStateToProps)(Main)