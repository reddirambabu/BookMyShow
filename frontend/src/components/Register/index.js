
import {Component} from 'react'
import axios from 'axios' 
import './index.css'
import {Link} from 'react-router-dom'


class Register extends Component {
  state = {
    username: '',
    password: '',
    email : '',
    number : '',
    gender : 'male',
    address : '',
    showSubmitError: false,
    errorMsg: '',
  }

  

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangeUserNumber = event => {
    this.setState({number: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeAddress = event => {
    this.setState({address: event.target.value})
  }

  onChangeGender = event =>{
    console.log(event.target.value)
    this.setState({gender : event.target.value})
  }
  
  onSubmitFailure = (errorMsg) => {
    this.setState({showSubmitError: true , errorMsg})
  }

  submitForm =  event => {
    event.preventDefault()
    const {username, email , password , number, gender , address} = this.state
    const userDetails = {username, email, password , number , gender , location:address}
    
    const options = {
      method: 'post',
      url : 'http://localhost:8000/register',
      data: userDetails,
    }
    axios( options).then((response) => {
        console.log("response " + response.data)
        alert(response.data)
        this.setState({
            username: '',
            password: '',
            email : '',
            number : '',
            gender : 'male',
            address : '',
            showSubmitError: false,
            errorMsg: '',
          })

    }).catch((error) => {
        if (error.response) {
            console.error('Server Error:', error.response.status);
            console.error('Network Error:', error.request.response);
            console.error('Error:', error.message);
          } 
        
        this.onSubmitFailure(error.request.response)
        
    })

  }

 

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderNumberField = () => {
    const {number} = this.state

    return (
      <>
        <label className="input-label" htmlFor="number">
          PHONE NUMBER
        </label>
        <input
          type="text"
          id="number"
          className="username-input-field"
          value={number}
          onChange={this.onChangeUserNumber}
          placeholder="Phone Number"
        />
      </>
    )
  }

  renderGenderField = () => {
    

    return (
      <>
        <label className="input-label" htmlFor="gender">
          GENDER
        </label>
        
        <select  className='select-input-field' name="gender" id="gender"  onChange={this.onChangeGender}>
            <option  className="username-input-field" value="male"  >Male</option>
            <option  className="username-input-field" value="female">Female</option>
        </select>
      </>
    )
  }

  renderAddressField = () => {
    const {address} = this.state

    return (
      <>
        <label className="input-label" htmlFor="address">
          ADDRESS
        </label>
        <input
          type="text"
          id="location"
          className="username-input-field"
          value={address}
          onChange={this.onChangeAddress}
          placeholder="Address"
        />
      </>
    )
  }


  render() {
    const {showSubmitError, errorMsg} = this.state
    
    return (
      
      <div className="login-form-container">
        <img
          src="https://t0.gstatic.com/images?q=tbn:ANd9GcTgn6piQ2FZn4aEvdrBT9O76-nqZd82RUnh63VdzUyH6wvX441v"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://img.freepik.com/premium-vector/ticket-cinema-online-internet-booking-technology-movie-theater-illustration_121223-1700.jpg"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://t0.gstatic.com/images?q=tbn:ANd9GcTgn6piQ2FZn4aEvdrBT9O76-nqZd82RUnh63VdzUyH6wvX441v"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">{this.renderNumberField()}</div>
          <div className="input-container">{this.renderGenderField()}</div>
          <div className="input-container">{this.renderAddressField()}</div>
          <button type="submit" className="login-button">
            Register
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <hr className='line'/>
 
            <Link to="/login" className="register">
                <button type="button" className="login-button">Login Now</button>
            </Link>
          
        </form>
      </div>
      
    )
  }
}

export default Register
