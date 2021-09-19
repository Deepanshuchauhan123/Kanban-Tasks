import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggle_addTask() {
    let formtask = document.getElementById("add_task");
    if (formtask != null) {
      if (formtask.style.display === "block") {
        formtask.style.display = "none";
      } else {
        formtask.style.display = "block";
      }
    }
  }

}
