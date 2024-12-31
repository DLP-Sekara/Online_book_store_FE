import React from "react";
import OnBoardingImg from "../../assets/images/svg/onBoarding/OnBoardingImg";

const OnBoardingLayout = ({ children }) => {
  return (
    <div className="relative max-w-screen flex min-h-screen w-full items-center justify-center overflow-hidden text-center">
      <OnBoardingImg />
      <div className="w-[50%] flex justify-center items-center text-black h-[100vh] p-2"></div>
      <div className="flex w-[50%] items-center justify-center">{children}</div>
    </div>
  );
};

export default OnBoardingLayout;
