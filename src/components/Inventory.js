import { useState, useRef, useCallback } from 'react'
import Divider from './Divider'
import SearchBar from './SearchBar'
import Table from 'components/Table'
import titles from 'titles'
import { TYPE } from '../constants'

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
  { name: 'Programmable', className: 'min-w-[10%]' },
]

const rowConfig = [
  {
    name: 'id',
    className:
      'flex items-center min-w-[4.32%] mr-2 text-[#494948] text-xs leading-[30px]',
  },
  {
    name: 'title-name',
    className:
      'w-[33.3%] max-w-[33.3%] text-xs leading-[14px] font-medium text-[#333]',
  },
  { name: 'type', className: 'min-w-[5.54%] mr-4 text-xs leading-[14px]' },
  { name: 'season', className: 'min-w-[3.54%] mr-4 text-xs leading-[14px]' },
  { name: 'episode', className: 'min-w-[4.32%] mr-4 text-xs leading-[14px]' },
  { name: 'published', className: 'flex-grow text-xs leading-[14px]' },
  { name: 'programmable', className: 'min-w-[10%]' },
]

const genIdIndexMap = data => {
  let result = {}
  data.forEach((layer1, idx1) => {
    result[layer1.title_id] = idx1
    if (layer1.seasons.length) {
      layer1.seasons.forEach((layer2, idx2) => {
        result[layer2.season_id] = { idx: idx2, parentIdx: idx1 }
        if (layer2.episodes.length) {
          layer2.episodes.forEach((layer3, idx3) => {
            result[layer3.episode_id] = {
              idx: idx3,
              parentIdx: idx2,
              grandParentIdx: idx1,
            }
          })
        }
      })
    }
  })

  return result
}

