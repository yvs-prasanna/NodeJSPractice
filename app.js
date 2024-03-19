const express = require('express')
const sqlite3 = require('sqlite3')
const path = require('path')
const {open} = require('sqlite')

const {format} = require('date-fns')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'todoApplication.db')
let db = null

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server has started Successfully')
    })
  } catch (e) {
    console.log(`DBError: ${e.message}`)
    process.exit(1)
  }
}

initializeDbServer()

//Status Middeleware
const statusCheck = (request, response, next) => {
  const {status} = request.query
  if (status !== undefined) {
    if (
      (status !== 'To%20DO') &
      (status !== 'IN%20PROGRESS') &
      (status !== 'DONE')
    ) {
      response.status(400)
      response.send('Invalid Todo Status')
    } else {
      next()
    }
  } else {
    next()
  }
}

//Priority Middleware
const priorityCheck = (request, response, next) => {
  const {priority} = request.query
  if (priority !== undefined) {
    if (
      (priority !== 'HIGH') &
      (priority !== 'MEDIUM') &
      (priority !== 'LOW')
    ) {
      response.status(400)
      response.send('Invalid Todo Priority')
    } else {
      next()
    }
  } else {
    next()
  }
}

//Category Middleware
const categoryCheck = (request, response, next) => {
  const {category} = request.query
  if (category !== undefined) {
    if (
      (category !== 'WORK') &
      (category !== 'HOME') &
      (category !== 'LEARNING')
    ) {
      response.status(400)
      response.send('Invalid Todo Category')
    } else {
      next()
    }
  } else {
    next()
  }
}

//Duedate Middleware
const dueDateCheck = async (request, response, next) => {
  const {dueDate} = request.query
  if (dueDate !== undefined) {
    const givenDate = format(new Date(dueDate), 'yyyy-MM-dd')
    if (dbTodo !== givenDate) {
      response.status(400)
      response.send('Invalid Todo Date')
    } else {
      next()
    }
  } else {
    next()
  }
}

//GET todos
app.get(
  '/todos/',
  statusCheck,
  priorityCheck,
  categoryCheck,
  async (request, response) => {
    const {
      status = '',
      priority = '',
      category = '',
      search_q = '',
    } = request.query
    let todoQuery = null
    if (
      (status !== '') &
      (priority === '') &
      (category === '') &
      (search_q === '')
    ) {
      todoQuery = `select * from todo where status like "${status}"`
    } else if (
      (status === '') &
      (priority !== '') &
      (category === '') &
      (search_q === '')
    ) {
      todoQuery = `select  * from todo where priority like "${priority}"`
    } else if (
      (status !== '') &
      (priority !== '') &
      (category === '') &
      (search_q === '')
    ) {
      todoQuery = `select * from todo where status like "${status}" and priority like "${priority}"`
    } else if (
      (status === '') &
      (priority === '') &
      (category === '') &
      (search_q !== '')
    ) {
      todoQuery = `select * from todo where todo like "%${search_q}%"`
    } else if (
      (status !== '') &
      (priority === '') &
      (category !== '') &
      (search_q === '')
    ) {
      todoQuery = `select * from todo where status like "${status}" and category like "${category}"`
    } else if (
      (status === '') &
      (priority === '') &
      (category !== '') &
      (search_q === '')
    ) {
      todoQuery = `select * from todo where category like "${category}"`
    } else if (
      (status === '') &
      (priority !== '') &
      (category !== '') &
      (search_q === '')
    ) {
      todoQuery = `select * from todo where category like "${category}" and priority like "${priority}"`
    }
    const todoArray = await db.all(todoQuery)
    response.send(todoArray)
  },
)

//GET Todo
app.get('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const getSingleTodo = `select * from todo where id = ${todoId}`
  const todoArray = await db.get(getSingleTodo)
  response.send(todoArray)
})

//GET through Due date

app.get('/agenda/', dueDateCheck, async (request, response) => {
  const {date} = request.query
  const givenDate = format(new Date(date), 'yyyy-MM-dd')
  const dueDateQuery = `select * from todo where due_date = '${givenDate}'`
  const dateArray = await db.all(dueDateQuery)
  response.send(dateArray)
})

//POST a todo
app.post(
  '/todos/',
  statusCheck,
  priorityCheck,
  categoryCheck,
  dueDateCheck,
  async (request, response) => {
    const {id, todo, priority, status, category, dueDate} = request.body
    const insertTodo = `insert into todo(id, todo, priority, status, category, due_date) values(${id}, '${todo}', '${priority}', '${status}', '${category}', '${dueDate}')`
    await db.run(insertTodo)
    response.send('Todo Successfully Added')
  },
)

app.put(
  '/todos/:todoId/',
  statusCheck,
  priorityCheck,
  categoryCheck,
  dueDateCheck,
  async (request, response) => {
    const {todoId} = request.params
    const {
      status = '',
      priority = '',
      todo = '',
      category = '',
      dueDate = '',
    } = request.body
    if (
      (status !== '') &
      (priority === '') &
      (todo === '') &
      (category === '') &
      (dueDate === '')
    ) {
      const updateQuery = `update todo set status = "${status}" where id = ${todoId}`
      await db.run(updateQuery)
      response.send('Status Updated')
    } else if (
      (status === '') &
      (priority !== '') &
      (todo === '') &
      (category === '') &
      (dueDate === '')
    ) {
      const updateQuery = `update todo set priority = "${priority}" where id = ${todoId}`
      await db.run(updateQuery)
      response.send('Priority Updated')
    } else if (
      (status === '') &
      (priority === '') &
      (todo !== '') &
      (category === '') &
      (dueDate === '')
    ) {
      const updateQuery = `update todo set todo = "${todo}" where id = ${todoId}`
      await db.run(updateQuery)
      response.send('Todo Updated')
    } else if (
      (status === '') &
      (priority === '') &
      (todo === '') &
      (category !== '') &
      (dueDate === '')
    ) {
      const updateQuery = `update todo set category = "${category}" where id = ${todoId}`
      await db.run(updateQuery)
      response.send('Category Updated')
    } else if (
      (status === '') &
      (priority === '') &
      (todo === '') &
      (category === '') &
      (dueDate !== '')
    ) {
      const updateQuery = `update todo set due_date = "${dueDate}" where id = ${todoId}`
      await db.run(updateQuery)
      response.send('Due Date Updated')
    }
  },
)

app.delete('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const deleteQuery = `delete from todo where id = ${todoId}`
  await db.run(deleteQuery)
  response.send('Todo Deleted')
})

module.exports = app
