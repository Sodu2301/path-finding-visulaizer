import React from "react";
import "./Legend.css";

import StartIcon from "../Icons/StartIcon";
import TargetIcon from "../Icons/TargetIcon";

function Legend() {
  return (
    <div id="Legend">
      <ul>
        <li>
          <div><StartIcon/></div>
          Start Node
        </li>
        <li>
          <div><TargetIcon/></div>
          Target Node
        </li>
        <li>
          <div className="unvisited-node"></div>
          Univisted Node
        </li>
        <li>
          <div className="visited-node"></div>
          Visited Node
        </li>
        <li>
          <div className="shortest-path-node"></div>
          Shortest-path Node
        </li>
        <li>
          <div className="wall-node"></div>
          Wall Node
        </li>
      </ul>
    </div>
  );
}

export default Legend;
