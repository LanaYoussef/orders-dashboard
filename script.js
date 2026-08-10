


function getusers() {
  return JSON.parse(localStorage.getItem('usersList')) || [];
}


function getme() {
    console.log("getme is running");

    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/me.php');
  
    xhr.onload = function () {
        console.log("Status:", xhr.status);
        console.log("Response:", xhr.responseText);

        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);

            document.getElementById('welcome').textContent =
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

function renderTable() {

  const tablebody = document.getElementById('tbody');
  const users = getusers();
  const search=document.getElementById('search').value.toLowerCase();
  const agefilter = document.getElementById('agefilter').value;
  const genderFilter = document.getElementById('genderFilter').value;

  
  let filteredUsers = users.filter((user) => {
    return (
        user.firstname.toLowerCase().includes(search) ||
        user.lastname.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
    

});
if(agefilter==='kid'){
      filteredUsers=filteredUsers.filter((user)=>user.age>=6&& user.age<=12);
    }
    if(agefilter=='teen'){
      filteredUsers=filteredUsers.filter((user)=>user.age>=13 && user.age<=17);

    }
    if (agefilter === 'adult') {
    filteredUsers = filteredUsers.filter((user) => user.age >= 18 && user.age <= 59);
}
    if (agefilter === 'almost-dead') {
    filteredUsers = filteredUsers.filter((user) => user.age >= 60);
}

    if(genderFilter!=='all'){
      filteredUsers=filteredUsers.filter((user)=>{
        return user.gender === genderFilter;
      })
    }

  
  tablebody.innerHTML = filteredUsers
    .map(
      (user) => `<tr userid= "${user.id}">
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.phonenumber}</td>
        <td>${user.dob}</td>
        <td>${user.age}</td>
        
        
        <td><div class="btns"><button class="dltbtn" onclick="deleteById(${user.id})"> Delete </button>
        <button class="editbtn" onclick="editById(${user.id})"> Edit </button></div></td>
      </tr>`
    )
    .join('');
}

function deleteById(id){
  if(!confirm("are you sure you wanna delete this user?"))return;
  const users=getusers();
  const updateusers=users.filter((user)=>user.id!=id);
  localStorage.setItem('usersList',JSON.stringify(updateusers));
  renderTable();
}
let currentId=null;

function editById(id){
    const users=getusers();
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
  const search=document.getElementById('search')
  search.addEventListener('input',()=>{
    renderTable();
  })
  const agefilter = document.getElementById('agefilter');
  agefilter.addEventListener('change', () => {
    renderTable();
});

const genderFilter = document.getElementById('genderFilter');

genderFilter.addEventListener('change', () => {
    renderTable();
});
  getme();
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

    const gender=document.getElementById('gender').value;

    const today = new Date();
    const birth = new Date(dob);
    const age = calculateAge(dob);
    const phone = /^\d{8}$/;
    const users = getusers();

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
    if(currentId===null){
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

    

    if(currentId!==null){

      const updatedusers = users.map((user)=> user.id ==currentId?{id: currentId,firstname,lastname,email,phonenumber,dob,age,gender}:user);

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

    localStorage.setItem('nextuserid',currenteditid)

    form.reset();
    dialog.close();
    renderTable();
    alert('User added');}
  });

});



