import "./App.css";
import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";

const RefContext = React.createContext();

const RefProvider = ({ children }) => {
  const [refs, setRefs] = useState({});

  const addRef = useCallback((name, ref) => {
    setRefs((prevRefs) => ({
      ...prevRefs,
      [name]: ref,
    }));
  }, []);

  const resetRefs = useCallback(() => {
    setRefs({});
  }, []);

  return (
    <RefContext.Provider value={{ refs, addRef, resetRefs }}>
      {children}
    </RefContext.Provider>
  );
};

const Planet = ({ data }) => {
  const ref = useRef();
  const { addRef } = useContext(RefContext);
  const name = data.name ? data.name[0] : "Unnamed planet";

  useEffect(() => {
    addRef(name, ref);
  }, [name, addRef]);

  return (
    <div className="planet" ref={ref}>
      <p>Planet: {name}</p>
      {/* Render other properties as needed */}
    </div>
  );
};

const Star = ({ data }) => {
  const ref = useRef();
  const { addRef } = useContext(RefContext);
  const name = data.name ? data.name[0] : "Unnamed star";

  useEffect(() => {
    addRef(name, ref);
  }, [name, addRef]);

  return (
    <div className="star" ref={ref}>
      <p>Star: {name}</p>
      {data.planet &&
        data.planet.map((planet, index) => (
          <Planet key={index} data={planet} />
        ))}
    </div>
  );
};

const Binary = ({ data }) => {
  const ref = useRef();
  const { addRef } = useContext(RefContext);
  const name = data.name ? data.name[0] : "Unnamed binary";

  useEffect(() => {
    addRef(name, ref);
  }, [name, addRef]);

  return (
    <div className="binary" ref={ref}>
      <p>Binary: {name}</p>
      {data.star &&
        data.star.map((star, index) => <Star key={index} data={star} />)}
      {data.planet &&
        data.planet.map((planet, index) => (
          <Planet key={index} data={planet} />
        ))}
      {data.binary &&
        data.binary.map((binary, index) => (
          <Binary key={index} data={binary} />
        ))}
    </div>
  );
};

const Menu = ({ data }) => {
  const { refs } = useContext(RefContext);

  const handleClick = (name) => {
    console.log(`${name} ref`, refs[name]);
  };

  const generateMenuItems = (items) => {
    return items.map((item, index) => {
      const name = item.name ? item.name[0] : "Unnamed";

      let children = [];
      if (item.binary) {
        children = [...item.binary, ...children];
      }
      if (item.star) {
        children = [...item.star, ...children];
      }
      if (item.planet) {
        children = [...item.planet, ...children];
      }

      return (
        <ul key={index}>
          <li onClick={() => handleClick(name)}>{name}</li>
          {children.length > 0 && generateMenuItems(children)}
        </ul>
      );
    });
  };

  return (
    <nav>
      <ul>{generateMenuItems(data.binary)}</ul>
    </nav>
  );
};

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
