package it.valeriovaudi.familybudget.familybudgetwebsite.web.controller;


import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.TimeProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Slf4j
@Controller
public class BudgetExpenseController {

    private final TimeProvider timeUtility;


    public BudgetExpenseController(TimeProvider timeUtility) {
        this.timeUtility = timeUtility;
    }


    @GetMapping("/index")
    public String index(RedirectAttributes redirectAttributes) {
        redirectAttributes.addAttribute("choicedMonth", timeUtility.getCurrentMonth().getMonthValue());
        redirectAttributes.addAttribute("year", timeUtility.getCurrentYear().getYearValue());
        return "redirect:index";
    }

    @GetMapping(value = "/index", params = {"choicedMonth","year"})
    public String index(Model model, @RequestParam("choicedMonth") Integer choicedMonth,
                        @RequestParam("year") Integer year) {
        model.addAttribute("choicedMonth", choicedMonth);
        model.addAttribute("year", year);

        return "index";
    }

}