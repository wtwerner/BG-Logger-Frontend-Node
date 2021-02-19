const API_URL = 'https://api.boardgameatlas.com/api/'
const CLIENT_ID = '&client_id=0hcbB6EyEf'


// Synchronous

export const addWishlistGames = games => {
    return {
      type: "ADD_WISHLIST_GAMES",
      games
    }
}

export const addOwnedGames = games => {
    return {
      type: "ADD_OWNED_GAMES",
      games
    }
}

export const addToWishlist = game => {
    return{
        type: 'ADD_TO_WISHLIST',
        game
    }    
}

export const deleteWishlistGame = game => {
    return{
        type: 'DELETE_WISHLIST_GAME',
        game
    }    
}

export const addToOwned = game => {
    return{
        type: 'ADD_TO_OWNED',
        game
    }    
}

export const deleteOwnedGame = game => {
    return{
        type: 'DELETE_OWNED_GAME',
        game
    }    
}

export const searchApiGames = games => {
    return {
      type: "SEARCH_API_GAMES",
      games
    }
}

// Fetch from BGA API

export const fetchGamesFromQuery = (query) => {
    return dispatch => {
        return fetch(API_URL+'search?name='+query+CLIENT_ID+'&fuzzy_match=true')
            .then(response => response.json())
            .then(data => {
                dispatch(searchApiGames(data))
            })
        .catch(err => console.log(err));
    }
}


// Fetch from User

export const fetchGamesFromUser = (user) => {
    return dispatch => {
        let ownedIdsString = ''
        let wishlistIdsString = ''
        user.data.attributes.games.forEach(game => {
            if (game.owned) {
                ownedIdsString += `${game.bga_id},`
            } else if (game.wishlist) {
                wishlistIdsString += `${game.bga_id},`
            }
        })
        if (ownedIdsString !== '') {
            fetch(API_URL+'search?ids='+ownedIdsString+CLIENT_ID)
            .then(response => response.json())
            .then(data => {
                dispatch(addOwnedGames(data))
            })
            .catch(err => console.log(err));
        }
        if (wishlistIdsString !== '') {
            fetch(API_URL+'search?ids='+wishlistIdsString+CLIENT_ID)
            .then(response => response.json())
            .then(data => {
                dispatch(addWishlistGames(data))
            })
            .catch(err => console.log(err));
        }
    }
}


// Fetch from API

export const createWishlistGame = (game) => {
    return dispatch => {
        console.log("Creating wishlist game with id " + game.id)
        const sendableGameData = {
            bga_id: game.id,
            wishlist: true,
            owned: false
        }
        return fetch("http://localhost:3001/api/v1/games", {
            credentials: "include",
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(sendableGameData)
        })
            .then(r => r.json())
            .then(resp => {
            if (resp.error) {
                alert(resp.error)
            } else {
                dispatch(addToWishlist(game))
            }
            })
            .catch(console.log)
    }
}

export const createOwnedGame = (game) => {
    return dispatch => {
        console.log("Creating owned game with id " + game.id)
        const sendableGameData = {
            bga_id: game.id,
            wishlist: false,
            owned: true
        }
        return fetch("http://localhost:3001/api/v1/games", {
            credentials: "include",
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(sendableGameData)
        })
            .then(r => r.json())
            .then(resp => {
            if (resp.error) {
                alert(resp.error)
            } else {
                dispatch(addToOwned(game))
            }
            })
            .catch(console.log)
    }
}

export const removeWishlistGameById = (id) => {
    return dispatch => {
        console.log("Removing wishlist game with id " + id)
        const sendableGameData = {
            bga_id: id
        }
        return fetch(`http://localhost:3001/api/v1/games/${id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(sendableGameData)
        })
            .then(r => r.json())
            .then(resp => {
            if (resp.error) {
                alert(resp.error)
            } else {
                dispatch(deleteWishlistGame(resp))
            }
            })
            .catch(console.log)
    }
}

export const removeOwnedGameById = (id) => {
    return dispatch => {
        console.log("Removing owned game with id " + id)
        const sendableGameData = {
            bga_id: id
        }
        return fetch(`http://localhost:3001/api/v1/games/${id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(sendableGameData)
        })
            .then(r => r.json())
            .then(resp => {
            if (resp.error) {
                alert(resp.error)
            } else {
                dispatch(deleteOwnedGame(resp))
            }
            })
            .catch(console.log)
    }
}

export const moveToOwned = (game) => {
    return dispatch => {
        console.log("Moving game with id " + game.id + " to owned")
        const sendableGameData = {
            owned: true,
            wishlist: false
        }
        return fetch(`http://localhost:3001/api/v1/games/${game.id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(sendableGameData)
        })
            .then(r => r.json())
            .then(resp => {
            if (resp.error) {
                alert(resp.error)
            } else {
                dispatch(deleteWishlistGame(game))
                dispatch(createOwnedGame(game))
            }
            })
            .catch(console.log)
    }
}
