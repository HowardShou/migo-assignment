import Head from './Head'
import Row from './Row'
import titles from 'titles'

const Table = ({ head, row, body = titles }) => {
  return (
    <div className='flex flex-col items-start border border-[#C3C3C2] rounded w-full'>
      <Head data={head} />
      {body.map(title => {
        const seasons = title.seasons.length === 0 ? [] : title.seasons
        return (
          <>
            <Row key={title.title_id} row={row} data={title}></Row>
            {seasons.map(season => {
              const episodes =
                season.episodes.length === 0 ? [] : season.episodes
              return (
                <>
                  <Row key={season.season_id} row={row} data={season}></Row>
                  {episodes.map(episode => {
                    return (
                      <Row
                        key={episode.episode_id}
                        row={row}
                        data={episode}
                      ></Row>
                    )
                  })}
                </>
              )
            })}
          </>
        )
      })}
    </div>
  )
}

export default Table
