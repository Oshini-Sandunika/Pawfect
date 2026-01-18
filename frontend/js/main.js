function showLogin() {
    // remove existing modals
    document.querySelectorAll(".login-modal").forEach(modal => modal.remove());

    const loginModal = document.createElement("dialog");
    loginModal.classList.add("login-modal");

    // add iframe for login page
    const loginFrame = document.createElement("iframe");
    loginFrame.src = "frames/login.html";
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

function showMenu() {
    let menu = document.querySelector("#mobile-menu");
    let menuBtn = document.querySelector("#menu-btn");;

    if (menu === null) {
        menu = document.createElement("div");
        menu.id = "mobile-menu";

        menuBtn.parentNode.insertBefore(menu, menuBtn.nextSibling);

        const menuItems = document.querySelectorAll(".site-menu .nav-item.mobile-hide");
        menuItems.forEach(item => {
            const node = item.cloneNode(true);
            node.classList.remove("mobile-hide");
            node.classList.add("mobile-menu-item");
            menu.appendChild(node);
        });
    }

    menuBtn.addEventListener("click", () => {
        menu.classList.add("show");
    });

    document.body.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && event.target !== menuBtn) {
            menu.classList.remove("show");
        }
    });
}

showMenu()