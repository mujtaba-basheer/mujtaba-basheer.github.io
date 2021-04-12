let theme = localStorage.getItem("theme");

if (theme == null) {
  setTheme("light");
} else {
  setTheme(theme);
}

let themeDots = document.getElementsByClassName("theme-dot");

for (var i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener("click", function () {
    let mode = this.dataset.mode;
    console.log("Option clicked:", mode);
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == "light") {
    document.getElementById("theme-style").href = "default.css";
  }

  if (mode == "blue") {
    document.getElementById("theme-style").href = "blue.css";
  }

  if (mode == "green") {
    document.getElementById("theme-style").href = "green.css";
  }

  if (mode == "purple") {
    document.getElementById("theme-style").href = "purple.css";
  }

  localStorage.setItem("theme", mode);
}

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = {};
  const fields = ["name", "subject", "email", "msg"];
  for (let field of fields) {
    const val = document.getElementById(`${field}-input`).value;
    formData[field] = val;
  }

  fetch(
    "https://z4a5anrf90.execute-api.ap-south-1.amazonaws.com/prod/contact-us",
    {
      method: "POST",
      headers: {
        Authorisation: "mujtaba",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  )
    .then(async (res) => res.json())
    .then((res) => {
      const submitBtn = document.getElementById("submit-btn");
      submitBtn.value = res.message;
      setTimeout(() => {
        contactForm.reset();
        submitBtn.value = "Submit";
      }, 3000);
    });
});
