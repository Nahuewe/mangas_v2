export function MangaCardSkeleton () {
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse'>
      <div className='h-48 bg-gray-200' />
      <div className='p-4 space-y-3'>
        <div className='h-4 bg-gray-200 rounded w-3/4' />
        <div className='h-3 bg-gray-200 rounded w-1/2' />
        <div className='h-3 bg-gray-200 rounded w-2/3' />
        <div className='space-y-2'>
          <div className='h-3 bg-gray-200 rounded w-1/4' />
          <div className='h-2 bg-gray-200 rounded w-full' />
        </div>
      </div>
    </div>
  )
}
