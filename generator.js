(function () {

var other;
var goodGuysSentences;
var badGuysSentences;
var goodGuys;
var badGuys;
var swearWords;
var swearWordsLvl2;
  
function generatePost() {
  var rage = parseInt(document.getElementById('rageFactor').value) / 12;
  var post = getPost(undefined, rage);
  document.getElementById('post').innerHTML = '';
  document.getElementById('post').insertAdjacentHTML('afterbegin', post);
  /*document.getElementById('footer').style.position = 'relative';*/
  /*document.getElementById('footer').style.bottom = 0;*/
}

// monkey patch the formatting function into strings
 String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
 function () {
   "use strict";
   var str = this.toString();
   if (arguments.length) {
     var t = typeof arguments[0];
     var key;
     var args = ("string" === t || "number" === t) ?
     Array.prototype.slice.call(arguments)
     : arguments[0];

     for (key in args) {
       str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
     }
   }

   return str;
 };

// randomly use capslock and add some bangs
function buranize(sentence, howMuchCapslock, howMuchTypos) {
  var splits = sentence.split(/([\s,.!?]+)/g);
  var result = splits.map(function (chunk) {
    if (Math.random() < howMuchCapslock && (chunk.length > 2 || howMuchCapslock > 0.6)) {
      return chunk.toUpperCase();
    } else {
      return chunk;
    }
  }).join('');
  if (howMuchCapslock > 0.4) {
    result += '!!!';
  }
  if (howMuchCapslock > 0.6) {
    var wordLvl1 = swearWords[Math.floor(Math.random() * swearWords.length)];
    result += '!! ' + wordLvl1 + '!!!!';
  }
  if (howMuchCapslock > 0.8) {
    var wordLvl2 = swearWordsLvl2[Math.floor(Math.random() * swearWordsLvl2.length)];
    result +=  '!!! ' + wordLvl2 + '!!!!!!!!!!!!!!!?!!!!!!';
  }
  return result;
  // todo add random typos
}

// shuffle the array (w/ plain JS)
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomSentence() {
  var r = Math.random();
  if (r < 0.12) {
    //goodGuysSentences
    var item = goodGuysSentences.splice(Math.floor(Math.random() * goodGuysSentences.length), 1);
//     console.log(item);
    var sentenceTemplate = item[0][1];
    return sentenceTemplate.formatUnicorn(shuffle(goodGuys));
  } else if (r < 0.25) {
    //badGuysSentences
    var item = badGuysSentences.splice(Math.floor(Math.random() * badGuysSentences.length), 1);
//     console.log(item);
    var sentenceTemplate = item[0][1];
    return sentenceTemplate.formatUnicorn(shuffle(badGuys));
  } else {
    //other
    return other.splice(Math.floor(Math.random() * other.length), 1);
  }
}
  
// add number of guys to template:
function adjustGysSentences(guysSentences) {
  var adjustedSentences = [];
  for (i = 0; i < guysSentences.length; i++) {
    adjustedSentences[i] = [0, guysSentences[i]];
    for (j = 0; j < 10; j++) {
      if(guysSentences[i].indexOf('{' + j.toString() + '}') >= 0) {
//         console.log(j);
        adjustedSentences[i] = [j+1, guysSentences[i]]
      }
    }
  }
  return adjustedSentences;
}

function getPost(length, capslock) {
  // length 2 - 5
  length = length || Math.random() * 3 + 2;
  capslock = capslock || 0.05;
  var goodGuysSentencesBak = goodGuysSentences.slice(0);
  var badGuysSentencesBak = badGuysSentences.slice(0);
  var otherBak = other.slice(0);

  var post = '';
  for (var i = 0; i < length; i++) {
    post += getRandomSentence();
  }

  goodGuysSentences = goodGuysSentencesBak;
  badGuysSentences = badGuysSentencesBak;
  other = otherBak;
  return buranize(post, capslock);
}
  
function changeBackground() {
  var rage = parseInt(document.getElementById('rageFactor').value);
  var role = getRole();
  if (role == 2) {  // slniecko
    var colors = ["(219,202,21)","(221,174,29)","(223,147,37)","(225,119,45)","(227,92,53)","(230,65,62)","(229,66,94)",
                  "(228,67,126)","(228,68,159)","(227,69,191)","(227,71,224)"];
    var images = ["https://t4.aimg.sk/magaziny/KspY7PSmQ-nkLx9q5qF73g~Pohoda-2012-ilustrak42-brichta.jpg?t=LzgwMHg0NTAvc21hcnQ%3D&h=N4jAWXJMRX9h6iyYlb9cBg&e=2145916800&v=2", 
                  "https://ipravda.sk/res/2016/08/23/thumbs/organizatori-gorila-krempaska-weisenbacher-clanokW.jpg", 
                  "https://cdn.webnoviny.sk/sites/32/2012/10/pochod-spolocne-za-slusny-a-bezpecn.jpg",
                  "https://ipravda.sk/res/2010/05/23/thumbs/73476-gay-pride-bratislava-clanokW.jpg", 
                  "http://panobcan.sk/wp-content/uploads/2015/07/robert-mihaly-provokater.jpg",
                  "http://scienceblogs.com/startswithabang/files/2010/06/big-bang.jpg"];
  }
  else if (role == 3) {  // vasky
    var colors = ["(255,36,28)","(229,32,25)","(204,28,22)","(178,25,19)","(153,21,16)","(127,18,14)","(102,14,11)",
                  "(76,10,8)","(51,7,5)","(25,3,2)","(0,0,0)"];
    var images = ["https://i.ytimg.com/vi/fxqs4ZnQA6M/maxresdefault.jpg", 
                  "http://www.upnito.sk/0/jd2kn7gf6gyeqzrj4a5yfzyyjmxnsdwv.jpg",
                  "https://i.ytimg.com/vi/3xKcvCfRaOw/hqdefault.jpg",
                  "https://imageth.uloz.to/1/4/c/14ce436dee30c05b9fcc7d8483097d31.640x360.jpg", 
                  "http://img.topky.sk/900px/1799003.jpg/incident-facka-Peter-Osusky-Rudolf-Vasky.jpg",
                  "https://storage.pozary.cz/article/5/8/58cd267e1f199/t2q4qlmxad.1200.jpg"];
  }
  else if (role == 4) {  // zomri
    var colors = ["(59,89,152)","(75,81,139)","(91,74,126)","(108,66,114)","(124,59,101)","(140,51,88)","(157,44,76)",
                  "(173,37,63)","(189,29,50)","(206,22,38)","(222,14,25)"];
    var images = ["https://scontent.xx.fbcdn.net/v/t1.0-9/12341294_1114944488517525_6614484182791711045_n.jpg?oh=520171a82baee62b3c153cd173d46854&oe=59AE028B", 
                  "http://www1.birdz.sk/uc/pl/7/1/718dd9f92db5462d92eb98e67c4e882c.jpg",
                  "https://m.smedata.sk/api-media/media/image/fici/3/29/29473/29473_625x.png",
                  "http://zenskyweb.sk/sites/default/files/old/articles/16299/original.jpg", 
                  "https://lh4.googleusercontent.com/-LA3Cpva_5CA/AAAAAAAAAAI/AAAAAAAAAcA/SUGaZDMuge4/photo.jpg",
                  "https://m.smedata.sk/api-media/media/image/fici/8/13/1378668/1378668_1200x.png"];
  }
  else {  // slovien
    var colors = ["(53,130,0)","(78,130,0)","(102,130,0)","(128,129,0)","(129,107,0)","(129,82,0)","(144,77,0)",
                  "(159,69,0)","(174,58,0)","(189,43,0)","(204,26,0)"];
    var images = ["https://cdn.pbrd.co/images/aFqRkATQ6.jpg", 
                  "http://fakt24.sk/gallery/photos/14668911561997/thumbnail_14668911561997.jpg", 
                  "https://a-static.projektn.sk/2017/05/skautka.jpeg", 
                  "http://img.topky.sk/big/1736737.jpg",
                  "http://i.sme.sk/cdata/2/49/4906652/kotleba.jpg",
                  "https://i.ytimg.com/vi/gJe7fY-yowk/maxresdefault.jpg"];
  }
  //document.body.style.background = "rgb" + colors[rage];
  //document.getElementById('xichty').src = images[parseInt(rage/2)];
  
  document.getElementById("transparent").style.background = "rgb" + colors[rage];
  document.getElementById("transparent").style.opacity = "0.8";
  document.getElementById("transparent").style.filter  = 'alpha(opacity=80)';
  
  var element = document.getElementById('image_1'),
  style = window.getComputedStyle( document.body ),
  bcg = style.getPropertyValue('background-image');
  if( bcg !== 'none' ) {
    document.body.style.backgroundImage = "url('" + images[parseInt(rage/2)] + "')";
  }
  
  var ranges = document.querySelectorAll("input[type=range]");
  for (i = 0; i < ranges.length; i++) {
    ranges[i].style.background = "rgb" + colors[rage];
  }
}
  
function changeTopic() {
  var topic = 1;
  var radiosT = document.getElementsByName('tema');
  for (i = 0; i < radiosT.length; i++) {
      if (radiosT[i].checked) {
          topic = parseInt(radiosT[i].value);
          break;
      }
  }
  var role = getRole();
  goodGuysSentences = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""]];
  badGuysSentences = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""]];
  goodGuys = [""];
  badGuys = [""];
  var disable_topic = false;
  if (role == 2) {
    var keyword = "slniecko";
    swearWords = ['HLUPÁCI', 'MILITARISTI', 'SEBCI', 'LÁSKA', 'NEVZDELANCI', 'KVETINOVÁ REVOLÚCIA', 'DÚHA', 
                  'XENOFÓBOVIA', 'HOMOFÓBOVIA', 'VRAHOVIA LÁSKY', 'NÁSILNÍCI', 'SPIATOČNÍCI'];
    swearWordsLvl2 = ['FAŠISTI', 'NACISTI', 'RASISTI', 'VRAHOVIA', 'IGNORANTIII', 'VYPATLANCI'];
  }
  else if (role == 3) {
    var keyword = "vasky";
    topic = 1;
    document.getElementById('topic_all').checked = true;
    disable_topic = true;
    swearWords = ['ROXORY', 'AROGANTNÍ HAJZLI', 'POJDU DOLE', 'BOJLER', 'HAJZLI', 'KOKOTI', 'HEHEHÉ', 
                  'JEBEM BOJLER', 'FAŠISTI', 'KURVY', 'PIČA', 'SPIATOČNÍCI'];
    swearWordsLvl2 = ['KRV, MOZGY, ŠŤANKY, SRAČKY', 'FAŠISTICKÉ SVINE', 'HEHEHÉHÉÉÉ', 'KOKÓÓÓTI', 'UJEBEM BOJLER AJ S HMOŽDINAMI', 
                     'PIIIČAA', 'GENOCÍDA NÁRODA'];
  }
  else if (role == 4) {
    var keyword = "zomri";
    topic = 1;
    document.getElementById('topic_all').checked = true;
    disable_topic = true;
    badGuysSentences = adjustGysSentences(parseTextFile("configs/" + keyword + "_hlasky_zli_chlapci.txt"));
    badGuys = parseTextFile("configs/" + keyword + "_zli_chlapci.txt");
    swearWords = ['JANEVIEMUŠ', 'IDE KARTA', 'KONŠTANTA', 'SKROMNE', 'HRDÍ SLAVIANI', 'KOKOTI', 'PUTINA NA TO', 
                  'CUKRÍČEK', 'SVETIELKA', 'TRAGÉDI', 'PIČI', 'ZOMRI'];
    swearWordsLvl2 = ['VŠETCI ZOMRITE', 'HMOŽDINY NA SATURN', 'ŽALOBA NA TO', 'KOKÓÓÓTI', 'TRAGICKÍ KOKOTI', 
                     'PIIIČAA', 'ZAJEBEM PLYN'];
  }
  else {
    var keyword = "slovien";
    goodGuysSentences = adjustGysSentences(parseTextFile("configs/" + keyword + "_hlasky_dobri_chlapci.txt"));
    badGuysSentences = adjustGysSentences(parseTextFile("configs/" + keyword + "_hlasky_zli_chlapci.txt"));
    goodGuys = parseTextFile("configs/" + keyword + "_dobri_chlapci.txt");
    badGuys = parseTextFile("configs/" + keyword + "_zli_chlapci.txt");
    swearWords = ['KURVY', 'NIHILSTY', 'ŽIDIA', 'KOKOTI', 'NENAZRANE SVINE', 'KOLABORANTI', 'YDIOTI', 'NA STRÁŽ'];
    swearWordsLvl2 = ['KURVAAAA', 'PIIIČAA', 'ZMRRRD', 'JEBAŤ TO CELE', 'KOKOOOOT', 'STRIELAŤ ICH DO RADU', 
                          'HAJZLY DO PLYNU', 'NASTRÁˇY'];
  }
  if (topic == 2) {
    other = parseTextFile("configs/" + keyword + "_romovia.txt");
  } 
  else if (topic == 3) {
    other = parseTextFile("configs/" + keyword + "_migranti.txt");
  }
  else if (topic == 4) {
    other = parseTextFile("configs/" + keyword + "_lgbt.txt");
  }
  else if (topic == 5) {
    other = parseTextFile("configs/" + keyword + "_konspiracie.txt");
  }
  else {  // topic = 1
    var form = document.getElementById("topic_form");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = disable_topic;
    }
    other = parseTextFile("configs/" + keyword + "_hlasky.txt")
    if (role == 1 || role == 2) {
      other.concat(parseTextFile("configs/" + keyword + "_romovia.txt"))
      .concat(parseTextFile("configs/" + keyword + "_migranti.txt"))
      .concat(parseTextFile("configs/" + keyword + "_lgbt.txt"))
      .concat(parseTextFile("configs/" + keyword + "_konspiracie.txt"))
    }
  }
}
  
