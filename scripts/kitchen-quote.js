
const formHandler = new Web3FormHandler();


let selectedLayout = '';
let selectedPackage = '';
let measurements = {};
let userDetails = {};

// Step 1: Capture Selected Layout
function selectLayout(layout, element) {
    // Update the selected layout
    selectedLayout = layout;

    // Remove 'selected' class from all options
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add 'selected' class to the clicked element
    element.classList.add('selected');

    // Update measurement fields dynamically based on the selected layout
    updateMeasurementFields(layout);
}

// Step 2: Show Next Step
function showNextStep(step) {
   // console.log(`Navigating to step: ${step}`); // Debugging step transitions

    // Ensure the layout is selected before proceeding to step 2
    if (step === 2 && !selectedLayout) {
        alert('Please select a kitchen layout');
        return;
    }

    // Validate measurements when transitioning to step 3
    if (step === 3) {
        if (!validateMeasurements()) {
            alert('Please fill in all the required Dimension');
            return;
        }
    }

    if (step === 4 && !selectedPackage){
        alert('Please Select a Package');
        return;
    }
    // Hide all steps and show the target step
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.classList.add('hidden');
    });

    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) {
        targetStep.classList.remove('hidden');
    } 
}

// Step 3: Capture Selected Package
function selectPackage(card) {
    // Remove 'selected' class from all package cards
    document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));

    // Add 'selected' class to the clicked card
    card.classList.add('selected');

    // Store selected package based on the header text
    selectedPackage = card.querySelector('.header').innerText;
}

// Add event listeners to each package card for selection (Step 3)
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', () => {
        selectPackage(card);  // This will select the package when clicked
    });
});

// Step 4: Update Measurement Fields Dynamically
function updateMeasurementFields(layout) {
    const measurementFieldsContainer = document.getElementById('measurement-fields');
    const layoutImageSection = document.getElementById('layout-image-section');

    // Clear existing fields before updating
    measurementFieldsContainer.innerHTML = '';
    layoutImageSection.innerHTML = '';

    // Generate layout details and measurement fields dynamically based on selected layout
    let layoutDetailsHTML = '';

    if (layout === 'L-shaped') {
        layoutDetailsHTML = `
        <div class="layout-details-container">
            <div class="layout-left">
                <img src="images/l-shape.svg" alt="L-shaped Kitchen" class="layout-image">
                <p class="layout-label">L-shaped Kitchen</p>
            </div>
            <div class="layout-details">
                <div class="input-container">
                    <div class="dimension-item">
                        <label for="dimension-a">A:</label>
                        <input type="number" id="dimension-a" placeholder="ft." oninput="updateMeasurement('dimension-a', this.value)">
                    </div>
                    <div class="dimension-item">
                        <label for="dimension-b">B:</label>
                        <input type="number" id="dimension-b" placeholder="ft." oninput="updateMeasurement('dimension-b', this.value)">
                    </div>
                </div>
            </div>
        </div>`;
    } else if (layout === 'U-shaped') {
        layoutDetailsHTML = `
        <div class="layout-details-container">
            <div class="layout-left">
                <img src="images/u-shape.svg" alt="U-shaped Kitchen" class="layout-image">
                <p class="layout-label">U-shaped Kitchen</p>
            </div>
            <div class="layout-details">
                <div class="input-container">
                    <div class="dimension-item">
                        <label for="dimension-a">A:</label>
                        <input type="number" id="dimension-a" placeholder="ft." oninput="updateMeasurement('dimension-a', this.value)">
                    </div>
                    <div class="dimension-item">
                        <label for="dimension-b">B:</label>
                        <input type="number" id="dimension-b" placeholder="ft." oninput="updateMeasurement('dimension-b', this.value)">
                    </div>
                    <div class="dimension-item">
                        <label for="dimension-c">C:</label>
                        <input type="number" id="dimension-c" placeholder="ft." oninput="updateMeasurement('dimension-c', this.value)">
                    </div>
                </div>
            </div>
        </div>`;
    } else if (layout === 'Parallel') {
        layoutDetailsHTML = `
        <div class="layout-details-container">
            <div class="layout-left">
                <img src="images/parallel.svg" alt="Parallel Kitchen" class="layout-image">
                <p class="layout-label">Parallel Kitchen</p>
            </div>
            <div class="layout-details">
                <div class="input-container">
                    <div class="dimension-item">
                        <label for="dimension-a">A:</label>
                        <input type="number" id="dimension-a" placeholder="ft." oninput="updateMeasurement('dimension-a', this.value)">
                    </div>
                    <div class="dimension-item">
                        <label for="dimension-b">B:</label>
                        <input type="number" id="dimension-b" placeholder="ft." oninput="updateMeasurement('dimension-b', this.value)">
                    </div>
                </div>
            </div>
        </div>`;
    } else if (layout === 'straight') {
        layoutDetailsHTML = `
        <div class="layout-details-container">
            <div class="layout-left">
                <img src="images/straight.svg" alt="Straight Kitchen" class="layout-image">
                <p class="layout-label">Straight Kitchen</p>
            </div>
            <div class="layout-details">
                <div class="input-container">
                    <div class="dimension-item">
                        <label for="dimension-a">A:</label>
                        <input type="number" id="dimension-a" placeholder="ft." oninput="updateMeasurement('dimension-a', this.value)">
                    </div>
                </div>
            </div>
        </div>`;
    }

    // Add the generated layout details to the section
    layoutImageSection.innerHTML = layoutDetailsHTML;
}


