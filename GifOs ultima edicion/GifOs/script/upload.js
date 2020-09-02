// ------------ Comportamiento del boton dropdown -------------- //

let dropBtn = document.getElementById("dropBtn");
let dropdownContent = document.getElementById("dropdownContent");
let desplegar = 0;

function cambio() {
  if (desplegar == 0) {
    dropdownContent.classList.add("ocultar");
    desplegar = 1;
  } else {
    dropdownContent.classList.remove("ocultar");
    desplegar = 0;
  }
}

dropBtn.addEventListener("click", cambio, true);



//-------------- Botones modo Oscuro, modo dia ------------------//

/* Boton night  */

const nigth = document.querySelector("#night");  // ver el atributo toogle, y el comportamiento en el boton night //
nigth.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  let imgDark = document.getElementById("logoImg").src = "../img/gifOF_logo_dark.png";

  //---- guardamos modo oscuro ----//

  if(document.body.classList.contains('dark')){
    localStorage.setItem('dark-mode','true');
  } else{
    localStorage.setItem('dark-mode','false');
  }
});

//---- mantenemos modo oscuro ----//

if(localStorage.getItem('dark-mode')==='true'){
  let = document.getElementById("logoImg").src = "../img/gifOF_logo_dark.png";
  document.body.classList.add('dark');
} else {
  document.body.classList.remove('dark');
}

/* Boton light  */

const light = document.querySelector("#light");
light.addEventListener("click", () => {
  document.body.classList.remove("dark");
  let = document.getElementById("logoImg").src = "../img/gifOF_logo.png";
  localStorage.removeItem('dark-mode');
  
});



//--------   Variables   -------------//

const 

  // Pasos
  step1 = document.getElementById('createGifSection'),
  step2 = document.getElementById('sectionVideo'),
  step3 = document.getElementById('captureGuifo'),
  step4 = document.getElementById('uploadGuifo'),
  step5 = document.getElementById('succesUploadGuifo'),

  //Botones

  btnStart = document.getElementById('btnCreate'),
  btnCancel = document.getElementById('btnCancel'),
  btnRecordStart = document.getElementById('createRecord'),
  btnRecordClass = document.getElementById('btn-start-video'),
  btnRecording = document.getElementById('btnRecording'),
  btnStopRecord = document.getElementById('stopRecord'),
  btnReStart = document.getElementById('createReStart'),
  btnUpload = document.getElementById('createUpload'),
  btnUpload_cancel = document.getElementById('createCancelUpload'),
  btnCopy = document.getElementById('createCopy'),
  btnDownload = document.getElementById('createDownload'),
  btnDone = document.getElementById('createDone'),
  stopWatchDiv = document.getElementById('stopWatch'),
  myGuifosDiv = document.getElementById('myGuifos'),
  myGuifosList = document.getElementById('myGuifosList'),
  showLink = document.getElementsByClassName('alert-show-link'),
  downloadLink = document.getElementsByClassName('alert-show-dowload'),
  


  // titulo 
  alertTitle = document.getElementById('titleCreateGuifo'),
  notificationCopy = document.querySelectorAll('.notification')[0],
  notificationDownload = document.querySelectorAll('.notification')[1],

  //Camara
  video = document.querySelector('video.video'),
  alertContent = document.querySelectorAll('.alert-content'),
  alertImg = document.querySelectorAll('.alert-image');

let
    giphyApiUrl = "https://api.giphy.com/v1/gifs/",
	gifRecorder,
	gifBlob = '',
	gifUpload_res = '',
	gifId = '',
	webmRecorder,
	webmBlob = '',
	guifosArray = [],
	guifosObj;


// Paso 1 




//Paso 2 Accediendo a la camara

const getOpenCam = async () => {

  step1.innerHTML = " ";
  step2.classList.remove('hidden');
  let createGif = " ";
  video.innerHTML = createGif;  

  // configurando la camara
  try {
		const camera = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				width: { ideal: 832 },
				height: { ideal: 434 }
			}
		});
	
		video.srcObject = camera;
		video.play();
  }
  catch(error){ 
    alert(error);
  }

}




//Paso 3 Grabación con plugin RecordCRT

btnRecordStart.onclick = () => {
  hideFn("", step2, btnUpload, btnReStart);
  showFn("", step3, stopWatchDiv,btnRecording, btnStopRecord);
  alertImg[1].appendChild(video); // Mueve elemento video a modal de grabación

  startRecording();
  stopWatch.start();
}


