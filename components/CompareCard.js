import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}



class CompareCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GO_DEEPER: props.issue_position.summary ? false : true
    };
  }

  handleMore() {
    this.setState({
      GO_DEEPER: this.state.GO_DEEPER ? false : true
    });
  }  

  render() {
    const { issue_position, imgPath, name } = this.props;
   
    return <div className="w-1/2 flex flex-col text-center items-center justify-between sm:mr-10">
        <div className="sticky pin-t z-50 bg-grey-lighter w-full">
          <img class="w-48 h-48 rounded-full mr-4" src={`https://res.cloudinary.com/civic-monitor/image/upload/${imgPath}`} alt={name} />
          <h2 className="py-5">{name}</h2>
        </div>
        {!Object.keys(issue_position).length < 0 ? <div>
        
            loading
        </div> : <>
                <div className=" leading-loose text-justify" dangerouslySetInnerHTML={{ __html: issue_position.summary }} />
                {issue_position.summary && <button onClick={e => this.handleMore()} className="my-4 bg-indigo shadow uppercase rounded sm:rounded text-white text-sm font-bold tracking-wide px-4 py-2 hover:bg-indigo-light">
                    GO DEEPER
            </button>}

                {!issue_position.summary && this.state.GO_DEEPER || this.state.GO_DEEPER  ? <div className="loose" style={{ textAlign: "justify", lineHeight: "1.5", fontSize: "20px", padding: "15px", borderRadius: "5px" }} dangerouslySetInnerHTML={{ __html: issue_position.body }} /> : ""}
                

            </>}
      </div>;
  }
}

export default connect(mapStateToProps)(CompareCard);
