import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CountryDetailsPage() {

  const [countryDetails, setCountryDetails] = useState(null)
  
  const params = useParams()
  
  useEffect(()=> {
    axios.get(`https://ih-countries-api.herokuapp.com/countries/${params.countryId}`)
      .then((response) => {
        console.log(response)
        setCountryDetails(response.data)
      })

      .catch((error) => {
        console.log(error)
      })
  }, [params.countryId])


  if (countryDetails === null || countryDetails === undefined){
    return <h3>... buscando</h3>
}
  console.log(countryDetails)

  return (
    <div className="container">

        <Navbar></Navbar>

        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Country Details</h1>
        <img src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`} alt="flag" width={40}/>
        <h3>{countryDetails.name.common}</h3>

        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{width: "30%"}}>Capital</td>
              <td>{countryDetails.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {countryDetails.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                {countryDetails.borders.map((eachBorder) => { 
                  return <li> <Link to={`/${eachBorder}`}>{eachBorder}</Link></li>
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default CountryDetailsPage
