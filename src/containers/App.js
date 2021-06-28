import './App.css';
import Navigation from '../components/Navigation';
import ImageLinkForm from '../components/ImageLinkForm';
import Logo from '../components/Logo';
import Rank from '../components/Rank';
import ImageHolder from '../components/ImageHolder';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import React, { Component, Fragment } from 'react';
import * as Clarifai from 'clarifai';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '5213ebb3b8e5468c8593354e351585b1'
 });


class App extends Component {
  constructor(){
    super();
    this.port = 'https://protected-stream-63984.herokuapp.com';
    this.state = {
      input:'',
      hasBorder: true,
      calculateRegion:[],
      route:'signin',
      user:{
        id:'',
        name:'',
        email:'',
        rank:0,
        joined:''
      }
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:4000/users')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }

  calculateFaceBorder = (data)=>{
    const boxArr = data.outputs[0].data.regions;
    const arrayOfRegions = []
    // this.setState({calculateRegion:[]});
    for (let i = 0; i < boxArr.length; i++) {
        const box = data.outputs[0].data.regions[i].region_info.bounding_box;

        const img = document.getElementById('imgFace');
        const imgWidth  = Number(img.width); 
        const imgHeight = Number(img.height);
    
        const imgTop = Number(img.offsetTop);
        const imgLeft = Number(img.offsetLeft);
    
        const w = Number(window.innerWidth);
        const h = Number(window.innerHeight);
    
        let calcRegion = {
          leftCol:box.left_col * imgWidth + imgLeft,
          topRow:box.top_row * imgHeight + imgTop,
          rightCol:imgWidth - (box.right_col * imgWidth) + (w - (imgLeft + imgWidth)),
          bottomRow: imgHeight - (box.bottom_row * imgHeight) + (h - (imgTop + imgHeight))
        }
        arrayOfRegions.push(calcRegion);
    }
    this.setState({calculateRegion:arrayOfRegions});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
    // console.log(event);
  }

  onInputSubmit = () =>{
    const {user} = this.state;
    
    // console.log(this.state.input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(data => {
        fetch(`${this.port}/image`, {
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
            id:user.id
          })
        })
        .then(res => res.json())
        .then(data => {
          //AKO HOCEMO DA APDEJTUJEMO SAMO JEDAN ELEMENT OBJEKTA U OBJEKTU
          this.setState(Object.assign(user, {rank:data.rank}));
        })  
        // console.log(data);
        this.calculateFaceBorder(data);
        this.setState({hasBorder:true})

      })
      .catch(err => console.log('Error:', err))
  }

  onRouteChange = (route) =>{
    this.setState({route:route});
    this.setState({input:''});
    this.setState({hasBorder:false})

  }

  onLoadUser = (data) => {
    
    this.setState({user: {
        id:data.id,
        name:data.name,
        email:data.email,
        rank:data.rank,
        joined:data.joined
      }})
  }

  render(){
    const {input, hasBorder, calculateRegion, route, user} = this.state;
    return (
      <div className="App">
        { route === 'home'
          ?
          <Fragment>
            <Navigation routeChange = {this.onRouteChange}/>
            <Logo/>
            <Rank name = {user.name} rank = {user.rank}/>
            <ImageLinkForm inputChange = {this.onInputChange} inputSubmit = {this.onInputSubmit}/>
            <ImageHolder input = {input} state = {hasBorder} calcRegion = {calculateRegion}/>
          </Fragment>
          :
          (
            route === 'signin'
            ?  
            <SignIn port = {this.port} routeChange = {this.onRouteChange} laodUser = {this.onLoadUser}/>
            :
            <Register port = {this.port} routeChange = {this.onRouteChange} laodUser = {this.onLoadUser}/>
          )
        }
      </div>
    );
  }
}

export default App;
