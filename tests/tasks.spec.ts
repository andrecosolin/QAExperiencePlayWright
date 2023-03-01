import { test, expect } from '@playwright/test'

test('deve poder cadastrar uma nova tarefa', async ({ page, request }) => {

    // Dado que eu tenha uma nova tarefa
    const taskName = 'Ler um livro de TypeScript'
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)

    // E que estou na página de cadastro
    await page.goto('http://localhost:3000')

    // Quando faço o cadastro dessa tarefa
    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(taskName)

    await page.click('css=button >> text=Create')

    // Então essa tarefa deve ser exibida na lista
    // const target = page.locator('.task-item')
    // const target = page.locator('div[class*=listItem]')
    const target = page.locator('css=.task-item p >> text=' + taskName)
    // const target = page.locator('css=.task-item p >> text=${taskName}')
    await expect(target).toBeVisible()
})
    // a const é a definição de um objeto. 
    // a vantagem é que o código vai evoluir e é importante para implementar
    // pode usar xpath
    // await page.click('xpath=//button[contains(text(), "Create")]')
    // mas tem outra opção de css 
    // await inputTaskName.press('Enter')
    // Outra forma de realizar o teste é usando o await direto
    // await page.fill('input[class*=InputNewTask]', 'Ler um livro de TypeScript')