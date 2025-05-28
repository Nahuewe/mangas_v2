// import axios from 'axios'

// const mangaApi = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}`
// })

// Datos de ejemplo para desarrollo
const mangasEjemplo = [
  {
    id: '1',
    titulo: 'Kaguya-Sama: Love is War',
    autor: 'Aka Akasaka',
    dibujante: 'Aka Akasaka',
    tomos: 28,
    tomosLeidos: 24,
    tomosComprados: 28,
    editorial: 'Panini',
    tamañoTomo: 'B6',
    estado: 'Leyendo',
    sinopsis: 'Historia de amor entre Kaguya Shinimiya y Miyuki Shirogane.',
    imagen: 'https://i.pinimg.com/originals/d5/cb/e3/d5cbe38b1dd23303ec93614c381ca122.gif'
  },
  {
    id: '2',
    titulo: 'The Promised Neverland',
    autor: 'Hajime Isayama',
    dibujante: 'Hajime Isayama',
    tomos: 20,
    tomosLeidos: 20,
    tomosComprados: 20,
    editorial: 'Ivrea',
    tamañoTomo: 'C6',
    estado: 'Completado',
    sinopsis: 'Los niños son criados en granjas donde para luego comerselos.',
    imagen: 'https://i.pinimg.com/originals/43/72/e6/4372e641b207c90dd7ca11bc447de9af.gif'
  },
  {
    id: '3',
    titulo: 'Tokyo Revengers',
    autor: 'Ken Wakui',
    dibujante: 'Ken Wakui',
    tomos: 31,
    tomosLeidos: 12,
    tomosComprados: 12,
    editorial: 'Ivrea',
    tamañoTomo: 'Tanko',
    estado: 'Abandonado',
    sinopsis: 'Pandilleros que viajan en el tiempo.',
    imagen: 'https://giffiles.alphacoders.com/219/219048.gif'
  },
  {
    id: '4',
    titulo: 'K-ON!',
    autor: 'Kakifly',
    dibujante: 'Kakifly',
    tomos: 'unico',
    editorial: 'Kemuri',
    tamañoTomo: 'B6x2',
    estado: 'Leído',
    sinopsis: 'Monitas chistosas que tocan musica en la escuela.',
    imagen: 'https://media.tenor.com/EvaqLQGAP2YAAAAM/attention-listen.gif'
  },
  {
    id: '5',
    titulo: 'Chainsaw Man',
    autor: 'Tatsuki Fujimoto',
    dibujante: 'Tatsuki Fujimoto',
    tomos: 'en_emision',
    tomosLeidos: 19,
    tomosComprados: 19,
    editorial: 'Ivrea',
    tamañoTomo: 'Tanko',
    estado: 'Leyendo',
    sinopsis: 'El pibe chainsaw.',
    imagen: 'https://media.tenor.com/sCgKG1LgECAAAAAM/shock-chainsaw-man.gif'
  }
]

const autoresEjemplo = [
  {
    id: '1',
    nombre: 'Eiichiro Oda',
    biografia: 'Creador de One Piece, uno de los mangas más exitosos de todos los tiempos.'
  },
  { id: '2', nombre: 'Hajime Isayama', biografia: 'Creador de Attack on Titan, conocido por sus tramas complejas.' },
  { id: '3', nombre: 'Koyoharu Gotouge', biografia: 'Creador de Demon Slayer, famoso por su arte único.' },
  {
    id: '4',
    nombre: 'Masashi Kishimoto',
    biografia: 'Creador de Naruto, una de las series más influyentes del manga.'
  },
  { id: '5', nombre: 'Akira Toriyama', biografia: 'Leyenda del manga, creador de Dragon Ball y Dr. Slump.' },
  { id: '6', nombre: 'Tite Kubo', biografia: 'Creador de Bleach, conocido por sus diseños de personajes únicos.' },
  { id: '7', nombre: 'Kentaro Miura', biografia: 'Creador de Berserk, maestro del arte detallado y oscuro.' },
  {
    id: '8',
    nombre: 'Aka Akasaka',
    biografia: 'Creador de Kaguya-Sama y Oshi no Ko'
  }
]

const dibujantesEjemplo = [
  { id: '1', nombre: 'Eiichiro Oda', biografia: 'Dibujante de One Piece, conocido por su estilo expresivo.' },
  { id: '2', nombre: 'Hajime Isayama', biografia: 'Dibujante de Attack on Titan, evolucionó mucho su arte.' },
  { id: '3', nombre: 'Koyoharu Gotouge', biografia: 'Dibujante de Demon Slayer, estilo tradicional japonés.' },
  {
    id: '4',
    nombre: 'Yusuke Murata',
    biografia: 'Dibujante de One Punch Man, considerado uno de los mejores artistas actuales.'
  },
  { id: '5', nombre: 'Takeshi Obata', biografia: 'Dibujante de Death Note y Bakuman, arte muy detallado.' },
  { id: '6', nombre: 'Akira Toriyama', biografia: 'Dibujante de Dragon Ball, estilo icónico e influyente.' },
  { id: '7', nombre: 'Kentaro Miura', biografia: 'Dibujante de Berserk, arte increíblemente detallado.' },
  { id: '8', nombre: 'Naoki Urasawa', biografia: 'Dibujante de Monster, realismo excepcional.' }
]

let mangasData = [...mangasEjemplo]
let autoresData = [...autoresEjemplo]
let dibujantesData = [...dibujantesEjemplo]

// API Mangas
export const fetchMangas = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mangasData
}

export const createManga = async (manga) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newManga = {
    ...manga,
    id: Date.now().toString(),
    imagen: manga.imagen
  }
  mangasData.push(newManga)
  return newManga
}

export const updateManga = async (updates) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mangasData.findIndex((manga) => manga.id === updates.id)
  if (index === -1) throw new Error('Manga not found')

  const { id, ...updateData } = updates
  mangasData[index] = { ...mangasData[index], ...updateData }
  return mangasData[index]
}

export const deleteManga = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  mangasData = mangasData.filter((manga) => manga.id !== id)
}

// API Autores
export const fetchAutores = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return autoresData
}

export const searchAutores = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return autoresData.filter((autor) => autor.nombre.toLowerCase().includes(query.toLowerCase()))
}

export const createAutor = async (autor) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newAutor = {
    ...autor,
    id: Date.now().toString()
  }
  autoresData.push(newAutor)
  return newAutor
}

export const updateAutor = async (updates) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = autoresData.findIndex((autor) => autor.id === updates.id)
  if (index === -1) throw new Error('Autor not found')

  const { id, ...updateData } = updates
  autoresData[index] = { ...autoresData[index], ...updateData }
  return autoresData[index]
}

export const deleteAutor = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  autoresData = autoresData.filter((autor) => autor.id !== id)
}

// API Dibujantes
export const fetchDibujantes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dibujantesData
}

export const searchDibujantes = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dibujantesData.filter((dibujante) => dibujante.nombre.toLowerCase().includes(query.toLowerCase()))
}

export const createDibujante = async (dibujante) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newDibujante = {
    ...dibujante,
    id: Date.now().toString()
  }
  dibujantesData.push(newDibujante)
  return newDibujante
}

export const updateDibujante = async (updates) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = dibujantesData.findIndex((dibujante) => dibujante.id === updates.id)
  if (index === -1) throw new Error('Dibujante not found')

  const { id, ...updateData } = updates
  dibujantesData[index] = { ...dibujantesData[index], ...updateData }
  return dibujantesData[index]
}

export const deleteDibujante = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  dibujantesData = dibujantesData.filter((dibujante) => dibujante.id !== id)
}
