import { useState } from 'react'
import { checkHasOwnProp, toDateString } from 'utils'
import SwitchButton from '../SwitchButton'
import collapse from 'assets/imgs/Collapse.png'
import expand from 'assets/imgs/Expand.png'
import plus from 'assets/imgs/Plus.png'
import minus from 'assets/imgs/Minus.png'
import { TYPE } from '../../constants'

const Row = ({ data, row, idx, handleExpand, handleStatus }) => {
  const [isExpand, setIsExpand] = useState(false)
  //   const isExpand = data.expand
  let result = []
  if (checkHasOwnProp(data, 'title_id')) {
    result = row.map(({ className, name }) => {
      switch (name) {
        case 'id':
          return (
            <div className={`${className} relative`}>
              {data.content_type === TYPE.MOVIE ? null : (
                <img
                  src={isExpand ? expand : collapse}
                  className='absolute left-[-20px] w-[10px] h-[8px] cursor-pointer'
                  onClick={() => {
                    handleExpand({ idx, type: TYPE.SERIES, id: data.title_id })
                    setIsExpand(prev => !prev)
                  }}
                ></img>
              )}
              {data.title_id}
            </div>
          )
        case 'title-name':
          return (
            <div className={className}>
              <span>{data.title_name}</span>
            </div>
          )
        case 'type':
          return <div className={className}>{data.content_type}</div>
        case 'season':
          return (
            <div className={className}>
              {data.content_type === TYPE.MOVIE ? '-' : data.seasons.length}
            </div>
          )
        case 'published':
          return (
            <div className={className}>
              {toDateString(data.publish_timestamp)}
            </div>
          )
        case 'episode':
          return (
            <div className={className}>
              {data.content_type === TYPE.MOVIE ? '-' : data.episode_count}
            </div>
          )
        case 'programmable':
          return (
            <div className={className}>
              {
                <SwitchButton
                  status={data.activate}
                  handleClick={() =>
                    handleStatus({
                      idx,
                      type:
                        data.content_type === TYPE.MOVIE
                          ? TYPE.MOVIE
                          : TYPE.SERIES,
                      id: data.title_id,
                      status: !data.activate,
                    })
                  }
                />
              }
            </div>
          )

        default:
          return <div />
      }
    })
  } else if (checkHasOwnProp(data, 'season_id')) {
    result = row.map(({ name, className }) => {
      switch (name) {
        case 'id':
          return (
            <div className={`${className} relative translate-x-6`}>
              <img
                src={isExpand ? minus : plus}
                className='absolute w-[12px] h-[12px] left-[-20px] cursor-pointer'
                onClick={() => {
                  handleExpand({
                    idx,
                    type: TYPE.SEASON,
                    id: data.season_id,
                  })
                  setIsExpand(prev => !prev)
                }}
              ></img>
              {data.season_id}
            </div>
          )
        case 'title-name':
          return (
            <div className={`${className} translate-x-6`}>
              {data.season_name}
            </div>
          )
        case 'type':
          return <div className={className}>Season</div>
        case 'season':
          return <div className={className}>{`S${data.season_number}`}</div>
        case 'episode':
          return <div className={className}>{data.episode_count}</div>
        case 'published':
          return (
            <div className={className}>
              {toDateString(data.publish_timestamp)}
            </div>
          )
        case 'programmable':
          return (
            <div className={className}>
              {
                <SwitchButton
                  status={data.activate}
                  handleClick={() =>
                    handleStatus({
                      idx,
                      type: TYPE.SEASON,
                      id: data.season_id,
                      status: !data.activate,
                    })
                  }
                />
              }
            </div>
          )

        default:
          return <div />
      }
    })
  } else {
    result = row.map(({ name, className }) => {
      switch (name) {
        case 'id':
          return (
            <div className={`${className} translate-x-9`}>
              {data.episode_id}
            </div>
          )
        case 'title-name':
          return (
            <div className={`${className} translate-x-9`}>
              {data.episode_name}
            </div>
          )
        case 'type':
          return <div className={className}>Episode</div>
        case 'season':
          return <div className={className}>-</div>
        case 'episode':
          return <div className={className}>{`EP${data.episode_number}`}</div>
        case 'published':
          return (
            <div className={className}>
              {toDateString(data.publish_timestamp)}
            </div>
          )
        case 'programmable':
          return (
            <div className={className}>
              {
                <SwitchButton
                  status={data.activate}
                  handleClick={() =>
                    handleStatus({
                      idx,
                      type: TYPE.EPISODE,
                      id: data.episode_id,
                      status: !data.activate,
                    })
                  }
                />
              }
            </div>
          )

        default:
          return <div />
      }
    })
  }

  let show = true
  if (data.hidden) show = false
  else if (
    data.content_type !== TYPE.MOVIE &&
    data.content_type !== TYPE.SERIES &&
    !data.expand
  ) {
    show = false
  }

  return (
    <div
      className={`${
        show
          ? 'opacity-100 visible h-[30px]'
          : 'transition opacity-0 h-0 invisible'
      } transition duration-500 linear flex flex-grow items-center justify-start hover:bg-[#4EA0DD1A] bg-opacity-10 w-full pl-8 px-[11px]`}
    >
      {result}
    </div>
  )
}

export default Row
