import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {

  const [allCountries, setAllCountries] = useState([])


  useEffect(()=> {
    axios.get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        console.log(response)
        setAllCountries(response.data);
      })

      .catch((error) => {
        console.log(error)
      })
  }, [])

  //clausula de guardia
  if (allCountries === null){
    return <h3>... buscando</h3>
  }


  return (
    <div className="container" style={{ maxHeight: "90vh", overflow: "scroll" }}>

      <Navbar></Navbar>

      <h1 style={{ fontSize: "24px" }}> 
        WikiCountries: Your Guide to the World
      </h1>

      {allCountries.map((eachCountry) => {
      return (
      <div className="list-group">
        <Link key={eachCountry._id} className="list-group-item list-group-item-action" to={`/${eachCountry.alpha3Code}`}>
          <img src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`} alt="flag" width={40}/> {eachCountry.name.common}
        </Link>
      </div>
        )
      })}
    </div>
  );
}

export default HomePage;
