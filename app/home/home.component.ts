import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  currentDate: string;
  gridRadiosPriority: string;
  gridRadiosStatus: string;
  cardId: number;
  updateCardId: number;

  constructor() {
    this.gridRadiosPriority = "#DBFBFA";
    this.gridRadiosStatus = "New";
    this.currentDate = new Date().toISOString().substring(0, 10);
    this.tasksList.splice(0);
    this.cardId = 0;
    this.updateCardId = 0;
  }

  // Array for task manager.
  tasksList = [{
    CardId: 0,
    title: "",
    status: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: ""
  }];

  // Form Group of Angular for add task.
  addTaskForm = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl(''),
    gridRadiosStatus: new FormControl("New"),
    createDate: new FormControl(''),
    endDate: new FormControl(''),
    gridRadiosPriority: new FormControl("#DBFBFA")
  });

  // Form Group of Angular for edit form
  editform = new FormGroup({
    titleEdit: new FormControl(''),
    descEdit: new FormControl(''),
    radiostatus: new FormControl(''),
    radiopriority: new FormControl(''),
    startDateEdit: new FormControl(''),
    endDateEdit: new FormControl('')
  });

  // Deleteing task items from the task list.
  deleteTask(cardids: number) {
    alert(cardids)
    this.tasksList = this.tasksList.filter((task) => task.CardId != cardids);
  }

  //Filtering list items based on status type
  filterItemsOfType(type: string) {
    return this.tasksList.filter(x => x.status == type);
  }

  // Opening for editing form
  setTaskToModal(cardid: number) {
    let index: number = 0;
    for (let i = 0; i < this.tasksList.length; i++) {
      if (this.tasksList[i].CardId == cardid) {
        index = i;
      }
    }
    this.updateCardId = index;

    let title: string = this.tasksList[index].title;
    let description: string = this.tasksList[index].description;
    let status: string = this.tasksList[index].status;
    let creationDate: string = this.tasksList[index].startDate;
    let endDate: string = this.tasksList[index].endDate;
    let priority: string = this.tasksList[index].priority;

    this.editform.reset({ radiostatus: status, radiopriority: priority })

    let titleInput = document.getElementById("inputtitleModal") as HTMLInputElement;
    if (titleInput != null) {
      titleInput.value = title;
    }
    let descInput = document.getElementById("inputdescModal") as HTMLInputElement;
    if (descInput != null) {
      descInput.value = description;
    }

    let startDateInput = document.getElementById("inputCreateDateModal") as HTMLInputElement;
    if (startDateInput != null) {
      startDateInput.value = creationDate;
    }
    let endDateInput = document.getElementById("inputfinishDateModal") as HTMLInputElement;
    if (endDateInput != null) {
      endDateInput.value = endDate;
    }
  }

  // Updating task after edit
  updateDetails() {
    let titleInput = document.getElementById("inputtitleModal") as HTMLInputElement;
    if (titleInput != null) {
      this.tasksList[this.updateCardId].title = titleInput.value;
    }

    this.tasksList[this.updateCardId].status = this.editform.value.radiostatus;
    this.tasksList[this.updateCardId].priority = this.editform.value.radiopriority;

    let descInput = document.getElementById("inputdescModal") as HTMLInputElement;
    if (descInput != null) {
      this.tasksList[this.updateCardId].description = descInput.value;
    }

    let startDateInput = document.getElementById("inputCreateDateModal") as HTMLInputElement;
    if (startDateInput != null) {
      this.tasksList[this.updateCardId].startDate = startDateInput.value;
    }
    let endDateInput = document.getElementById("inputfinishDateModal") as HTMLInputElement;
    if (endDateInput != null) {
      this.tasksList[this.updateCardId].endDate = endDateInput.value;
    }
  }

  // On Submit of task 
  onSubmit() {
    let me: this = this;

    this.tasksList.push({
      CardId: me.cardId++,
      title: me.addTaskForm.value.title,
      status: me.addTaskForm.value.gridRadiosStatus,
      description: me.addTaskForm.value.desc,
      startDate: me.addTaskForm.value.createDate,
      endDate: me.addTaskForm.value.endDate,
      priority: me.addTaskForm.value.gridRadiosPriority
    });

    let formClose: any = document.getElementById("add_task");
    if (formClose?.style.display == "block") {
      formClose.style.display = "none";
    }
    this.addTaskForm.reset({ gridRadiosPriority: "#DBFBFA", gridRadiosStatus: "New", createDate: this.currentDate });
  }



  // Drag and drop

  drop(event: CdkDragDrop<{ CardId: number; title: string; status: string; description: string; startDate: string; endDate: string; priority: string; }[]>) {
    // window.alert(event.);
    let cardindex: number = 0;
    // if(event.container.id === 'new_drag') {
    //   alert("curr index "+event.container.id +"prev "+event.previousContainer.id);
    // }else if(event.container.id === 'prog_drag'){
    //   alert("prog");
    // }
    for (let i = 0; i < this.tasksList.length; i++) {
      // debugger
      if (this.tasksList[i].CardId === event.previousContainer.data[event.currentIndex]['CardId']) {
        cardindex = event.container.data[event.currentIndex]['CardId'];
        // alert("prev cardid " + event.item.data[event.currentIndex]['CardId'])
        // window.alert(event.previousContainer.data[event.previousIndex]['CardId'])
        if (event.dropPoint.x >= 450 && event.dropPoint.x < 750) {
          this.tasksList[i].status = "In Progress";
        } else if (event.dropPoint.x >= 750) {
          this.tasksList[i].status = "Completed";
        } else if (event.dropPoint.x < 450) {
          this.tasksList[i].status = "New";
        }
        // this.tasksList[i].CardId = cardindex;
        // break;
      }
    }
    // window.alert(index)



    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex);
    // }
  }


}
