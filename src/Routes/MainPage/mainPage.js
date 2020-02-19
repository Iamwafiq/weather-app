import React, { Component } from 'react';
import { cloneDeep } from "lodash";
import './mainpage.scss'


class MainPage extends Component {

	constructor(props){
		super(props);
		this.state = {
  			ourData: [],
  			city: "",
  			cityName: "",
  			err: "",
  			temperature: "",
  		}
  	}

  	updateCity = (e) => {
  		this.setState({
  			city: e.target.value
  		})
  	}

  	searchCity = (e) => {
  		const {city} = this.state;
  		console.log(city);
  		const cityName = city;
  		
  		this.getweatherdata(cityName);

  	}



	getweatherdata = async (param) => {			

			
			const apiCall = await fetch("https://api.weatherbit.io/v2.0/current?city="+param+"&key=53eef80de83147f68ee240baf63b99ab",{})
			console.log(apiCall.statusText);
			
			if(apiCall.statusText == "OK"){
				const apiData = await apiCall.json();
				this.setState({
			  		 ourData: apiData.data,
			  		 err: "",
			  		 temperature: apiData.data[0].temp,
			  	})
			  	console.log(this.state.temperature);
			}else{
				this.setState({
			  		err: "Location not found",
			  		ourData: []
			  	})
				
			}
			// .then(res => res.json())
			//   .then(json => {

			//   	
			//   	console.log(this.state.ourData)
			//  });
			

	}

	weatherReport = () => {

			const {ourData, err } = this.state;
	 		let weatherData = [];
	 		
		if (ourData.length !== 0 ){
			for (let k = 0; k < ourData.length; k++) {
				weatherData.push(
					<div className="weather__info" >
						<div className="weather__key">{ourData[k].temp}° C</div>
						<div className="weather__key">{ourData[k].city_name}</div>
						<div className="weather__key" >{ourData[k].weather.description}</div>
					</div>
				)
			}
		}else{
			this.setState({
				ourData: [],
				err: "Location not Found",
			})
			const weatherData = "no"
			console.log(weatherData)
		}
				 

			

			return(
				
					<ul >
					{weatherData}
					</ul>
			
			)
	
	}

	

	render() {
		
		const {ourData, err, temperature } = this.state;

			
		return(

			<div className="wrapper" >
				{err ? <div className="title-container-error"> 
				<div className="title-container__title">Weather Application</div>
				<div className="title-container__subtitle">Hows the weather?</div>
				</div>: <div className={temperature.length == 0? "title-container" : temperature.length !== 0  && temperature>10? "title-container-above-10": "title-container-below-10"}>
				<div className="title-container__title">Weather Application</div>
				<div className="title-container__subtitle">Hows the weather?</div>
				</div>}
				
				<div className="form-container">
					<input className="input-box" type='text'id='cityname' name="city" onChange={(e) => this.updateCity(e)} value={this.state.city} placeholder="Search Your City..." />
					<button className="button" onClick={()=> this.searchCity()}>Search</button>
					{ourData.length && !err ?<div>{this.weatherReport()} </div>: ""}
					{err ? <div className="weather__error"> {err} </div> : ""}
				</div>

				

				
			</div>

		)
	}

}

export default MainPage;



