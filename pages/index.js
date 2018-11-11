import "../styles/style.css";
import Card from "../components/Card";
import MyLoader from "../components/MyLoader";
import React, { Component, Fragment } from "react";
import axios from "axios";

export default class extends Component {
  static async getInitialProps({ req }) {
    return axios
      .get("https://civicmonitor.herokuapp.com/api/v2/politicians")
      .then(function(response) {
        // console.log(response.data);
        return response.data;
      })
      .then(function(response) {
        return { politicians: response };
      })
      .catch(e => console.log(e));

    // return { politicians };
    // console.log(await candidates.json());
  }

  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      politicians: []
    };
  }

  componentWillMount() {
    if (!this.state.politicians.length > 0) {
      console.log("first time only");
      this.setState({ politicians: this.props.politicians });
    } else {
      console.log(this.state);
    }
  }

  componentDidMount() {
    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadPoliticians,
        state: { error, isLoading, hasMore, nextPage }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        console.log(this.state);
        loadPoliticians(this.state.politicians.next_page_url);
      }
    };
  }

  loadPoliticians = next_page_url => {
    this.setState({ isLoading: true }, () => {
      if (next_page_url == undefined || next_page_url == null) return;
      axios
        .get(next_page_url)
        .then(res => {
          return res.data;
        })
        .then(res => {
          const { data: stateData } = this.state.politicians;
          const { data: resData } = res;
          const newData = [...stateData, ...resData];
          res.data = newData;

          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: res.next_page_url ? true : false,
            isLoading: false,
            politicians: res
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  render() {
    return (
      <div>
        <div
          className="hero-cover"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('static/images/cover.jpg')"
          }}
        >
          <div className="container mx-auto px-6 py-8 sm:py-16 md:py-24">
            <div className="mb-6">
              <svg
                className="block w-32"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 57.04 53.48"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M36.24,43.83a2.82,2.82,0,0,0-.73.77,8.86,8.86,0,0,1-1.78,2.17,1.26,1.26,0,0,1-.89.2c-1.8.06-3.61-.12-5.41-.06-.93,0-1.84,0-2.76,0-.6,0-.67-.25-.5-.71s.49-1,.73-1.46c.74-1.46,1.47-2.93,2.23-4.38a1.21,1.21,0,0,1,1-.29c1.06,0,2.13,0,3.19,0,.64,0,.87-.26.87-.89,0-2.62,0-5.24,0-7.86,0-.19.08-.45-.13-.57s-.43.11-.6.24c-1.08.76-2.19,1.49-3.23,2.3a1.32,1.32,0,0,1-1.76.09,43.28,43.28,0,0,0-5.2-2.89.77.77,0,0,1-.46-.8q0-14.52,0-29c0-.56.23-.63.7-.63,2,0,3.94,0,5.91,0,.6,0,.73.2.73.76,0,3.94,0,7.89,0,11.83,0,4.2,0,8.4,0,12.61,0,.52.09.93.6,1.12,1,.4,1.74,1.28,2.82,1.6.61.18.75-.05.79-.55,0-.2,0-.41,0-.62V.92c0-.89,0-.89.87-.89,1.92,0,3.84,0,5.76,0,.55,0,.69.17.69.71q0,19.41,0,38.83A2,2,0,0,1,39,41C38.05,41.91,37.24,43,36.24,43.83Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M51.25,40.25l.15,0c.09.08.23,0,.32.14l0,0,.05,0a.38.38,0,0,1,.22.13l0,0h0c.13,0,.28,0,.37.14h0a1.47,1.47,0,0,1,1.06.47h0a2.78,2.78,0,0,1,1.4.62h0a1.4,1.4,0,0,1,.54.25.42.42,0,0,1,.16.27.43.43,0,0,1-.06.22,1.45,1.45,0,0,1-.12.19c-1.36,1.23-2.32,2.83-3.7,4a1.17,1.17,0,0,1-1.6.26c-2-.9-4-2-6.08-2.8-.29-.11-.51-.33-.78-.46h0c-.12,0-.25-.06-.37-.11-1-.4-1-.4-1-1.47V8.87a2.13,2.13,0,0,0,0-.62c-.39-1.22.44-1.85,1.17-2.53v0a.86.86,0,0,0,.13-.14l0,0c1.08-1.27,2.16-2.54,3.26-3.8a1,1,0,0,1,.49-.36h0a.49.49,0,0,1,.15-.17h0A.86.86,0,0,1,47.5.88l0,0a.37.37,0,0,0,.12-.13l0,0A1.47,1.47,0,0,1,49.11,0c2.4,0,4.81,0,7.22,0,.78,0,.78,0,.63.74a9.5,9.5,0,0,1-.9,2.28h0c-.1.37,0,.78-.34,1.08h0c-.09.22-.06.48-.28.65h0c-.49,2-.49,2-2.48,2-.89,0-1.77,0-2.65,0-.61,0-.86.12-.86.82v31.1c0,.39,0,.78.39,1a.08.08,0,0,0,.11,0c.39.1.83.1,1.11.47h0A.64.64,0,0,1,51.25,40.25Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M16.9,18.69A6.42,6.42,0,0,1,15.53,18c-.37-.19-.32-.36,0-.64.48-.51,1.16-.77,1.64-1.28h0a.77.77,0,0,0,.46-.31l0,0,0,0c.57-.21,1-.51.94-1.22a21.16,21.16,0,0,1,0-3.47c.05-.76-.18-1.16-.9-1.31h0c-.14-.35-.51-.18-.75-.32h0c-.07-.11-.21-.07-.29-.16h0c-.08-.09-.22-.07-.31-.14h0A.26.26,0,0,0,15.89,9L15.75,9a.4.4,0,0,0-.2-.11.08.08,0,0,1-.11,0c-.08-.08-.22,0-.3-.14h0c-.08-.1-.22-.07-.3-.15h0c-.35-.33-.87-.38-1.22-.66-.85-.65-1.52-.33-2.23.21-1,.74-2,1.4-3,2.12-.15.11-.31.35-.53.22s-.11-.37-.12-.57c0-.68,0-1.35,0-2,0-.89.07-1,1-1,2.12,0,4.24-.07,6.36-.13.39,0,.71-.11.79-.48.22-1,.9-1.84,1-2.89.17-.11,0-.34.16-.47h0A7.65,7.65,0,0,0,17.8.74c.29-.69.25-.71-.52-.71C14,0,10.76.07,7.51,0a2,2,0,0,0-2,1h0a.81.81,0,0,0-.29.32h0A.28.28,0,0,0,5,1.53H5a5.69,5.69,0,0,0-1,1.07h0A16.62,16.62,0,0,0,1.75,5.24h0a.71.71,0,0,0-.15.15h0a.67.67,0,0,0-.14.15h0a.61.61,0,0,0-.15.17h0A2.56,2.56,0,0,0,.35,6.8h0A4.32,4.32,0,0,0,.27,8.49q0,11.71,0,23.43c0,.93,0,.95,1,.95,1.85,0,3.69,0,5.53,0,.83,0,.83,0,.83-.86q0-4.39,0-8.79c0-.5.09-.68.62-.43a22.07,22.07,0,0,0,2.13.92,1.09,1.09,0,0,1,.85,1.3C11,27.36,11,29.72,11,32.08c0,.61.21.81.82.8,1.89,0,3.78,0,5.68,0,1,0,1,0,1-1V20.82C18.48,19.46,18.21,19,16.9,18.69ZM11,18,7.88,20.19a.28.28,0,0,1-.29.08c-.09-.7-.09-6.51,0-7.16,0,0,.11,0,.15,0l3.51,1.53v2.95A.51.51,0,0,1,11,18Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M12.17,45.25a35.39,35.39,0,0,1-.06-3.57c0-.31.06-.36.36-.37s.68,0,1,0,.35.09.36.39v2.41a6.78,6.78,0,0,0,0,.78.75.75,0,0,0,.66.66.86.86,0,0,0,1.11-.92c0-.86,0-1.72,0-2.57a5.06,5.06,0,0,1,0-.55.21.21,0,0,1,.2-.19,3.7,3.7,0,0,1,.47,0c1.13,0,1-.1,1,1,0,.88,0,1.77,0,2.65a2,2,0,0,1-1.37,1.79,4.52,4.52,0,0,1-1.16.1c-.2,0-.41,0-.62,0a1.85,1.85,0,0,1-1.76-1,1.06,1.06,0,0,0-.19-.24A.15.15,0,0,1,12.17,45.25Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M.38,42c-.06-.12-.11-.23-.17-.34s0-.31.14-.31A5.57,5.57,0,0,1,2,41.4H2a6.84,6.84,0,0,0,.75,1.35c.06.1.08.26.29.28a11,11,0,0,0,.77-1.29.69.69,0,0,1,.74-.43c.31,0,.63,0,.94,0s.39.14.19.44L4.61,43.35a7.23,7.23,0,0,1-.44.64,1.56,1.56,0,0,0-.37,1.22c0,.21,0,.42,0,.62,0,1.14.15,1-1,1-.57,0-.62.05-.61-.58v-.86a1.67,1.67,0,0,0-.46-1.5A20.82,20.82,0,0,0,.38,42Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M23.54,46.5c-.22-.44-.45-.88-.68-1.31a1.92,1.92,0,0,0-.74-.8l.34-.21a1.39,1.39,0,0,0,.64-.65A1.48,1.48,0,0,0,22,41.38c-1.12-.11-2.23-.06-3.34-.07a.23.23,0,0,0-.25.24c0,.1,0,.2,0,.31v4.43c0,.1,0,.2,0,.3a.2.2,0,0,0,.21.19c.36,0,.72,0,1.08,0s.33-.06.33-.31c0-.57,0-1.14,0-1.71,0-.19.15-.26.33-.19a.87.87,0,0,1,.5.46c.09.18.2.36.3.54a4.91,4.91,0,0,0,.72,1.18l1.47,0C23.54,46.79,23.63,46.67,23.54,46.5Zm-1.89-3.56a.24.24,0,0,1-.16.21,1.23,1.23,0,0,1-.5.12c-.44,0-.45,0-.44-.44V42.6c0-.09.05-.16.13-.16a3.31,3.31,0,0,1,.63,0A.38.38,0,0,1,21.65,42.94Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M11.28,43.07a2.41,2.41,0,0,0-2.1-1.78,7.34,7.34,0,0,0-1.24,0,2.19,2.19,0,0,0-1.76,1.13,3.26,3.26,0,0,0-.09,3.12,2.09,2.09,0,0,0,1.45,1.19,5.24,5.24,0,0,0,1,.11l.64,0a2.11,2.11,0,0,0,1.94-1.31A3.65,3.65,0,0,0,11.28,43.07ZM9.65,44.68a1,1,0,0,1-1,.91,1.06,1.06,0,0,1-1.11-.78,3.85,3.85,0,0,1,0-1.55.89.89,0,0,1,.85-.67,1.07,1.07,0,0,1,.94.24,1,1,0,0,1,.32.69c0,.18,0,.36,0,.54h0C9.65,44.27,9.67,44.48,9.65,44.68Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M5.46,51.6a.56.56,0,0,0-.17.47h0a1,1,0,0,1-.3.48H5a.28.28,0,0,1-.15.17h0A3.07,3.07,0,0,1,1.13,53a2.72,2.72,0,0,1-.94-3.21.29.29,0,0,0,0-.27c.06-.11,0-.25.13-.35l0,0,0-.06a.94.94,0,0,1,.6-.83H1c.27-.15.4-.52.79-.42l.45-.08a8.92,8.92,0,0,1,1.55,0,1.82,1.82,0,0,1,1.67,1.38.47.47,0,0,1-.3.5,1.43,1.43,0,0,1-1.33.14c-.11-.07-.19-.17-.3-.25-.67-.48-1.27-.23-1.38.59a3.25,3.25,0,0,0,0,.54c0,.43,0,.86.51,1s.77-.07,1.06-.42A1.09,1.09,0,0,1,5.46,51.6Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M17.12,53.17a4.34,4.34,0,0,1-1.39.08c-.23,0-.37-.16-.49-.34l-1.08-1.6a.91.91,0,0,0-.08-.13c-.2-.19-.26-.5-.53-.64-.25.25-.1.57-.12.86,0,.51,0,1,0,1.55a.28.28,0,0,1-.28.3h-.23c-1.1,0-1,.12-1-1,0-1.5,0-3,0-4.5.79-.44,1.39-.34,1.78.3s1,1.46,1.44,2.2a1.92,1.92,0,0,0,.18.22c.19-.07.15-.21.15-.33,0-.67,0-1.35,0-2,0-.15,0-.32.13-.41l1.24,0a.22.22,0,0,1,.25.23c0,.18,0,.37,0,.55V51.8c0,.26,0,.52,0,.77a.38.38,0,0,1,0,.6Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M42.72,47.79l3.33,0,1,0c.46.26.22.68.18,1s-.4.24-.65.25c-.52,0-1,0-1.55,0-.27,0-.47.1-.44.4s.24.3.46.29c.49,0,1,0,1.47,0s.6.19.61.61-.06.72-.55.76-1,0-1.47,0c-.19,0-.37.06-.41.28s.11.31.32.33c.75.1,1.55-.2,2.26.26.31,1.08.09,1.39-1,1.39h-3c-.46,0-.77-.14-.73-.65.12-1.5,0-3,.06-4.48C42.61,48.06,42.58,47.91,42.72,47.79Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M47.85,51.34h1.46c.06.12.11.2.16.29a.9.9,0,0,0,1.2.51.49.49,0,0,0,0-.93,4.62,4.62,0,0,0-.66-.21,4,4,0,0,1-1.29-.45,1.43,1.43,0,0,1-.22-2.39,1.63,1.63,0,0,1,1-.41,9.07,9.07,0,0,0,.91-.14c.51.19,1.21-.24,1.56.48h0a.14.14,0,0,1,.16.15c.34.29.6.62.33,1.07s-1.07.4-1.52.14-.52-.6-1-.42c.16.39.51.35.78.43.76.25,1.58.39,1.93,1.26h0a1.83,1.83,0,0,1-1.07,2.5,3.48,3.48,0,0,1-3.19-.31A1.21,1.21,0,0,1,47.85,51.34Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M37.09,47.76h5c.56.94.27,1.53-.77,1.55-.27,0-.57-.06-.81.16a32.51,32.51,0,0,0,0,3.42c.11.11.11.21,0,.3v0A1.81,1.81,0,0,1,39,53.3c-.46-.08-.41-.57-.38-.9.06-.8,0-1.6,0-2.4,0-.48-.13-.69-.65-.71C36.83,49.26,36.67,49,37.09,47.76Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M25.41,47.73a.26.26,0,0,1,.15.25V52.9c0,.26-.08.35-.3.35a4,4,0,0,1-1.38-.08h0c-.13-.09-.12-.19,0-.3s0-.51,0-.77c0-1.17,0-2.34,0-3.5,0-1-.1-.85.81-.85Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M23.13,49.87c-.17-.61-.15-1.32-.86-1.64a3.59,3.59,0,0,0-1.92-.48c-.75,0-1.5,0-2.25,0A.4.4,0,0,0,18,48c0,1.58.08,3.15-.06,4.73,0,.44.25.58.64.58.73,0,1.45,0,2.18,0a2.32,2.32,0,0,0,2.39-2.17A3.16,3.16,0,0,0,23.13,49.87ZM21.32,51.2a.87.87,0,0,1-.75.77H20.1c-.3,0-.35,0-.35-.37s0-.73,0-1.09h0V49.34a.28.28,0,0,1,.3-.28h.39a.94.94,0,0,1,.89.82C21.33,50.32,21.35,50.76,21.32,51.2Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M31.77,50.21c-.06-.59,0-1.44-.78-1.83a3.1,3.1,0,0,0-2.08-.63c-.74,0-1.48,0-2.23,0-.07.07-.17.15-.17.25a42.7,42.7,0,0,0,0,4.8c0,.42.32.54.71.54.72,0,1.45.06,2.17,0C31.24,53.16,32,52.19,31.77,50.21ZM29,52a2.55,2.55,0,0,1-.39,0,.22.22,0,0,1-.24-.23l-.09-1.23h0c0-.31-.05-.62-.07-.93,0-.47,0-.51.52-.53a1,1,0,0,1,1.13.89A6.73,6.73,0,0,1,30,51,.94.94,0,0,1,29,52Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M37.31,52.11a.77.77,0,0,0-.26-.45,2.56,2.56,0,0,1-.4-.91A12.47,12.47,0,0,1,36,48.86a1.86,1.86,0,0,0-.45-1.1H33.67a50.56,50.56,0,0,0-2.06,4.92c-.11.25-.12.51.21.64a1.78,1.78,0,0,0,1.82-.53.7.7,0,0,1,.59-.3,4,4,0,0,1,1.3.08l0,0,0,.06c.05.11,0,.26.15.35h0a2.09,2.09,0,0,0,1.76.25C37.93,52.84,37.39,52.49,37.31,52.11Zm-3.26-1a8.39,8.39,0,0,1,.41-1.53c.17-.1.21.07.3.14a5.36,5.36,0,0,1,.32,1.34A3.5,3.5,0,0,1,34.05,51.16Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M11.27,53c0-.15-.1-.29-.15-.44L10,49.36c-.16-.44-.33-.87-.49-1.31a.41.41,0,0,0-.41-.29l-.31,0a.23.23,0,0,0-.31,0H8.28c-.29.08-.64-.07-.9.19A4.56,4.56,0,0,1,7,49.17c-.42,1.16-.86,2.31-1.29,3.46a.93.93,0,0,0-.09.63H6.71c.43,0,.46,0,.61-.45a1.7,1.7,0,0,0,0-.22.3.3,0,0,1,.32-.28h1.4a.42.42,0,0,1,.35.26c.05.12.06.25.1.38a.42.42,0,0,0,.4.31H11.1C11.27,53.25,11.3,53.12,11.27,53ZM7.82,51.11a7.78,7.78,0,0,1,.59-1.74c.32.59.36,1.18.61,1.74A2.44,2.44,0,0,1,7.82,51.11Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M8.71,35.32a.81.81,0,0,0,.33.46H9a.34.34,0,0,0,.05.14c.55.89.78,1.15.83,1A4.64,4.64,0,0,0,10,35.66a.85.85,0,0,0,0-.16c0-1.41-.23-1.14,1.19-1.17.37,0,.4,0,.4.39v4.59a1.94,1.94,0,0,1,0,.24.2.2,0,0,1-.21.18q-.58,0-1.17,0a.45.45,0,0,1-.36-.25c-.2-.3-.41-.59-.61-.9A2.81,2.81,0,0,0,8.77,38a.4.4,0,0,1-.29-.43A1,1,0,0,0,8,37a2.61,2.61,0,0,0,0,.66c0,.55,0,1.09,0,1.64,0,.34,0,.4-.42.4-1.39,0-1.15.23-1.17-1.11,0-1.17,0-2.33,0-3.5v-.55c0-.14.07-.24.23-.25h.15a3.71,3.71,0,0,1,1.16.06c.32.12.43.55.66.83A.52.52,0,0,0,8.71,35.32Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M5.75,39.36c0,.37,0,.37-.2.38h-1c-.76,0-.63.12-1.06-.65-.24-.43-.44-.88-.67-1.32-.07-.14-.18-.15-.31,0s-.2.24-.32.34a.88.88,0,0,0-.32.75c0,1,.15.9-.9.92s-.85,0-.85-.84c0-1.27,0-2.54,0-3.81,0-.19,0-.37,0-.55a.21.21,0,0,1,.2-.2,1.62,1.62,0,0,1,.38,0c.36,0,.8-.15,1.06.08s.08.69.11,1c0,.2,0,.41,0,.6.21.07.27-.06.35-.16l1.15-1.36a.44.44,0,0,1,.39-.2H5.4a.24.24,0,0,1,.19.08c.09.11,0,.18-.09.24-.44.45-.88.89-1.31,1.34s-.35.38,0,.88A7,7,0,0,1,5.75,39.36Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M24.9,38.55a.87.87,0,0,0-.14.73.59.59,0,0,0-.13.19.35.35,0,0,1-.41.27h-.93c-.36,0-.42-.07-.52-.44-.21-.79-.43-1.58-.64-2.37a.38.38,0,0,0-.05-.15A.31.31,0,0,0,22,36.7s-.09,0-.11.07c-.22.79-.45,1.58-.67,2.37,0,.1,0,.2-.06.3a.42.42,0,0,1-.41.3h-.85c-.44,0-.55-.08-.64-.49-.17-.73-.32-1.46-.48-2.18s-.31-1.4-.46-2.1c0-.15,0-.31-.05-.46a.14.14,0,0,1,.13-.16h1.24c.15,0,.2.13.22.27.06.43.13.86.2,1.29a1.4,1.4,0,0,0,.09.29c.17.21-.06.53.23.72a2.11,2.11,0,0,0,.36-.88c.11-.45.21-.89.34-1.33s.19-.38.49-.38.81-.12,1.13.06.26.69.41,1a9.59,9.59,0,0,1,.34,1.33c0,.07.06.16.15.15s.15-.12.15-.22a.77.77,0,0,0,0-.15,1.06,1.06,0,0,1,.17-1.09,5.1,5.1,0,0,0,.19-.5c.15-.62.14-.63.79-.62a1.74,1.74,0,0,1,.84.08,5,5,0,0,1-.22,1.28c-.18.85-.38,1.7-.57,2.55A1.6,1.6,0,0,0,24.9,38.55Z"
                    />
                    <path
                      className="fill-current text-white hover:text-grey-darker"
                      d="M17.94,36.31a2.29,2.29,0,0,0-1.72-2,4,4,0,0,0-1.75-.06,2.62,2.62,0,0,0-1.51.84l-.3.35a4.5,4.5,0,0,0-.25,2.05,2.33,2.33,0,0,0,1.48,2.09,3.92,3.92,0,0,0,2.2.13,2.92,2.92,0,0,0,1.48-.9c.08-.33.33-.59.35-.93A6.67,6.67,0,0,0,17.94,36.31Zm-1.87,1.82a.81.81,0,0,1-.63.4c-.74.09-1-.15-1.31-.88a2.15,2.15,0,0,1,.1-1.58,1.06,1.06,0,0,1,1.7-.27A1.39,1.39,0,0,1,16.29,37,1.68,1.68,0,0,1,16.07,38.13Z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="mb-12">
              <h1 className="font-display text-white text-5xl sm:text-6xl font-semibold mb-4 leading-none">
                Know your candidates
              </h1>
              <p className="text-xl sm:text-2xl text-blue-light leading-normal">
                Get the Information you need to make the right decision
                <br className="hidden md:inline" />
                don't <strong className="text-white font-bold"> sell </strong>
                your
                <strong className="text-white font-bold"> vote.</strong>
              </p>
            </div>
            <form className="max-w-sm sm:flex">
              <input
                className="block w-full shadow bg-white px-6 py-3 sm:py-4 mb-2 sm:mb-0 rounded sm:rounded-r-none text-lg mb-4 sm:mb-0"
                placeholder="Enter Politician Name"
              />
              <button className="w-full sm:w-auto bg-indigo uppercase rounded sm:rounded-l-none text-white font-bold tracking-wide px-6 py-3 hover:bg-indigo-light">
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-6 py-10">
          <div className="mb-16">
            <div className="flex justify-between items-baseline border-b-2 border-grey-light mb-10">
              <span className="font-display font-bold tracking-wide uppercase py-4 border-b-2 border-indigo -mb-2px">
                Candidates
              </span>
              <span className="font-semibold text-indigo-dark hover:underline no-underline">
                View All
              </span>
            </div>
            <div className="flex flex-wrap -mx-4">
              {this.state.politicians.data.map(politician => {
                return (
                  <Card
                    key={politician.id}
                    name={politician.name}
                    imgPath={politician.image}
                  />
                );
              })}
              {this.state.isLoading && <MyLoader />}
              {!this.state.hasMore && (
                <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
                  <p className="font-sans text-indigo-dark text-black">
                    You did it! You reached the end!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 border-t-2 border-grey-light text-center py-8 text-grey=dark">
            A Project by
            <a
              href="#"
              className="text-indigo-dark font-semibold no-underline hover:underline"
            >
              Civic Monitor
            </a>
          </div>
        </div>
      </div>
    );
  }
}
