const STORAGE_KEY = 'feedback-form-state';
const formEle = document.querySelector('.feedback-form');
let formData = new FormData();

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

function getFormValues(formDataObj) {
  return {
    email: formDataObj.get('email'),
    message: formDataObj.get('message').trim(),
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const savedData = getFromLS(STORAGE_KEY);
  formData.set('email', savedData?.email || '');
  formData.set('message', savedData?.message || '');
  formEle.elements.email.value = formData.get('email');
  formEle.elements.message.value = formData.get('message');
});

formEle.addEventListener('submit', e => {
  e.preventDefault();

  formData = new FormData(formEle);
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
  formData = new FormData(formEle);
  const values = getFormValues(formData);
  saveToLS(STORAGE_KEY, values);
});
