document.addEventListener('DOMContentLoaded', function() {
  // 1. Счетчик обратного отсчета
  function updateCountdown() {
    const weddingDate = new Date('[2025, 6, 19]T00:00:00'); // Замените [Год, месяц (0-11), день] на дату вашей свадьбы. Месяц начинается с 0 (январь)
    const now = new Date();
    const timeDifference = weddingDate.getTime() - now.getTime();

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const countdownElement = document.getElementById('countdown');
      countdownElement.innerHTML = `До свадьбы: ${days} дн. ${hours} ч. ${minutes} мин. ${seconds} сек.`;
    } else {
      const countdownElement = document.getElementById('countdown');
      countdownElement.innerHTML = "Свадьба уже прошла!";
    }
  }

  updateCountdown(); // Запустить счетчик сразу
  setInterval(updateCountdown, 1000); // Обновлять счетчик каждую секунду


  // 2. Форма опроса
    const alcoholOtherRadio = document.getElementById('alcohol-other');
    const alcoholOtherText = document.getElementById('alcohol-other-text');

    alcoholOtherRadio.addEventListener('change', function() {
        if (this.checked) {
            alcoholOtherText.style.display = 'inline-block';
        } else {
            alcoholOtherText.style.display = 'none';
        }
    });

    const rsvpForm = document.getElementById('rsvp-form');

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(rsvpForm);
        const name = formData.get('name');
        const attending = formData.get('attending');
       const alcoholCheckboxes = formData.getAll('alcohol');

        const alcoholOtherTextValue = formData.get('alcohol-other-text') || '';
        const comments = formData.get('comments');

         let alcoholMessage = '';

        if (alcoholCheckboxes.includes('other') && alcoholOtherTextValue) {
             alcoholCheckboxes = alcoholCheckboxes.filter(item => item !== 'other') //фильтруем "other"
            alcoholMessage = ` (Другое: ${alcoholOtherTextValue}, Предпочитает: ${alcoholCheckboxes.join(', ')})`;
         }
         else if(alcoholCheckboxes.length > 0) {
            alcoholMessage = ` (Предпочитает: ${alcoholCheckboxes.join(', ')})`;
        }


        alert(`Имя: ${name}\nБудет присутствовать: ${attending}\nПредпочтения в алкоголе: ${alcoholMessage}\nКомментарии: ${comments}`);

        rsvpForm.reset();
       alcoholOtherText.style.display = 'none';
    });
});