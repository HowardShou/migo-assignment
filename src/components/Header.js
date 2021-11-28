import logo from 'assets/imgs/Logo.png'
import Inventory from 'assets/imgs/Inventory.png'

const Header = () => {
  return (
    <div className='w-full flex'>
      <div className='w-[13.23%] bg-black text-xs flex items-center justify-center'>
        <img
          src={logo}
          alt='logo'
          className='w-[28.45px] h-[27.17px] mr-[8.84px]'
        />
        <div className='flex flex-col text-white text-xs font-black'>
          <span className='tracking-[5px]'>CONTENT</span>
          <span className='tracking-[2px]'>MARKETING</span>
        </div>
      </div>
      <div className='w-[87%] flex bg-[#E31E30] justify-between'>
        <div className='relative flex flex-col justify-between'>
          <div className='flex items-center py-[23px] px-[30px]'>
            <img src={Inventory} alt='iv' className='w-4 h-[18px] mr-[14px]' />
            <span className='text-base leading-[18px] font-bold text-white tracking-wide'>
              INVENTORY
            </span>
          </div>
          <div className='absolute bottom-0 w-full py-[2px] bg-white'></div>
        </div>
      </div>
    </div>
  )
}

export default Header
