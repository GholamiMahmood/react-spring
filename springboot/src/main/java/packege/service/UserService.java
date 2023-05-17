package packege.service;

import packege.model.Role;
import packege.model.Utilisateur;

import java.util.Optional;


public interface UserService
{
    Utilisateur saveUser(Utilisateur utilisateur);

    Optional<Utilisateur> findByUsername(String username);

    void changeRole(Role newRole, String username);
}
