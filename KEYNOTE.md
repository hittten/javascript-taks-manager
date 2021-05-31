# Javascript Basic Course

## Keynote

1. Introduction to Javascript
2. Variables
3. DOM
4. Loops & Conditionals
5. Functions & Operators
6. Events
7. Objects & JSON
8. Forms
9. Async
10. Introduction to typescript
11. What is next?

---

## 1. Introduction to Javascript

### Reference

- IDE (Integrated Development Environment) https://code.visualstudio.com/
- IDE plugins:
  * Live Server
  * EditorConfig
  * Todo Tree
- Chrome Dev tools, Javascript console.
- HTML basics https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
- CSS basics https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
- ECMAScript https://tc39.es/ecma262/

---

## 2. Variables

### Reference

- What is JavaScript? https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
- Defer vs Async https://www.google.com/search?q=async+vs+defer+javascript&tbm=isch
- Grammar and types https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types

### Hands On

- Clone this repository: https://github.com/hittten/javascript-task-manager
- Insert the `app.js` file in the HTML
- Create a data mock const `TASKS` in `app.js` with these values:
  * id
  * description
  * done

__Solution:__ `./move/to hello-world`

---

## 3. DOM

### Reference

- DOM https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- window https://developer.mozilla.org/en-US/docs/Web/API/Window
- document https://developer.mozilla.org/en-US/docs/Web/API/Document
- Selectors:
  * https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors
  * https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors#reference_table_of_selectors

### Hands On

- Select HTML elements in constants
  * `taskInputElement` HTML input to create task
  * `taskListElement` HTML ul with the task list
  * `modalElement` HTML Div elimination modal
  * `modalYesButton` Modal yes button
  * `modalNoButton` Modal no button
  * `tasksLeftElement` HTML paragraphs with tasks left
  * `allButton` HTML all button filter
  * `pendingButton` HTML pending button filter
  * `completedButton` HTML completed button filter
- Make an array constant `filterButtons` with `allButton`, `pendingButton`, `completedButton` Elements

__Solution:__ `./move/to select-elements`

---

## 4. Loops & Conditionals

### Reference

- Control flow and error
  handling https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
- Making decisions in your code https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
- Loops and iteration https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

### Hands On

- Make a loop with the current tasks mock
- Create a Li HTML Element with all the task HTML current structure
- Append each element to the Ul HTML Element

__Solution:__ `./move/to loops`

---

## 5. Functions & Operators

### Reference

- Functions https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
- Expressions and operators https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators

### Hands On

- Create a `listTasks` function and pass two parameters `taskList`,`tasks`
- Make a refactor of the loop code for function `listTask`
- Make some conditional logic to consider done tasks

__Solution:__ `./move/to functions`

---

## 6. Events

### Reference

- Events https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
  * onkeyup
  * click
  * onchange

### Hands On 1

- Create tasks with the `taskInputElement` when you press `Enter`

__Solution:__ `./move/to events-1`

### Hands On 2

- Create filters with filters buttons: `allButton`, `pendingButton`, `completedButton`

__Solution:__ `./move/to events-2`

### Hands On 3

- Check the task as done
- Update `tasksLeftElement` with the count of pending task

__Solution:__ `./move/to events-3`

### Hands On 4

- Make editable task when you click on it

__Solution:__ `./move/to events-4`

## 7. Objects & JSON

### Reference

- JSON https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
  * stringify() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  * parse() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
- Working With Objects https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

## 8. Forms

### Reference

- Forms https://developer.mozilla.org/en-US/search?q=form

## 9. Async

### Reference

- Promises https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
- Fetch https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
- Using_promises https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- Using_Fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### Hands On

- Change mock data for real services data

__Solution:__ `./move/to services`

## 10. Introduction to typescript

### Reference

- Typescript https://www.typescriptlang.org/

## 11. What is next?

### Reference

- Classes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- Modules https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
  * import https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
  * export https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
