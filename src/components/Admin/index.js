import "./index.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Admin = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showErr, setShowErrMsg] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("artToken");
    if (token !== undefined) {
      history.push("/manage");
    }
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = "https://vijayarts.onrender.com/admin/login";
      const details = {
        username: loginData.username,
        password: loginData.password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        Cookies.set("artToken", data.jwt_token, { expires: 2 / 24 });
        history.push("/manage");
      } else {
        setShowErrMsg(true);
        setErrMsg(data.message);
      }
    } catch (error) {
      console.log("error in data fetching call", error);
    }
  };

  return (
    <div>
      <div className="admin-container">
        <div>
          <form className="admin-login-form" onSubmit={onClickLogin}>
            <h2>Admin login</h2>

            <div className="label-input">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="input"
                name="username"
                onChange={onChangeInput}
                value={loginData.username}
              />
            </div>
            <div className="label-input">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input"
                name="password"
                onChange={onChangeInput}
                value={loginData.password}
              />
            </div>
            {showErr && <p className="err-msg">{`* ${errMsg}`}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
