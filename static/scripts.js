function openTab(evt, tabName) {
	const tabcontent = document.getElementsByClassName("tabcontent");
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	const tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	if (evt) evt.currentTarget.className += " active";
}

async function uploadImages() {
	const files = document.getElementById("imageUpload").files;
	const resultsContainer = document.getElementById("uploadResults");
	resultsContainer.innerHTML = ""; // Limpiar resultados previos

	for (const file of files) {
		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("/predict", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				const predictions = result.predictions;

				// Crear un contenedor para el resultado de cada imagen
				const resultDiv = document.createElement("div");
				resultDiv.classList.add("result");

				// Mostrar el nombre de la imagen
				resultDiv.innerHTML = `<p><strong>Image:</strong> ${file.name}</p>`;

				// Crear un contenedor de tabla para las predicciones
				const predictionTable = document.createElement("div");
				predictionTable.classList.add("prediction-table");

				// Crear cada fila de predicción
				predictions.forEach((pred) => {
					const row = document.createElement("div");
					row.classList.add("prediction-row");

					const className = document.createElement("div");
					className.classList.add("prediction-class");
					className.textContent = `Class: ${pred.class}`;

					const confidence = document.createElement("div");
					confidence.classList.add("prediction-confidence");
					confidence.textContent = `Confidence: ${(pred.confidence * 100).toFixed(2)}%`;

					row.appendChild(className);
					row.appendChild(confidence);
					predictionTable.appendChild(row);
				});

				resultDiv.appendChild(predictionTable);
				resultsContainer.appendChild(resultDiv);
			} else {
				alert("Error in prediction. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Error in prediction. Please check your network connection.");
		}
	}
}


async function setupCamera() {
	const webcamElement = document.getElementById("webcam");
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {width: 224, height: 224},
		});
		webcamElement.srcObject = stream;
	} catch (error) {
		console.error("Error accessing webcam:", error);
		alert("Webcam access denied or unavailable.");
	}
}

async function captureAndPredict() {
	const webcamElement = document.getElementById("webcam");
	const canvas = document.createElement("canvas");
	canvas.width = 224;
	canvas.height = 224;
	const context = canvas.getContext("2d");
	context.drawImage(webcamElement, 0, 0, canvas.width, canvas.height);

	// Convertir la imagen capturada a un blob para enviarla al servidor
	const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
	const formData = new FormData();
	formData.append("file", imageBlob, "webcam.jpg");

	try {
		const response = await fetch("/predict", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			const predictions = result.predictions;

			// Limpiar el resultado previo
			const cameraResult = document.getElementById("cameraResult");
			cameraResult.innerHTML = "<h3>Predicciones:</h3>";

			// Crear un contenedor de tabla para las predicciones
			const predictionTable = document.createElement("div");
			predictionTable.classList.add("prediction-table");

			// Crear cada fila de predicción
			predictions.forEach((pred) => {
				const row = document.createElement("div");
				row.classList.add("prediction-row");

				const className = document.createElement("div");
				className.classList.add("prediction-class");
				className.textContent = `Class: ${pred.class}`;

				const confidence = document.createElement("div");
				confidence.classList.add("prediction-confidence");
				confidence.textContent = `Confidence: ${(pred.confidence * 100).toFixed(2)}%`;

				row.appendChild(className);
				row.appendChild(confidence);
				predictionTable.appendChild(row);
			});

			// Añadir la tabla de predicciones al resultado de la cámara
			cameraResult.appendChild(predictionTable);
		} else {
			alert("Error en la predicción. Inténtalo de nuevo.");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("Error en la predicción. Verifica tu conexión de red.");
	}
}

// Initialize the first tab (Upload Images) by default
document.addEventListener("DOMContentLoaded", () => {
	openTab(null, "Upload");
	//setupCamera();
});
