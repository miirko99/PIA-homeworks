var holder=document.getElementById("holder");
window.addEventListener("unload",()=>{localStorage.setItem("scores",JSON.stringify(scores))})
window.addEventListener("load",()=>{
								let niz=JSON.parse(localStorage.getItem("scores"))
								if(niz!=null){
									for(let clan of niz){
										scores.push(new rezultat(clan.ime,clan.poeni))
									}
								}
						})
pocetniEkran()
var pitanja
fetch('questions.json')
  .then(response => response.json())
	.then(data => {pitanja=data
		brojPitanja=pitanja.length
	})
var timer
var poeni=0;
var ime="";

var scores=[]		
function pocetniEkran(){
	holder.innerHTML=`<p id="imeKviza">KVIZ</p>
		<label for="inputIme" id="labelIme">Unesite vase ime</label>
    	<input type='text' id='inputIme' placeholder='Vase ime?' autocomplete='off'></br>
		<button onclick='potvrdi()' class='btn' id='btnPotvrdi'>Potvrdi</button>
		<button onclick='prikaziRezultate()' class='btn' id='btnRezultati'>Lista rezultata</button>`
	iskorisceniIndeksi=[]
	poeni=0
	ime=""
}
function potvrdi(){
	let el=document.getElementById("inputIme");
	ime=el.value;
	if (ime==""){
		alert("morate uneti ime")
	}
	else{
		prikaziPravila()
	}
}
function prikaziPravila(){
	holder.innerHTML=`<h1>Pravila kviza</h1><p>Pravila kviza su jednostavna, dobijate 10 pitanja za neka cete dobiti ponudjene odgovore, za neka ne. Svako pitanje vredi 1 poen negativnih poena nema. Za svako pitanje imate tacno 20s da odgovorite, ako ne odgovorite prelazi se na sledece pitanje. Pritiskom na dugme dalje pitanje se preskace i ne mozete se vratiti na to pitanje. U svakom trenutku mozete da odustanete ali vas rezultat ce biti sacuvan</br> Srecno.</p><button onclick='zapocniIgru()' id='btnZapocni' class='btn'>Pocni kviz</button>`
}
function zapocniIgru(){
	holder.innerHTML="<div id='QIA'></div>"
	sledecePitanje()	
}
var indexPitanja
var interval
var brojPitanja
var iskorisceniIndeksi=[]
function randomIndeks(){
	if(iskorisceniIndeksi.length==10){
		return -1
	}
	let indexPitanja=Math.floor(Math.random()*brojPitanja)
	while(iskorisceniIndeksi.indexOf(indexPitanja)!=-1 || indexPitanja==brojPitanja){
		indexPitanja=Math.floor(Math.random()*brojPitanja)
	}
	iskorisceniIndeksi.push(indexPitanja)
	return indexPitanja
}
function sledecePitanje(){
	var QIA=document.getElementById("QIA")
	QIA.innerHTML=""
	indexPitanja=randomIndeks()
	if(indexPitanja==-1){
		var rez=new rezultat(ime,poeni)
		scores.push(rez)
		prikaziRezultat()
		
		return
	}
	var pitanje=pitanja[indexPitanja]
	var d=document.createElement('div')
	d.id="pitanje"
	d.innerHTML=pitanje.pitanje
	QIA.appendChild(d)
	d=document.createElement("progress")
	d.min=0
	d.max=20
	d.value=0
	d.id="timer"
	QIA.appendChild(d)
	timer=document.getElementById("timer")
	interval=setInterval(()=>{
		timer.value+=1;
		if(timer.value==timer.max){
			clearInterval(interval)
			noTime()
		}
	},1000)
	if(pitanje.ponudjeni==true){
		for(let p of pitanje.odgovori){
			d=document.createElement("div")
			d.classList.add("odgovor")
			d.classList.add("odgovorh")
			d.innerHTML=p.odgovor
			d.onclick=proveriOdg
			
			QIA.appendChild(d)
		}
	}else{
		d=document.createElement("input")
		d.id='inputOdg'
		d.placeholder="Vas odgovor"
		QIA.appendChild(d)
		d=document.createElement('button')
		d.classList.add('btn')
		d.innerHTML="Potvrdi"
		d.onclick=potvrdiOdg
		QIA.appendChild(d)
		
		
	}
	d=document.createElement("button")
	d.id='btnPreskoci'
	d.classList.add("btn")
	d.innerHTML="Preskoci"
	d.onclick=proveriOdg
	QIA.appendChild(d)

	d=document.createElement("button")
	d.classList.add("btn")
	d.innerHTML="Odustani"
	d.onclick=()=>{
		scores.push(new rezultat(ime,poeni))
		pocetniEkran()
		clearInterval(interval)
	}
	QIA.appendChild(d)
	
	
}

