import { Link } from 'react-router-dom';
export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}style={{height :"70px"}} >
      <div className="container-fluid">
        <Link to className="navbar-brand"style={{fontSize:"30px"}} href="/">{props.title} </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
        </ul>

        <form className="d-flex" role="search">

          <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}style={{marginTop:"50px"}}>
               <input className="form-check-input" onClick={props.toggleMode}type="checkbox" role="switch" id="flexSwitchCheckDefault"style={{marginTop:"15px"}}/>
               <label className="form-check-label"htmlFor="flexSwitchCheckDefault">Enable mode</label>
          </div>

          <input className="form-control my-5 mx-4" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary my-5" style={{height:"50px"}}type="submit">Search</button>
        </form>
      </div>
     </div>
    </nav>
  );
}
