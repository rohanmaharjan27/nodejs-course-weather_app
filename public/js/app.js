console.log('CLIENT SIDE JAVASCRIPT IS LOADED');

// fetch('https://puzzle.mead.io/puzzle')
//   .then((res) => {
//     res.json().then((data) => {
//       console.log(data);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msgOne = document.querySelector('#msg-one');
const msgTwo = document.querySelector('#msg-two');

weatherForm.addEventListener('submit', (e) => {
  const location = searchInput.value;

  e.preventDefault();

  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';

  fetch(`/weather?address=${location}`)
    .then((res) => {
      res.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          msgOne.textContent = data.error;
          msgTwo.textContent = '';
        } else {
          console.log(data.location);
          console.log(data.forecast);

          msgOne.textContent = data.location;
          msgTwo.textContent = data.forecast;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
