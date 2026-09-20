
const studentName = document.getElementById("studentName");
const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");

let students = [];

addBtn.addEventListener("click", addStudent);

function addStudent() {
    const name = studentName.value.trim();

    if (name === "") {
        alert("Please enter a student name.");
        return;
    }

    students.push({
        name: name,
        status: "Absent"
    });

    studentName.value = "";
    displayStudents();
}

function displayStudents() {
    studentList.innerHTML = "";

    students.forEach((student, index) => {
        const studentDiv = document.createElement("div");

        studentDiv.innerHTML = `
            <p>
                <strong>${student.name}</strong>
                - ${student.status}
                <button onclick="toggleAttendance(${index})">
                    Mark ${student.status === "Absent" ? "Present" : "Absent"}
                </button>
                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </p>
        `;

        studentList.appendChild(studentDiv);
    });
}

function toggleAttendance(index) {
    students[index].status =
        students[index].status === "Absent" ? "Present" : "Absent";

    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}