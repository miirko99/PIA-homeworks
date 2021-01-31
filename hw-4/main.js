var page=document.getElementById("page")
var korisnik
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
      <button class="btn singup" onclick="singUp()">Sign up</button>
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
    <button class="btn login" onclick="goSingUp()">sign up</button>
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
          korisnik=odg["userName"]
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
  korisnik=""
  
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
      <input class="input" type="text" placeholder="naslov" id="inNaslov" value="`+answer["naslov"]+`">
      <textarea type="text" placeholder="opis" id="inOpis" rows="10" cols="100">`+answer["opis"]+`</textarea>
      <input class="input" type="text" placeholder="zanr" id="inZanr" value="`+JSON.parse(answer["zanr"]).join(", ")+`">
      <input class="input" type="text" placeholder="scenarista" id="inScenarista" value="`+answer["scenarista"]+`">
      <input class="input" type="text" placeholder="reziser" id="inReziser" value="`+answer["reziser"]+`">
      <input class="input" type="text" placeholder="producentska kuca" id="inProdKuca" value="`+answer["prodKuca"]+`">
      <input class="input" type="text" placeholder="path/slika.png" id="inSlika" value="`+answer["slika"]+`">
      <input class="input" type="text" placeholder="glumci" id="inGlumci" value="`+JSON.parse(answer["glumci"]).join(", ")+`">
      <input class="input" type="number" min="1950" max="2121" step="1" placeholder="godina" id="inGodina" value="`+answer["godina"]+`">
      <input class="input" type="number" min="0"  step="1" placeholder="trajanje" id="inTrajanje" value="`+answer["trajanje"]+`">
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
  <input class="input" type="text" placeholder="naslov" id="inNaslov" >
      <textarea type="text" placeholder="opis" id="inOpis" rows="10" cols="100"></textarea>
      <input class="input" type="text" placeholder="zanr" id="inZanr" >
      <input class="input" type="text" placeholder="scenarista" id="inScenarista">
      <input class="input" type="text" placeholder="reziser" id="inReziser" >
      <input class="input" type="text" placeholder="producentska kuca" id="inProdKuca" >
      <input class="input" type="text" placeholder="path/slika.png" id="inSlika">
      <input class="input" type="text" placeholder="glumci" id="inGlumci" >
      <input class="input" type="number" min="1950" max="2121" step="1" placeholder="godina" id="inGodina" >
      <input class="input" type="number" min="0"  step="1" placeholder="trajanje" id="inTrajanje" >
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
        showadminpage()
      }
    });
}
function showuserpage(){
  page.innerHTML=`
    <input type="text" placeholder="search" id="search">
    <button class="btn" onclick="pretrazi()">search</button>
    <button class="btn" onclick="showuserpage()">svi filmovi</button>
    <button class="btn" onclick="logOut()">log out</button>
    <br>
    <label for="naucnafantastika">naucna fantastika</label>
    <input class="check" type="checkbox" name="naucnafantastika" id="naucnafantastika">
    <label for="komedija">komedija</label>
    <input class="check" type="checkbox" name="komedija" id="komedija">
    <label for="drama">drama</label>
    <input class="check" type="checkbox" name="drama" id="drama">
    <label for="romantika">romantika</label>
    <input class="check" type="checkbox" name="romantika" id="romantika">
    <label for="horor">horor</label>
    <input class="check" type="checkbox" name="horor" id="horor">
    <div id="filmovi">
      <div class="row">
      </div>
    </div>
  `
  filmoviDiv=document.getElementById("filmovi")
  red=document.getElementsByClassName("row")[0]
  data=JSON.stringify({
    "function": "getNamePhoto"
  })
  $.ajax ({
    url: 'filmovi.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      let filmovi=JSON.parse(answer)
      let i =0
      for(let film of filmovi){
        film=JSON.parse(film)
        div=document.createElement("div")
        div.classList.add("userfilm")
        div.onclick=function(){
          prikaziPodatke(film["id"])
        }
        div.innerHTML=`
        <img alt="" src="`+film["slika"]+`">
          <div>`+film["naslov"]+`</div>
        `
        red.appendChild(div)
        if(i++==4){
          i=0
          red=document.createElement("div")
          red.classList.add("row")
          filmoviDiv.appendChild(red)
        }

      }
      
    }
  });
}
function prikaziPodatke(idfilma){
  data=JSON.stringify({
    "function": "getById",
    "id"      : idfilma
  })
  $.ajax ({
    url: 'filmovi.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      film=JSON.parse(answer)
      
      page.innerHTML=`
      <button onclick="showuserpage()" class="btn">back</button>
      <button onclick="logOut()" class="btn">log out</button>`
      let div=document.createElement("div")
      div.id="podaci"
      page.appendChild(div)
      kolona1=document.createElement("div")
      kolona1.id="first"
      kolona2=document.createElement("div")
      kolona2.id="second"
      kolona3=document.createElement("div")
      kolona3.id="third"
      kolona1.innerHTML=`
      <img src="`+film["slika"]+`" alt="">
      <p>`+JSON.parse(film["zanr"]).join(", ")+`</p>`
      kolona2.innerHTML=`
      <h1>`+film["naslov"]+`</h1>
      <p>`+film["opis"]+`</p>
      <p>Glumci:</p>`
      let ul=document.createElement("ul")
      glumci=JSON.parse(film["glumci"])
      for(let g of glumci){
        ul.innerHTML+=`<li>`+g+`</li>`
      }
      kolona2.appendChild(ul)
      kolona3.innerHTML=`
      <P>scenarista: `+film["scenarista"]+`</P>
        <P>reziser: `+film["reziser"]+`</P>
        <P>godina: `+film["godina"]+`</P>
        <P>trajanje: `+film["trajanje"]+`</P>
        <P>broj ocena: `+film["cOcena"]+`</P>
        <P>prosecna ocena: `+film["pOcena"]+`</P>
        
        <input type="number" placeholder="vasa ocena" id="ocena" min=1 max=10 step=1>
        <button class="btn" onclick="oceni(`+film["id"]+`)">oceni</button>
      `
      div.appendChild(kolona1)
      div.appendChild(kolona2)
      div.appendChild(kolona3)

      
    }
     
  });
}
function oceni( filmid ){
  let ocena=document.getElementById("ocena").value
  if(ocena==''){
    alert("niste uneli ocenu")
    return
  }
  data=JSON.stringify({
    "ocena":ocena,
    "korisnik": korisnik,
    "filmID"  : filmid
  })
  $.ajax ({
    url: 'ocene.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      alert(answer)
      prikaziPodatke(filmid)
    }
  });

}

