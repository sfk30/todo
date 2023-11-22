const addProject = document.getElementById('add-project')
const projectDialog = document.querySelector('.project-dialog')
const projectForm = document.getElementById('project-form')
const cancelBtn = document.getElementById('cancel-btn')
const projectsContainer = document.querySelector('[data-lists]')
const newListInput = document.getElementById('project-name')

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
  
export function cancelProject() { cancelBtn.addEventListener('click', () => {
    projectForm.reset()
    projectDialog.close()
  })
}
 
 let lists = []
 
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

export function renderProjects() {
     clearElement(projectsContainer)
     lists.forEach(list => {
         const listElement = document.createElement('li')
         listElement.dataset.listId = list.id
         listElement.classList.add('list-name')
         listElement.innerText = list.name
         projectsContainer.appendChild(listElement)
     })
 }

export function createList(name) {
  return {id: Date.now().toString(), name: name, tasks: []}
}

export function submitProject() {
    projectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const listName = newListInput.value
    const list = createList(listName)
    lists.push(list)
    renderProjects()
    projectForm.reset()
    projectDialog.close()
  })
}