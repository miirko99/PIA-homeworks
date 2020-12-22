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
var time

var scores=[]		
function pocetniEkran(){
	holder.innerHTML=`<p id="imeKviza">KVIZ</p>
		<label for="inputIme" id="labelIme">Unesite vase ime</label>
			<input type='text' id='inputIme' placeholder='Vase ime?' autocomplete='off'></br>
		<div id="buttons">
			<button onclick='potvrdi()' class='btn' id='btnPotvrdi'>Potvrdi</button>
			<button onclick='prikaziRezultate()' class='btn' id='btnRezultati'>Lista rezultata</button>
		</div>`
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
	holder.innerHTML=''
	indexPitanja=randomIndeks()
	if(indexPitanja==-1){
		var rez=new rezultat(ime,poeni)
		scores.push(rez)
		prikaziRezultat()
		
		return
	}
	var pitanje=pitanja[indexPitanja]
	var z=document.createElement("div")
	z.id="zaglavlje"
	var d=document.createElement('div')
	d.id="pitanje"
	d.innerHTML=pitanje.pitanje
	z.appendChild(d)
	d=document.createElement("div")
	d.id="timer"
	d.innerHTML='<div><div>20</div></div>'
	time=20
	z.appendChild(d)
	holder.appendChild(z)
	let b=document.createElement("div")
	b.id="buttons"
	holder.appendChild(b)
	timer=document.getElementById("timer")
	interval=setInterval(()=>{
		time--
		timer.innerHTML='<div><div>'+time+'</div></div>';
		if(time<=0){
			clearInterval(interval)
			noTime()
		}
	},1000)
	if(pitanje.ponudjeni==true){
		let odgovori=document.createElement("div")
		odgovori.id="odgovori"
		for(let p of pitanje.odgovori){
			d=document.createElement("div")
			d.classList.add("odgovor")
			d.classList.add("odgovorh")
			d.innerHTML=p.odgovor
			d.onclick=proveriOdg
			
			odgovori.appendChild(d)
		}
	holder.appendChild(odgovori)
	}else{
		d=document.createElement("input")
		d.id='inputOdg'
		d.placeholder="Vas odgovor"
		d.autocomplete="off"
		holder.appendChild(d)
		d=document.createElement('button')
		d.classList.add('btn')
		d.innerHTML="Potvrdi"
		d.onclick=potvrdiOdg
		b.appendChild(d)
		
		
	}
	d=document.createElement("button")
	d.id='btnPreskoci'
	d.classList.add("btn")
	d.innerHTML="Preskoci"
	d.onclick=proveriOdg
	b.appendChild(d)

	d=document.createElement("button")
	d.classList.add("btn")
	d.innerHTML="Odustani"
	d.onclick=()=>{
		scores.push(new rezultat(ime,poeni))
		prikaziRezultat()
		clearInterval(interval)
	}
	b.appendChild(d)
	holder.appendChild(b)
	
	
}

function proveriOdg(e){
	clearInterval(interval)
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
	let buttons=document.getElementsByClassName("btn")
	for(let b of buttons){
		b.onclick=null
	}
	setTimeout(sledecePitanje,3000)
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
	if(document.getElementById("inputOdg").value.toLowerCase()==pitanja[indexPitanja].odgovori.toLowerCase()){
		poeni+=1
	}
	let buttons=document.getElementsByClassName("btn")
	for(let b of buttons){
		b.onclick=null
	}
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
	let buttons=document.createElement("div")
	buttons.id="buttons"
	e=document.createElement("button")
	e.classList.add("btn")
	e.id="menu"
	e.innerText="Menu"
	e.onclick=pocetniEkran
	buttons.appendChild(e)
	e=document.createElement("button")
	e.classList.add("btn")
	e.id="retry"
	e.innerText="Retry"
	e.onclick=()=>{
		iskorisceniIndeksi=[]
		poeni=0
		zapocniIgru()
	}
	buttons.appendChild(e)
	holder.appendChild(buttons)
}
