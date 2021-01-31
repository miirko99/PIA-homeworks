var page=document.getElementById("page")
function goSingUp(){
  page.innerHTML=`
  <div id="holder">
    <input type="text" placeholder="First name" id="inputFname">
    <input type="text" placeholder="Last name" id="inputLname">
    <input type="text" placeholder="E-mail" id="inputEmail">
    <input type="text" placeholder="username" id="inputUserName">
    <input type="password" placeholder="password" id="inputPassword">
    <input type="password" placeholder="repeat password" id="inputRPassword">
    <div id="buttons">
      <button class="btn singup" onclick="singUp()">Sing up</button>
      <button class="btn singup" onclick="goLogIn()">Log in</button>
    </div>
  </div>`
}
function goLogIn(){
  page.innerHTML=`
  <div id="holder">
  <input type="text" placeholder="E-MAIL/username" id="inputEmail">
    <input type="password" placeholder="password" id="inputPassword">
    <button class="btn login" onclick="logIn()">log in</button>
    <button class="btn login" onclick="goSingUp()">sing up</button>
  </div>
  `
}
function logIn(){
  let data=JSON.stringify({
    "email"     : document.getElementById("inputEmail").value,
    "password"  : document.getElementById("inputPassword").value
  })
  $.ajax ({
    url: 'login.php',
    type: 'post',
    data: {user: data},
    success: function(answer) {
      let odg=JSON.parse(answer)
      if(odg["exist"]){
        console.log("ulogovan si")
        if(odg["isAdmin"]){
          showadminpage()
        }
        else{
          showuserpage()
        }
      }
      else{
        alert("Pogresna sifra ili email")
      }
    }
  });
}
function singUp(){
  if(document.getElementById("inputPassword").value!=document.getElementById("inputRPassword").value){
    alert("pogresna sifra")
    return
  }
  let data=JSON.stringify({
    "firstName" : document.getElementById("inputFname").value,
    "lastName" : document.getElementById("inputLname").value,
    "email"     : document.getElementById("inputEmail").value,
    "userName"  : document.getElementById("inputUserName").value,
    "password"  : document.getElementById("inputPassword").value
  })
  $.ajax ({
    url: 'registracija.php',
    type: 'post',
    data: {user: data},
    success: function(answer) {
      alert(answer)
    }
  });
}
function showadminpage(){
  page.innerHTML=`
  <button class="btn" onclick="dodajFilm()">dodaj film</button>
  <button class="btn" onclick="logOut()">Log out</button>
  `
  data=JSON.stringify({
    "function": "get"
  })
  $.ajax ({
    url: 'filmovi.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      let filmovi=JSON.parse(answer)
      for(let film of filmovi){
        let div=document.createElement("div")
        div.classList.add("film")
        div.innerHTML=`<span>`+film+`</span>
          <button class="filmbtn btn" onclick="edit('`+film+`')">Edit</button>
          <button class="filmbtn btn" onclick="remove('`+film+`')">Delete</button>`
        page.appendChild(div)

      }
    }
  });
}
function logOut(){
  goLogIn()
  
}
let filmID