//  Config RecordRTC

const startRecording = async () => {
	const camera = video.srcObject;
	// WEBM
	webmRecorder = new RecordRTCPromisesHandler(camera, {
		disableLogs: true,
		type: "video",
		mimeType: "video/webm",
		frameRate: 30,
		quality: 10,
		width: 360,
		hidden: 240
	});
	// GIF
	gifRecorder = new RecordRTCPromisesHandler(camera, {
		disableLogs: true,
		type: "gif",
		frameRate: 1,
		quality: 10,
		width: 360,
		hidden: 240
	});

	await webmRecorder.startRecording();
	await gifRecorder.startRecording();

	webmRecorder.camera = camera // Desactiva la cámara al detener la grabación
}


//  Manejo del cronometro //
let hour,
	min,
	sec,
	ms,
	stopCount,
	halt,
	malt,
	salt,
	msalt;
let stopWatch = {
	start: () => {
		ms = 0;
		sec = 0;
		min = 0;
		hour = 0;
		stopCount = setInterval(() => {
			if(ms == 100){
				ms = 0;
				if(sec == 60){
					sec = 0;
					if(min == 60){
						min = 0;
						hour++;
					} else {
						min++;
					}
				} else {
					sec++;
				}
			} else {
				ms++;
			}
			
			halt = stopWatch.pad(hour);
			malt = stopWatch.pad(min);
			salt = stopWatch.pad(sec);
			msalt = stopWatch.pad(ms);
			
			stopWatch.update(halt + ":" + malt + ":" + salt + ":" + msalt);
		}, 10);
	},
	stop: () => {
		clearInterval(stopCount);
	},

	restart: () => {
		ms = 0;
		sec = 0;
		min = 0;
		hour = 0;
	},
	
	update: (txt) => {
		stopWatchDiv.firstChild.nodeValue = txt;
	},
	
	pad: (time) => {
		var temp;
		if(time < 10){
			temp = "0" + time;
		}
		else{
			temp = time;
		}
		return temp;
	}
}


// STEP 3-1   Stop a la grabación

btnStopRecord.onclick = () => {
	hideFn("",btnRecording, btnStopRecord);
	showFn("", btnReStart, btnUpload);
	alertTitle.innerText = "Vista previa";

	stopRecording();
	stopWatch.stop();
}

// Función detiene la grabación RecordRTC

const stopRecording = async () => {
	await webmRecorder.stopRecording();
	await gifRecorder.stopRecording();

	// Blobs
	gifBlob = await gifRecorder.getBlob();
	webmBlob = await webmRecorder.getBlob();

	// Inyecta blob en elemento video
	video.src = URL.createObjectURL(webmBlob);
	video.srcObject = null;

	webmRecorder.camera.stop();
	webmRecorder.destroy();
	gifRecorder.destroy();

	webmRecorder = null;
	gifRecorder = null;
}

// STEP 3.2 Reinicia el proceso

btnReStart.onclick = () => {
	
	getOpenCam();
	hideFn("", step3);
	showFn("", step2, myGuifosDiv);

    stopWatch.restart();
	video.src = "";
	alertImg[0].appendChild(video); // Mueve elemento video a modal de inicio camara
	alertTitle.innerText = "Capturando tu guifo";

	webmRecorder.startRecording();
	gifRecorder.startRecording();

};





// STEP 4: Subiendo a giphy

btnUpload.onclick = async () => {
	hideFn("", step3);
	showFn("", step4, btnUpload_cancel);

	let form = new FormData();
	form.append('file', gifBlob, 'miGuifo.gif');
	/* console.log(form.get('file')) */
	
	try {
		await uploadCreatedGif(form);

		// Comprueba que la subida sea correcta

		if (signal.aborted === false ) {
			if (await gifUpload_res.meta.status === 200) {
				gifId = gifUpload_res.data.id;
				await gifLS(gifId);

				// Limpia array y lo vuelva a regenerar

				guifosArray = [];
				gifLS_items();

				console.log("Guifo subido correctamente!");
				hideFn("", step4);
				showFn("", step5, myGuifosDiv);
				const videoImg = document.createElement("img"); // Crea elemento img
				videoImg.src = URL.createObjectURL(gifBlob); // Asigna url
				alertImg[2].appendChild(videoImg);
				
			}
		}
	}
	catch(error) {
		console.log(error)
	}
}

// <> Función upload método post

