const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const maclar2014 = fifaData.filter(mac => mac.Year == 2014);
//console.log(maclar2014);

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const finalMaci2014 = maclar2014.filter(mac => mac.Stage == "Final")[0];
console.log("2014 Dünya kupası Finali Evsahibi takım ismi: " + finalMaci2014['Home Team Name']);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log("2014 Dünya kupası Finali Deplasman takım ismi: " + finalMaci2014['Away Team Name']);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log("2014 Dünya kupası finali Ev sahibi takım gol sayısı: " + finalMaci2014['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log("2014 Dünya kupası finali Deplasman takım gol sayısı: " + finalMaci2014['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
const winner = mac => {
	if(mac['Home Team Goals'] > mac['Away Team Goals']){
		return `Kazanan Takım: ${mac['Home Team Name']}`;
	} else if(mac['Home Team Goals'] < mac['Away Team Goals']){
		return `Kazanan Takım: ${mac['Away Team Name']}`;
	} else{
		return `Kazanan Takım: ${mac['Win conditions'].split(" win")[0]}` 
	}
};
console.log(winner(finalMaci2014));
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(array) {
	const finalMaclari = array.filter(mac => mac.Stage == "Final");
	return finalMaclari;
}
//console.log(Finaller(fifaData));



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(array, finallerFonksiyonu) {
	return finallerFonksiyonu(array).map(mac => mac.Year);
}
//console.log(Yillar(fifaData,Finaller));


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(array, finallerFonksiyonu) {
	const finalMaclari = finallerFonksiyonu(array);
	const kazananlar = finalMaclari.map(mac => {
		if (mac['Home Team Goals'] > mac['Away Team Goals']) {
		return mac['Home Team Name'];
		} else if (mac['Home Team Goals'] < mac['Away Team Goals']) {
		return mac['Away Team Name'];
		} else {
		return mac['Win conditions'].split(" win")[0]; //Beraberlik durumu dahil edilmiştir.
		}
		});
		return kazananlar;	
}
//console.log(Kazananlar(fifaData, Finaller));


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(array, finallerFonksiyonu, yillarFonksiyonu, kazananlarFonksiyonu) {
	const finalMaclari = finallerFonksiyonu(array);
	const yillar = yillarFonksiyonu(array, finallerFonksiyonu);
	const kazananlar = kazananlarFonksiyonu(array, finallerFonksiyonu);
	const yillaraGoreKazananlar = yillar.map((yil, index) => {
		return `${yil} yılında, ${kazananlar[index]} dünya kupasını kazandı!`
	});
	return yillaraGoreKazananlar;
}
//console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finalMaclari) {
	const toplamGolSayisi = finalMaclari.reduce((toplam, mac) => {
		return toplam + mac['Home Team Goals'] + mac['Away Team Goals'];
		}, 0);

		return (toplamGolSayisi / finalMaclari.length).toFixed(2);
}
//console.log(OrtalamaGolSayisi(Finaller(fifaData)));


/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(array, takimKisaltmasi) {
	const finalMaclari = Finaller(array);
	const kazanmaSayisi = finalMaclari.reduce((count, mac) => {
		if(mac['Home Team Goals'] > mac['Away Team Goals'] && mac['Home Team Initials'] == takimKisaltmasi){
			return count + 1;
		} else if(mac['Home Team Goals'] < mac['Away Team Goals'] && mac['Away Team Initials'] == takimKisaltmasi){
			return count + 1;
		} else if(mac['Home Team Goals'] == mac['Away Team Goals']){
			if(mac['Win conditions'].split(" win")[0] == mac['Home Team Name'] && mac['Home Team Initials'] == takimKisaltmasi){
				return count + 1;
			} else if(mac['Win conditions'].split(" win")[0] == mac['Away Team Name'] && mac['Away Team Initials'] == takimKisaltmasi){
				return count + 1;
			}
		}
		return count;
		},0);
	return kazanmaSayisi;
}
//console.log(UlkelerinKazanmaSayilari(fifaData, "ESP"));


/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(array) {
	const finalMaclari = Finaller(array);
	const golArrayi = new Array();
	finalMaclari.forEach(mac => {
		for(let i = 0 ; i < mac['Home Team Goals']; i++){
			golArrayi.push(mac['Home Team Name']);
		}
		for(let i = 0 ; i < mac['Away Team Goals']; i++){
			golArrayi.push(mac['Away Team Name']);
		}
	});
	golArrayi.sort();
	
	let counts = golArrayi.reduce((a, c) => {
		a[c] = (a[c] || 0) + 1;
		//console.log(a);
		return a;
	  }, []);
	  
	  let maxCount = Math.max(...Object.values(counts));
	  let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);
	  
	  //console.log(golArrayi);
	  return mostFrequent;
}
//console.log(EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(array) {
	const finalMaclari = Finaller(array);
	const golArrayi = new Array();
	finalMaclari.forEach(mac => {
		for(let i = 0 ; i < mac['Home Team Goals']; i++){
			golArrayi.push(mac['Away Team Name']);
		}
		for(let i = 0 ; i < mac['Away Team Goals']; i++){
			golArrayi.push(mac['Home Team Name']);
		}
	});
	golArrayi.sort();
	
	let counts = golArrayi.reduce((a, c) => {
		a[c] = (a[c] || 0) + 1;
		//console.log(a);
		return a;
	  }, []);
	  
	  let maxCount = Math.max(...Object.values(counts));
	  let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);
	  
	  //console.log(golArrayi);
	  return mostFrequent;
}
//console.log(EnKotuDefans(fifaData));


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */
// Madde 1
function DunyaKupasindaYerAlmaSayisi(takimKisaltmasi){
	const maclar = fifaData.filter(mac => mac['Home Team Initials'] == takimKisaltmasi || mac['Away Team Initials'] == takimKisaltmasi);
	return maclar.length;
}
//console.log(DunyaKupasindaYerAlmaSayisi("TUR"));


// Madde 2
// 'Finaller' veri setinde beraberlik durumları ilk committe dahil edilmiştir.


// Madde 3
function DunyaKupasindaAtilanGolSayisi(takimKisaltmasi){
	const maclar = fifaData.filter(mac => mac['Home Team Initials'] == takimKisaltmasi || mac['Away Team Initials'] == takimKisaltmasi);
	let golSayisi = 0;
	maclar.forEach(mac => {
		if(mac['Home Team Initials'] == takimKisaltmasi){
			golSayisi += mac['Home Team Goals'];
		} else if(mac['Away Team Initials'] == takimKisaltmasi){
			golSayisi += mac['Away Team Goals'];
		}
	});
	return golSayisi;
}
//console.log(DunyaKupasindaAtilanGolSayisi("TUR"));


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
