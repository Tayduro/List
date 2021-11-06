function clear() {
  localStorage.clear();
  document.getElementById('task list').innerHTML = '';
}

let arrayLiValue = [];
function builderList() {
  const ul = document.getElementById('task list');
  if (document.getElementById('input').value.includes(' ')) {
    let counter = 0;
    for (let i = 0; i < document.getElementById('input').value.length; i += 1) {
      const { value } = document.getElementById('input');
      if (value[i].charCodeAt(0) !== 32) {
        counter += 1;
      }
    }
    if (counter === 0) {
      return;
    }
  }
  if (document.getElementById('input').value === '') {
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = document.getElementById('input').value.trim();
  document.getElementById('input').value = '';
  document.getElementById('task list').append(li);
  const lis = [];
  for (let i = 0; i < ul.childNodes.length; i += 1) {
    lis.push(ul.childNodes[i].innerHTML);
  }
  lis.sort();
  ul.innerHTML = '';
  for (let j = 0; j < lis.length; j += 1) {
    const newLi = document.createElement('li');
    newLi.innerHTML = lis[j];
    ul.append(newLi);
  }
  arrayLiValue = lis;
  const str = JSON.stringify(arrayLiValue);
  localStorage.setItem('tasks', str);
}

function ready() {
  const { body } = document;
  const input = document.createElement('input');
  input.id = 'input';
  body.append(input);

  const addButton = document.createElement('button');
  addButton.addEventListener('click', builderList);
  addButton.innerHTML = 'Добавить';
  body.append(addButton);
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', clear);
  deleteButton.innerHTML = 'Очистить';
  body.append(deleteButton);

  const div = document.createElement('div');
  div.id = 'container';
  body.append(div);

  const ul = document.createElement('ul');
  ul.id = 'task list';
  div.append(ul);

  if (localStorage.getItem('tasks')) {
    const saveValueStr = localStorage.getItem('tasks');
    const saveValue = JSON.parse(saveValueStr);
    for (let z = 0; z < saveValue.length; z += 1) {
      const li = document.createElement('li');
      li.textContent = saveValue[z];
      ul.append(li);
    }
  }

  window.addEventListener('keypress', function bindEnter(e) {
    if (e.key === 'Enter') {
      builderList();
    }
  });
}

document.addEventListener('DOMContentLoaded', ready);
