import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { CardList } from "./components/cardlist/cardlist.component";
import { useState } from 'react';
import { useEffect } from 'react';
import { SearchBar } from './components/searchbar/searchbar.component';

function App() {
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchMonsters = async () => {
      const response = await axios(
        'https://jsonplaceholder.typicode.com/users',
      );
      setMonsters(response.data);
    };

    fetchMonsters();
  }, []);

  useEffect(() => {
    let filtered = [];
    if (searchInput === "") {
      filtered = monsters
    } else {
      filtered = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilteredMonsters(filtered);
  }, [monsters, searchInput]);

  const handleInput = e => {
    setSearchInput(e.target.value)
  };

  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <SearchBar
        placeholder='Search Monster'
        handleInput={handleInput}
        />
      <CardList monsters={filteredMonsters}/>
    </div>
  );
}  

export default App;
