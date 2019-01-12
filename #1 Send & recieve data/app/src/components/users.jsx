import React, { Component } from 'react';
import './style.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import request from './request' 


class Users extends Component {
  constructor(){
    super()
    this.state={
      id:'',
      name:'',
      email:'',
      contact:'',
      gender:'',
      response:false,
      editing:false
    }
  }
  changeHandler=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  

  getData=()=>{
    const data = request('','GET') 
    data.then((res)=>{
     this.setState({users:res,response:true});
    })
   .catch((err)=>{
      console.log(err)
    })
  }

  edit=(user)=>{
    this.setState({
      id:user.id,
      name:user.name,
      email:user.email,
      contact:user.contact,
      gender:user.gender,
      editing:true
    })
  }
  
  update=(event)=>{
    event.preventDefault();
    const obj={
      id:this.state.id,
      name:this.state.name,
      email:this.state.email,
      contact:this.state.contact,
      gender:this.state.gender
    }
    const data = request(this.state.id,'PUT',obj) 
    data.then((res)=>{
      this.setState({
        users: res,
        id:'',name:'',email:'',contact:'',gender:'',
        editing:false
      })
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  delete=(id)=>{
    const data = request(id,'DELETE') 
    data.then((res)=>{
      this.setState({users:res})
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  cancel=()=>{
    this.setState({editing:false})
  }

  componentDidMount(){
    this.getData();
  }
  render() {
    return (
    <div className="App">
    {this.state.editing &&
      <div className="editingFormContainer">
        <form className="editingForm" onSubmit={this.update}>
            <h2 >Editing User</h2>
            <TextField  label="Id" variant="outlined" margin="normal" type="number" name="id" value={this.state.id} onChange={this.changeHandler} disabled/>
            <TextField  label="Name" variant="outlined" margin="normal" name="name" value={this.state.name} onChange={this.changeHandler} required={true}/>
            <TextField  label="Email" variant="outlined" margin="normal" name="email" type="email" value={this.state.email} onChange={this.changeHandler} required={true}/>
            <TextField  label="Contact No" variant="outlined" margin="normal" name="contact" type="number" value={this.state.contact} onChange={this.changeHandler} required={true}/><br/>
            <FormControl component="fieldset" margin="normal"><FormLabel component="legend">Gender:</FormLabel>
              <RadioGroup style={{display:'inline-block'}}  name="gender" value={this.state.gender} onChange={this.changeHandler} >
                <FormControlLabel value="male" control={<Radio color="primary" required={true}/>}  label="Male" />
                <FormControlLabel value="female" control={<Radio color="primary" required={true}/>}  label="Female" />
              </RadioGroup>
            </FormControl><br/>
            <Button variant="contained" type="submit" style={{backgroundColor:'orange'}} >Update</Button>
            <Button variant="contained" onClick={this.cancel}>Cancel</Button>
        </form>   
      </div>} 
        
      <h1>Users</h1>
      {!this.state.response ?
        <h2><em>Waiting for users...</em></h2>
        :
        <div>
          <div>
            {(this.state.users.length > 0) ?
            <Table style={{fontSize:'20px'}}>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell><TableCell>Name</TableCell>
                  <TableCell>Email</TableCell><TableCell>Gender</TableCell>
                  <TableCell>Contact No</TableCell><TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.state.users.map((val,ind)=>{
                return (
                <TableRow key={ind}>
                  <TableCell>{val.id}</TableCell><TableCell>{val.name}</TableCell>
                  <TableCell>{val.email}</TableCell><TableCell>{val.gender}</TableCell>
                  <TableCell>{val.contact}</TableCell>
                  <TableCell>
                    <Button color="primary" margin="normal" variant="outlined" onClick={()=>this.edit(val)}>Edit</Button>
                    <Button color="secondary" margin="normal" variant="outlined" onClick={()=>this.delete(val.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
                )
              })}
              </TableBody>
            </Table>
            :
            <h2>No user available</h2>}
          </div>
        </div>
      }
      </div>
    );
  }
}

export default Users;