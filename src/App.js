import './App.css';
import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { createResource as fetchData } from './helper';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')

  const API_URL = `https://itunes.apple.com/search?term=`

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  useEffect(() => {
    if (searchTerm) {
      setData(fetchData(searchTerm))
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    term = toTitleCase(term)
    setSearchTerm(term)
    return (<Redirect to="/" />)
  }
  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
        <SearchBar handleSearch={handleSearch} />
        {message}
        {renderGallery()}
    </div>
)

    
}

export default App;
