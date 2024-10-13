package com.HaiDang.controller;

import com.HaiDang.request.AuthRequest;
import com.HaiDang.response.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/signup")
    public ResponseEntity<AuthRequest> createUser(@RequestBody AuthRequest authRequest){
        return ResponseEntity.ok(authRequest);
    }
}
