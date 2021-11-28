import { checkHasOwnProp, toDateString } from 'utils'
import collapse from 'assets/imgs/Collapse.png'
import plus from 'assets/imgs/Plus.png'
// import expand from 'assets/imgs/Expand.png'

const Row = ({ data, row }) => {
  let result = []
  if (checkHasOwnProp(data, 'title_id')) {
    result = row.map(({ className, name }) => {
      switch (name) {
        case 'id':
          return (
            <div className={`${className} relative`}>
              {data.content_type === 'Movie' ? null : (
                <img
                  src={collapse}
                  className='absolute left-[-20px] w-[10px] h-[8px] cursor-pointer'
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
              {data.content_type === 'Movie' ? '-' : data.seasons.length}
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
              {data.content_type === 'Movie' ? '-' : data.episode_count}
            </div>
          )
        case 'programmable':
          return <div className={className}>{`${data.activate}`}</div>

        default:
          return <div />
      }
    })
  } else if (checkHasOwnProp(data, 'season_id')) {
    result = row.map(({ name, className }) => {
      switch (name) {
        case 'id':
          return (
            <div className={`${className} relative`}>
              <img
                src={plus}
                className='absolute w-[12px] h-[12px] left-[-20px] cursor-pointer'
              ></img>
              {data.season_id}
            </div>
          )
        case 'title-name':
          return <div className={className}>{data.season_name}</div>
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
          return <div className={className}>{`${data.activate}`}</div>

        default:
          return <div />
      }
    })
  } else {
    result = row.map(({ name, className }) => {
      switch (name) {
        case 'id':
          return <div className={className}>{data.episode_id}</div>
        case 'title-name':
          return <div className={className}>{data.episode_name}</div>
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
          return <div className={className}>{`${data.activate}`}</div>

        default:
          return <div />
      }
    })
  }

  return (
    <div className='flex flex-grow items-center justify-start hover:bg-[#4EA0DD1A] bg-opacity-10 w-full pl-8 px-[11px]'>
      {result}
    </div>
  )
}

export default Row
