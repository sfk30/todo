const addProject = document.getElementById('add-project')
const projectDialog = document.querySelector('.project-dialog')
const projectForm = document.getElementById('project-form')
const cancelBtn = document.getElementById('cancel-btn')

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
  
export function submitProject() {
    projectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    projectForm.reset()
    projectDialog.close()
  })
}
  
export function cancelProject() { cancelBtn.addEventListener('click', () => {
    projectForm.reset()
    projectDialog.close()
  })
}