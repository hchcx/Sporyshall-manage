package com.gymmanage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication

public class GymmanageApplication {

    public static void main(String[] args) {
        SpringApplication.run(GymmanageApplication.class, args);
    }

}
