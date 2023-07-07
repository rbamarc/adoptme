import { useState, useEffect } from "react";
const ANIMALS = ['bird','cat','dog','rabbit','reptile']

const SearchParams = () => {
    const [location, updateLocation] = useState('');
    const [animal, updateAnimal] = useState('')
    const [breed, updateBreed] = useState('')
    const [pets, updatePets] = useState('')
    const breeds = []

    useEffect(() => {
        requestPets()
    },[])

    const requestPets = async () => {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        const json = await res.json()

        updatePets(json.pets)
    }

    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location 
                    <input onChange={(e)=>updateLocation(e.target.value)}  id="location" value={location} placeholder="location"/>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        value={animal}
                        id="animal"
                        onChange={(e) => {
                            updateAnimal(e.target.value)
                            updateBreed('')
                        }}>
                        <option />
                        {ANIMALS.map((animal) =>(
                        <option key={animal} value={animal}>
                            {animal}
                        </option>
                        ))}
                        </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={breeds.length ===0}
                        value={breed}
                        id="breed"
                        onChange={(e) => {
                            updateBreed(e.target.value)
                        }}>
                        <option />
                        {breeds.map((breed) =>(
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                        </select>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams