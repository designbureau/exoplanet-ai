import "./App.css";
import React, { useEffect, useContext, useState } from "react";

import { RefContext, RefProvider } from "./components/RefContext";
import Binary from "./components/Binary";
import Menu from "./components/Menu";

import MainMenu from "./components/MainMenu.jsx";

const Root = ({ data }) => {
  // const [data, setData] = useState(data);
  return (
    <>
      {/* <MainMenu setData={setData} /> */}
      <RefProvider>
        <App data={data} />
      </RefProvider>
    </>
  );
};

const App = ({ data }) => {
  const { resetRefs } = useContext(RefContext);

  useEffect(() => {
    resetRefs();
  }, [data, resetRefs]);

  return (
    <RefProvider>
      <Menu data={data} />
      <Binary data={data} />
    </RefProvider>
  );
};

export default Root;
