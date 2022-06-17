import React from "react";
import "./post.css"
import {
  Profile,
  Logo,
  // Favicon
} from "../../assets/images";

export default function Post() {
  return (
    <div className="card pCard">
      <div className="card-body p-0 ">
        <div className="pHeader">
          <div className="media flex-wrap w-100 align-items-center ">
            <div className="row">
              <div className="col-2 pHeaderA d-flex align-items-center">
                <img
                  src={Profile}
                  className="rounded-circle "
                  width="60"
                  alt=""
                />
              </div>
              <div className="col-10 pHeaderN">
                <span className="d-inline-block ml-1 Name" style={{ margin: 0 }}>
                  John Doe {" "}
                </span>
                <span className="d-inline-block ml-1 text-muted smallfadedtext">
                  {" "}
                  &nbsp;•15d
                </span>
                <p >
                  <span className="d-inline-block ml-1 text-muted small fadedtext ">
                    {" "}
                    @johny_doe
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pBody">
          <div className="row">
            <div className="pBodyS"></div>
            <div className="col-10 pHeader">
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
            </div>
          </div>
        </div>
        <div className="pFooter">
          <div className="row">
            <div className="pBodyS"></div>
            <div className="col-10">
              <div className="row d-flex flex-row align-items-center pHeader">
                <div className="col-3">
                  <svg className="like" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 20 16">
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                  </svg>
                  <span className="fadedtext">&nbsp;20</span>
                </div>

                <div className="col-3">
                  <svg className="dislike" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 20 16">

                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />

                  </svg>
                  <span className="fadedtext">&nbsp;20</span>
                </div>
                <div className="col-3">
                  <svg className="comment" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">
                    <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                  </svg>
                  <span className="fadedtext">&nbsp;Reply</span>
                </div>
                <div className="col-3">
                  <svg className="Report" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 20 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                  </svg>
                  <span className="fadedtext">&nbsp;Reply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}