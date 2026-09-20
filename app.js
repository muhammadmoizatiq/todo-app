const studentName = document.getElementById("studentName";
const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");
const markAllBtn = document.getElementById("markAllBtn");
const message = document.getElementById("message");

const totalStudents = document.getElementById("totalStudents");
const presentStudents = document.getElementById("presentStudents");
const absentStudents = document.getElementById("absentStudents");

let students = [];

addBtn.addEventListener("click", addStudent);

studentName.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addStudent();
    }
});

markAllBtn.addEventListener("click", markAllPresent);

function addStudent() {

    const name = studentName.value.trim();

    message.textContent = "";

    if (name === "") {
        message.textContent = "Please enter a student name.";
        return;
    }

    const alreadyExists = students.some(
        student => student.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
        message.textContent = "Student already exists!";
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

    if (students.length === 0) {
        studentList.innerHTML =
            '<p class="empty-message">No students added yet.</p>';

        updateStatistics();
        return;
    }

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

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
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

function markAllPresent() {

    students.forEach(student => {
        student.status = "Present";
    });

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