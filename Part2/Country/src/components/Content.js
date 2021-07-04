import React from 'react'
import Country from './Country'
const Content = ({countries,setCountries,setWeather,weather})=> {

   

    if (countries.length>10){
        return (
            <div>too many matches, please specify filter.</div>
        )
    }

    else if ((countries.length > 2 && countries.length < 10) || countries.length === 0) {
        return (
          <ul>
            {countries.map((country, i) =>
              <li key={i}> {country.name} <button onClick={() => setCountries([country])}>show</button></li>
            )}
          </ul>
        )
    }


    else {
        return (
        <div>
            <Country country={countries[0]} />
        </div>
        )
    }

}

export default Content
