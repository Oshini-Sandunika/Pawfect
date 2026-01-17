function showLogin() {
    // remove existing modals
    document.querySelectorAll(".login-modal").forEach(modal => modal.remove());

    const loginModal = document.createElement("dialog");
    loginModal.classList.add("login-modal");

    // add iframe for login page
    const loginFrame = document.createElement("iframe");
    loginFrame.src = "login.html";
    loginFrame.width = "400";
    loginFrame.height = "450";
    loginFrame.style.border = "none";
    loginModal.appendChild(loginFrame);
    document.body.appendChild(loginModal);

    // add close btn
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.classList.add("close");
    closeBtn.addEventListener("click", () => {
        loginModal.close();
    });
    loginModal.appendChild(closeBtn);


    loginModal.addEventListener("close", (e) => {
        console.log(e)
        document.body.removeChild(loginModal);
    });

    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.close();
        }
    });

    loginModal.showModal();
}