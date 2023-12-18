const addProject = document.getElementById('add-project')
const projectDialog = document.querySelector('.project-dialog')
const projectForm = document.getElementById('project-form')
const cancelBtn = document.getElementById('cancel-btn')
const newListInput = document.getElementById('project-name')
const projectsContainer = document.querySelector('[data-lists]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')
const taskDialog = document.querySelector('.task-dialog')
const taskForm = document.getElementById('task-form')
const cancelTaskBtn = document.getElementById('cancel-task-btn')
const dueDate = document.getElementById('due-date')
const priority = document.querySelector('select')
const addNewTask = document.getElementById('add-new-task')
const userTaskName = document.getElementById('user-task-name')


const LOCAL_STORAGE_LIST_KEY = 'tasks.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

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

export function renderProjects() {
     clearElement(projectsContainer)
     renderLists()
    }

// 1
export function submitProject() {
    projectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = newListInput.value
    const list = createList(name)
    lists.push(list)
    saveAndRender()
    projectForm.reset()
    projectDialog.close()
  })
}

// 2

export function createList(name) {
  return {id: Date.now().toString(), name: name, tasks: []}
}

// 3 

export function renderLists() {
  lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id
    listElement.classList.add('list-name')
    listElement.innerText = list.name
    var deleteButton = document.createElement('span');
    deleteButton.setAttribute('class', 'del-btn')
    deleteButton.appendChild(document.createTextNode('x'));
    listElement.appendChild(deleteButton)
    projectsContainer.appendChild(listElement)
    // if (list.id === selectedListId) {
    //  listElement.classList.add('active-list')
    // }
    deleteButton.addEventListener('click', e => {
      lists = lists.filter(list => list.id !== deleteButton.parentNode.dataset.listId)
      listDisplayContainer.style.display = 'none'
      saveAndRender()
    })
  })
}

// 4 

export function selectedProject() {
  projectsContainer.addEventListener('click', e => {
      if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        const selectedList = lists.find(list => list.id === selectedListId)
        listDisplayContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
        clearCompleteTasksButton.addEventListener('click', e => {
          selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
          renderTaskCount(selectedList)
          clearElement(tasksContainer)
          renderTasks(selectedList)
          saveAndRender()
        })
  }})
  listDisplayContainer.style.display = 'none'
}

export function showTaskModal() {
  addNewTask.addEventListener('click', e => {
      e.preventDefault()
      taskDialog.showModal()
  })
}

export function addTask() {
      taskForm.addEventListener('submit', e => {
          e.preventDefault()
          const taskName = userTaskName.value
          const taskDue = dueDate.value
          const taskPriority = priority.value
          const task = createTask(taskName, taskDue, taskPriority)
          const selectedList = lists.find(list => list.id === selectedListId)
          selectedList.tasks.push(task)
          taskDialog.close()
          renderTaskCount(selectedList)
          clearElement(tasksContainer)
          renderTasks(selectedList)
          saveAndRender()
      })
    }

// 5 

export function closeTaskDialog() {
  taskDialog.addEventListener('click', (e) => {
  const taskDialogDimensions = taskDialog.getBoundingClientRect()
  if (
    e.clientX < taskDialogDimensions.left ||
    e.clientX > taskDialogDimensions.right ||
    e.clientY < taskDialogDimensions.top ||
    e.clientY > taskDialogDimensions.bottom
  ) {
    taskForm.reset()
    taskDialog.close()
  }
})
}

export function cancelTask() { 
  cancelTaskBtn.addEventListener('click', () => {
  taskForm.reset()
  taskDialog.close()
})
}

export function createTask(name, due, priority) {
  return {id: Date.now().toString(), name: name, complete: false, due: due, priority: priority }
}

// 6 

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const name = taskElement.querySelector('.name')
    name.htmlFor = task.id
    name.append(task.name)
    const due = taskElement.querySelector('.due')
    due.append(task.due)
    const pri = taskElement.querySelector('.pri')
    pri.append(task.priority)
    tasksContainer.appendChild(taskElement)
  })
}

// 7 

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length 
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks'
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

// 8 

export function checkTask() {
  tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedList = lists.find(list => list.id === selectedListId)
      const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
      // in renderTask checbox id === taskid task id compare to checkbox id 
      selectedTask.complete = e.target.checked
      save()
      renderTaskCount(selectedList)
    }
  })
}
