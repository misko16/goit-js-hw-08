// Імпортуємо lodash.throttle
import throttle from 'lodash.throttle';

// Отримуємо посилання на форму та її елементи
const form = document.querySelector('form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

// Функція, яка виконується при події input
const handleInput = throttle(() => {
  // Отримуємо значення полів форми
  const emailValue = emailInput.value;
  const messageValue = messageInput.value;

  // Записуємо значення в локальне сховище
  const feedbackData = { email: emailValue, message: messageValue };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackData));
}, 500); // Оновлюємо сховище не частіше, ніж раз на 500 мілісекунд

// Функція, яка заповнює поля форми зі значеннями з локального сховища
const populateFormFields = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email;
    messageInput.value = message;
  }
};

// Перевіряємо стан сховища під час завантаження сторінки
window.addEventListener('DOMContentLoaded', populateFormFields);

// Функція, яка виконується при сабміті форми
const handleSubmit = (event) => {
  event.preventDefault();

  // Отримуємо значення полів форми
  const emailValue = emailInput.value;
  const messageValue = messageInput.value;

  // Очищуємо сховище та поля форми
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';

  // Виводимо об'єкт у консоль
  const feedbackData = { email: emailValue, message: messageValue };
  console.log(feedbackData);
};

// Додаємо обробник події input до форми
form.addEventListener('input', handleInput);

// Додаємо обробник події submit до форми
form.addEventListener('submit', handleSubmit);
