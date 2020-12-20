var holder=document.getElementById("holder");
pocetniEkran()
var timer
var poeni=0;
var ime="";
var myJSON=`[{	"pitanje":"Izbaci uljeza",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Lisicarka",
				 "status":false},
				 {"odgovor":"Bukovaca",
				 "status":false},
				 {"odgovor":"Vrganj",
				 "status":false},
				 {"odgovor":"Lucerka  ",
				 "status":true}]},
	{
	"pitanje":"koje godine je donet sretenski ustav",
	"ponudjeni":false,
	"odgovori":"1835"},
	{
	"pitanje":"Kako se naziva obred postavljanja svestenika na funkciju?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Rukopolozenje",
				 "status":true},
				 {"odgovor":"Prosvecenje",
				 "status":false},
				 {"odgovor":"Oskazanje",
				 "status":false},
				 {"odgovor":"Zalozenje",
				 "status":false}]},
	{
	"pitanje":"Glavni grad Uzbekistana je:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Ashabad",
				 "status":false},
				 {"odgovor":"Taskent",
				 "status":true},
				 {"odgovor":"Biskek",
				 "status":false},
				 {"odgovor":"Dusanbe",
				 "status":false}]},
	{
	"pitanje":"Koja je prva drzava u kojoj su zene imale pravo glasa?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"SAD",
				 "status":false},
				 {"odgovor":"Novi Zeland",
				 "status":true},
				 {"odgovor":"Svajcarska",
				 "status":false},
				 {"odgovor":"Danska",
				 "status":false}]},
	{
	"pitanje":"Tunel Mon Blan spaja:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Nemacku i Luksemburg",
				 "status":false},
				 {"odgovor":"Francusku i Italiju",
				 "status":true},
				 {"odgovor":"Francusku i Belgijju",
				 "status":false},
				 {"odgovor":"Svajcarsku i Austriju",
				 "status":false}]},
	{
	"pitanje":"Koje je rase pas iz filma 'Lesi se vraca kuci'",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Nemacki ovcar",
				 "status":false},
				 {"odgovor":"Skotski ovcar",
				 "status":true},
				 {"odgovor":"Belgijski malinoa",
				 "status":false},
				 {"odgovor":"Nemacki snaucer",
				 "status":false}]},
	{
	"pitanje":"Koliko kilogarama ima 10 grama?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"0,1",
				 "status":false},
				 {"odgovor":"100",
				 "status":false},
				 {"odgovor":"1000",
				 "status":false},
				 {"odgovor":"0,01",
				 "status":true}]},
	{
	"pitanje":"Koje godine je potpisana Bolonjska deklaracija?",
	"ponudjeni":false,
	"odgovori":"1999"},
	{
	"pitanje":"Koliko puta Nobelva nagrada za mir nije dodeljena?",
	"ponudjeni":false,
	"odgovori":"19"}
			]`
var scores=[]
var readynext=0			
var pitanja=JSON.parse(myJSON)
function pocetniEkran(){
	holder.innerHTML=`<p id="imeKviza">KVIZ</p>
		<label for="inputIme" id="labelIme">Unesite vase ime</label>
    	<input type='text' id='inputIme' placeholder='Vase ime?'></br>
		<button onclick='potvrdi()' class='btn' id='btnPotvrdi'>Potvrdi</button>`
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
	holder.innerHTML=`<h1>Pravila kviza</h1><p>Pravila kviza su jednostavna, dobijate 10 pitanja za neka cete dobiti ponudjene odgovore, za neka ne.svako pitanje vredi 1 poen negativnih poena nema. Za svako pitanje imate tacno 20s da odgovorite, ako ne odgovorite prelazi se na sledece pitanje. Pritiskom na dugme dalje pitanje se preskace i ne mozete se vratiti na to pitanje.</br> Srecno.</p><button onclick='zapocniIgru()' id='btnZapocni' class='btn'>Pocni kviz</button>`
}
function zapocniIgru(){
	holder.innerHTML="<div id='QIA'></div>"
	sledecePitanje()	
}
var indexPitanja
var interval
var brojPitanja=pitanja.length
var iskorisceniIndeksi=[]
function randomIndeks(){
	if(iskorisceniIndeksi.length==brojPitanja){
		alert("nema vise pitanja");
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
	readynext=0
	var QIA=document.getElementById("QIA")
	QIA.innerHTML=""
	indexPitanja=randomIndeks()
	if(indexPitanja==-1){
		alert(ime+" vas rezultat je "+poeni+" poena.")
		var rez=new rezultat(ime,poeni)
		scores.push(rez)
		pocetniEkran()
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
			pogresanOdg()
		}
	},1000)
	if(pitanje.ponudjeni==true){
		for(let p of pitanje.odgovori){
			d=document.createElement("div")
			d.classList.add("odgovor")
			d.innerHTML=p.odgovor
			if(p.status){
				d.onclick=tacanOdg
			}else{
				d.onclick=pogresanOdg
			}
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
	d.onclick=pogresanOdg
	QIA.appendChild(d)
	
	
}

function tacanOdg(){
	poeni+=1;
	obojiOdg();
}
function obojiOdg(){
	var odg=document.getElementsByClassName("odgovor")
	for(let i=0;i<odg.length;i++){
		if(pitanja[indexPitanja].odgovori[i].status){
			odg[i].classList.add("tacan")
		}else{
			odg[i].classList.add("netacan")
		}
	}
	
	if(readynext==0){
		setTimeout(sledecePitanje,3000)
		readynext=1
	}
	clearInterval(interval)
	
	
}
function pogresanOdg(){
	obojiOdg()
}
function preskoci(){}
function potvrdiOdg(){
	if(document.getElementById("inputOdg").value==pitanja[indexPitanja].odgovori){
		poeni+=1
	}
	if(readynext==0){
		setTimeout(sledecePitanje,3000)
		readynext=1
	}
	clearInterval(interval)
}
