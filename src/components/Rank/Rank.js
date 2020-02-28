import React from "react";

const Rank = ({ name, entries }) => (
  <>
    <div className="f3">{name}, your current entry count is...</div>
    <div className="f1">{entries}</div>
  </>
);

export default Rank;
