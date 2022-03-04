import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import "./app.scss";
import axios from "axios";

import personWithDeskImage from "./url-shortening-api-master/images/illustration-working.svg";
import brandRecon from "./url-shortening-api-master/images/icon-brand-recognition.svg";
import detailRecord from "./url-shortening-api-master/images/icon-detailed-records.svg";
import fullCus from "./url-shortening-api-master/images/icon-fully-customizable.svg";

function App() {
  let storedUrls = [];
  localStorage.getItem("urls")
    ? (storedUrls = JSON.parse(localStorage.getItem("urls")))
    : (storedUrls = []);

  const [HandlePopUp, setHandlePopUp] = useState(false);
  const [copied, setCopied] = useState("");
  const [url, setUrl] = useState(null);
  const [data, setData] = React.useState(null);

  const [urlList, setUrlList] = useState(storedUrls);

  const ham = (
    <svg viewBox="0 0 100 80" width="40" height="40" fill="hsl(257, 7%, 63%)">
      <rect width="100" height="10"></rect>
      <rect y="30" width="100" height="10"></rect>
      <rect y="60" width="100" height="10"></rect>
    </svg>
  );
  function CopyUrl(url) {
    navigator.clipboard.writeText(url);
    setCopied(url);
  }

  const btnClick = (url) => {
    axios
      .get(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then((response) => {
        let dta = response.data;
        if (dta !== undefined && dta !== null) {
          let urls = [...urlList, dta.result];
          //below snippet will create unigue json array
          let uniqueUrls = [...new Set(urls.map(JSON.stringify))].map(
            JSON.parse
          );
          setUrlList(uniqueUrls);
        }
      });
  };
  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urlList)); //store colors
    //let storedColors = JSON.parse(localStorage.getItem("my_colors"));
    //localStorage.setItem("urlList", urlList);
  }, [urlList]);

  return (
    <div className="">
      <header className="">
        <nav>
          <div className="leftNav">
            <h1>Shortly</h1>
            <div className="subHeading">Features</div>
            <div className="subHeading">Pricing</div>
            <div className="subHeading">Resources</div>
          </div>
          <div className="rightNav">
            <button className="loginBtn">Login</button>
            <button className="signupBtn">Sign Up</button>
          </div>
          <div className="rightNavMobile">
            <div
              className="hamContainer"
              onClick={() => setHandlePopUp(!HandlePopUp)}
            >
              {ham}
            </div>
          </div>
        </nav>
        {HandlePopUp ? (
          <div className="popupNav">
            <div className="subHeading">Features</div>
            <div className="subHeading">Pricing</div>
            <div className="subHeading">Resources</div>
            <hr />
            <div className="loginBtn">Login</div>
            <div className="signupBtn">Sign Up</div>
          </div>
        ) : (
          ""
        )}
      </header>
      <main>
        <section className="section1">
          <div className="bigText">
            <div className="bigTextHeading">More than just shorter links</div>
            <div className="bigTextDescrption">
              Build your brand's recognition and get detailed insights on how
              your links performing
            </div>
            <div className="getStartedBtn">Get Started</div>
          </div>
          <div className="personWithDesk">
            <img src={personWithDeskImage} alt="" />
          </div>
        </section>
        <section className="section2">
          <div className="IOContainer">
            <div className="inputContainer">
              <input
                type="text"
                className={url === "" ? "urlInputErr" : "urlInput"}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button className="submitLink" onClick={() => btnClick(url)}>
                Shorten it!
              </button>
            </div>
            <div style={{ position: "absolute" }}>
              {url === "" ? (
                <div style={{ color: "red" }}>please enter Valid Link</div>
              ) : (
                <div style={{ color: "transparent" }}>Ok good</div>
              )}
            </div>
          </div>
          <div className="outputContainer">
            {urlList &&
              urlList.map((url) => (
                <div key={url.original_link} className="itemContainer">
                  <div className="itemHeader">{url.original_link}</div>
                  <hr className="hr" />
                  <div className="linkContainer">
                    <a href={"https://" + url.short_link}>{url.short_link}</a>

                    {url.short_link === copied ? (
                      <button
                        onClick={() => {
                          CopyUrl(url.short_link);
                        }}
                        className="copied"
                      >
                        <p>Copied !</p>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          CopyUrl(url.short_link);
                        }}
                        className="copy"
                      >
                        <p>Copy</p>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="advContainer">
            <div className="advText">Advanced Statistics</div>
            <div className="advDescription">
              Track how your links are performing across the web with our
              advanced statistics dashboard.
            </div>
          </div>

          <div className="cardContainer">
            <div className="card">
              <div className="imgContainer">
                <img src={brandRecon} alt="" />
              </div>

              <div className="cardHeading">Brand Recognition</div>
              <div className="cardBody">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                repellat deserunt labore a soluta vel tenetur, repudiandae ipsa
                facere quas.
              </div>
            </div>
            <div className="card">
              <div className="imgContainer">
                <img src={detailRecord} alt="" />
              </div>
              <div className="cardHeading">Detailed Records</div>
              <div className="cardBody">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae animi dignissimos ipsa officia totam dolorem ipsam
                odio iste temporibus deserunt!
              </div>
            </div>
            <div className="card">
              <div className="imgContainer">
                <img src={fullCus} alt="" />
              </div>
              <div className="cardHeading">Fully Customizable</div>
              <div className="cardBody">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum, fugiat. Impedit laboriosam architecto dignissimos
                sit, odit nostrum dolore illum voluptatibus.
              </div>
            </div>
          </div>
        </section>
        <section className="section3">
          <div className="boostLink"> Boost your Links Today</div>
          <div className="boostGetStarted">Get Started</div>
        </section>
        <footer>
          <div>
            <h2>Shortly</h2>
          </div>
          <div>
            <h3>Features</h3>
            <div>
              <div>Link Shortening</div>
              <div>Branded Links</div>
              <div>Analytics</div>
            </div>
          </div>
          <div>
            <h3>Resources</h3>
            <div>
              <div>Blog</div>
              <div>Developers</div>
              <div>Support</div>
            </div>
          </div>
          <div>
            <h3>Company</h3>
            <div>
              <div>About</div>
              <div>Our Team</div>
              <div>Careers</div>
              <div>Contact</div>
            </div>
          </div>
          <div>
            <h3>Link</h3>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
