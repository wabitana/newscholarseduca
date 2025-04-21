document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Failed to send message. Please try again.");
    }

  });

//Menue Bar
const menuIcon = document.getElementById('navbarr');
const closeBtn = document.getElementById('close-btn');
const menu = document.getElementById('navelists');

menuIcon.addEventListener('click', () => {
  
  menu.style.right=0;
});

closeBtn.addEventListener('click', () => {
  console.log('chlicked')
  menu.style.right=-280+'px';
});
