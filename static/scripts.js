// Function to switch between tabs
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

// Function to upload multiple images and get predictions
async function uploadImages() {
	const files = document.getElementById("imageUpload").files;
	const resultsContainer = document.getElementById("uploadResults");
	resultsContainer.innerHTML = ""; // Clear previous results

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

				const resultDiv = document.createElement("div");
				resultDiv.classList.add("result");
				resultDiv.innerHTML = `
          <p><strong>Image:</strong> ${file.name}</p>
          <p><strong>Prediction:</strong> ${result.prediction}</p>
          <p><strong>Confidence:</strong> ${result.confidence}</p>
        `;
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

// Function to set up the camera
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

// Capture an image from the webcam and predict
async function captureAndPredict() {
	const webcamElement = document.getElementById("webcam");
	const canvas = document.createElement("canvas");
	canvas.width = 224;
	canvas.height = 224;
	const context = canvas.getContext("2d");
	context.drawImage(webcamElement, 0, 0, canvas.width, canvas.height);

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
			document.getElementById("cameraResult").innerText = `Prediction: ${result.prediction}, Confidence: ${result.confidence}`;
		} else {
			alert("Error in prediction. Please try again.");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("Error in prediction. Please check your network connection.");
	}
}

// Initialize the first tab (Upload Images) by default
document.addEventListener("DOMContentLoaded", () => {
	openTab(null, "Upload");
	//setupCamera();
});
