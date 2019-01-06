
import React, { Component } from "react";
import IssuePosition from "./issuePosition";
export default class IssuePositions extends Component {

  
  
  render() {
    
    const { IssuePositions } = this.props;

    return <div>
        <div className="flex border-b-2 border-grey-light mb-4">
          <span className="font-display font-bold tracking-wide uppercase py-4 border-b-2 border-indigo -mb-2px">
            Issue Positions
          </span>
        </div>
        {/* another info card */}

        {IssuePositions && IssuePositions.map(position => (
           <IssuePosition  position={position}/>
          ))}
      </div>;
  }
}
