var holder=document.getElementById("holder");

var poeni=0;
var ime="";

		
var pitanja=JSON.parse(myJSON)
function pocetniEkran(){
	holder.innerHTML=`<p id="imeKviza">KVIZ</p><label for="inputIme" id="labelIme">Unesite vase ime</label><input type='text' id='inputIme' placeholder='Vase ime?'></br><button onclick='potvrdi()' id='btnPotvrdi' class='btn'>Potvrdi</button>`;

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