function changeTitle() {
  var role = getRole();
  var title = "Nahodný Hrdý Sloviän";
  if (role == 2) {
    title = "Nahodné Naivné Slniečko";
  }
  else if (role == 3) {
    title = "Rudolf Vasky - boilerlover";
  }
  else if (role == 4) {
    title = "Nahodný Admin Zomri";
  }
  document.getElementById("title").innerHTML = title;
}
  
function getRole() {
  var role = 1;
  var radiosR = document.getElementsByName('role');
  for (i = 0; i < radiosR.length; i++) {
      if (radiosR[i].checked) {
          role = parseInt(radiosR[i].value);
          break;
      }
  }
  return role;
}
  
function changeRole() {
  changeTopic();
  changeBackground();
  changeTitle();
}

// hacky export, but let's keep it simple
window.generatePost = generatePost;
window.changeBackground = changeBackground;
window.changeTopic = changeTopic;
window.changeRole = changeRole;
  
changeRole();

return {
  getPost: getPost
};
})();

function parseTextFile(pathOfFileToReadFrom) {
  var request = new XMLHttpRequest();
  request.open("GET", pathOfFileToReadFrom, false);
  request.send(null);
  var returnValue = request.responseText.split("\n");
  for (var i = 0; i < returnValue.length; i++) {
    returnValue[i] = returnValue[i] + " ";
  }
  return returnValue;
}
