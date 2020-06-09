import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [usernameEmpty, setUsernameEmpty] = useState(false)
  const [passwordEmpty, setPasswordEmpty] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setUsernameEmpty(Boolean(!username))
    setPasswordEmpty(Boolean(!password))
    try {
      if (!username.trim() || !password.trim()) {
        setUsernameEmpty(Boolean(!username.trim()))
        setPasswordEmpty(Boolean(!password.trim()))
      } else {
        const response = await Axios.post("/login", { username, password })
        if (response.data) {
          appDispatch({ type: "login", data: response.data })
          appDispatch({ type: "flashMessage", value: "You have successfully logged in.", color: "alert-success" })
        } else {
          console.log("Incorrect username / password!")
          appDispatch({ type: "flashMessage", value: "Invalid username / password.", color: "alert-danger" })
        }
      }
    } catch (e) {
      console.log("There was a problem!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => {
              setUsername(e.target.value)
              setUsernameEmpty(Boolean(!e.target.value))
            }}
            name="username"
            className={"form-control form-control-sm input-dark " + (usernameEmpty ? "is-invalid" : "")}
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordEmpty(Boolean(!e.target.value))
            }}
            name="password"
            className={"form-control form-control-sm input-dark " + (passwordEmpty ? "is-invalid" : "")}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
