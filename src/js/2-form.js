const STORAGE_KEY = 'feedback-form-state';
const formEle = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };

function saveToLS(key, value) {
  const valueAsJSON = JSON.stringify(value);
  localStorage.setItem(key, valueAsJSON);
}

function getFromLS(key) {
  const valueAsJSON = localStorage.getItem(key);

  try {
    return JSON.parse(valueAsJSON);
  } catch {
    return valueAsJSON;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedData = getFromLS(STORAGE_KEY);
  formData.email = savedData?.email || '';
  formData.message = savedData?.message || '';
  formEle.elements.email.value = formData.email;
  formEle.elements.message.value = formData.message;
});

formEle.addEventListener('submit', e => {
  e.preventDefault();
  if (!(formEle.elements.email.value && formEle.elements.message.value)) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  formData.email = '';
  formData.message = '';
  localStorage.removeItem(STORAGE_KEY);
  formEle.reset();
});

formEle.addEventListener('input', () => {
  formData.email = formEle.elements.email.value;
  formData.message = formEle.elements.message.value;
  saveToLS(STORAGE_KEY, formData);
});
