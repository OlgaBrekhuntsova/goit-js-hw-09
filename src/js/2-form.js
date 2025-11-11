const STORAGE_KEY = 'feedback-form-state';

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

const formEle = document.querySelector('.feedback-form');

function getFormValues(formDataObj) {
  return {
    email: formDataObj.get('email'),
    message: formDataObj.get('message').trim(),
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const data = getFromLS(STORAGE_KEY);
  formEle.elements.email.value = data?.email || '';
  formEle.elements.message.value = data?.message || '';
});

formEle.addEventListener('submit', e => {
  e.preventDefault();

  let formData = new FormData(formEle);
  const values = getFormValues(formData);
  if (!(values.email && values.message)) {
    alert('Fill please all fields');
    return;
  }
  console.log(values);
  formData = new FormData();
  localStorage.removeItem(STORAGE_KEY);
  formEle.reset();
});

formEle.addEventListener('input', () => {
  const formData = new FormData(formEle);
  const values = getFormValues(formData);
  saveToLS(STORAGE_KEY, values);
});
