import React, { useEffect, useState } from 'react'
import Character from './Character';

const NavPage = (props) => {

    return (
        <header className='d-flex justify-content-between align-items-center'>
            <p>Page: {props.page}</p>
            <button className='btn btn-primary btn-sm'
                onClick={() => props.setPage(props.page + 1) }
            >
                Page {props.page + 1}
            </button>
        </header>
    )

}



const CharacterList = () => {

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)



    const URL = `https://rickandmortyapi.com/api/character?page=${page}`

    const getData = async () => {
        await fetch(URL)
            .then(response => { return response.json() })
            .then(data => {
                setCharacters(data.results)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })

    }

    useEffect(() => {

        getData()
    }, [page])


   

    return (
        <div className='container-fluid'>

            <NavPage page={page}  setPage={setPage}/>

         
           {loading ? (
            <h1>loading...</h1>
           ): (
            <div className='row'>
                {   
                    characters.map((character) => {
                        return(
                            <div className='col-md-4' key={character.id}>
                                <Character character={character} />
                            </div>
                        )
                    })
                }
            </div>
           
           )}

            <NavPage page={page}  setPage={setPage}/>
            
        </div>
     

    )
}

export default CharacterList