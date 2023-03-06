import { test, expect, request, } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helper'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/task.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})

test.describe('cadastro', () => {
    test('deve poder cadastrar uma nova tarefa', async ({ request }) => {

        const task = data.success as TaskModel
    
        await deleteTaskByHelper(request, task.name)
    
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveTask(task.name)
    
    })
    
    test('não deve permitir tarefa duplicada', async ({ request }) => {
    
        const task = data.duplicate as TaskModel
    
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)
    
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')
    })
    
    test('campo obrigatório', async({ page }) => {
        
        const task = data.required as TaskModel
    
        await tasksPage.go()
        await tasksPage.create(task)
    
        const inputTaskName = page.locator('input[class*=InputNewTask]')
        const validationMessage = await inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    })

})

test.describe('atualização', ()=> {
    test('deve concluir uma tarefa', async ({ request }) => {
        const task = data.update as TaskModel
    
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)
    
        await tasksPage.go()
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)
    
    })  
})

test.describe('exclusão', ()=> {
    test('deve excluir uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel
    
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)
    
        await tasksPage.go()
        await tasksPage.remove(task.name)
        await tasksPage.shouldNotExist(task.name)
    
    })  
})