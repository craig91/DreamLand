import React from 'react';
import {Link} from 'react-router'
import axios from 'axios';

//Component
import SearchBar from './SearchBar.jsx';
import Map from '../Map/Map.jsx';
import DisplayReviews from '../Review/DisplayReviews.jsx';

const DisplayResults = React.createClass({
  getInitialState(){
  	return{programs: null, provIds: null}
  }, 

  componentDidMount(){
  let age = 'adult';
  let query = this.props.location.query;
  let queries = "";

  query.age ? age = query.age : null;
  for (let key in query){
    if(query[key] && key !== 'age' && key !== 'zipcode'){
      queries += (query[key] + ',');
    };
  };
  !queries ? queries = "legal,education" : null;

 	let url = 'https://c4q-dot-searchbertha-hrd.appspot.com/_ah/api/search/v1/zipcodes/';
	let zipcode = query.zipcode;
	let attributes = `/programs?api_key=b30f1b9f41161c0fb3b39cb49aff8104&attributeTag=${age},${queries}&cursor=0&limit=50`;

  console.log(url + zipcode + attributes)
  axios.get(url + zipcode + attributes)
    .then( (res) => {
      console.log("this is res.data.programs===========>",res.data)

      let idArr = res.data.programs.map( (program) => program.id);
      this.setState({programs: res.data.programs, provIds: idArr});
    })
    .catch( (err) => {
      console.log(err);
    });
  },

  fav(event){

  },

  refresh(){
    window.location.reload();
  },

  render(){
    let programs = this.state.programs
    let provIds = this.state.provIds
    return (
      <div>
        <SearchBar refresh={this.refresh}/>
        {!programs ? <img src={require('../images/loading_icon.gif')}></img> : 
          programs.map( (program, idx) => {
            return (
              <div key={idx}>
                 <div className="container">
                    <div className="one">
                      <Map coords={program.offices[0].location} name={program.name} />
                    </div>
                    <div className="two">
                      <h1 className="readMore"><span className="read-more-target">{program.name}</span></h1>
                      {program.description.replace(/\<br\>|\<br\/\>/g," ")
          //screw it!!!
                      }
                      <p>Distance: {program.distance} miles</p>

                      <a href={program.website_url}>{program.website_url}</a>

                      <p>{program.offices[0].address1} {program.offices[0].postal} {program.offices[0].city},{program.offices[0].state}</p>

                    </div>
                    <div className="three">
                    
                    
                    </div>


             <i onClick={this.fav} name="wHeart" className="fa fa-heart-o" aria-hidden="false"></i> <i onClick={this.fav} name="bHeart" className="fa fa-heart" aria-hidden="true" hidden></i>


              </div>


              </div>
            )
          })
        }
        {!provIds ? null :
          <DisplayReviews provIds={provIds}/>
        }	
      </div>
  	)
  }
});




export default DisplayResults;
