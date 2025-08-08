package com.example.ticketing.controller;

import com.example.ticketing.model.User;
import com.example.ticketing.model.Role;
import com.example.ticketing.repository.UserRepository;
import com.example.ticketing.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Set;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired UserRepository userRepo;
    @Autowired BCryptPasswordEncoder encoder;
    @Autowired JwtUtils jwtUtils;

    @PostMapping("/register")
    public Map<String,Object> register(@RequestBody Map<String,String> body){
        String username = body.get("username");
        String password = body.get("password");
        if(userRepo.existsByUsername(username)){
            return Map.of("error","username_taken");
        }
        User u = new User();
        u.setUsername(username);
        u.setPassword(encoder.encode(password));
        u.setRoles(Set.of(Role.ROLE_USER));
        userRepo.save(u);
        String token = jwtUtils.generateJwtToken(username);
        return Map.of("token",token);
    }

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Map<String,String> body){
        String username = body.get("username");
        String password = body.get("password");
        var opt = userRepo.findByUsername(username);
        if(opt.isEmpty()) return Map.of("error","invalid_credentials");
        var user = opt.get();
        if(!encoder.matches(password,user.getPassword())) return Map.of("error","invalid_credentials");
        String token = jwtUtils.generateJwtToken(username);
        return Map.of("token",token);
    }
}
