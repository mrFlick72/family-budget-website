package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static it.valeriovaudi.familybudget.familybudgetwebsite.web.model.MonthRepresentation.newMonthRepresentationList;


@RestController
public class MonthRegistryEndPoint {

    @GetMapping("/month")
    public ResponseEntity getAllMonth() {
        return ResponseEntity.ok(newMonthRepresentationList());
    }
}
