import { useAuth } from 'auth/useAuth';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  FiDatabase, FiFileText, FiLayers
} from "react-icons/fi";
import { useParams } from 'react-router-dom';
import UserService from 'services/UserService.service';
import {
  logo4Best
} from '../../../images';

// type ContainerProps = {
//   children: React.ReactNode; //👈 children prop type
// };

const Header = ({ children }) => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [user, setUser] = useState({});

  const { signout } = useAuth();

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  // useEffect(() => {

  //   const getUser = async () => {
  //     try {
  //       const response = await UserService.getUser();
  //       setUser(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getUser();
  // }, [])

  const { username } = useParams();

  useEffect(() => {
    if (username) {
      UserService.getUserById(username).then((response) => {
        setUser(response.data);
        console.log(response.data);
        console.log(username)
      }).catch(error => {
        console.log(error);
      })
    }
  }, [username]);



  return (
    <>
      <Container fluid className="p-0">
        <div id="wrapper">
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="/"
            >
              <div className="sidebar-brand-icon rotate-n-15">
                {/* <i className="fas fa-laugh-wink"></i> */}
                <img src={logo4Best} alt="logo" width="30px" />
              </div>
              <div className="sidebar-brand-text mx-3">Train4Best</div>
            </a>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
              <a className="nav-link text-center" href={`/`}>
                {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
                <span>Dashboard</span>
              </a>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Training</div>

            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseTraining"
                aria-expanded="true"
                aria-controls="collapseTraining"
              >
                <FiLayers className="mr-2" />

                <span>Training</span>
              </a>
              <div
                id="collapseTraining"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Menu</h6>
                  <a className="collapse-item" href="/training-list">
                    Training List
                  </a>
                  <a className="collapse-item" href="/training-next">
                    Training Next Schedule
                  </a>
                  <a className="collapse-item" href="/training-history">
                    Training History
                  </a>
                  <a className="collapse-item" href="/participant">
                    Participant
                  </a>
                  <a className="collapse-item" href="/trainer">
                    Trainer
                  </a>
                  <a className="collapse-item" href="/freelancer">
                    Freelancer
                  </a>
                </div>
              </div>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Finance</div>

            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseFinance"
                aria-expanded="true"
                aria-controls="collapseFinance"
              >
                <FiDatabase className="mr-2" />

                <span>Finance</span>
              </a>
              <div
                id="collapseFinance"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Menu</h6>
                  <a className="collapse-item" href="/price-list">
                    Price List
                  </a>
                  <a className="collapse-item" href="/transaction-history">
                    Transaction History
                  </a>
                  <a className="collapse-item" href="/billing">
                    Billing
                  </a>
                </div>
              </div>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Program</div>

            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseProgram"
                aria-expanded="true"
                aria-controls="collapseProgram"
              >
                <FiFileText className="mr-2" />

                <span>Program</span>
              </a>
              <div
                id="collapseProgram"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Menu</h6>
                  <a className="collapse-item" href="/project">
                    Project
                  </a>
                  <a className="collapse-item" href="/employee">
                    Employee
                  </a>
                </div>
              </div>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
              ></button>
            </div>
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars"></i>
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>

                  <div className="topbar-divider d-none d-sm-block"></div>

                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        {user.nama}
                      </span>

                      <img
                        className="img-profile rounded-circle"
                        src="img/undraw_profile.svg"
                        alt=""
                      />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      {/* <a className="dropdown-item" href={`/profile/${user.id}`}>
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </a> */}

                      {/* <a className="dropdown-item" href="/setting">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                      </a> */}
                      {/* <div className="dropdown-divider"></div> */}
                      <a
                        className="dropdown-item btn"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                        type="submit"
                        onClick={signout}
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>

              <div className="container-fluid">{children}</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Header;