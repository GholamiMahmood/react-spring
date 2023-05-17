import { useEffect, useState } from 'react';
import User from '../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/authentication.service';
import { setCurrentUser } from '../store/actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';



const Connection = () => {

    const [user, setUser] = useState(new User('', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //mounted
    useEffect(() => {
        if (currentUser?.id) {
            //navigate
            navigate('/profile');
        }
    }, []);

    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setUser((prevState => {
            
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const handleLogin = (e) => {
      e.preventDefault();

      setSubmitted(true);

      if (!user.username || !user.password) {
          return;
      }

      setLoading(true);

      AuthenticationService.login(user).then(response => {
          //set user in session.
          dispatch(setCurrentUser(response.data));
          navigate('/profile');
      }).catch(error => {
         console.log(error);
         setErrorMessage("Le nom d'utilisateur ou le mot de passe n'est pas valide.");
         setLoading(false);
      });
    };

    return (
        <div className="container mt-5">
            <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

                <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon"/>

                {errorMessage &&
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
                }

                <form
                    onSubmit={(e) => handleLogin(e)}
                    noValidate
                    className={submitted ? 'was-validated' : ''}
                >

                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur:</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="username"
                            value={user.username}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                        Nom d'utilisateur est nécessaire.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe:</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            value={user.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                        Mot de passe est nécessaire.
                        </div>
                    </div>

                    <button className="btn btn-info w-100 mt-3" disabled={loading}>
                        Sign In
                    </button>

                </form>

                <Link to="/register" className="btn btn-link" style={{color: 'darkgray'}}>
                Créer un nouveau compte!
                </Link>

            </div>
        </div>
    );
};

export {Connection};