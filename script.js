async function getUsers() {
  const response = await fetch("/api/users");
  return await response.json();
}

async function checkWeather() {
  const response = await fetch("/api/weather.php");
  const data = await response.json();
  if (data.error) return;
  document.querySelector(".city").innerHTML = data.city;
  document.querySelector(".temp").innerHTML = data.temp;
  document.querySelector(".humidity").innerHTML = data.humidity;
  document.querySelector(".wind").innerHTML = data.wind;
}

function getHeartBeat() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/heartbeat.php");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("heartBeat").textContent = data.is_alive
        ? "alive"
        : "dead";
    }
  };
  xhr.send();
}
function getMe() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/me.php");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const user = JSON.parse(xhr.responseText);
      document.getElementById("welcome").textContent =
        `Welcome ${user.first_name}`;
    }
  };
  xhr.send();
}

function calculateAge(dob) {
  const today = new Date();
  const birth = new Date(dob);

  let age = today.getFullYear() - birth.getFullYear();
  return age;
}

async function renderTable() {
  const tableBody = document.getElementById("tbody");
  const users = await getUsers();
  const search = document.getElementById("search").value.toLowerCase();
  const ageFilter = document.getElementById("ageFilter").value;
  const genderFilter = document.getElementById("genderFilter").value;

  let filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  });
  if (ageFilter === "kid") {
    filteredUsers = filteredUsers.filter(
      (user) => user.age >= 6 && user.age <= 12,
    );
  }
  if (ageFilter == "teen") {
    filteredUsers = filteredUsers.filter(
      (user) => user.age >= 13 && user.age <= 17,
    );
  }
  if (ageFilter === "adult") {
    filteredUsers = filteredUsers.filter(
      (user) => user.age >= 18 && user.age <= 59,
    );
  }
  if (ageFilter === "almost-dead") {
    filteredUsers = filteredUsers.filter((user) => user.age >= 60);
  }

  if (genderFilter !== "all") {
    filteredUsers = filteredUsers.filter((user) => {
      return user.gender === genderFilter;
    });
  }

  tableBody.innerHTML = filteredUsers
    .map(
      (user) => `<tr userid= "${user.id}">
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.dob}</td>
        <td>${user.age}</td>

        <td><div class="btns">
        <button class="btn btn-danger btn-sm" onclick="deleteById(${user.id})">Delete</button>
        <button class="btn btn-warning btn-sm" onclick="editById(${user.id})">Edit</button>
      </div></td>`,
    )
    .join("");
}

async function deleteById(id) {
  if (!confirm("are you sure you wanna delete this user?")) return;
  await fetch("/api/users/" + id, { method: "DELETE" });
  await renderTable();
}
let currentId = null;

async function editById(id) {
  const response = await fetch("/api/users/" + id);
  const user = await response.json();
  if (!user || user.error) return;

  document.getElementById("firstname").value = user.firstName;
  document.getElementById("lastname").value = user.lastName;
  document.getElementById("email").value = user.email;
  document.getElementById("phonenumber").value = user.phoneNumber;
  document.getElementById("dob").value = user.dob;
  document.getElementById("gender").value = user.gender;

  currentId = id;
  document.getElementById("myDialog").showModal();
}

document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("myDialog");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const form = document.getElementById("addform");
  const errormsg = document.getElementById("errormsg");
  const search = document.getElementById("search");

  search.addEventListener("input", () => {
    renderTable();
  });

  const ageFilter = document.getElementById("ageFilter");
  ageFilter.addEventListener("change", () => {
    renderTable();
  });

  const genderFilter = document.getElementById("genderFilter");

  genderFilter.addEventListener("change", () => {
    renderTable();
  });

  getMe();

  checkWeather();
  setInterval(checkWeather, 60000);

  getHeartBeat();
  setInterval(getHeartBeat, 5000);
  renderTable();

  openBtn.addEventListener("click", () => {
    currentId = null;
    form.reset();
    errormsg.textContent = "";
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    currentId = null;
    form.reset();
    dialog.close();
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phonenumber").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = /^\d{8}$/;

    const today = new Date();
    const birth = new Date(dob);
    const age = calculateAge(dob);

    const users = await getUsers();

    if (!email.includes("@") || !email.includes(".")) {
      errormsg.textContent = "Please enter a valid email";
      return;
    }

    if (!phone.test(phoneNumber)) {
      errormsg.textContent = "Please enter a valid phone number";
      return;
    }

    if (birth > today || age < 6) {
      errormsg.textContent = "Not a valid age";
      return;
    }

    if (
      users.some(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.id != currentId,
      )
    ) {
      errormsg.textContent = "Email already exists";
      return;
    }

    if (
      users.some(
        (user) => user.phoneNumber === phoneNumber && user.id != currentId,
      )
    ) {
      errormsg.textContent = "Phone number already exists";
      return;
    }

    errormsg.textContent = "";

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      age,
      gender,
    };

    if (currentId !== null) {
      await fetch("/api/users/" + currentId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      currentId = null;
      form.reset();
      dialog.close();
      await renderTable();
      alert("User updated");
    } else {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      form.reset();
      dialog.close();
      await renderTable();
      alert("User added");
    }
  });
});
