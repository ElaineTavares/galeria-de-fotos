import Searchbar from './components/Searchbar';
import FotoList from './components/FotoList';
import FotoAmpliada from './components/FotoAmpliada';

import { useState, useEffect } from 'react';

import axios from 'axios'
import Spinner from './components/Spinner';
import Footer from './components/Footer';


function App() {

  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [activateSearch, setActivateSearch] = useState(false);
  const [fotos, setFotos] = useState([]);
  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async ({query, categoria}) => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

    //busca da imagem
    let searchQuery = "";
    
   
    if (query && categoria) {
      searchQuery = `${query} ${categoria}`;
    } else if (query) {
      searchQuery = query;
    } else if (categoria) {
      searchQuery = categoria
    }


    try{
      setLoading(true); // Início do carregamento
      if (searchQuery) {
      const response = await axios('https://api.unsplash.com/search/photos', {
        params: {
        client_id: apiKey,
        query: searchQuery
        }
      });
      setFotos(response.data.results);

  } else {
      const response = await axios('https://api.unsplash.com/photos/random', {
        params: {
        client_id: apiKey,
        count: 12
      }
    });

    setFotos(response.data);
  }} catch (error) {
    setFotos([]);
    alert("Ocorreu um erro ao buscar as fotos. Tente novamente mais tarde.", error);
  } finally {
    setLoading(false); // Fim do carregamento
  }
    
} 


  useEffect(() => {
    fetchData({query, categoria})
  }, []);


  useEffect(() => {
    if(activateSearch) {
      fetchData({query, categoria});
      setActivateSearch(false)
    }
  }, [activateSearch])

  console.log("API KEY:", import.meta.env.VITE_UNSPLASH_API_KEY);
  

 return (
    <div className='container'>
      <h1>Galeria de Fotos</h1>
      <Searchbar  
        setQuery={setQuery}
        setCategoria={setCategoria}
        setActivateSearch={setActivateSearch}
      />
      {loading && <Spinner />}
      <FotoList fotos={fotos} setFotoAmpliada={setFotoAmpliada}/>
      {fotoAmpliada && (
        <FotoAmpliada foto={fotoAmpliada} setFotoAmpliada={setFotoAmpliada}/>
      )}
      <Footer/>
    </div>
  )
}

export default App
