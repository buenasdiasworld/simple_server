package main;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RebaseController {


  @GetMapping("/hello")
  public String hello() {
    return "rebase your branch";
  }


}
