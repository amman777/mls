document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('#image-carousel img');
    let currentIndex = 0;

    if (images.length === 0) {
        return;
    }

    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length; 
        images[currentIndex].classList.add('active');
    }

    setInterval(changeImage, 3000); // Change image every 3 seconds
});

const buttons = document.querySelectorAll(".tab-buttons button");
const contents = document.querySelectorAll(".tab-content");

let activeSwiper = null; // To track the current active Swiper instance

function activateTab(id) {
    buttons.forEach(button => {
        button.classList.remove("active");
        if (button.dataset.id === id) {
            button.classList.add("active");
        }
    });

    contents.forEach(content => {
        if (content.id === id) {
            content.classList.add("active");

            // Reinitialize Swiper for the active tab
            const swiperContainer = content.querySelector('.swiper-container');
            if (swiperContainer) {
                if (activeSwiper) activeSwiper.destroy(); // Destroy the existing Swiper instance
                activeSwiper = new Swiper(swiperContainer, {
                    autoplay: {
                        delay: 3000, 
                        disableOnInteraction: false, 
                    },
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true, // Enables infinite scrolling
                    breakpoints: {
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    },
                });
            }
        } else {
            content.classList.remove("active");
        }
    });
}

// Set default active tab (Kitchen)
activateTab("kitchen");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.id;
        activateTab(id);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const carouselElement = document.querySelector("#tabContentCarousel");
    const indicators = document.querySelectorAll(".carousel-indicators button");

    // Initialize the Bootstrap carousel with touch and manual dot navigation
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 6000, // Auto-slide every 6 seconds
        touch: true,   // Enable touch gestures
    });

    // Add swipe gesture support using Swiper.js logic
    let startX = 0;
    let endX = 0;

    carouselElement.addEventListener("touchstart", function (e) {
        startX = e.changedTouches[0].clientX;
    });

    carouselElement.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            carousel.next(); // Swipe left to move to the next slide
        } else if (endX - startX > 50) {
            carousel.prev(); // Swipe right to move to the previous slide
        }
    });

    // Sync the indicators with the active slide
    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", function () {
            carousel.to(index); // Go to the specific slide when a dot is clicked
        });
    });
});



// Form Fill up

const formHandler = new Web3FormHandler();
// Function to handle form submissions
function handleFormSubmission(formContainerClass) {
    const formContainer = document.querySelector(`.${formContainerClass}`);
    console.log("HEre 113")
    if (!formContainer) {
        console.error(`Form container with class ${formContainerClass} not found.`);
        return;
    }

    const form = formContainer.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const nameInput = form.querySelector('input[placeholder="Name"]');
        const phoneInput = form.querySelector('input[placeholder="+91 Phone number"]');
        const productSelect = form.querySelector("select");
        const whatsappUpdates = form.querySelector("#whatsappUpdates");

        // Collect user details
        const userDetails = {
            name: nameInput ? nameInput.value : '',
            phone: phoneInput ? phoneInput.value : '',
            product: productSelect ? productSelect.value : '',
            whatsappUpdates,
        };

        // Validate user details before submission
        if (!userDetails.name || !userDetails.phone || !userDetails.product) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate phone number format (10-digit numeric)
        const phoneRegex = /^(\+91)?[6-9][0-9]{9}$/;
        if (!phoneRegex.test(userDetails.phone)) {
            alert("Please enter a valid 10-digit phone number (with or without +91).");
            return;
        }
        

        // Build the formatted string to send
        let finalDataString = `Product = ${userDetails.product}\n`;
        finalDataString += `Name = ${userDetails.name}\n`;
        finalDataString += `Phone Number = ${userDetails.phone}\n`;
        finalDataString += `Whatsapp Update = ${userDetails.whatsappUpdates ? "Yes" : "No"}`;

        console.log("Final Submission Data:", finalDataString);

        // Send the formatted string to Web3FormHandler
        formHandler
            .sendMessage(finalDataString)
            .then(() => {
                alert("Thank you for Trusting MLS 😊");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Failed to send data:", error.message);
                alert("Failed to submit data. Please try again.");
            });
    });
}

// Initialize form handlers for both forms
handleFormSubmission("form-container-1");
handleFormSubmission("form-container-2");
