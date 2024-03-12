package org.vitamate.vitamatebackend.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.vitamate.vitamatebackend.domain.entity.RegistrationSource;
import org.vitamate.vitamatebackend.domain.entity.Role;
import org.vitamate.vitamatebackend.domain.entity.User;
import org.vitamate.vitamatebackend.service.UserService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final UserService userService;
    @Value("${frontend.url}")
    private String frontendUrl;
    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        OAuth2AuthenticationToken oAuth2AccessToken = (OAuth2AuthenticationToken) authentication;
        if("github".equals(oAuth2AccessToken.getAuthorizedClientRegistrationId())){
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            Map<String,Object> attributes = principal.getAttributes();
            String login = attributes.getOrDefault("email","") == null ? attributes.getOrDefault("login","").toString() : attributes.getOrDefault("email","").toString();

            String name = attributes.getOrDefault("name","").toString();
            userService.findByLogin(login).ifPresentOrElse(user -> {
                DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,attributes,"id");
                Authentication securityAuth = new OAuth2AuthenticationToken(newUser,List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,oAuth2AccessToken.getAuthorizedClientRegistrationId());
                SecurityContextHolder.getContext().setAuthentication(securityAuth);
            },()->{

                User user = new User(login,name,new ArrayList<>(),RegistrationSource.Github, Role.USER);
                user.setRole(Role.USER);
                user.setRegistrationSource(RegistrationSource.Github);
                userService.save(userService.convertToDto(user).orElseThrow());
                DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,attributes,"id");
                Authentication securityAuth = new OAuth2AuthenticationToken(newUser,List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,oAuth2AccessToken.getAuthorizedClientRegistrationId());
                SecurityContextHolder.getContext().setAuthentication(securityAuth);
            });
        }
        if("google".equals(oAuth2AccessToken.getAuthorizedClientRegistrationId())){
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            Map<String,Object> attributes = principal.getAttributes();
            String login = attributes.getOrDefault("email","") == null ? attributes.getOrDefault("login","").toString() : attributes.getOrDefault("email","").toString();
            String name = attributes.getOrDefault("name","").toString();
            userService.findByLogin(login).ifPresentOrElse(user -> {
                DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,attributes,"id");
                Authentication securityAuth = new OAuth2AuthenticationToken(newUser,List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,oAuth2AccessToken.getAuthorizedClientRegistrationId());
                SecurityContextHolder.getContext().setAuthentication(securityAuth);
            },()->{
                User user = new User(login,name,new ArrayList<>(),RegistrationSource.Google, Role.USER);
                user.setRole(Role.USER);
                userService.save(userService.convertToDto(user).orElseThrow());
                DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,attributes,"id");
                Authentication securityAuth = new OAuth2AuthenticationToken(newUser,List.of(new SimpleGrantedAuthority(user.getRole().name()))
                        ,oAuth2AccessToken.getAuthorizedClientRegistrationId());
                SecurityContextHolder.getContext().setAuthentication(securityAuth);
            });
        }
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
