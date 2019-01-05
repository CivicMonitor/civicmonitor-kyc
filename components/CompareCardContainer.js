import { connect } from 'react-redux';
import React, { Component, Suspense } from "react";
import axios from "axios";
import CompareCard  from "./CompareCard"



class CompareCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue_position: [],
      prev_issue_position: [],
            GO_DEEPER: false
    };
  }


  

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // Store prevUserId in state so we can compare when props change.
  //   // Clear out any previously-loaded user data (so we don't render stale stuff).
  //   if (nextProps.candidateId !== prevState.candidateId) {
  //     console.log(3, nextProps.candidateId, prevState.candidateId);

  //     return { prev_candidateId: nextProps.candidateId, profileOrError: null };
  //   }
  //   // No state update necessary
  //   return null;
  // }

  
  _loadIssuePositionData(candidateId,issue) {
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    axios
      .get(
        `https://api.civicmonitor.com/api/v2/politicians/${
          candidateId
        }?with_candidate=true`
      )
      .then(response => {
        return axios.get(
          `https://api.civicmonitor.com/api/v2/candidates/${
            response.data.candidates[0].id
          }/issue-position/${issue.id}`
        ); // using response.data
      })
      .then(response => {
        console.log('set data to state',response);
        this.setState({ issue_position: response.data.data });
      });
  }


  componentDidMount() {
    // axios
    //   .get(`http://civicmonitor.herokuapp.com/api/v2/candidates/${this.props.candidateId}/issue-position/${this.props.issueId}`)
    //   .then(res => {
    //     this.setState({ issue_position: res.data.data });
    //   });
    this._loadIssuePositionData(this.props.candidateId, this.props.issue);
  }

  componentDidUpdate(prevProps, prevState) {

    console.log("should update");
      if (this.props.candidateId !== prevProps.candidateId || this.props.issue.id !== prevProps.issue.id) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
        console.log("did update");

      this._loadIssuePositionData(this.props.candidateId, this.props.issue);
   
  }
  }

  //   componentWillMount() {
  //     if (!this.state.issue_position.summary) {
  //       this.setState({ GO_DEEPER: true });
  //     }
  //     // axios
  //     //   .get(`http://civicmonitor.herokuapp.com/api/v2/candidates/${this.props.candidateId}/issue-position/${this.props.issueId}`)
  //     //   .then(res => {
  //     //     this.setState({ issue_position: res.data.data });
  //     //   });
  //     axios.get(`https://api.civicmonitor.com/api/v2/politicians/${this.props.candidateId}?with_candidate=true`)
  //       .then((response) => {
  //         return axios.get(`https://api.civicmonitor.com/api/v2/candidates/${response.data.candidates[0].id}/issue-position/${this.props.issue.id}`)
  // ; // using response.data
  //       })
  //       .then((response) => {
  //         this.setState({ issue_position: response.data.data });      });

  //   }

  render(props) {
    const loadingImg = (
      <div className="album-img">
        <img
          alt="loading"
          src="https://media.giphy.com/media/y1ZBcOGOOtlpC/200.gif"
        />
      </div>
    );

    let { name, imgPath, issue, candidateId } = this.props;
    // console.log(this.state.issue_position);
      if (this.state.issue_position.length > 0) {
        return <loadingImg/>
      }else {
        return <CompareCard imgPath={imgPath} name={name} issue_position={this.state.issue_position}/>
      }
    }

  
}




export default CompareCardContainer;