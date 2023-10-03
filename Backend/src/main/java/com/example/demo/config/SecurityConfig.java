package com.example.demo.config;

import com.example.demo.filter.CustomAuthenticationFilter;
import com.example.demo.filter.CustomAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        // Спринг автоматически привяжет существующие реализации PasswordEncoder и UserDetailsService к AuthenticationManager
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(http.getSharedObject(AuthenticationManager.class));
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");
        http.addFilter(customAuthenticationFilter);
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests()
                .antMatchers(
                        "/api/login/**",
                        "/api/registration/**",
                        "api/test",
                        "/authenticate",
                        "/login")
                .permitAll();
        http.logout().permitAll().logoutUrl("/api/logout").logoutSuccessHandler((request, response, authentication) -> {
        });
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
