import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  Profile,
  Logo,
  // Favicon
} from "../../assets/images";

export default function Post() {
  return (
      <div className="card">
        <div className="card-body pb-0">
          <div className="card-header">
            <div className="media flex-wrap w-100 align-items-center ">
              <img
                src={Profile}
                className="rounded-circle"
                width="35"
                alt=""
              />

              <span className="d-inline-block ml-1" style={{ margin: 3 }}>
                John Doe{" "}
              </span>

              <span className="d-inline-block ml-1 text-muted small">
                {" "}
                15 days Ago
              </span>

            </div>
          </div>

          <div className="card-body">
            <p>
              {" "}
              For me, getting my business website made was a lot of tech
              wizardry things. Thankfully i get an ad on Facebook ragarding
              commence website. I get connected with BBB team. They made my
              stunning website live in just 3 days. With the increase demand
              of online customers. I had to take my business online. BBB Team
              guided me at each step and enabled me to centralise my work and
              have control on all aspect of my online business.{" "}
            </p>
            <hr />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              // style="fill: rgba(0, 0, 0, 1);transform: msFilter"
            style={{margin:4}}>
              <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path>
            </svg>
            678
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              // style="fill: rgba(0, 0, 0, 1);transform: msFilter"
            style={{margin:4}}>
              <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z"></path>
            </svg>
            457
          </div>
        </div>
      </div>
  );
}
