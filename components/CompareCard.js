import { connect } from 'react-redux';
import React, { Component, Suspense } from "react";
import axios from "axios";




class CompareCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issue_position: []
    };
  }


  componentWillUpdate() {
    // axios
    //   .get(`http://civicmonitor.herokuapp.com/api/v2/candidates/${this.props.candidateId}/issue-position/${this.props.issueId}`)
    //   .then(res => {
    //     this.setState({ issue_position: res.data.data });
    //   });
    axios.get(`http://civicmonitor.herokuapp.com/api/v2/politicians/${this.props.candidateId}?with_candidate=true`)
      .then((response) => {
        return axios.get(`http://civicmonitor.herokuapp.com/api/v2/candidates/${response.data.candidates[0].id}/issue-position/${this.props.issue.id}`)
; // using response.data
      })
      .then((response) => {
        this.setState({ issue_position: response.data.data });      });
      
  }
  componentWillMount() {
    // axios
    //   .get(`http://civicmonitor.herokuapp.com/api/v2/candidates/${this.props.candidateId}/issue-position/${this.props.issueId}`)
    //   .then(res => {
    //     this.setState({ issue_position: res.data.data });
    //   });
    axios.get(`http://civicmonitor.herokuapp.com/api/v2/politicians/${this.props.candidateId}?with_candidate=true`)
      .then((response) => {
        return axios.get(`http://civicmonitor.herokuapp.com/api/v2/candidates/${response.data.candidates[0].id}/issue-position/${this.props.issue.id}`)
; // using response.data
      })
      .then((response) => {
        this.setState({ issue_position: response.data.data });      });
      
  }

  
  render(props) {
    const loadingImg = (
      <div className="album-img">
        <img
          alt="loading"
          src="https://media.giphy.com/media/y1ZBcOGOOtlpC/200.gif"
        />
      </div>
    );

let {name, imgPath,issue, candidateId} = this.props
console.log(this.state.issue_position);
      return (issue.id &&( <>
          <div className="w-1/2 flex flex-col text-center items-center justify-between sm:mr-10">
            <img class="w-48 h-48 rounded-full mr-4" src={`https://res.cloudinary.com/civic-monitor/image/upload/${imgPath}`} alt={name} />
            <h2 className="py-5">{name}</h2>
            <Suspense fallback={loadingImg}>
            {this.state.issue_position ? <div className="loose" style={{
              textAlign: "justify",
              lineHeight: "1.5",
              fontSize: "20px",
              padding: "15px",
              borderRadius: "5px"
            }} dangerouslySetInnerHTML={{ __html: this.state.issue_position.body }} /> : ""}
            </Suspense>
           
          </div>
       
       </>)
      )
    
    }  

  
    
}




export default CompareCard;