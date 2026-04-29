function handleTaskClick(taskElement, lista){
    let noviText = prompt("Uredi zadatak:", taskElement.innerHTML);

    if (noviText === null) return;

    if(noviText === ""){
        taskElement.remove();

    } else {
        taskElement.innerHTML = noviText;
    }
    taskElement.style.textDecoration = "none"
    localStorage.setItem("tasks", lista.innerHTML);
}



function dodajTask() {
    let task = document.getElementById("taskInput").value;

    if (task.trim() === "") {
        alert("Upiši zadatak!")
    } else {
        let lista = document.getElementById("lista");

        let noviTask = document.createElement("li");
        noviTask.innerHTML = `
          <input type="checkbox" class="check">
          <span>${task}</span>
        `;

        noviTask.querySelector("span").onclick = function() {
          handleTaskClick(this, lista);
        };

        lista.appendChild(noviTask);

        localStorage.setItem("tasks", lista.innerHTML);

        document.getElementById("taskInput").value = "";
    }
}




window.onload = function() {
    let spremljeno = localStorage.getItem("tasks");

    if(spremljeno){
        let lista = document.getElementById("lista")
        lista.innerHTML = spremljeno;

        let sviTaskovi = lista.getElementsByTagName("li");

        for (let i = 0; i < sviTaskovi.length; i++) {
          let span = sviTaskovi[i].querySelector("span");
          if (span) {
            span.onclick = function() {
              handleTaskClick(this, lista);
            };
          }
        }
    }

    document.getElementById("taskInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            dodajTask();
        }
    });
}

function obrisiOznacene() {
  let lista = document.getElementById("lista");
  let taskovi = lista.getElementsByTagName("li");


  for (let i = taskovi.length - 1; i >= 0; i--) {
    let checkbox = taskovi[i].querySelector(".check");

    if (checkbox.checked) {
      taskovi[i].remove();
    }
  }

  localStorage.setItem("tasks", lista.innerHTML);
}