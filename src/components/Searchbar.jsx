import React from 'react'

export default function Searchbar({setQuery, setCategoria, setActivateSearch}) {
  const categorias = [
    "Natureza",
    "Pessoas", 
    "Tecnologia",
    "Animais",
    "Esportes"
  ]

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder='Pesquisar fotos...' 
        onChange={(e) => setQuery(e.target.value)}
      />
      <select 
        onChange={(e) => {
          setCategoria(e.target.value);
          // setActivateSearch(true)
        }}
        >
        <option value="">Selecione</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>  
        ))}
      </select>
      <button onClick={() => setActivateSearch(true)}>Pesquisar</button>
    </div>
  )
}
