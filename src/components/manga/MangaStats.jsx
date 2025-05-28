export function MangaStats ({ mangas }) {
  const totalMangas = mangas.length
  const totalTomosLeidos = mangas.reduce((total, manga) => total + manga.tomosLeidos, 0)
  const totalTomosComprados = mangas.reduce((total, manga) => total + (manga.tomosComprados || 0), 0)
  const completados = mangas.filter((manga) => manga.estado === 'Completado').length

  const stats = [
    {
      title: 'Total de Mangas',
      value: totalMangas,
      color: 'bg-blue-500',
      icon: '📚'
    },
    {
      title: 'Tomos Comprados',
      value: totalTomosComprados,
      color: 'bg-green-500',
      icon: '🛒'
    },
    {
      title: 'Tomos Leídos',
      value: totalTomosLeidos,
      color: 'bg-purple-500',
      icon: '📖'
    },
    {
      title: 'Completados',
      value: completados,
      color: 'bg-emerald-500',
      icon: '✅'
    }
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map((stat, index) => (
        <div
          key={index}
          className='bg-white rounded-lg shadow-soft p-6 border border-gray-200 hover:shadow-lg transition-shadow animate-fadeIn'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600 mb-1'>{stat.title}</p>
              <p className='text-3xl font-bold text-gray-900'>{stat.value}</p>
            </div>
            <div className='text-2xl'>{stat.icon}</div>
          </div>
          <div className={`mt-4 h-1 ${stat.color} rounded-full`} />
        </div>
      ))}
    </div>
  )
}
