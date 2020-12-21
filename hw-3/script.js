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
				 {"odgovor":"Lucerka",
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
	"pitanje":"Centar cula sluha nazali se u:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"hipofizi",
				 "status":false},
				 {"odgovor":"Velikom mozgu",
				 "status":true},
				 {"odgovor":"Kicmenoj mozdini",
				 "status":false},
				 {"odgovor":"Malom mozgu",
				 "status":false}]},
	{
	"pitanje":"Tvrdjava kastel se nalazi u:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Sarajevu",
				 "status":false},
				 {"odgovor":"Banja Luci",
				 "status":true},
				 {"odgovor":"Somboru",
				 "status":false},
				 {"odgovor":"Kotoru",
				 "status":false}]},
	{
	"pitanje":"Izmedju kojih planeta je pojas asteroida?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Mars i Zemlja",
				 "status":false},
				 {"odgovor":"Jupiter i Neptun",
				 "status":false},
				 {"odgovor":"Jupiter i Mars",
				 "status":true},
				 {"odgovor":"Neptun i Uran",
				 "status":false}]},
	{
	"pitanje":"Legenda o 'Ukletom Holandjaninu' u vezi je sa:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Kraljem",
				 "status":false},
				 {"odgovor":"Carem",
				 "status":false},
				 {"odgovor":"Brodom",
				 "status":true},
				 {"odgovor":"Vozom",
				 "status":false}]},
	{
	"pitanje":"U otpisanima, majora Krugera glumi:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Stevo Zigon",
				 "status":true},
				 {"odgovor":"Pavle Vuisic",
				 "status":false},
				 {"odgovor":"Branko Bauer",
				 "status":false},
				 {"odgovor":"Velimir Bata Zivojinovic",
				 "status":false}]},
	{
	"pitanje":"Reka Nijagara izvire:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Na Grenlandu",
				 "status":false},
				 {"odgovor":"U Kanadi",
				 "status":true},
				 {"odgovor":"Na Aljasci",
				 "status":false},
				 {"odgovor":"U Micigenu",
				 "status":false}]},
	{
	"pitanje":"Kako se zove novinar, alterego Supermena?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Piter Parker",
				 "status":false},
				 {"odgovor":"Leks Lutor",
				 "status":false},
				 {"odgovor":"Klark Kent",
				 "status":true},
				 {"odgovor":"Kristofer Riv",
				 "status":false}]},
	{
	"pitanje":"Zbirku pesama za decu 'Postovana deco', napisao je:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Isidora Sekulic",
				 "status":false},
				 {"odgovor":"Desanka Maksimovic",
				 "status":false},
				 {"odgovor":"Jovan Jovanovic Zmaj",
				 "status":false},
				 {"odgovor":"Dusan Radovic",
				 "status":true}]},
	{
	"pitanje":"Koji instrument svira Serlok Holms u slobodno vreme?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Violinu",
				 "status":true},
				 {"odgovor":"Klavir",
				 "status":false},
				 {"odgovor":"Harfu",
				 "status":false},
				 {"odgovor":"Klarinet",
				 "status":false}]},
	{
	"pitanje":"Drugi naziv za kukasti krst je:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Svekrva",
				 "status":false},
				 {"odgovor":"Statistika",
				 "status":false},
				 {"odgovor":"Svastika",
				 "status":true},
				 {"odgovor":"Snaja",
				 "status":false}]},
	{
	"pitanje":"Slovo R u reci 'laser' oznacava?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Radijaciju",
				 "status":true},
				 {"odgovor":"Rezistenciju",
				 "status":false},
				 {"odgovor":"Razaranje",
				 "status":false},
				 {"odgovor":"Redmond",
				 "status":false}]},
	{
	"pitanje":"Koji od sledecih je 3D softver?",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"Studio Max",
				 "status":true},
				 {"odgovor":"Illustrator",
				 "status":false},
				 {"odgovor":"Photoshop",
				 "status":false},
				 {"odgovor":"Turbo C",
				 "status":false}]},
	{
	"pitanje":"Napon u strujnoj mrezi je 220:",
	"ponudjeni":true,
	"odgovori":[{"odgovor":"volti",
				 "status":true},
				 {"odgovor":"herca",
				 "status":false},
				 {"odgovor":"ampera",
				 "status":false},
				 {"odgovor":"vati",
				 "status":false}]},
	{
	"pitanje":"Koje godine je potpisana Bolonjska deklaracija?",
	"ponudjeni":false,
	"odgovori":"1999"},
	{
	"pitanje":"Kako se zvao prvi srpski car?",
	"ponudjeni":false,
	"odgovori":"Dusan"},
	{
	"pitanje":"Koliko puta Nobelva nagrada za mir nije dodeljena?",
	"ponudjeni":false,
	"odgovori":"19"},
	{
	"pitanje":"Koji srpski vladar je ubijen u Marseju (Ime pa prezime)",
	"ponudjeni":false,
	"odgovori":"Aleksandar Karadjordjevic"},
	{
	"pitanje":"Koliko godina je ziveo Adam prema Bibliji?",
	"ponudjeni":false,
	"odgovori":"930"},
	{
	"pitanje":"Koje godine je snimljen film Titanik",
	"ponudjeni":false,
	"odgovori":"1997"},
	{
	"pitanje":"Djavolja varos se nalazi u blizini kog grada?",
	"ponudjeni":false,
	"odgovori":"Krsumlije"},
	{
	"pitanje":"Kojim slovom se obelezava metricki prefiks 'jota'",
	"ponudjeni":false,
	"odgovori":"y"},
	{
	"pitanje":"Ko je napisao pesmu 'Krvava bajka'",
	"ponudjeni":false,
	"odgovori":"Desanka Maksimovic"}
	]`
var scores=[]		
var pitanja=JSON.parse(myJSON)
function pocetniEkran(){
	holder.innerHTML=`<p id="imeKviza">KVIZ</p>
		<label for="inputIme" id="labelIme">Unesite vase ime</label>
    	<input type='text' id='inputIme' placeholder='Vase ime?'></br>
		<button onclick='potvrdi()' class='btn' id='btnPotvrdi'>Potvrdi</button>
		<button onclick='prikaziRezultat()' class='btn' id='btnRezultati'>Lista rezultata</button>`
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
function prikaziRezultat(){
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
	btn.innerText="Meny"
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
}