// Update the measurements object dynamically as the user enters values
function updateMeasurement(key, value) {
    // Ensure only valid numeric values are stored
    if (!isNaN(value) || value === '') {
        measurements[key] = value;
    }
}

// Validate the entered measurements (Step 2 validation)
function validateMeasurements() {
    let isValid = true;
    const layout = selectedLayout.toLowerCase();

    const isValidNumber = (value) => {
        return !isNaN(value) && (value)/1 > 0; // Ensure it's a valid and positive number
    };

    if (layout === 'l-shaped') {
        if (!isValidNumber(measurements['dimension-a']) || !isValidNumber(measurements['dimension-b'])) {
            //console.error('Invalid measurements for L-shaped layout');
            isValid = false;
        }
    } else if (layout === 'u-shaped') {
        if (!isValidNumber(measurements['dimension-a']) || !isValidNumber(measurements['dimension-b']) || !isValidNumber(measurements['dimension-c'])) {
           // console.error('Invalid measurements for U-shaped layout');
            isValid = false;
        }
    }
    else if (layout === 'island') {
        if (!isValidNumber(measurements['dimension-a'])) {
            //console.error('Invalid measurement for Island layout');
            isValid = false;
        }
    }
    else if (layout === 'parallel') {
        if (!isValidNumber(measurements['dimension-a']) || !isValidNumber(measurements['dimension-b'])) {
           // console.error('Invalid measurements for Parallel layout');
            isValid = false;
        }
    }

    return isValid;
}
// Step Back Functionality to navigate between steps
function showPreviousStep(step) {
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.classList.add('hidden');
    });

    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) {
        targetStep.classList.remove('hidden');
    }
}


// import Web3FormHandler from 'email-integration.js'; // Import the Web3FormHandler class
// Step 4: Submit and Gather User Data
function submitQuiz() {
    const nameInput = document.querySelector('input[placeholder="Name"]');
    const phoneInput = document.querySelector('input[placeholder="+91 Phone number"]');
    const additionalrequirement = document.querySelector('input[placeholder="Additional Requirement"')
    const whatsappUpdates = document.getElementById('whatsappUpdates').checked;

    userDetails = {
        name: nameInput ? nameInput.value : '',
        phone: phoneInput ? phoneInput.value : '',
        additional_requiement: additionalrequirement ? additionalrequirement.value: '',
        whatsappUpdates,
    };

    // Validate user details before submission
    if (!userDetails.name || !userDetails.phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate phone number format (10-digit numeric)
    const phoneRegex = /^[0-9]{10}$/; 
    if (!phoneRegex.test(userDetails.phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Build the formatted string to send
    let finalDataString = `Product = Moduler Kitchen\n`;
    finalDataString += `Layout = ${selectedLayout}\n`;

    // Format Dimensions as "32 x 52"
    const dimensionString = Object.values(measurements).join(" x ");
    finalDataString += `Dimension = ${dimensionString}\n`;

    finalDataString += `Package = ${selectedPackage}\n`;
    finalDataString += `Name = ${userDetails.name}\n`;
    finalDataString += `Phone Number = ${userDetails.phone}\n`;
    finalDataString += `Additional Requirement = ${userDetails.additional_requiement}\n`;
    finalDataString += `Whatsapp Update = ${userDetails.whatsappUpdates ? 'Yes' : 'No'}\n`;

    //console.log('Final Submission Data:', finalDataString);

    // Send the formatted string to Web3FormHandler
    formHandler
        .sendMessage(finalDataString)  // Send the formatted string instead of JSON
        .then(() => {
            alert('Our Expert will Contact you Soon!');
            window.close();
        })
        .catch((error) => {

            alert("Failed to Reach us");
        });


    // Optionally close the window after submission
    // 
}







// FAQ section
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        const isOpen = answer.style.display === 'block';
        
        document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
        document.querySelectorAll('.faq-icon').forEach(icn => icn.classList.replace('ri-subtract-line', 'ri-add-line'));
        
        if (!isOpen) {
            answer.style.display = 'block';
            item.classList.add('active');
            icon.classList.replace('ri-add-line', 'ri-subtract-line');
        }
    });
});