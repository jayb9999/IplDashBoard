// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatchDetails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} =
    recentMatchDetails
  return (
    <div>
      <div>
        <img src={competingTeamLogo} alt={competingTeam} />
      </div>
      <h1>{competingTeam}</h1>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </div>
  )
}

export default MatchCard
