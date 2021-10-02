package com.ser515.soccer.security.services;

import com.ser515.soccer.database.datamodel.User;
import com.ser515.soccer.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired UserRepository userRepository;

    @Override @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAddress(username)
               .orElseThrow(() -> new UsernameNotFoundException("User Not Found With Username: " + username));
        return UserDetailsImpl.build(user);
    }
}
