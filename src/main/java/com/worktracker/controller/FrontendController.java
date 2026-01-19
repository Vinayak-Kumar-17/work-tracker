package com.worktracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping("/")
    public String getIndex() {
        return "forward:/index.html";
    }
}
