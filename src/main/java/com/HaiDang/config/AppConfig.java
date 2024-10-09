package com.HaiDang.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class AppConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable())
                .formLogin(httpSecurityFormLoginConfigurer -> {})
                .authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll())
                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(
                        new CorsConfigurationSource() {
                            @Override
                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                                CorsConfiguration ccfg = new CorsConfiguration();
                                ccfg.setAllowedHeaders(Arrays.asList("*"));
                                ccfg.setExposedHeaders(Collections.singletonList("Authorization"));
                                ccfg.setAllowCredentials(true);
                                ccfg.setMaxAge(3600L);
                                ccfg.setAllowedMethods(Collections.singletonList("*"));
                                ccfg.setAllowedOrigins(Arrays.asList("http://localhost:2205", "http://localhost:3000"));
                                return ccfg;
                            }
                        }
                ))
                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
