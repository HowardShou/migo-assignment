import Head from './Head'
import Row from './Row'

const Table = ({ head, row, body, handleExpand, handleStatus }) => {
  return (
    <div className='flex flex-col items-start border border-[#C3C3C2] rounded w-full'>
      <Head data={head} />
      {body.map((title, titleIdx) => {
        const seasons = title.seasons.length === 0 ? [] : title.seasons
        return (
          <>
            <Row
              key={title.title_iid}
              idx={titleIdx}
              row={row}
              data={title}
              handleExpand={handleExpand}
              handleStatus={handleStatus}
            />

            {seasons.map((season, seasonIdx) => {
              const episodes =
                season.episodes.length === 0 ? [] : season.episodes
              return (
                <>
                  <Row
                    key={season.season_uuid}
                    idx={seasonIdx}
                    row={row}
                    data={season}
                    handleExpand={handleExpand}
                    handleStatus={handleStatus}
                  />
                  {episodes.map((episode, episodeIdx) => {
                    return (
                      <Row
                        key={episode.episode_uuid}
                        idx={episodeIdx}
                        row={row}
                        data={episode}
                        handleExpand={handleExpand}
                        handleStatus={handleStatus}
                      />
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
