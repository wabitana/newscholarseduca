const testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? 'block' : 'none';
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

// Initial display
showTestimonial(currentIndex);

// Auto-rotate every 5 seconds
setInterval(nextTestimonial, 2000);

  // JavaScript for Toggle Menu
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


  //Trying to send and recive datas

  document.getElementById('Users_data').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('loginh1').innerText = data;
        if(data==='loading.....'){
          document.getElementById('loginh1').style.color='green'
          setTimeout(() => {
            window.location.replace('https://newscholarseducation.blogspot.com/')
          }, 3000);
          
        }
        else{
          document.getElementById('loginh1').style.color='red';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

   
});

//For Register




