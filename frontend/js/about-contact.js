(function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // replace from EmailJS
})();

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const status = document.getElementById("formStatus");
    status.style.color = "brown";
    status.textContent = "Submitting...";

    const params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        pet_type: document.getElementById("pet").value,
        message: document.getElementById("message").value
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
        .then(() => {
            status.style.color = "green";
            status.textContent = "✅ Message sent successfully!";
            document.getElementById("contactForm").reset();
        })
        .catch(() => {
            status.style.color = "red";
            status.textContent = "❌ Failed to send message.";
        });
});
