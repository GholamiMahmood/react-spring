import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser } from '../store/actions/user';
import { Role } from '../models/role';
import './nav-bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle , faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { MyDropdown } from './selectionner';



const NavBar = ({cartItems}) => {

    const currentUser = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/connection');
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-blue navbar_text">
          
          <div class="logo"><FontAwesomeIcon icon={faBicycle} size="4x" style={{ color: "white" }}/></div>


            <div className="navbar-nav me-auto">
                {currentUser?.role === Role.ADMIN &&
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link">
                        Admin
                    </NavLink>
                </li>
                }

                <li className="nav-item">
                    <NavLink to="/accueil" className="nav-link">
                      Page D'accueil
                    </NavLink>
                </li>
                <li className="nav-item">                    
                    <MyDropdown />
                </li>
               
            </div>
            

            {!currentUser &&
            <div className="navbar-nav ms-auto">
                             
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                        Sign Up
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/connection" className="nav-link">
                        Sign In
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" style={{ color: "black" }}/>
                   
                    </NavLink>
                </li>
            </div>
            }

            {currentUser &&
            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">
                        {currentUser.name}
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link" onClick={() => logout()}>
                        Sign Out
                    </a>
                </li> <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" style={{ color: "black" }}/>
                    <span className="cart-length"> {cartItems.length === 0? "": cartItems.length} </span>
                    </NavLink>
                </li>

            </div>
            }

        </nav>
    );
};

export {NavBar};
