(function(){
    emailjs.init("LTmwx-NLagniGqK64"); // replace from EmailJS
})();

document.getElementById("contactFormEl").addEventListener("submit", function(e) {
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

    emailjs.send("service_og277ei", "template_i1qglta", params)
        .then(() => {
            status.style.color = "green";
            status.textContent = "✅ Message sent successfully!";
            document.getElementById("contactFormEl").reset();
        })
        .catch(() => {
            status.style.color = "red";
            status.textContent = "❌ Failed to send message.";
        });
});
