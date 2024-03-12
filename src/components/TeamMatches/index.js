// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    wholeData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getWholeData()
  }

  getFormattedDataObj = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getWholeData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(url)
    const fetchedData = await response.json()

    const formattedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: this.getFormattedDataObj(
        fetchedData.latest_match_details,
      ),
      recentMatches: fetchedData.recent_matches.map(each =>
        this.getFormattedDataObj(each),
      ),
    }
    this.setState({wholeData: formattedData, isLoading: false})
  }

  render() {
    const {wholeData, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = wholeData
    console.log(latestMatchDetails)
    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <div>
              <img src={teamBannerUrl} alt="team banner" />
            </div>
            <div>
              <LatestMatch latestMatchDetals={latestMatchDetails} />
            </div>
            <div>
              <ul>
                {recentMatches.map(each => (
                  <MatchCard key={each.id} recentMatchDetails={each} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
