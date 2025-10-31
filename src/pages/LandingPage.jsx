import React from "react";
import Navigator from "../LandingPage_cmp/Navigator";

function Landing() {
  return (
    <div>
      <Navigator />
      <div className="p-8">
        <h1 className="text-3xl font-semibold">Welcome to the Landing Page</h1>
        <p className="mt-4 text-gray-700">
          This is your home page content under the navbar.
        </p>
      </div>
    </div>
  );
}

export default Landing;






