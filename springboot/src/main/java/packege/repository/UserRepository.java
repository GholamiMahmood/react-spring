package packege.repository;

import packege.model.Role;
import packege.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<Utilisateur, Long>
{
    //findBy + fieldName
    Optional<Utilisateur> findByUsername(String username);

    @Modifying
    @Query("update Utilisateur set role = :role where username = :username")
    void updateUserRole(@Param("username") String username, @Param("role") Role role);
}
