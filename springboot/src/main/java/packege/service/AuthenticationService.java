package packege.service;

import packege.model.Utilisateur;

public interface AuthenticationService
{
    Utilisateur signInAndReturnJWT(Utilisateur signInRequest);
}