const Inventory = () => {
  const [tableBody, setTableBody] = useState(JSON.parse(JSON.stringify(titles)))
  const [idIndexMap] = useState(() => {
    return genIdIndexMap(tableBody)
  })

  const expandHandler = useCallback(
    payload => {
      const _tb = [...tableBody]

      const cb = item => {
        if (item.expand) {
          return {
            ...item,
            expand: false,
          }
        } else {
          return {
            ...item,
            expand: true,
          }
        }
      }
      if (payload.type === TYPE.SERIES) {
        const idx = idIndexMap[payload.id]
        if (_tb[idx].expand) _tb[idx].expand = false
        else _tb[idx].expand = true

        _tb[idx].seasons = _tb[idx].seasons.map(cb)
      } else if (payload.type === TYPE.SEASON) {
        const seasonIdx = idIndexMap[payload.id].idx
        const titleIdx = idIndexMap[payload.id].parentIdx

        _tb[titleIdx].seasons[seasonIdx].episodes =
          _tb[titleIdx].seasons[seasonIdx].episodes.map(cb)
      }
      setTableBody(_tb)
    },
    [idIndexMap, tableBody]
  )

  const handleStatus = useCallback(
    payload => {
      const _tb = [...tableBody]
      switch (payload.type) {
        case TYPE.MOVIE:
          _tb[idIndexMap[payload.id]].activate = payload.status
          break
        case TYPE.SERIES: {
          _tb[idIndexMap[payload.id]].activate = payload.status
          _tb[idIndexMap[payload.id]].seasons = _tb[
            idIndexMap[payload.id]
          ].seasons.map(item => ({
            ...item,
            activate: payload.status,
            episodes: item.episodes.map(ep => ({
              ...ep,
              activate: payload.status,
            })),
          }))
          break
        }
        case TYPE.SEASON: {
          const parentIdx = idIndexMap[payload.id].parentIdx
          // handle parent
          if (payload.status) {
            let allInactive = true
            for (const season of _tb[parentIdx].seasons) {
              if (season.activate) {
                allInactive = false
                break
              }
            }
            if (allInactive) _tb[parentIdx].activate = payload.status
          } else {
            let allInactive = true
            for (const season of _tb[parentIdx].seasons) {
              if (season.season_id === payload.id) continue
              if (season.activate) {
                allInactive = false
                break
              }
            }
            if (allInactive) _tb[parentIdx].activate = payload.status
          }

          // season itself
          _tb[parentIdx].seasons[payload.idx].activate = payload.status

          // handle ep
          _tb[parentIdx].seasons[payload.idx].episodes = _tb[parentIdx].seasons[
            payload.idx
          ].episodes.map(ep => ({
            ...ep,
            activate: payload.status,
          }))

          break
        }
        case TYPE.EPISODE:
          {
            const idx = idIndexMap[payload.id].idx
            const seasonIdx = idIndexMap[payload.id].parentIdx
            const titleIdx = idIndexMap[payload.id].grandParentIdx

            if (payload.status) {
              let allInactive = true
              for (const season of _tb[titleIdx].seasons) {
                if (season.activate) {
                  allInactive = false
                  break
                }
              }
              if (allInactive) _tb[titleIdx].activate = payload.status
            } else {
              let allInactive = true
              for (const season of _tb[titleIdx].seasons) {
                if (season.season_id === payload.id) continue
                if (season.activate) {
                  allInactive = false
                  break
                }
              }
              if (allInactive) _tb[titleIdx].activate = payload.status
            }

            // handle season
            if (payload.status) {
              let allInactive = true
              for (const ep of _tb[titleIdx].seasons[seasonIdx].episodes) {
                if (ep.activate) {
                  allInactive = false
                  break
                }
              }
              if (allInactive)
                _tb[titleIdx].seasons[seasonIdx].activate = payload.status
            } else {
              let allInactive = true
              for (const ep of _tb[titleIdx].seasons[seasonIdx].episodes) {
                if (ep.episode_id === payload.id) continue
                if (ep.activate) {
                  allInactive = false
                  break
                }
              }
              if (allInactive) {
                _tb[titleIdx].seasons[seasonIdx].activate = payload.status
              }
            }

            // ep itself
            _tb[titleIdx].seasons[seasonIdx].episodes[idx].activate =
              payload.status
          }
          break

        default:
          break
      }

      setTableBody(_tb)
    },
    [idIndexMap, tableBody]
  )

  const [searchValue, setSearchValue] = useState('')
  const searchId = useRef(null)
  const handleSearch = useCallback(
    value => {
      setSearchValue(value)
      clearTimeout(searchId.current)
      searchId.current = setTimeout(() => {
        const tb = [...tableBody]

        const result = tb.map(title => {
          let seasons = title.seasons.length === 0 ? [] : title.seasons
          seasons = seasons.map(season => {
            let episodes = season.episodes.length === 0 ? [] : season.episodes
            episodes = episodes.map(episode => {
              if (!episode.episode_name.includes(value)) {
                return {
                  ...episode,
                  hidden: true,
                }
              } else {
                if (episode.hidden) delete episode.hidden
                return episode
              }
            })

            if (!season.season_name.includes(value)) {
              return {
                ...season,
                episodes,
                hidden: true,
              }
            } else {
              if (season.hidden) delete season.hidden
              return season
            }
          })

          if (!title.title_name.includes(value)) {
            return {
              ...title,
              seasons,
              hidden: true,
            }
          } else {
            if (title.hidden) delete title.hidden
            return title
          }
        })
        setTableBody(result)
      }, 200)
    },
    [tableBody]
  )

  return (
    <div className='w-full px-6 py-4'>
      <h3 className='flex items-center font-medium tracking-[0.15px] min-w-[342px] h-10'>
        Inventory Manager
      </h3>
      <Divider />
      <SearchBar
        value={searchValue}
        onChange={e => handleSearch(e.target.value)}
      />
      <Divider />
      <Table
        head={headerConfig}
        row={rowConfig}
        body={tableBody}
        handleExpand={expandHandler}
        handleStatus={handleStatus}
      />
    </div>
  )
}

export default Inventory
