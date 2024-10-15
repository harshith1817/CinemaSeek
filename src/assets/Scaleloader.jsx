import React from "react";
import Syncloader from "react-spinners/HashLoader";
import "./Scaleloader.css";

function Pre({ load }) {
  return (
    <div id={load ? "scaleloader" : "scaleloader-none"}>
      <Syncloader color={"#36d7b7"} loading={load} size={100}/>
    </div>
  );
}

export default Pre;
