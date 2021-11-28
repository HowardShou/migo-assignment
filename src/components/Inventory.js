import Divider from './Divider'
import SearchBar from './SearchBar'
import Table from 'components/Table'

const headerConfig = [
  {
    name: 'ID',
    className: 'min-w-[4.32%] mr-2 ',
  },
  {
    name: 'Title Name',
    className: 'w-[33.3%] max-w-[33.3%]',
  },
  { name: 'Type', className: 'min-w-[5.54%] mr-4' },
  { name: 'Season', className: 'min-w-[3.54%] mr-4' },
  { name: 'Episode', className: 'min-w-[4.32%] mr-4' },
  { name: 'Published', className: 'flex-grow' },
  { name: 'Programmable', className: '' },
]

const rowConfig = [
  {
    name: 'id',
    className:
      'flex items-center min-w-[4.32%] mr-2 text-[#494948] text-xs leading-[30px]',
  },
  {
    name: 'title-name',
    className: 'w-[33.3%] max-w-[33.3%] text-xs leading-[14px] font-medium',
  },
  { name: 'type', className: 'min-w-[5.54%] mr-4 text-xs leading-[14px]' },
  { name: 'season', className: 'min-w-[3.54%] mr-4 text-xs leading-[14px]' },
  { name: 'episode', className: 'min-w-[4.32%] mr-4 text-xs leading-[14px]' },
  { name: 'published', className: 'flex-grow text-xs leading-[14px]' },
  { name: 'programmable', className: '' },
]

const Inventory = () => {
  return (
    <div className='w-full px-6 py-4'>
      <h3 className='flex items-center font-medium tracking-[0.15px] min-w-[342px] h-10'>
        Inventory Manager
      </h3>
      <Divider />
      <SearchBar />
      <Divider />
      <Table head={headerConfig} row={rowConfig} />
    </div>
  )
}

export default Inventory
