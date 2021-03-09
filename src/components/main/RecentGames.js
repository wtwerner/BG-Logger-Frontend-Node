import React from 'react'
import { Container, CardGroup } from 'react-bootstrap'
import RecentGameCard from './RecentGameCard'

const RecentGames = (props) => {

    return (
        <Container style={{width: "750px"}}>
            <CardGroup>
                {props.games.map(game => {
                    return <RecentGameCard game={game} key={'recent_' + game.id} />
                })}
            </CardGroup>
        </Container>
    ) 
}

export default RecentGames