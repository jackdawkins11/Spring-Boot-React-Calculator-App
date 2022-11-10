package com.example.myproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}

@RestController
class MyController{

	@PostMapping("/CheckSession")
	public String checkSession(HttpSession session){
		boolean hasSession = session.getAttribute("userId") != null;
		return "{ \"error\": false, \"hasSession\": " + String.valueOf(hasSession) + " }";
	}

	@Autowired
	UserRepo userRepo;
	
	@PostMapping("/CreateAccount")
	public String createAccount(@RequestParam Map<String, String> queryParameters ){
		String username = queryParameters.get( "username" );
		String password = queryParameters.get( "password" );
		
		boolean useable = username != null && !username.equals("") && password != null && !password.equals("");

		if( useable ){

			UserAccount user = new UserAccount();
			user.setName(username);
			user.setPassword(password);
			userRepo.save( user );
			System.out.println( user );

			return  "{ \"error\": false, \n"
                		+ "\"createdAccount\": true, \n"
                		+ "\"message\": \"" + "" + "\"}";

		}else{

			return  "{ \"error\": false, \n"
                		+ "\"createdAccount\": false, \n"
                		+ "\"message\": \"" + "Invalid credentials" + "\"}";

		}
	}

}

@Entity
@Data
@Table(name="userAccount")
class UserAccount{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	String name, password;
}

interface UserRepo extends JpaRepository<UserAccount, Long> {}
