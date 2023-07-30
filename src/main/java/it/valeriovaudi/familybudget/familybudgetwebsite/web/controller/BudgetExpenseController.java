package it.valeriovaudi.familybudget.familybudgetwebsite.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BudgetExpenseController {


    @GetMapping("/index")
    public String index() {
        return "index";
    }

}