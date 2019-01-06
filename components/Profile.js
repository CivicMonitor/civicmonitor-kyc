<<<<<<< HEAD
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
=======
import React from 'react'

export default function (props) {
    const { biography, works, family, education, honors} = props.politician;
>>>>>>> 0a7974b3945905b7f821bead200381e635a85c50
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


<<<<<<< HEAD
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


          
=======
    <div style={{marginTop: "100px"}}>
          {/* another info card */}
          {biography && <div
           className="bg-white w-full shadow rounded mt-5 sm:-mt-20 p-5 whitespace-pre-wrap">
              <h3 className="mb-5"> Biography</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", padding: "15px", borderRadius: "5px"}} dangerouslySetInnerHTML={{ __html: biography }} />
          </div>}

          <div className={biography ? "bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap" : "mt-5 sm:-mt-20 bg-white w-full shadow rounded p-5 whitespace-pre-wrap"}>
              <h3 className="mb-5">Work Experience</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", padding: "15px", borderRadius: "5px"}} dangerouslySetInnerHTML={{ __html: works }} />
          </div>
>>>>>>> 0a7974b3945905b7f821bead200381e635a85c50
          {/* another info card */}
          {honors && (
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">
<<<<<<< HEAD

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
=======
              <h3 className="mb-5">Honors</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px",  padding: "15px", borderRadius: "5px"}}  dangerouslySetInnerHTML={{ __html: honors }} />
          </div>
>>>>>>> 0a7974b3945905b7f821bead200381e635a85c50

          {/* another info card */}
          {family && (
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">
<<<<<<< HEAD

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

=======
              <h3 className="mb-5">Family</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px",  padding: "15px", borderRadius: "5px"}}  dangerouslySetInnerHTML={{ __html: family }} />
          </div>
>>>>>>> 0a7974b3945905b7f821bead200381e635a85c50
          {/* another info card */}
          {biography && (
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">
<<<<<<< HEAD

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

    
=======
              <h3 className="mb-5">Education</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", padding: "15px", borderRadius: "5px"}}  dangerouslySetInnerHTML={{ __html: education }} />
          </div>
>>>>>>> 0a7974b3945905b7f821bead200381e635a85c50
    </div>
  );
}
