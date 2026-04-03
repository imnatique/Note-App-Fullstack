import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { post } from "../../services/ApiEndPoint";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    userName:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    try {
      const request = await post('/auth/register', value)
      const response = request.data
      if(response.success) {
        toast.success(response.message)
        navigate('/login')
      }
      console.log('object', response)
    } catch (error) {
      if(error.response) {
        toast.error(error.response.data.message)
      }
      console.log(error.response.data)
    }
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="form-container broder shadow p-5 rounded-4 bg-white w-50">
        <h2 className="text-center mb-4 fw-bold">Register</h2>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="userName"
              value={value.userName}
              onChange={handleChange}
              className="form-control"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="baisc-addon2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={value.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="baisc-addon2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={value.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              id="password"
            />
          </div>

          <button className="btn btn-success w-100 mb-3">Register</button>

          <div className="text-center">
            <p>
              Already have an account <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