function edit(film){
  data=JSON.stringify({
    "function": "get1",
    "naslov"  : film
  })
  $.ajax ({
    url: 'filmovi.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      answer=JSON.parse(answer)
      filmID=answer["id"]
      

      page.innerHTML=`
      <input type="text" placeholder="naslov" id="inNaslov" value="`+answer["naslov"]+`">
      <textarea type="text" placeholder="opis" id="inOpis" rows="10" cols="100">`+answer["opis"]+`</textarea>
      <input type="text" placeholder="zanr" id="inZanr" value="`+JSON.parse(answer["zanr"]).join(", ")+`">
      <input type="text" placeholder="scenarista" id="inScenarista" value="`+answer["scenarista"]+`">
      <input type="text" placeholder="reziser" id="inReziser" value="`+answer["reziser"]+`">
      <input type="text" placeholder="producentska kuca" id="inProdKuca" value="`+answer["prodKuca"]+`">
      <input type="text" placeholder="path/slika.png" id="inSlika" value="`+answer["slika"]+`">
      <input type="text" placeholder="glumci" id="inGlumci" value="`+JSON.parse(answer["glumci"]).join(", ")+`">
      <input type="number" min="1950" max="2121" step="1" placeholder="godina" id="inGodina" value="`+answer["godina"]+`">
      <input type="number" min="0"  step="1" placeholder="trajanje" id="inTrajanje" value="`+answer["trajanje"]+`">
      <br>
      <button onclick="save()" class="btn">save </button>
      <button onclick="cancel()" class="btn">cancel </button>`
    }
  });

}
function save(){
  
  let naslov= document.getElementById("inNaslov").value
  let opis= document.getElementById("inOpis").innerHTML
  let zanr= JSON.stringify(document.getElementById("inZanr").value.split(", "))
  let scenarista=document.getElementById("inScenarista").value
  let reziser= document.getElementById("inReziser").value
  let prodKuca= document.getElementById("inProdKuca").value
  let slika= document.getElementById("inSlika").value
  let glumci= JSON.stringify(document.getElementById("inGlumci").value.split(", ")) 
  let godina= document.getElementById("inGodina").value
  let trajanje= document.getElementById("inTrajanje").value
  data=JSON.stringify({
    "function": "change",
    "filmId"  : filmID,
    "naslov"  : naslov,
    "opis"    : opis,
    "zanr"    : zanr,
    "scenarista"  : scenarista,
    "reziser" : reziser,
    "prodKuca": prodKuca,
    "slika"   : slika,
    "glumci"  : glumci,
    "godina"  : godina,
    "trajanje": trajanje
    })
    
  $.ajax ({
    url: 'filmovi.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      alert(answer)
    }
  });

  showadminpage()
}
function cancel(){
  showadminpage()
}
function remove(film){
  data=JSON.stringify({
    "function": "remove",
    "naslov"  : film
  })
  $.ajax ({
    url: 'filmovi.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      alert(answer)
      showadminpage()

    
    }
  });
}
function dodajFilm(){
  page.innerHTML=`
  <input type="text" placeholder="naslov" id="inNaslov" >
      <textarea type="text" placeholder="opis" id="inOpis" rows="10" cols="100"></textarea>
      <input type="text" placeholder="zanr" id="inZanr" >
      <input type="text" placeholder="scenarista" id="inScenarista">
      <input type="text" placeholder="reziser" id="inReziser" >
      <input type="text" placeholder="producentska kuca" id="inProdKuca" >
      <input type="text" placeholder="path/slika.png" id="inSlika">
      <input type="text" placeholder="glumci" id="inGlumci" >
      <input type="number" min="1950" max="2121" step="1" placeholder="godina" id="inGodina" >
      <input type="number" min="0"  step="1" placeholder="trajanje" id="inTrajanje" >
      <br>
      <button onclick="add()" class="btn">add </button>
      <button onclick="cancel()" class="btn">cancel </button>`
  
}
function add(){
  let naslov= document.getElementById("inNaslov").value
  let opis= document.getElementById("inOpis").innerHTML
  let zanr= JSON.stringify(document.getElementById("inZanr").value.split(", "))
  let scenarista=document.getElementById("inScenarista").value
  let reziser= document.getElementById("inReziser").value
  let prodKuca= document.getElementById("inProdKuca").value
  let slika= document.getElementById("inSlika").value
  let glumci= JSON.stringify(document.getElementById("inGlumci").value.split(", ")) 
  let godina= document.getElementById("inGodina").value
  let trajanje= document.getElementById("inTrajanje").value
  data=JSON.stringify({
    "function": "add",
    "filmId"  : filmID,
    "naslov"  : naslov,
    "opis"    : opis,
    "zanr"    : zanr,
    "scenarista"  : scenarista,
    "reziser" : reziser,
    "prodKuca": prodKuca,
    "slika"   : slika,
    "glumci"  : glumci,
    "godina"  : godina,
    "trajanje": trajanje
    })
    $.ajax ({
      url: 'filmovi.php',
      type: 'post',
      data: {req: data},
      success: function(answer) {
        alert(answer)
      }
    });
}
function showuserpage(){
  
}