type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  age: number;
  gender: string;
};

function connectSocket(): void {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const socket = new WebSocket(`${protocol}//${location.host}/ws`);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "users_changed") {
      renderTable();
    }
  };
  socket.onclose = () => {
    setTimeout(connectSocket, 3000);
  };
}

async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  return await response.json();
}

async function checkWeather(): Promise<void> {
  const response = await fetch("/api/weather.php");
  const data = await response.json();
  if (data.error) return;
  document.querySelector(".city")!.innerHTML = data.city;
  document.querySelector(".temp")!.innerHTML = data.temp;
  document.querySelector(".humidity")!.innerHTML = data.humidity;
  document.querySelector(".wind")!.innerHTML = data.wind;
}

function getHeartBeat(): void {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/heartbeat.php");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("heartBeat")!.textContent = data.is_alive
        ? "alive"
        : "dead";
    }
  };
  xhr.send();
}

function getMe(): void {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/me.php");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const user = JSON.parse(xhr.responseText);
      document.getElementById("welcome")!.textContent =
        `Welcome ${user.first_name}`;
    }
  };
  xhr.send();
}
function calculateAge(dob: string): number {
  const today = new Date();
  const birth = new Date(dob);
  return today.getFullYear() - birth.getFullYear();
}

async function renderTable(): Promise<void> {
  const tableBody = document.getElementById("tbody")!;
  const users = await getUsers();
  const search = (
    document.getElementById("search") as HTMLSelectElement
  ).value.toLowerCase();
  const ageFilter = (document.getElementById("ageFilter") as HTMLSelectElement)
    .value;
  const genderFilter = (
    document.getElementById("genderFilter") as HTMLSelectElement
  ).value;

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
  if (ageFilter === "teen") {
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
    filteredUsers = filteredUsers.filter(
      (user) => user.gender === genderFilter,
    );
  }

  tableBody.innerHTML = filteredUsers
    .map(
      (user) => `<tr>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.dob}</td>
        <td>${user.age}</td>
        <td><div class="btns">
          <button type="button" class="dltbtn" data-id="${user.id}">Delete</button>
          <button type="button" class="editbtn" data-id="${user.id}">Edit</button>
        </div></td>
      </tr>`,
    )
    .join("");

  tableBody.querySelectorAll(".dltbtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteById(Number((btn as HTMLButtonElement).dataset.id));
    });
  });
  tableBody.querySelectorAll(".editbtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      editById(Number((btn as HTMLButtonElement).dataset.id));
    });
  });
}

async function deleteById(id: number): Promise<void> {
  if (!confirm("are you sure?")) return;
  await fetch("/api/users/" + id, { method: "DELETE" });
  await renderTable();
}

let currentId: number | null = null;

async function editById(id: number): Promise<void> {
  const response = await fetch("/api/users/" + id);
  const user = await response.json();
  if (!user || user.error) return;

  (document.getElementById("firstname") as HTMLInputElement).value =
    user.firstName;
  (document.getElementById("lastname") as HTMLInputElement).value =
    user.lastName;
  (document.getElementById("email") as HTMLInputElement).value = user.email;
  (document.getElementById("phonenumber") as HTMLInputElement).value =
    user.phoneNumber;
  (document.getElementById("dob") as HTMLInputElement).value = user.dob;
  (document.getElementById("gender") as HTMLInputElement).value = user.gender;
  currentId = id;
  (document.getElementById("myDialog") as HTMLDialogElement).showModal();
}

const dialog = document.getElementById("myDialog") as HTMLDialogElement;
const openBtn = document.getElementById("openBtn")!;
const closeBtn = document.getElementById("closeBtn")!;
const form = document.getElementById("addform") as HTMLFormElement;
const errormsg = document.getElementById("errormsg")!;
const search = document.getElementById("search")!;

search.addEventListener("input", () => {
  renderTable();
});
document.getElementById("ageFilter")!.addEventListener("change", () => {
  renderTable();
});
document.getElementById("genderFilter")!.addEventListener("change", () => {
  renderTable();
});

closeBtn.addEventListener("click", () => {
  currentId = null;
  form.reset();
  dialog.close();
});

getMe();
checkWeather();
setInterval(checkWeather, 60000);
getHeartBeat();
setInterval(getHeartBeat, 3000);
renderTable();
connectSocket();


openBtn.addEventListener("click", () => {
  currentId = null;
  form.reset();
  dialog.showModal();
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = (
    document.getElementById("firstname") as HTMLInputElement
  ).value.trim();
  const lastName = (
    document.getElementById("lastname") as HTMLInputElement
  ).value.trim();
  const email = (
    document.getElementById("email") as HTMLInputElement
  ).value.trim();
  const phoneNumber = (
    document.getElementById("phonenumber") as HTMLInputElement
  ).value.trim();
  const dob = (document.getElementById("dob") as HTMLInputElement).value;
  const gender = (document.getElementById("gender") as HTMLSelectElement).value;
  
  errormsg.textContent = "";
  const payload = {
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
  };
 
const isEdit = currentId !== null;
const response = await fetch(
  isEdit ? "/api/users/" + currentId : "/api/users",
  {
    method: isEdit ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  },
);
const data = await response.json();
if (!response.ok) {
  errormsg.textContent = data.error ?? "Request failed";
  return;
}
currentId = null;
form.reset();
dialog.close();
await renderTable();
});
