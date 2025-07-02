import React from 'react'
import Foto from './Foto'


export default function FotoList({fotos, setFotoAmpliada}) {
  return (
    <div className="foto-list">
      {fotos.map((foto) => (
        <Foto key={foto.id} dados={foto} setFotoAmpliada={setFotoAmpliada} />
      ))}
    </div>
  )
}
