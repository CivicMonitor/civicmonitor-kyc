import "../styles/style.css";
import Footer from "../components/Footer";
import Nav from "../components/Nav"
import Profile from "../components/Profile"
import IssuePositions from "../components/IssuePositions"
import MyLoader from "../components/MyLoader";
import React, { Component, Fragment } from "react";
import axios from "axios";

export default class extends Component {
  static async getInitialProps({ req, query: { id }}) {
    
    console.log(id);
    

    return axios.all([
      axios.get("https://civicmonitor.herokuapp.com/api/v2/candidates/" + id),
      axios.get("https://civicmonitor.herokuapp.com/api/v2/candidates/"+id+"/issue-positions")
    ])
      .then(axios.spread((candidate, candidateIssuePosition) => {
        const data = {
          candidate: candidate.data,
          candidateIssuePosition: candidateIssuePosition.data
        }
console.log(data);
        return data;
      }))

      .catch(e => console.log(e))
   
    }
    // return { politicians };
    // console.log(await candidates.json());
  

  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      politicians: [],
     candidate:[],
     IssuePositions:[],
      political_party:"",
      current_page: "PROFILE"
    };
  }
  
  componentWillMount() {
    console.log(this.props);
    const {membership} = this.props.candidate.data;
    const {politician, political_party } = membership;
        this.setState({
      candidate: this.props.candidate.data,
      politician,
      political_party,
      IssuePositions: this.props.candidateIssuePosition.data.issue_positions
    });
  }
  

handleTabSwitch = (e) => {
e.preventDefault();
  this.setState((state, props) => ({
    current_page: state.current_page == "PROFILE" ? "ISSUE_POSITIONS" : "PROFILE"
  }));
  
}
  nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
    return (str + "").replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      "$1" + breakTag + "$2"
    );
  }

  render() {

    return <div>
        <Nav />
        <div className="bg-blue-darkest">
          <div className="container mx-auto py-20">
            <div className="flex flex-col justify-center items-center md:flex-row">
              <div className="md:mr-20">
                <img src={`https://res.cloudinary.com/civic-monitor/image/upload/${this.state.politician.image}`} className="w-32 h-32 rounded-full" />
              </div>
              <div className="mt-5 w-3/4 flex flex-col items-center md:items-start text-white ">
                <h2 className="text-center text-white">
                {this.state.politician.name}
              </h2>
                <div className="mt-5 flex flex-wrap">
                  <p className="text-center md:text-left w-1/2">
                  <strong>Born:</strong> <br className=" sm:inline" /> {this.state.politician.birth_date}
                  </p>
                  <p className="text-center md:text-left w-1/2">
                  <strong>Nationality:</strong> {this.state.politician.national_identity}
                  </p>
                  <p className="text-center self-center md:text-left w-full md:w-1/2 mt-2">
                    <strong>Gender:</strong> {this.state.politician.gender}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-3/4 sm:mr-5">
               { this.state.current_page == "PROFILE" ? <Profile politician={this.state.politician} /> :
             <IssuePositions IssuePositions = {this.state.IssuePositions} />}
            </div>
            <div className="w-full sm:w-1/4">
              <div className="sticky pin-t">
                <div className=" sticky pin-t bg-white w-full shadow -mt-20 rounded p-5 flex flex-col justify-center">
                  <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded mb-2" onClick={(e)=>this.handleTabSwitch(e)}>
{this.state.current_page == "PROFILE" ? "View Issue Positions" : "View Profile"}
                  </button>
                
                  <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                    Add to Compare List
                  </button>
                </div>
                <div className="bg-white w-full shadow mt-5 rounded p-5">
                  <h3>Political party</h3>
                  <p dangerouslySetInnerHTML={{ __html: this.state.political_party.name }} />
                </div>
                <div className="bg-white w-full shadow mt-5 rounded p-5">
                  {/* hardcoded */}
                  <div className="py-2 border-b-2">
                    <h3>Office</h3>
                    <p>Presidency</p>
                  </div>
                  <div className="py-2">
                    <h3>Election</h3>
                    <p>
                      <strong>#NigeriaDecides2019</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>;
  }
}