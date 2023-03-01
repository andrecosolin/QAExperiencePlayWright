import  { test, expect } from '@playwright/test'

test('deve poder cadastrar uma nova tarefa', async ({ page })=> {

    await page.goto('http://localhost:3000')

    // a const é a definição de um objeto. 
    // a vantagem é que o código vai evoluir e é importante para implementar padrões de projeto e podendo controlar através do locator. 
    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill('ler um livro de typeScript')
    // pode usar xpath
    // await page.click('xpath=//button[contains(text(), "Create")]')
    // mas tem outra opção de css 
    await page.click('css=buton >> text=Create')
    // await inputTaskName.press('Enter')

    // Outra forma de realizar o teste é usando o await direto
    // await page.fill('input[class*=InputNewTask]', 'Ler um livro de TypeScript')

})