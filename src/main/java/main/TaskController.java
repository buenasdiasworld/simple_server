package main;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {


  @GetMapping("/hello")
  public String hello() {
    return "hello world from back end";
  }


}
