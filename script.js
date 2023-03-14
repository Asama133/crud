let formOne = document.querySelector("#sign-up")
let formTwo = document.querySelector("#sign-in")
let signUpInputs = document.querySelectorAll("#sign-up input:not(input[type = 'submit']")
let signInInputs = document.querySelectorAll("#sign-in input:not(input[type = 'submit'])")
let signUpMsg = document.querySelectorAll("#sign-up small")
let signInMss = document.querySelectorAll("#sign-in small")
let complete = true

let usersData = JSON.parse(localStorage.getItem("usersData")) || []

keyUp(signUpInputs,"sign-up",signUpMsg)
keyUp(signInInputs,"sign-in",signInMss)

function keyUp(inputs,id,message){
    inputs.forEach((input,idx) =>{
         input.onkeyup = ()=>{
             input.style.borderColor = "var(--secondary-color)"
             input.style.opacity = "1"
             message[idx].textContent = ""
             document.querySelectorAll(`#${id} i`)[idx].style.display = "none"
          
         }
     })
 }

formOne.addEventListener("submit",(e)=>{
    e.preventDefault()
    validation()
    pushToArray()
 
    if (complete) {
        document.querySelector(".success").style.transform = " scale(1)"
        setTimeout(()=>{document.querySelector(".success").style.transform = " scale(0)"},1200)
    }
})

function validation(){
    signUpInputs.forEach((input,idx) =>{
        if(input.value == ''){
         signUpMsg[idx].textContent = "this field required"
         complete = false
      
        }else{
            complete = true
        }
    })

msError(signUpInputs,0,"full name must be between 6 and 20 characters",/[a-z]+/gi)
msError(signUpInputs,1,"user name must be between 6 and 20 characters",/[a-z]+/gi)
msError(signUpInputs,3,
"password must be between 6 and 20 characters,contains small or capital letters or numbers",/\w+/)

msError(signUpInputs,4,"incorrect password",signUpInputs[4].value.match(signUpInputs[3].value))

}
function msError (signUpInputs,idx,ms,regex){
    let match = signUpInputs[idx].value.match(regex)
   if(signUpInputs[idx].value !==""){
    if(signUpInputs[idx].value.trim().length >= 20 ||signUpInputs[idx].value.trim().length < 6||!match){ 
        signUpMsg[idx].textContent = ms 
        signUpInputs[idx].value = ''
        complete = false
     } 

   }
   emailValidation(/\w+@\w+.com$/gi,"email must contains @.. .com")
   genderError()
}


function emailValidation(regex,ms){
    let email = document.getElementById("email")
      match = email.value.match(regex)
    if(email.value.trim() !==""){
        if(!match){
            document.querySelector(".email-error").textContent = ms
            email.value = ""
        }
      
    }
    }
function genderError(){
     document.querySelectorAll("[name = 'gender']").forEach(radio =>{
        if(radio.checked == false ){
           document.querySelector(".gender").textContent = "please choose the gender"
        }
      
        if(document.querySelectorAll("[name = 'gender']")[0].checked == true ||
        document.querySelectorAll("[name = 'gender']")[1].checked == true
        ){
            document.querySelector(".gender").textContent = ""
        }
     })  
}
function pushToArray(){
    let user = {
        fullName : document.querySelector('#full-name').value,
        userName : document.querySelector('#user-name').value,
        email : document.querySelector('#email').value,
        password:document.querySelector('#password').value,
        gender:document.querySelector('input[name = "gender"]:checked').value,
    }
    usersData.push(user)
        for (const key in user) {
          
           if(user[key] == ""){
           usersData.pop()
           complete = false
           }
         }
         localStorage.setItem("usersData",JSON.stringify(usersData))
    console.log(usersData);
    }

    // sign in 

  

    formTwo.addEventListener("submit",(e)=>{
e.preventDefault()
signInInputs.forEach((input,idx)=>{
if(input.value == ""){
    signInMss[idx].textContent = `please  ${input.placeholder}`
}
})
existingData()
    })


    function existingData(){
      let user =  usersData.find(user =>{
          return  user.userName == signInInputs[0].value.toLowerCase() && user.password == signInInputs[1].value
        })
        console.log(user);
        if(user){
            document.querySelector(".sign").textContent = `welcome ${user.fullName}`
            document.querySelector(".sign").style.transform = " scale(1)"
        }
        if(user === undefined && signInInputs[0].value !=="" ){
        
           signInMss[0].textContent = "incorrect user name"
                    
        }
        if(user === undefined && signInInputs[1].value !==""){
            signInMss[1].textContent = "incorrect password"
        }
               

    }

 
    document.querySelector(".sign-up").onclick = openSignIn
    document.querySelector(".sign-in").onclick = openSignUp
    
    function openSignIn(){
        formOne.style.transform = "rotateY(0deg)"
        formTwo.style.transform = "rotateY(180deg)"
        formTwo.style.pointerEvents = "unset"
    }
    function openSignUp(){
        formOne.style.transform = "rotateY(180deg)"
        formTwo.style.transform = "rotateY(0deg)"
    }
  
