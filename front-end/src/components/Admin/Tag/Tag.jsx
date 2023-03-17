import React from "react";
import "./Tag.css";

function Tag({ label, value, color }) {
  return (
    <>
      <div className="box pull-up">
        <div className="box-body">
          <div className={`bg-${color} rounded`}>
            <h5 className="text-white text-center p-10">{label}</h5>
          </div>
          <p className="mb-0 font-size-18 value">{value}</p>
        </div>
      </div>
    </>
  );
}

export default Tag;