function proveriOdg(e){
	var odg=document.getElementsByClassName("odgovor")
	for(let i=0;i<odg.length;i++){
		if(odg[i]==e.target){
			if(pitanja[indexPitanja].odgovori[i].status==true){
				odg[i].classList.add("tacan")
				odg[i].classList.remove("odgovorh")
				poeni+=1
				continue
			}else{
				odg[i].classList.add("netacan")
			}
			
		}
		odg[i].onclick=null
		odg[i].classList.remove("odgovorh")
		if(pitanja[indexPitanja].odgovori[i].status){
			odg[i].classList.add("tacan")
		}
	}
	document.getElementById("btnPreskoci").onclick=null
	setTimeout(sledecePitanje,3000)
	clearInterval(interval)
}

function noTime(){
	let odg=document.getElementsByClassName("odgovor")
	for(let i=0;i<odg.length;i++){
		odg[i].onclick=null
		odg[i].classList.remove("odgovorh")
		if(pitanja[indexPitanja].odgovori[i].status){
			odg[i].classList.add("tacan")
		}
	}
	let bt=document.getElementsByClassName("btn")
	for(let b of bt){
		b.onclick=null
	}
	setTimeout(sledecePitanje,3000)
	clearInterval(interval)
}
function potvrdiOdg(){
	if(document.getElementById("inputOdg").value.toLowerCase==pitanja[indexPitanja].odgovori.toLowerCase){
		poeni+=1
	}
	document.getElementsByClassName("btn")[0].onclick=null
	document.getElementsByClassName("btn")[1].onclick=null
	setTimeout(sledecePitanje,3000)
	clearInterval(interval)
}
function prikaziRezultate(){
	list=document.createElement("ol")
	holder.innerHTML=""
	holder.appendChild(list)
	sortitajRezultate(scores)
	for(let r of scores){
		item=document.createElement("li")
		item.innerText=r.ime +" "+ r.poeni
		list.appendChild(item)
		
	}
	btn=document.createElement("button")
	btn.classList.add("btn")
	btn.id="menu"
	btn.innerText="Menu"
	btn.onclick=pocetniEkran
	holder.appendChild(btn)
	//dodati dugme za meni
}
class rezultat{
	ime=""
	poeni=0
	constructor(ime,poeni){
		this.ime=ime
		this.poeni=poeni
	}
	veci(rez){
		if(this.poeni>rez.poeni) return true
		if(this.poeni<rez.poeni) return false
		if(this.ime.toLowerCase()<=rez.ime.toLowerCase()) return true
		return false
	}
	manji(rez){
		if(this.poeni<rez.poeni) return true
		if(this.poeni>rez.poeni) return false
		if(this.ime.toLowerCase()>rez.ime.toLowerCase()) return true
		return false
	}
}
function sortitajRezultate(niz){
	for(let i=0; i<niz.length-1;i++){
		for(let j=i+1;j<niz.length;j++){
			if(niz[j].veci(niz[i])){
				tmp=niz[i]
				niz[i]=niz[j]
				niz[j]=tmp
			}
		}
	}
	while(scores.length>10) scores.pop()
}
function prikaziRezultat(){
	holder.innerHTML=''
	e=document.createElement("div")
	e.id="rezultat"
	e.innerText="Igra je gotova vas rezultat je "+poeni+" poena."
	holder.appendChild(e)

	e=document.createElement("button")
	e.classList.add("btn")
	e.id="menu"
	e.innerText="Menu"
	e.onclick=pocetniEkran
	holder.appendChild(e)
	e=document.createElement("button")
	e.classList.add("btn")
	e.id="retry"
	e.innerText="Retry"
	e.onclick=()=>{
		iskorisceniIndeksi=[]
		poeni=0
		zapocniIgru()
	}
	holder.appendChild(e)
}
