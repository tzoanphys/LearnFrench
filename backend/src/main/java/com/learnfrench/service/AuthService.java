package com.learnfrench.service;

import com.learnfrench.entity.User;
import com.learnfrench.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public Optional<User> loginByNameAndPassword(String name, String rawPassword) {
        List<User> byName = userRepository.findByName(name);
        if (byName.isEmpty()) return Optional.empty();
        if (byName.size() > 1) return Optional.empty(); // ambiguous: multiple users with same name
        User user = byName.get(0);
        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) return Optional.empty();
        return Optional.of(user);
    }

    @Transactional
    public User register(String name, String email, String rawPassword) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = new User();
        user.setName(name.trim());
        user.setEmail(email.trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        userRepository.save(user);
        return user;
    }

    @Transactional
    public boolean forgotPassword(String email) {
        Optional<User> opt = userRepository.findByEmail(email.trim().toLowerCase());
        if (opt.isEmpty()) return false;
        User user = opt.get();
        String newPassword = generateRandomPassword();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        emailService.sendPasswordReset(email.trim(), newPassword);
        return true;
    }

    private static String generateRandomPassword() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    }
}
