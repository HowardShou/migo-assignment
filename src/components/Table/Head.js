import { memo } from 'react'

const Head = ({ data }) => {
  return (
    <div className='flex items-center justify-start text-[#292928] text-xs font-medium bg-[#292928] bg-opacity-5 w-full pl-8 pr-[11px]'>
      {data.map(({ name, className }) => (
        <div key={name} className={`py-2 ${className}`}>
          {name}
        </div>
      ))}
    </div>
  )
}

export default memo(Head)
