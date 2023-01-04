import { createContext, useContext, useMemo, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { loginimage } from 'images';
export const APP_BASE_URL = "https://zingy-frangipane-52426a.netlify.app";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const signin = async (username, password) => {
    try {
      const response = await fetch(`${APP_BASE_URL}/auth/signin`, {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      navigate("/", {
        replace: true
      });

    } catch (error) {
      if (error) {
        setError(true);
        alert('Username/Password salah')
        console.error(error);
      }
    }
  }

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin", {
      replace: true
    });
  }

  const value = useMemo(
    () => ({
      user,
      signin,
      signout,
      error
    }),

    // eslint-disable-next-line
    [user]
  );

  const isValidForm = () => {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(username, password);
      console.log(username, password)

      navigate(`/`);
    } catch (error) {
      console.log(error);
    }


    console.log("kemana ini?");
  }

  // if (show) {
  //   return (
  //     <Alert variant="danger" onClose={() => setShow(false)} dismissible>
  //       <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
  //       <p>
  //         Change this and that and try again. Duis mollis, est non commodo
  //         luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
  //         Cras mattis consectetur purus sit amet fermentum.
  //       </p>
  //     </Alert>
  //   )
  // }



  return (
    <>
      {/* <div className="container" style={{ padding: "10rem 0" }}>
        <div className="row">
          <div className="col-md-6">
            <img src={loginimage} alt="Image" className="img-fluid" />
          </div>
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="my-5">
                  <h3>Sign In</h3>
                  <p className="mb-4">Selamat Bekerja !</p>
                </div>

                {error === true &&
                  <Alert variant="danger" onClose={() => setError(false)} dismissible>
                    <p>
                      Username atau Password Salah
                    </p>
                  </Alert>
                }

                <form onSubmit={handleSubmit}>
                  <div className="form-group first">
                    <label >Username</label>
                    <input type="text" className="form-control" id="username" value={username}
                      onChange={(e) => setUsername(e.target.value)} />

                  </div>
                  <div className="form-group last mb-4">
                    <label >Password</label>
                    <input type="password" className="form-control" id="password" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-block btn-primary" disabled={!isValidForm()}>Log In </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div> */}

      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )

}

export const useAuth = () => {
  return useContext(AuthContext);
}