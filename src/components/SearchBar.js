import search from 'assets/imgs/Search.png'

const SearchBar = () => {
  return (
    <div className='flex items-center border border-[#B2B2B2] rounded max-w-[419px] h-10 bg-[#202020] bg-opacity-5'>
      <img src={search} alt='search' className='w-[17.49px] h-[17.49px] mx-5' />
      <input
        type='text'
        placeholder='Search for titles in inventory'
        className='text-sm outline-none flex-grow pr-5 text-[#727272] bg-transparent'
      />
    </div>
  )
}

export default SearchBar
