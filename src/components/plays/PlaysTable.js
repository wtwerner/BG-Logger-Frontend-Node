import React from 'react'
import { Table, Button } from 'react-bootstrap'

const PlaysTable = ({userPlays, ownedGames}) => {
    return (
        <Table striped hover className="pt-10">
            <thead>
                <tr className="text-center">
                    <th>Game</th>
                    <th>Date</th>
                    <th>Notes</th>
                    <th>Remove Play</th>
                </tr>
            </thead>
            <tbody>
                {userPlays.map(play => {
                    const game = ownedGames.filter(game => game.id === play.bga_id)[0];
                    const date = play.date.substring(0,10);
                    return (
                        <tr key={play.id} play_id={play.id} className="align-middle" >
                            <td className="text-center">{game.name}</td>
                            <td className="text-center">{date}</td>
                            <td className="text-center"><Button>Details</Button></td>
                            <td className="text-center"><Button>Remove</Button></td>
                        </tr>
                    )}
                )}
            </tbody>
        </Table>
    )
}

export default PlaysTable