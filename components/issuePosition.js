import React, { Component } from 'react';
import "react-accessible-accordion/dist/fancy-example.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody
} from "react-accessible-accordion";

class issuePosition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GO_DEEPER: false
        }
      
    }

    componentDidMount () {
        if (!this.props.position.summary) {
          this.setState({ GO_DEEPER: true });
        }
    }
    handleMore() {
        this.setState({
            GO_DEEPER: this.state.GO_DEEPER ? false : true
        })
    }


    render() {

        const {position} = this.props;

   

        return (
            <div
                key={position.id}
                className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap"
            >
                <Accordion className="no-border">
                    <AccordionItem>
                        <AccordionItemTitle className="sticky pin-t accordion__title">
                            {position.issue.title && (
                                <h3 className="mb-5 u-position-relative u-margin-bottom-s">
                                    {position.issue.title}{" "}
                                    <div
                                        className="accordion__arrow"
                                        role="presentation"
                                    />
                                </h3>
                            )}
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            {position.title && (
                                <h4 className="mb-5">{position.title}</h4>
                            )}
                            {position.summary && (
                                <>
                                    <div
                                        className=" leading-loose text-justify"
                                        dangerouslySetInnerHTML={{
                                            __html: position.summary
                                        }}
                                    />
                                    <button
                                        onClick={e => this.handleMore()}
                                        className="my-4 bg-indigo shadow uppercase rounded sm:rounded text-white text-sm font-bold tracking-wide px-4 py-2 hover:bg-indigo-light"
                                    >
                                        GO DEEPER
                        </button>
                                </>
                            )}
                            {this.state.GO_DEEPER && (
                                <div
                                    className="leading-loose text-justify"
                                    dangerouslySetInnerHTML={{
                                        __html: position.body
                                    }}
                                />
                            )}

                        
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    }
}

export default issuePosition;