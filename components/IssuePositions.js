
<<<<<<< HEAD
import React, { Component } from "react";
import IssuePosition from "./issuePosition";
export default class IssuePositions extends Component {
=======
export default function IssuePositions(props) {
  const { IssuePositions } = props;
  console.log(IssuePositions);
  return <div style={{ textAlign : "justify"}}>
      <div className="flex border-b-2 border-grey-light mb-4">
        <span className="font-display font-bold tracking-wide uppercase py-4 border-b-2 border-indigo -mb-2px">
          Issue Positions
        </span>
      </div>
      {/* another info card */}
>>>>>>> 0a7974b3945905b7f821bead200381e635a85c50

  
  
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
