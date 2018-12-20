import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";
import axios from "axios";
import "../styles/style.css";
import CompareCard from "../components/CompareCard";
import {
  loadCompareIssue,
  loadComparePoliticians,
  selectIssueValue,
  removeFromCompare,
  setCompareValue
} from "../redux/actions/compare-actions";
import ReactGA from "react-ga";
ReactGA.initialize("UA-131193519-1");
ReactGA.pageview("/compare");

export class compare extends Component {
  constructor(props) {
    super(props);
    this.handleSelectIssueChange = this.handleSelectIssueChange.bind(this);
    this.handleSelectPoliticianChange = this.handleSelectPoliticianChange.bind(
      this
    );
    console.log(props);

    //fetch issues if not already fetch
    if (props.issues && !props.issues.length > 0) {
      console.log(props);
      axios
        .get("https://civicmonitor.herokuapp.com/api/v2/issues")
        .then(function({ data }) {
          props.loadIssue(data.data);
        })
        .catch(e => console.log(e));

        
    }

    //fetch politician if not already fetch
    if (props.politicians && !props.politicians.length > 0) {
      console.log(props);
      axios
        .get(
          "https://civicmonitor.herokuapp.com/api/v2/politicians?all=true&lite=true"
        )
        .then(function({ data }) {
          props.loadPoliticians(data.data);
        })
        .catch(e => console.log(e));
    }
  }

  handleSelectIssueChange(e) {
    e.preventDefault();
    let issue = this.props.issues.filter(function (obj) {
      if (obj.title == event.target.value) return obj;
    });
    this.props.issueValue(...issue);
  }
  handleSelectPoliticianChange(e, type) {
    let id = e.target.value;
    let candidate = this.props.politicians.filter(function(obj) {
      if (obj.id == id) return obj;
    });
    console.log(candidate);
    id = Number(candidate[0].id);
    let name = candidate[0].name;
    let imgPath = candidate[0].image;
    this.props.compareValue({ id, name, imgPath, type });
  }

  render() {
    return (
      <div>
        <Nav />

        <div className="text-blue-darkest">
          <div className="container mx-auto py-4">
            <div className="flex flex-col items-center justify-center mb-4 text-center py-4">
              <h2 className="py-5">Compare Candidates</h2>
              <p className="mb-5">
                Struggling to make up your mind on which candidate has a better
                program for you? You can easily compare where they stand on the
                issues you care about.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-darkest text-white">
          <div className="container mx-auto py-20">
            <div className="flex flex-col justify-center items-center md:flex-row">
              <div className="md:mr-4">
                <h3 className="py-2">Select Candidate</h3>
                <select
                  className="block appearance-none w-64 bg-white border border-grey-light hover:border-grey px-6 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={this.props.compare[0] ? this.props.compare[0].id : ""}
                  onChange={e => this.handleSelectPoliticianChange(e, 1)}
                >
                  {this.props.politicians &&
                  this.props.politicians.length < 0 ? (
                    <option>loading</option>
                  ) : (
                    <option>select politicians</option>
                  )}
                  {this.props.politicians && this.props.politicians.length < 0
                    ? ""
                    : this.props.politicians.map(politician => (
                        <option key={politician.id} value={politician.id}>
                          {politician.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="md:mr-4">
                <h3 className="py-2">Select Candidate</h3>

                <select
                  className="block appearance-none w-64 bg-white border border-grey-light hover:border-grey px-6 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={this.props.compare[1] ? this.props.compare[1].id : ""}
                  onChange={e => this.handleSelectPoliticianChange(e, 2)}
                >
                  {this.props.politicians &&
                  this.props.politicians.length < 0 ? (
                    <option>loading {console.log(this.props)}</option>
                  ) : (
                    <option>select politicians</option>
                  )}
                  {this.props.politicians && this.props.politicians.length < 0
                    ? ""
                    : this.props.politicians.map(politician => (
                        <option key={politician.id} value={politician.id}>
                          {politician.name}
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <h3 className="py-2">Select Issue</h3>
                <div className="flex flex-col md:flex-row">
                  <select
                    className="block appearance-none w-64 bg-white border border-grey-light hover:border-grey px-6 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={this.props.selectIssueValue ? "" : this.props.selectedIssueValue.title}
                    onChange={e => this.handleSelectIssueChange(e)}
                  >
                    {this.props.issues && this.props.issues.length < 0 ? (
                      <option>loading</option>
                    ) : (
                      <option>select Issues</option>
                    )}
                    {this.props.issues && this.props.issues.length < 0
                      ? ""
                      : this.props.issues.map(issue => (
                          <option key={issue.id}>{issue.title}</option>
                        ))}
                  </select>
                  {/* <button className="mt-4 md:mt-0 w-full sm:w-auto bg-indigo uppercase rounded sm:rounded-l-none shadow text-white font-bold tracking-wide px-6 py-3 hover:bg-indigo-light">
                    Compare
                  </button> */}
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4">
          <div className="flex flex-col items-center justify-center text-center">
           {this.props.selectedIssueValue.title ? <h1 className="py-5">On {this.props.selectedIssueValue.title}</h1> : ""}
          </div>
        </div>
        <div className="container mx-auto">
        
          <div className="flex py-20 items-baseline">
            {this.props.selectedIssueValue ? this.props.compare.map(e => (<CompareCard name={e.name} candidateId={e.id} issue={this.props.selectedIssueValue} imgPath={e.imgPath} />)) : ""}
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    compare,
    status,
    issues,
    selectedIssueValue,
    politicians
  } = state.compareReducer;
  return { compare, status, issues, selectedIssueValue, politicians };
};

const mapDispatchToProps = dispatch => {
  return {
    loadIssue: payload => {
      dispatch(loadCompareIssue(payload));
    },
    loadPoliticians: payload => {
      dispatch(loadComparePoliticians(payload));
    },
    issueValue: payload => {
      dispatch(selectIssueValue(payload));
    },
    compareValue: payload => {
      dispatch(setCompareValue(payload));
    },
    removeCompare: payload => {
      dispatch(removeFromCompare(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compare);
