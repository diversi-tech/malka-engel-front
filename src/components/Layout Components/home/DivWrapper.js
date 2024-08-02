import PropTypes from "prop-types";
import React from "react";
import { Frame } from "./Frame";
import '../../../scc/home.style.css'

export const DivWrapper = ({
  vector = "vector-11.svg",
  line = "line-5.svg",
  img = "vector-15.svg",
  frameLine = "line-6-6.svg",
  frameImg = "line-6-5.svg",
  frameLine1 = "line-6-4.svg",
  frameLine2 = "line-6-7.svg",
  icon = "icon.svg",
  line1     = "line-7.svg",
  vectorClassName,
  vector1 = "vector-17.svg",
}) => {
  return (
    <div className="div-wrapper">
      <div className="overlap">
        <div className="overlap-group">
          <img className="vector" alt="Vector" src={vector} />
          <img className="line-4" alt="Line" src={line} />
          <img className="vector-2" alt="Vector" src={img} />
          <Frame
            className="frame-26"
            img={frameImg}
            imgClassName="design-component-instance-node"
            imgClassNameOverride="frame-2"
            line={frameLine1}
            line1={frameLine}
            line2={frameLine2}
            lineClassName="frame-instance"
            lineClassNameOverride="frame-26-instance"
          />
          <div className="frame-3">
            <div className="text-wrapper-4">שלום כהן</div>
            <img className="icon" alt="Icon" src={icon} />
            <img className="line-5" alt="Line" src={line1} />
          </div>
          <img className={`vector-3 ${vectorClassName}`} alt="Vector" src={vector1} />
        </div>
        <p className="p"> Created by Rinat chen  © 2024</p>
      </div>
    </div>
  );
};

DivWrapper.propTypes = {
  vector: PropTypes.string,
  line: PropTypes.string,
  img: PropTypes.string,
  frameLine: PropTypes.string,
  frameImg: PropTypes.string,
  frameLine1: PropTypes.string,
  frameLine2: PropTypes.string,
  icon: PropTypes.string,
  line1: PropTypes.string,
  vector1: PropTypes.string,
};