function pretrazi(){
  let pretraga=document.getElementById("search").value
  let zanrovi=[]
  if(document.getElementById("komedija").checked){
    zanrovi.push("komedija")
  }
  if(document.getElementById("drama").checked){
    zanrovi.push("drama")
  }
  if(document.getElementById("naucnafantastika").checked){
    zanrovi.push("naucna fantastika")
  }
  if(document.getElementById("horor").checked){
    zanrovi.push("horor")
  }
  if(document.getElementById("romantika").checked){
    zanrovi.push("romantika")
  }
  data=JSON.stringify({
    "function": "find",
    "pretraga"  : pretraga,
    "zanrovi" : zanrovi
  })
  let odgovarajuci=[]
  $.ajax ({
    url: 'filmovi.php',
    type: 'post',
    data: {req: data},
    success: function(answer) {
      answer=JSON.parse(answer)
      for(let film of answer){
        film=JSON.parse(film)
        pZanrovi=JSON.parse(film["zanrovi"])
        console.log(pZanrovi)
        console.log(zanrovi)
        for(let p of pZanrovi){
          for(let z of zanrovi){
            if(p==z){
              odgovarajuci.push(film)
              break
            }
          }
        }
      }
      
      filmoviDiv=document.getElementById("filmovi")
      filmoviDiv.innerHTML=`
        <div class="row">
        </div>`
      red=document.getElementsByClassName("row")[0]
      let i =0
      for(let film of odgovarajuci){
        div=document.createElement("div")
        div.classList.add("userfilm")
        div.onclick=function(){
          prikaziPodatke(film["id"])
        }
        div.innerHTML=`
        <img alt="" src="`+film["slika"]+`">
          <div>`+film["naslov"]+`</div>
        `
        red.appendChild(div)
        if(i++==4){
          i=0
          red=document.createElement("div")
          red.classList.add("row")
          filmoviDiv.appendChild(red)
        }

      }
      

    
    }
  });
}






