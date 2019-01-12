import React, { Component } from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import request from './request' 

class Registration extends Component {
  constructor(){
    super()
    this.state={
      name:'',
      email:'',
      contact:'',
      gender:''
    }
  }
  changeHandler=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  sendData=(event)=>{
    event.preventDefault();
    const obj={
      name:this.state.name,
      email:this.state.email,
      contact:this.state.contact,
      gender:this.state.gender
    }

   const data = request('','POST',obj) 
   data.then((res)=>{
      this.setState({
        name:'',email:'',contact:'',gender:''
      })
   })
   .catch((err)=>{
      console.log(err)
   })

  }

  render() {
    return (
      <div className="App">
      <h1>Registration</h1>
      <form onSubmit={this.sendData}>
        <TextField  label="Name" variant="outlined" margin="normal" name="name" value={this.state.name} onChange={this.changeHandler} required={true}/><br/>
        <TextField  label="Email" variant="outlined" margin="normal" name="email" type="email" value={this.state.email} onChange={this.changeHandler} required={true}/><br/>
        <TextField  label="Contact No" variant="outlined" margin="normal" name="contact" type="number" value={this.state.contact} onChange={this.changeHandler} required={true}/><br/>
        <FormControl component="fieldset" margin="normal">
         <FormLabel component="legend">Gender:</FormLabel>
          <RadioGroup style={{display:'inline-block'}}  name="gender" value={this.state.gender} onChange={this.changeHandler}>
            <FormControlLabel value="male" control={<Radio color="primary" required={true}/>}  label="Male" />
            <FormControlLabel value="female" control={<Radio color="primary" required={true}/>}  label="Female" />
          </RadioGroup>
          </FormControl>
         <br/>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
      </div>
    );
  }
}

export default Registration;