// add users to page

document.querySelector("#add").addEventListener("click",(e)=>{
    e.preventDefault() 
    addUser()
    emptyInputs()
   
})
function addUser(){

  document.querySelector("tbody").innerHTML= ""
usersData.forEach((user,idx)=>{
     row = document.createElement("tr")
    row.innerHTML = `
    <td>${idx+1}</td>
    <td>
      <input type="text" placeholder = "fullName" readonly value="${user.fullName}">
      <div style="margin-top: 0.2em; display: none;">
        <span onclick = "save(${idx},this)">save</span>
        <span onclick = "cancel(this)">cancel</span>
    </div>
  </td>
  <td>
    <input type="text" placeholder = "userName" readonly value="${user.userName}">
    <div style="margin-top: 0.2em; display: none;">
      <span onclick = "save(${idx},this)">save</span>
      <span onclick = "cancel(this)">cancel</span>
  </div>
</td>
<td>
  <input type="text" placeholder = "email" readonly value="${user.email}">
  <div style="margin-top: 0.2em; display: none; ">
    <span onclick = "save(${idx},this)">save</span>
    <span onclick = "cancel(this)">cancel</span>
</div>
</td>
<td>
  <input type="text" placeholder = "password" readonly value="${user.password}">
  <div style="margin-top: 0.2em; display: none;">
    <span onclick = "save(${idx},this)">save</span>
    <span onclick = "cancel(this)">cancel</span>
</div>
</td>
<td>
  <input type="text" placeholder = "gender" readonly value="${user.gender}">
  <div style="margin-top: 0.2em; display: none;">
    <span onclick = "save(${idx},this)">save</span>
    <span onclick = "cancel(this)">cancel</span>
</div>
</td>
    <td><i class="fa-sharp fa-solid fa-pencil" onclick = "changeReadOnly(${idx})"></i></td>
    <td><i class="fa-regular fa-trash-can" onclick = "deleteItem(${idx})"></i></td>
    `
    document.querySelector("tbody").append(row)
})

}

addUser()

function emptyInputs(){
    location.reload()
   
}
function deleteItem(idx){
    usersData.splice(idx,1)
    localStorage.setItem("usersData",JSON.stringify( usersData))
    addUser()
}

function changeReadOnly(idx){
    inputsRow = document.querySelectorAll("tbody tr ")[idx].querySelectorAll("input")
inputsRow.forEach(input =>{
    input.removeAttribute("readonly")
    input.style.opacity = 0.5
    input.nextElementSibling.style.display = "block"
    inputsRow[idx].focus()
});

}

function save(idx,btn){
    operation(btn)
    inputsRow = document.querySelectorAll("tbody tr")[idx].querySelectorAll("input")
user ={}
inputsRow.forEach((input) =>{
    user[input.placeholder] = input.value
   
})
usersData[idx] = user
localStorage.setItem("usersData",JSON.stringify(usersData))

}

function cancel(btn){
    operation(btn)

}

function operation(btn){
    previousInput = btn.parentElement.previousElementSibling
    previousInput.setAttribute("readOnly","readonly");
    previousInput.style.opacity = 1
      btn.parentElement.remove()
}

document.querySelector("input[type='search']").onkeyup = function(){
    usersData.forEach((user,idx)=>{
        if(user.fullName.toLowerCase().includes(this.value.toLowerCase())){
            document.querySelectorAll("tbody tr")[idx].style.display = ""
        }else{
            document.querySelectorAll("tbody tr")[idx].style.display = "none"
   
        }
    })

}
document.querySelector("#delete-all").addEventListener("click",deleteAll)
function deleteAll(){
    usersData = []
    localStorage.setItem("usersData",JSON.stringify(usersData))
    addUser()
}
