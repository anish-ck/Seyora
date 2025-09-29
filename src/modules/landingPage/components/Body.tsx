import React from "react";
import BodyTop from "./bodyTop";
import BodyMiddle from "./bodyMiddle";
import BodySectionWithImage from "./BodySectionWithImage";
import { landingPageSections } from "../landingPageConstants";

const Body = () => {
  return (
    <main>
      <BodyTop />
      <BodyMiddle />
      <BodySectionWithImage id={0} num={0} />
      <BodySectionWithImage id={1} num={1} />
      <BodySectionWithImage id={0} num={2} />
    </main>
  );
};
export default Body;
