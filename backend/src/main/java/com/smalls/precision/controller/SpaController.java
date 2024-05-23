package com.smalls.precision.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin(origins={"http://precisionApptManager:8080", "http://localhost:8080"})
public class SpaController {

    /**
     * forward non-API requests to index.html
     * @param id the client or appointment id
     * @return forward request to index.html
     */
    @RequestMapping(path = {
            "/",
            "/clients",
            "/clients/*",
            "/clients/*/",
            "/clients/{id}/edit",
            "/appointments",
            "/appointments/*",
            "/appointments/*/",
            "/appointments/{id}/edit",
            "/reports/*",
            "/reports/*/",
            "/users/*",
            "/users/*/",
    })
    public String forward(@PathVariable(name = "id", required = false) Integer id) {
        return "forward:/index.html";
    }

}
