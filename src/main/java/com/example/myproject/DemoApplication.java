package com.example.myproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpSession;

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
}
