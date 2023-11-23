const addProject = document.getElementById('add-project')
const projectDialog = document.querySelector('.project-dialog')
const projectForm = document.getElementById('project-form')
const cancelBtn = document.getElementById('cancel-btn')
const projectsContainer = document.querySelector('[data-lists]')
const newListInput = document.getElementById('project-name')

const LOCAL_STORAGE_LIST_KEY = 'tasks.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

export function selectedProject() {
  projectsContainer.addEventListener('click', e => {
      if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
      }
  })
}

export function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

export function saveAndRender() {
  save()
  renderProjects()
}

export function addNewProject() {
    addProject.addEventListener('click', () => {
        projectDialog.showModal()
    })
}

export function closeProjectDialog() {
    projectDialog.addEventListener('click', (e) => {
    const dialogDimensions = projectDialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      projectForm.reset()
      projectDialog.close()
    }
  })
}
  
export function cancelProject() { 
    cancelBtn.addEventListener('click', () => {
    projectForm.reset()
    projectDialog.close()
  })
}
 
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

export function createList(name) {
  return {id: Date.now().toString(), name: name, tasks: []}
}

export function renderProjects() {
     clearElement(projectsContainer)
     lists.forEach(list => {
         const listElement = document.createElement('li')
         listElement.dataset.listId = list.id
         listElement.classList.add('list-name')
         listElement.innerText = list.name
         var deleteButton = document.createElement('span');
         deleteButton.setAttribute('class', 'del-btn')
         deleteButton.appendChild(document.createTextNode('x'));
         listElement.appendChild(deleteButton)
         if (list.id === selectedListId) {
          listElement.classList.add('active-list')
         }
         projectsContainer.appendChild(listElement)
         deleteButton.addEventListener('click', e => {
           lists = lists.filter(list => list.id !== deleteButton.parentNode.dataset.listId)
          //  deleteButton.parentNode.dataset.listId = null
           saveAndRender()
     })
 })}

export function submitProject() {
    projectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const listName = newListInput.value
    const list = createList(listName)
    lists.push(list)
    saveAndRender()
    projectForm.reset()
    projectDialog.close()
  })
}

// export function deleteProject() {
//   var deleteButtons = document.querySelectorAll('.del-btn')
//   var deleteButtonsArray = [...deleteButtons]
//   console.log(deleteButtonsArray)
//   deleteButtonsArray.forEach(delBtn=> {
//     delBtn.addEventListener('click', () => {
//       console.log('pressed')
//       lists = lists.filter(list => list.id !== delBtn.parentNode.dataset.listId)
//       saveAndRender()
//      })
//   })
// }


// deleteButton.addEventListener('click', () => {
//   const index = lists.indexOf(listElement)
//   console.log(index)
//   lists.splice(index,1)
//   console.log(lists)
//   projectsContainer.removeChild(listElement)
//   save()
//  })

// deleteButton[i].addEventListener('click', e => {
//   console.log('pressed')
//   lists = lists.filter(list => list.id !== selectedListId)
//   selectedListId = null 
//   saveAndRender()