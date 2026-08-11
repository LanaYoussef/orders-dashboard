


function getUsers() {
  return JSON.parse(localStorage.getItem('usersList')) || [];
}

function getHeartBeat(){
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/api/heartbeat.php');
  xhr.onload = function(){ 
    if(xhr.status === 200){
            const data = JSON.parse(xhr.responseText);
            document.getElementById('heartBeat').textContent = data.is_alive? 'alive' : 'dead';
    }
  };
  xhr.send();
}


function getMe() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/me.php');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);
            document.getElementById('welcome').textContent = `Welcome ${user.first_name}`;
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

function renderTable() {

  const tableBody = document.getElementById('tbody');
  const users = getUsers();
  const search=document.getElementById('search').value.toLowerCase();
  const ageFilter = document.getElementById('ageFilter').value;
  const genderFilter = document.getElementById('genderFilter').value;

  
  let filteredUsers = users.filter((user) => {
    return (
        user.firstname.toLowerCase().includes(search) ||
        user.lastname.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
    

});
if(ageFilter === 'kid'){
      filteredUsers = filteredUsers.filter((user)=> user.age>=6 && user.age <=12);
    }
    if(ageFilter == 'teen'){
      filteredUsers = filteredUsers.filter((user)=> user.age >= 13 && user.age <=17);

    }
    if (ageFilter === 'adult') {
    filteredUsers = filteredUsers.filter((user) => user.age >= 18 && user.age <= 59);
}
    if (ageFilter  === 'almost-dead') {
    filteredUsers = filteredUsers.filter((user) => user.age >= 60);
}

    if(genderFilter !== 'all'){
      filteredUsers = filteredUsers.filter((user)=>{
        return user.gender === genderFilter;
      })
    }

  
  tableBody.innerHTML = filteredUsers
    .map(
      (user) => `<tr userid= "${user.id}">
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.phonenumber}</td>
        <td>${user.dob}</td>
        <td>${user.age}</td>

        <td><div class="btns"><button class="dltbtn" onclick="deleteById(${user.id})"> Delete </button>
        <button class="editbtn" onclick="editById(${user.id})" > Edit </button></div></td>

        </tr>`
    )
    .join('');
}

function deleteById(id){
  if(!confirm("are you sure you wanna delete this user?"))return;
  const users = getUsers();
  const updateusers = users.filter((user)=> user.id != id);
  localStorage.setItem('usersList',JSON.stringify(updateusers));
  renderTable();
}
let currentId=null;

function editById(id){
    const users=getUsers();
    const user = users.find(u => u.id ==id);
    if(!user) return;

  document.getElementById('firstname').value = user.firstname;
  document.getElementById('lastname').value = user.lastname;
  document.getElementById('email').value = user.email;
  document.getElementById('phonenumber').value = user.phonenumber;
  document.getElementById('dob').value = user.dob;
  document.getElementById('gender').value = user.gender;

  currentId=id;

  document.getElementById('myDialog').showModal();

}

document.addEventListener('DOMContentLoaded', function () {
  const dialog = document.getElementById('myDialog');
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const form = document.getElementById('addform');
  const errormsg = document.getElementById('errormsg');
  const search = document.getElementById('search');

  search.addEventListener('input', () => {
    renderTable();
  });
  
  const ageFilter = document.getElementById('ageFilter');
  ageFilter.addEventListener('change', () => {
    renderTable();
});

const genderFilter = document.getElementById('genderFilter');

genderFilter.addEventListener('change', () => {
    renderTable();
});

    getMe();

    getHeartBeat();
    setInterval(getHeartBeat, 5000);
    renderTable();
    
  openBtn.addEventListener('click', () => {
    currentId=null;
    form.reset();
    errormsg.textContent = '';
    dialog.showModal();
  });

  closeBtn.addEventListener('click', () => {
    currentId=null;
    form.reset();
    dialog.close();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phonenumber = document.getElementById('phonenumber').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phone = /^\d{8}$/;

    const today = new Date();
    const birth = new Date(dob);
    const age = calculateAge(dob);

    const users = getUsers();

    if (!email.includes('@') || !email.includes('.')) {
      errormsg.textContent = 'Please enter a valid email';
      return;
    }

    if (!phone.test(phonenumber)) {
      errormsg.textContent = 'Please enter a valid phone number';
      return;
    }

    if (birth > today || age < 6) {
      errormsg.textContent = 'Not a valid age';
      return;
    }
    if(currentId === null){
        if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
          errormsg.textContent = 'Email already exists';
          return;
        }

        if (users.some((user) => user.phonenumber === phonenumber)) {
          errormsg.textContent = 'Phone number already exists';
          return;
        }
    }

    errormsg.textContent = '';

    if(currentId !== null){

      const updatedusers = users.map((user)=> user.id == currentId?{id: currentId,firstname,lastname,email,phonenumber,dob,age,gender}:user);

      localStorage.setItem('usersList', JSON.stringify(updatedusers));

      currentId=null;
      
      form.reset();
      dialog.close();
      renderTable();
      alert('User updated');

    }else{

    let currenteditid=Number(localStorage.getItem('nextuserid')) || 0;
    const id= currenteditid++;
    users.push({ id, firstname, lastname, email, phonenumber, dob, age, gender});

    localStorage.setItem('usersList', JSON.stringify(users));
    localStorage.setItem('nextuserid',currenteditid);

    getMe();
    form.reset();
    dialog.close();
    renderTable();
    alert('User added');}
  });

});



