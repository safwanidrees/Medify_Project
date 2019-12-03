import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";
import HomePage from "./homeComponents/HomePage";
import AddMedicine from "./AddMedicine";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cardio from "./MedicineTypeComponents/Cardio";
import Derma from "./MedicineTypeComponents/Derma";
import EyesNoseEar from "./MedicineTypeComponents/EyesNoseEar";
import Endocrine from "./MedicineTypeComponents/Endocrine";
import NervousSystem from "./MedicineTypeComponents/NervousSystem";
import Circulatory from "./MedicineTypeComponents/Circulatory";
import Getro from "./MedicineTypeComponents/Getro";
import MedicineDisplay from "./MedicineComponents/MedicineDisplay";
import MedicineSearch from "./MedicineSearch";

class App extends React.Component {
  addRoute = medTypes => {
    return medTypes.map(medType => {
      return (
        <Route
          path={`/medicines/${medType.link}`}
          exact
          component={medType.name}
          key={medType.name}
        />
      );
    });
  };
  render() {
    return (
      <div className="wrapper">
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/medicine/:type/:name" exact component={MedicineDisplay}/>
            <Route path="/medicine/add" exact component={AddMedicine} />
            <Route path="/search/:term" exact component={MedicineSearch} />
            {this.addRoute([
              { link: "Cardio-Vascular-System", name: Cardio },
              { link: "Derma", name: Derma },
              { link: "Eyes-Nose-Ear", name: EyesNoseEar },
              { link: "Endocrine-System", name: Endocrine },
              { link: "Central-Nervous-System", name: NervousSystem },
              { link: "Circulatory-System", name: Circulatory },
              { link: "Gestro-Intestinal-Tract", name: Getro }
            ])}
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
