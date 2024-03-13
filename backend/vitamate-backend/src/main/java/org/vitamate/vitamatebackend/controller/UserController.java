package org.vitamate.vitamatebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.vitamate.vitamatebackend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping
    public List<String> getDrugs(@AuthenticationPrincipal OAuth2User principal){
        String userId = getUserIdFromPrincipal(principal);
        return userService.getAllDrugs(userId);
    }
    @PostMapping("/drugs")
    public ResponseEntity<Void> AddDrugs(@AuthenticationPrincipal OAuth2User principal, @RequestBody List<String> drugs){
        String userId = getUserIdFromPrincipal(principal);
        userService.addDrugToUser(userId,drugs);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/drugs")
    public ResponseEntity<Void> DeleteDrugs(@AuthenticationPrincipal OAuth2User principal, @RequestBody List<String> drugs){
        String userId = getUserIdFromPrincipal(principal);
        userService.removeDrugFromUser(userId,drugs);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/auth/status")
    public ResponseEntity<?> authStatus(@AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            // Optionally return user details or a simple 'true' response
            return ResponseEntity.ok(principal.getAttributes());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
    }

    private String getUserIdFromPrincipal(OAuth2User principal) {
        if (principal.getAttributes().containsKey("sub")) {
            return principal.getAttribute("sub");
        }

        else if (principal.getAttributes().containsKey("id")) {
            return principal.getAttribute("id").toString();
        }

        throw new IllegalArgumentException("User identifier not found in principal attributes");
    }

}
