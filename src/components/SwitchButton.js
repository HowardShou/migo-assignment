const SwitchButton = ({ status = true, handleClick }) => {
  const bgClass = status ? 'bg-[#08AA5E]' : 'bg-[#B2B2B2]'
  const buttonClass = status ? 'translate-x-7' : 'translate-x-1'
  return (
    <div
      className={`transition duration-300 linear cursor-pointer relative flex items-center w-[47px] h-[21px] rounded-full ${bgClass}`}
      onClick={handleClick}
    >
      <div
        className={`transition duration-300 linear absolute bg-white w-[15px] h-[15px] rounded-full ${buttonClass}`}
      />
    </div>
  )
}

export default SwitchButton
