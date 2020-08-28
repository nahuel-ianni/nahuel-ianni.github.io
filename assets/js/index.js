const year = new Date().getFullYear();

// Add years of experience to personal remarks
const experienceContainer = document.querySelector("#years-experience");
if (experienceContainer) experienceContainer.innerHTML = year - 2010;

// Add year to the copyright
const yearContainer = document.querySelector("#copyright-year");
if (yearContainer) yearContainer.innerHTML = year;

// Enable all tags that need JavaScript to work properly
const scriptDependantElements = document.querySelectorAll(".script-dependant");
scriptDependantElements.forEach(el => el.classList.remove("script-dependant"));

// Toggle the nav-menu on small devices
let open = false;
const navbar = document.querySelector(".nav");

window.addEventListener("click", function (event) {
    if (event.target == navbar || event.target.classList == "nav-link")
        this.toggleNav();
});

function toggleNav() {
    navbar.style.width = open ? "0" : "100%";
    open = !open;
}

// Email functionality
const success = document.querySelector(".notification.success");
const error = document.querySelector(".notification.error");
const sender = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const url = "https://portfolio-email.azurewebsites.net/api/queueMessage?code=KB1ErG68l90KqbC/roja2A5KL7Rs1LycyzlVJgtReIMD8gdvx5GUnQ==";

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const arg = `&name=${sender.value}&email=${email.value}&body=${message.value}`;
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        console.log(req.responseText);

        switch (req.status) {
            case 200:
                sender.value = "";
                email.value = "";
                message.value = "";
                showNotification(success);
                break;

            default:
                showNotification(error);
                break;
        }
    };

    req.open("post", url + arg, true);
    req.send();
});

function showNotification(element) {
    element.style.top = "2.5rem";
    setTimeout(() => { element.style.top = "-50%" }, 7500);
}