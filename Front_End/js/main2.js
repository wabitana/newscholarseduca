document.getElementById('Users_data2').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username1 = document.getElementById('username1').value;
    const email1 = document.getElementById('email1').value;
    const password1 = document.getElementById('password1').value;
    const confirmpassword1 = document.getElementById('confirm-password1').value;
  
if (password1==confirmpassword1) {
    fetch('/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username1,email1, password1 }),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('pr1').innerText = data;
        document.getElementById('pr1').style.color='green'
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
} 

else {
    document.getElementById('pr1').innerText = 'Password do not match';
    document.getElementById('pr1').style.color='red'
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

  