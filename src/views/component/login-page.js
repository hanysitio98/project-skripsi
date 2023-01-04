import { useAuth } from "auth/useAuth";
import { loginimage } from 'images';
import { useState } from "react";

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useAuth();

  const isValidForm = () => {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(username, password);

    console.log("kemana ini?")
  }

  return (
    <>
      <div className="container" style={{ padding: "10rem 0" }}>
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
                      toggleMask
                      feedback={false} />
                  </div>
                  <button type="submit" className="btn btn-block btn-primary" disabled={!isValidForm()}>Log In </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default LoginPage;