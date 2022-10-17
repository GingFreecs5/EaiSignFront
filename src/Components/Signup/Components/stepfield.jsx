import React from "react";
import "./stepfield.css";
export default function StepField(props) {
  return (
    <div className={props.class}>
      {" "}
      <span style={{ backgroundColor: props.bgcolor }} className="stepfield">
        <span style={{ color: props.color }}>{props.number}</span>
      </span>
      <span style={{ color: "black" }}> {props.title}</span>
    </div>
  );
}
