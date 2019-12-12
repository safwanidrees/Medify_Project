import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import _ from "lodash";

import "../../style.css";
import Portfolio from "./Portfolio";
import { getMeds, destroy } from "../../actions";

/** MAIN COMPONENT */
const HomePage = () => {
  const dispatch = useDispatch();
  const medicines = useSelector(state => state.typeMedicines);
  const store = useStore()
  useEffect(() => {
    
    // on mounting
    (() => {
      ["Derma", "Cardio-Vascular-System"].forEach(async type => {
        const data = await getMeds(type, 5);
        dispatch({ type: "GET_MEDS", payload: data });
      });
    })();
    // // on unmounting
    return () => {
      ["Derma", "Cardio-Vascular-System"].forEach(type => {
        delete store.getState().typeMedicines[type]
      });
    };
  }, []);

  return (
    <React.Fragment>
      <section className="main__container">
        <h1 className="test">
          Search any medicine you want,
          <br />
          you'll find it here
        </h1>
      </section>
      {renderPortfolio(medicines)}
    </React.Fragment>
  );
};

const renderPortfolio = medicines => {
  let list = [];
  if (Object.keys(medicines).length < 1) {
    for (let i = 0; i < 2; i++) {
      list.push(<Portfolio showPlaceholder amount="5" key={i} />);
    }
  }
  _.forIn(medicines, (val, key) => {
    if (key === "Derma" || key === "Cardio-Vascular-System") {
      list.push(<Portfolio items={val} type={key} key={key} header={key} />);
    }
  });
  return list;
};

export default HomePage;
