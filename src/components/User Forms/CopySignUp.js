import React from "react";
// import { EyeSlash } from "./EyeSlash";
// import { Frame } from "./Frame";
// import { Lock } from "./Lock";
// import { PropertyWrapper } from "./PropertyWrapper";
// import { Rectangle } from "./Rectangle";
// import { User } from "./User";
import "./style.css";

export const FrameScreen = () => {
  return (
    <div className="frame-screen">
      <div className="frame-wrapper">
        <div className="frame-2">
          <div className="frame-3">
            <div className="text-wrapper-2">היי ברוכים הבאים</div>
            <p className="p">לבהוקרה הדרך הקלה להגיע לארוע מושלם</p>
          </div>
          <div
            className="view"
            divClassName="design-component-instance-node"
        //     icon={</>
        //     // <User className="icon-instance-node" />
        // }
            property1="one"
          />
          <div className="frame-4">
            <div className="text-wrapper-3">סיסמה</div>
            {/* <Lock className="icon-instance-node" /> */}
            {/* <EyeSlash className="eye-slash" /> */}
          </div>
          <div className="group">
            <div className="text-wrapper-4">זכור אותי</div>
            {/* <Rectangle className="rectangle-4" property1="one" /> */}
          </div>
        </div>
      </div>
      <div className="div-wrapper">
        <p className="div-2">
          <span className="span">עוד לא נרשמה לאתר?</span>
          <span className="text-wrapper-5">&nbsp;</span>
          <span className="text-wrapper-6">הירשם</span>
        </p>
      </div>
      {/* <Frame className="frame-61" divClassName="design-component-instance-node" /> */}
    </div>
  );
};
