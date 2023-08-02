import "./App.css";
import React, { useEffect, useContext } from "react";

import { RefContext, RefProvider } from "./components/RefContext";
import Binary from "./components/Binary";
import Menu from "./components/Menu";

const Root = ({ data }) => {
  return (
    <RefProvider>
      <App data={data} />
    </RefProvider>
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