const apiKey = "9HjNYzEMAnJAqCtOCOZiMbB1KWchCoW2",
    UrlUpload = `https://upload.giphy.com/v1/gifs?&api_key=${apiKey}`;

const uploadCreatedGif = async (data) => {
	try {
		const options = {
			method: 'POST',
			body: data,
			json: true,
			signal: signal
		}

		let res = await fetch(UrlUpload, options);
		gifUpload_res = await res.json();

		return gifUpload_res;
	}
	catch (err) {
		console.error("Falló el api al subir el Gif.\n", err);
	}
}

// STEP 4.1: Cancela upload a giphy

let controller = new AbortController();
let signal = controller.signal;

btnUpload_cancel.onclick = () => {
	controller.abort();

	// Reinicia AbortController
	controller = new AbortController();
	signal = controller.signal;

	hideFn("", step4);
	showFn("", step3, btnReStart, btnUpload);
}




// STEP 5: Copiar

btnCopy.onclick = () => {
	notificationsFn(notificationCopy);
	copyToClipboard(gifId);
}

// <> Copia al portapapeles
function copyToClipboard (text) {
	const input = document.createElement("textarea");
	document.body.appendChild(input);
	input.value = `https://giphy.com/gifs/${text}`;
	input.select();
	document.execCommand("copy");
	document.body.removeChild(input);
}

// STEP 5.2: Descargar gif
btnDownload.onclick = async () => {
	downloadGif();
	notificationsFn(notificationDownload);
}

// <> Funcion descarga gif
const downloadGif = async () => {
	const gifFile = await URL.createObjectURL(gifBlob); // Convierte blob
	const saveGif = document.createElement("a"); // Crea elemento anchor
	saveGif.href = gifFile; // Asigna url
	saveGif.download = ""; // Elije un filename aleatorio
	document.body.appendChild(saveGif);
	saveGif.click();
	document.body.removeChild(saveGif);
}


// STEP 5.3: Listo
btnDone.onclick = async () => {
	hideFn("", step5);
	showFn("", step1);
}

// <> Función notificaciones
const notificationsFn = (element) => {
	element.classList.add("start");

	setTimeout(() => {
		element.classList.remove("start");
	}, 3000);
}






// Oculta elementos  //

function hideFn (classCss, ...elements) {
	elements.forEach(element => {
		if (classCss) {
			element.classList.remove(classCss);	
		} else {
			element.classList.add("hidden");
		}
	});
}

// Muestra elementos //

function showFn (classCss, ...elements) {
	elements.forEach(element => {
		if (classCss) {
			element.classList.add(classCss);
		} else {
			element.classList.remove("hidden");
		}
	});
}




// Guarda info del gif subido al localStorage

const gifLS = async (gif_id) => {
	const res = await fetch(`${giphyApiUrl}${gif_id}?api_key=${apiKey}`);
	const gif_obj = await res.json();
	const gif_info = JSON.stringify(gif_obj.data);

	localStorage.setItem(`gif_${gif_id}`, gif_info);
}


// Clase para traer de localStorage

class Guifos {
	constructor(id, data) {
		this.id = id;
		this.data = data;
	}
}

const gifosList = () => {
	let guifoThumb = "";
	let guifoNumber = 0;

	// Armado html del guifoThumb
	guifosArray.forEach(giphy => {
		guifoNumber++; 
		guifoThumb += `
			<div class="guifo-thumb">
				<img class="thumb-img" src="${giphy.data.images.fixed_height.url}" alt="${giphy.data.username}">
			</div>
		`;
	});

	myGuifosList.innerHTML = guifoThumb; // Pega listado en "#myGuifosList"
}



// Accede a todos los items de localStorage que empiecen con "gif_". Los agrega a guifosObj sin "gif_", luego al guifosArray
const gifLS_items = () => {
	for (let i = 0; i < localStorage.length; i++) {
		let item = localStorage.key(i);
		if (item.startsWith("gif_")) {
			guifosObj = new Guifos(
				item.slice(4),
				JSON.parse(localStorage.getItem(localStorage.key(i)))
			);
			guifosArray.push(guifosObj);

			// Ordena array descendente (primero nuevos)
			guifosArray.sort(function(a, b) {
				let dateA = new Date(a.data.import_datetime),
					dateB = new Date(b.data.import_datetime);
				return dateB - dateA;
			});
			gifosList();
		}
	}
}
gifLS_items();

