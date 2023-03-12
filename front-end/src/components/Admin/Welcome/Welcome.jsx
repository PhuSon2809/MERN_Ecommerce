import React from "react";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="row bg-margin">
      <div className="box bg-gradient-primary overflow-hidden pull-up">
        <div className="box-body py-0">
          <div className="row align-items-center">
            <div className="col-12 col-lg-8">
              <h1 className="font-size-40 text-white">Welcome Something</h1>
              <p className="text-white mb-0 font-size-20">
                Education is the passport to the future, So learn more & more
              </p>
            </div>
            <div className="col-12 col-lg-4 ">
              <img
              className="bg-image-margin"
                src={
                  "https://eduadmin-template.multipurposethemes.com/bs4/images/svg-icon/color-svg/custom-15.svg"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
