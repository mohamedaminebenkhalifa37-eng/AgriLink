(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
var L=localStorage.getItem('agLang')||'fr';
/* ---------- données (prix en dinars tunisiens, exemples) ---------- */
var D=[
{id:'l1',t:'location',c:'location',img:'tracteur-coucher.jpg',p:180,u:'day',fr:['Tracteur 90 CV avec chauffeur','Tracteur polyvalent pour labour, transport et travaux de saison.'],ar:['جرّار 90 حصان مع سائق','جرّار متعدّد الاستعمالات للحرث والنقل وخدمات الموسم.']},
{id:'l2',t:'location',c:'location',img:'semoir.jpg',p:90,u:'day',fr:['Semoir de précision 4 rangs','Semis régulier et économe en semences.'],ar:['آلة بذر دقيقة 4 خطوط','بذر منتظم وتوفير في البذور.']},
{id:'l3',t:'location',c:'location',img:'pulverisation.jpg',p:70,u:'day',fr:['Pulvérisateur tracté 600 L','Traitement rapide de grandes parcelles.'],ar:['رشّاشة مجرورة 600 لتر','معالجة سريعة للقطع الكبيرة.']},
{id:'l4',t:'location',c:'location',img:'irrigation.jpg',p:35,u:'day',fr:['Kit d’irrigation goutte-à-goutte (1 ha)','Tuyaux, raccords et arroseurs prêts à poser.'],ar:['طقم ريّ قطرة قطرة (هكتار)','أنابيب، وصلات ورشّاشات جاهزة للتركيب.']},
{id:'l5',t:'location',c:'location',img:'outils.jpg',p:12,u:'day',fr:['Lot d’outillage de jardin','Bêches, transplantoirs et petit outillage.'],ar:['طقم أدوات جاردينة','مجارف، أدوات تشتيل وأدوات صغيرة.']},
{id:'s1',t:'service',c:'service',img:'tracteur.jpg',p:60,u:'from',fr:['Réparation de tracteur','Diagnostic et réparation sur place par un mécanicien.'],ar:['تصليح الجرّار','تشخيص وتصليح في عين المكان مع ميكانيكي.']},
{id:'s2',t:'service',c:'service',img:'tracteur-coucher.jpg',p:120,u:'trip',fr:['Transport de récolte','Transport de la récolte vers le marché ou le stockage.'],ar:['نقل الصابة','نقل الصابة للسوق ولا للتخزين.']},
{id:'s3',t:'service',c:'service',img:'pulverisation.jpg',p:45,u:'ha',fr:['Traitement phytosanitaire','Pulvérisation par un applicateur qualifié.'],ar:['معالجة النباتات','رشّ من طرف مختصّ.']},
{id:'s4',t:'service',c:'service',img:'sol.jpg',p:80,u:'pc',fr:['Analyse du sol','Résultats et conseils de fertilisation adaptés à votre parcelle.'],ar:['تحليل التربة','نتائج ونصايح تسميد على قدّ أرضك.']},
{id:'s5',t:'service',c:'service',img:'irrigation.jpg',p:300,u:'from',fr:['Installation d’irrigation','Étude et pose d’un réseau goutte-à-goutte ou aspersion.'],ar:['تركيب منظومة ريّ','دراسة وتركيب شبكة قطرة قطرة ولا رشّ.']},
{id:'s6',t:'service',c:'service',img:'outils.jpg',p:20,u:'from',fr:['Entretien d’outils & petit matériel','Affûtage, nettoyage et remise en état.'],ar:['صيانة الأدوات والمعدّات الصغيرة','سنّ، تنظيف وإعادة تأهيل.']},
{id:'m1',t:'market',c:'chimie',img:'engrais.jpg',p:62,u:'pc',fr:['Herbicide sélectif 5 L','Contre les mauvaises herbes des cultures céréalières.'],ar:['مبيد أعشاب انتقائي 5 لتر','ضدّ الأعشاب الضارّة في الحبوب.']},
{id:'m2',t:'market',c:'chimie',img:'nutriments.jpg',p:48,u:'pc',fr:['Fongicide à base de cuivre 1 kg','Protection contre le mildiou et les maladies fongiques.'],ar:['مبيد فطريات بالنحاس 1 كغ','حماية من المرض الفطري.']},
{id:'m3',t:'market',c:'chimie',img:'engrais.jpg',p:36,u:'pc',fr:['Insecticide 1 L','Traitement contre les insectes ravageurs.'],ar:['مبيد حشرات 1 لتر','معالجة ضدّ الحشرات الضارّة.']},
{id:'m4',t:'market',c:'engrais',img:'nutriments.jpg',p:85,u:'pc',fr:['Engrais NPK 20-20-20 (25 kg)','Engrais équilibré pour toutes cultures.'],ar:['سماد NPK 20-20-20 (25 كغ)','سماد متوازن لكل الزراعات.']},
{id:'m5',t:'market',c:'engrais',img:'sol.jpg',p:28,u:'pc',fr:['Compost organique 50 kg','Améliore la structure et la vie du sol.'],ar:['سماد عضوي 50 كغ','يحسّن بنية التربة وحياتها.']},
{id:'m6',t:'market',c:'semences',img:'sachets.jpg',p:38,u:'pc',fr:['Collection de 12 sachets de semences potagères','Tomate, concombre, carotte, laitue et plus.'],ar:['12 كيس بذور خضر','طماطم، قرعة، جزر، خسّ وأكثر.']},
{id:'m7',t:'market',c:'semences',img:'graines-main.jpg',p:52,u:'pc',fr:['Semences de blé (sac 25 kg)','Semences sélectionnées pour de bons rendements.'],ar:['بذور قمح (كيس 25 كغ)','بذور مختارة لمردود أحسن.']},
{id:'m8',t:'market',c:'outils',img:'outils.jpg',p:45,u:'pc',fr:['Lot d’outils de jardinage','Pelle, binette, transplantoir et plus.'],ar:['طقم أدوات جاردينة','مجرفة، معزقة، أدوات تشتيل وأكثر.']},
{id:'m9',t:'market',c:'outils',img:'engrais.jpg',p:17,u:'pc',fr:['Pulvérisateur manuel 5 L + gants','Pour traitements localisés en toute sécurité.'],ar:['رشّاشة يدوية 5 لتر + قفازات','لمعالجات صغيرة بأمان.']}];
var CAT={location:['Location','كراء'],service:['Service','خدمة'],chimie:['Chimique','كيميائي'],engrais:['Engrais','سماد'],semences:['Semences','بذور'],outils:['Outils','أدوات']};
var UN={day:['/ jour','/ نهار'],ha:['/ ha','/ هكتار'],trip:['/ trajet','/ سفرة'],from:['',''],pc:['','']};
var GOV=['Ariana','Béja','Ben Arous','Bizerte','Gabès','Gafsa','Jendouba','Kairouan','Kasserine','Kébili','Le Kef','Mahdia','La Manouba','Médenine','Monastir','Nabeul','Sfax','Sidi Bouzid','Siliana','Sousse','Tataouine','Tozeur','Tunis','Zaghouan'];
var GOVAR=['أريانة','باجة','بن عروس','بنزرت','قابس','قفصة','جندوبة','القيروان','القصرين','قبلي','الكاف','المهدية','منوبة','مدنين','المنستير','نابل','صفاقس','سيدي بوزيد','سليانة','سوسة','تطاوين','توزر','تونس','زغوان'];
var isAr=function(){return L==='ar'};
function money(it){var dt=isAr()?'د.ت':'DT',pre=it.u==='from'?(isAr()?'من ':'dès '):'';var u=UN[it.u][isAr()?1:0];return '<b>'+pre+it.p+' '+dt+'</b>'+(u?' <small>'+u+'</small>':'')}
function card(it,i){var tr=isAr()?it.ar:it.fr,cat=CAT[it.c][isAr()?1:0];
 var act=it.t==='location'?(isAr()?'احجز':'Réserver'):it.t==='service'?(isAr()?'اطلب':'Demander'):(isAr()?'اطلب':'Commander');
 return '<article class="card rv" style="transition-delay:'+(i%6*60)+'ms"><div class="imw"><div class="im" style="background-image:url(images/'+it.img+')"></div><span class="tg">'+cat+'</span></div><div class="bd"><h3>'+tr[0]+'</h3><p>'+tr[1]+'</p><div class="pr"><span>'+money(it)+'</span><button class="btn" data-req="'+it.fr[0]+'|'+it.ar[0]+'">'+act+'</button></div></div></article>'}
var cat='all',q='';
function render(){$$('[data-list]').forEach(function(box){var k=box.dataset.list,arr;
 if(k==='home')arr=[D[0],D[3],D[8],D[13],D[15],D[11]];else if(k==='market')arr=D.filter(function(x){return x.t==='market'&&(cat==='all'||x.c===cat)&&(!q||((x.fr[0]+x.ar[0]+x.fr[1]).toLowerCase().indexOf(q)>-1))});else arr=D.filter(function(x){return x.t===k});
 box.innerHTML=arr.map(card).join('');
 var em=$('#empty');if(em&&k==='market')em.style.display=arr.length?'none':'block'});
 var w=$('#warn');if(w)w.style.display=(cat==='all'||cat==='chimie'||cat==='engrais')?'flex':'none';
 reveal();bindReq()}
/* ---------- langue ---------- */
function applyLang(){var ar=L==='ar';document.documentElement.lang=ar?'ar':'fr';document.documentElement.dir=ar?'rtl':'ltr';
 $$('[data-i]').forEach(function(e){if(e.dataset.fr===undefined)e.dataset.fr=e.innerHTML;var k=e.dataset.i;e.innerHTML=(ar&&window.AR&&AR[k]!==undefined)?AR[k]:e.dataset.fr});
 $$('[data-ip]').forEach(function(e){if(e.dataset.fr===undefined)e.dataset.fr=e.placeholder;e.placeholder=(ar&&AR[e.dataset.ip])?AR[e.dataset.ip]:e.dataset.fr});
 var b=$('#lang');if(b)b.textContent=ar?'FR':'عربي';
 var g=$('#rq_g');if(g){var v=g.value;g.innerHTML='<option value="">'+(ar?'اختار…':'Choisir…')+'</option>'+GOV.map(function(x,i){return '<option value="'+x+'">'+(ar?GOVAR[i]:x)+'</option>'}).join('');g.value=v}
 if($('[data-list]'))render()}
/* ---------- apparition au scroll ---------- */
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
function reveal(){$$('.rv:not(.in)').forEach(function(e){io?io.observe(e):e.classList.add('in')})}
/* ---------- demandes (modal) ---------- */
var md=$('#md');
function bindReq(){$$('[data-req]').forEach(function(b){if(b._b)return;b._b=1;b.addEventListener('click',function(){var n=b.dataset.req.split('|');$('#mdS').textContent=isAr()?n[1]:n[0];$('#rqNote').style.display='none';md.dataset.item=n[0];md.classList.add('open');var d=$('#rq_d');d.min=new Date().toISOString().slice(0,10);setTimeout(function(){$('#rq_n').focus()},50)})})}
if(md){$('#mdX').onclick=function(){md.classList.remove('open')};md.addEventListener('click',function(e){if(e.target===md)md.classList.remove('open')});document.addEventListener('keydown',function(e){if(e.key==='Escape')md.classList.remove('open')});
 $('#rqForm').addEventListener('submit',function(e){e.preventDefault();var d={item:md.dataset.item,nom:$('#rq_n').value,tel:$('#rq_t').value,gov:$('#rq_g').value,date:$('#rq_d').value,msg:$('#rq_m').value};
  try{var l=JSON.parse(localStorage.getItem('agrilinkDemandes')||'[]');l.push(d);localStorage.setItem('agrilinkDemandes',JSON.stringify(l))}catch(x){}
  $('#rqNote').style.display='block';this.reset()})}
/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded',function(){
 var yr=$('#yr');if(yr)yr.textContent=new Date().getFullYear();
 var lb=$('#lang');if(lb)lb.onclick=function(){L=isAr()?'fr':'ar';localStorage.setItem('agLang',L);applyLang()};
 var bg=$('#burger');if(bg)bg.onclick=function(){$('#nav').classList.toggle('open')};
 var u=new URLSearchParams(location.search);if(u.get('cat'))cat=u.get('cat');if(u.get('q')){q=u.get('q').toLowerCase()}
 $$('.chip').forEach(function(c){c.classList.toggle('on',c.dataset.c===cat);c.onclick=function(){cat=c.dataset.c;$$('.chip').forEach(function(x){x.classList.toggle('on',x===c)});render()}});
 var hs=$('#heroSearch');if(hs)hs.addEventListener('submit',function(e){e.preventDefault();var v=$('#heroQ').value.trim();location.href='marketplace.html'+(v?'?q='+encodeURIComponent(v):'')});
 var cf=$('#ctForm');if(cf)cf.addEventListener('submit',function(e){e.preventDefault();$('#ctNote').style.display='block';cf.reset()});
 var tb=$$('.tabs button');tb.forEach(function(b){b.onclick=function(){tb.forEach(function(x){x.classList.toggle('on',x===b)});$('#fIn').style.display=b.dataset.t==='in'?'grid':'none';$('#fUp').style.display=b.dataset.t==='up'?'grid':'none'}});
 if(location.hash==='#inscription'&&tb[1])tb[1].click();
 $$('#fIn,#fUp').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var n=$('.note',f);if(f.id==='fUp'&&$('#p1').value!==$('#p2').value){alert(isAr()?'كلمتين السر مش كيف كيف.':'Les mots de passe ne correspondent pas.');return}n.style.display='block'})});
 applyLang();reveal();bindReq();
});
})();
