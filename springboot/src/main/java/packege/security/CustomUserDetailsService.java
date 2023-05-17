package packege.security;

import packege.model.Utilisateur;
import packege.service.UserService;
import packege.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService
{
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Utilisateur utilisateur = userService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        Set<GrantedAuthority> authorities = Set.of(SecurityUtils.convertToAuthority(utilisateur.getRole().name()));

        //UserDetails
        return UserPrinciple.builder()
                .utilisateur(utilisateur)
                .id(utilisateur.getId())
                .username(utilisateur.getUsername())
                .password(utilisateur.getPassword())
                .authorities(authorities)
                .build();
    }
}
