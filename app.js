const studentName = document.getElementById("studentName");
const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");

const totalStudents = document.getElementById("totalStudents");
const presentStudents = document.getElementById("presentStudents");
const absentStudents = document.getElementById("absentStudents");

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

        studentDiv.className = "student";

        studentDiv.innerHTML = `
            <span>
                <strong>${student.name}</strong>
                -
                <span class="${student.status.toLowerCase()}">
                    ${student.status}
                </span>
            </span>

            <span>
                <button onclick="toggleAttendance(${index})">
                    Mark ${student.status === "Absent" ? "Present" : "Absent"}
                </button>

                <button class="delete-btn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </span>
        `;

        studentList.appendChild(studentDiv);
    });

    updateStatistics();
}

function toggleAttendance(index) {
    students[index].status =
        students[index].status === "Absent"
            ? "Present"
            : "Absent";

    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function updateStatistics() {
    const total = students.length;

    const present = students.filter(
        student => student.status === "Present"
    ).length;

    const absent = students.filter(
        student => student.status === "Absent"
    ).length;

    totalStudents.textContent = total;
    presentStudents.textContent = present;
    absentStudents.textContent = absent;
}