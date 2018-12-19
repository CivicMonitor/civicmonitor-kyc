import React from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
export default function(props) {
  const {
    biography,
    works,
    family,
    education_primary,
    education_secondary,
    education_university,
    honors
  } = props.politician;
  return (
    <div style={{ marginTop: "100px" }}>
      

      {/* another info card */}
      <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">

              <Accordion className="no-border">
                  <AccordionItem>
                      <AccordionItemTitle>
                          <h3 className="mb-5 u-position-relative u-margin-bottom-s">
                              Education <div className="accordion__arrow" role="presentation" />
                          </h3>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                          <div>
                              {" "}
                              <p
                                  style={{
                                      textAlign: "justify",
                                      lineHeight: "2.4",
                                      fontSize: "20px",
                                      padding: "15px",
                                      borderRadius: "5px"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: education_primary }}
                              />
                              <p
                                  style={{
                                      textAlign: "justify",
                                      lineHeight: "2.4",
                                      fontSize: "20px",
                                      padding: "15px",
                                      borderRadius: "5px"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: education_secondary }}
                              />
                              <p
                                  style={{
                                      textAlign: "justify",
                                      lineHeight: "2.4",
                                      fontSize: "20px",
                                      padding: "15px",
                                      borderRadius: "5px"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: education_university }}
                              />
                          </div>
                      </AccordionItemBody>
                  </AccordionItem>
              </Accordion>
            
      </div>


          {/* another info card */}
          {works && (
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">

              <Accordion className="no-border">
                  <AccordionItem>
                      <AccordionItemTitle>
                          <h3 className="mb-5 u-position-relative u-margin-bottom-s">
                              Work Experience <div className="accordion__arrow" role="presentation" />
                          </h3>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                          <div>
                              {" "}

                              <p
                                  style={{
                                      textAlign: "justify",
                                      lineHeight: "2.4",
                                      fontSize: "20px",
                                      padding: "15px",
                                      borderRadius: "5px"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: works }}
                              />
                          </div>
                      </AccordionItemBody>
                  </AccordionItem>
              </Accordion>

          </div>)}


          
          {/* another info card */}
          {honors && (
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">

              <Accordion className="no-border">
                  <AccordionItem>
                      <AccordionItemTitle>
                          <h3 className="mb-5 u-position-relative u-margin-bottom-s">
                              Honors <div className="accordion__arrow" role="presentation" />
                          </h3>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                          <div>
                              {" "}
                              <p
                                  style={{
                                      textAlign: "justify",
                                      lineHeight: "2.4",
                                      fontSize: "20px",
                                      padding: "15px",
                                      borderRadius: "5px"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: honors }}
                              />
                            
                          </div>
                      </AccordionItemBody>
                  </AccordionItem>
              </Accordion>

          </div>)}

          {/* another info card */}
          {family && (
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">

              <Accordion className="no-border">
                  <AccordionItem>
                      <AccordionItemTitle>
                          <h3 className="mb-5 u-position-relative u-margin-bottom-s">
                              Family <div className="accordion__arrow" role="presentation" />
                          </h3>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                          <div>
                            
                              <p
                                  style={{
                                      textAlign: "justify",
                                      lineHeight: "2.4",
                                      fontSize: "20px",
                                      padding: "15px",
                                      borderRadius: "5px"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: family }}
                              />
                          </div>
                      </AccordionItemBody>
                  </AccordionItem>
              </Accordion>

          </div>)}

          {/* another info card */}
          {biography && (
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">

              <Accordion className="no-border">
                  <AccordionItem>
                      <AccordionItemTitle>
                          <h3 className="mb-5 u-position-relative u-margin-bottom-s">
                              Biography <div className="accordion__arrow" role="presentation" />
                          </h3>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                          <div>
                              {" "}
                              <p
                                  style={{
                                      textAlign: "justify",
                                      lineHeight: "2.4",
                                      fontSize: "20px",
                                      padding: "15px",
                                      borderRadius: "5px"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: biography }}
                              />
                           
                          </div>
                      </AccordionItemBody>
                  </AccordionItem>
              </Accordion>

          </div> )}

    
    </div>
  );
}
