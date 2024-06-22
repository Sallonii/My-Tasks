import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TabItem from '../TabItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TaskPage extends Component {
  state = {
    tasksList: [],
    inputText: '',
    tag: tagsList[0].displayText,
    activeTabId: '',
  }

  onChangingInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangingTag = event => {
    const selectedTag = tagsList.find(
      tag => tag.optionId === event.target.value,
    ).displayText
    this.setState({tag: selectedTag})
  }

  onClickingAddTaskButton = () => {
    const {inputText, tag} = this.state

    const newTask = {
      id: uuidv4(),
      task: inputText,
      tag,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      inputText: '',
      tag: tagsList[0].displayText,
    }))
  }

  updateTab = displayText => {
    this.setState({activeTabId: displayText})
  }

  getCreateTask = () => {
    const {inputText, tag} = this.state
    return (
      <form className="create-task-container">
        <h1 className="create-heading">Create a task!</h1>
        <div className="input-container">
          <label className="label-element" htmlFor="task">
            Task
          </label>
          <input
            id="task"
            type="text"
            className="input-element"
            placeholder="Enter the task here"
            value={inputText}
            onChange={this.onChangingInput}
          />
        </div>
        <div className="input-container">
          <label className="label-element" htmlFor="tags">
            Tags
          </label>
          <select
            id="tags"
            className="select-element"
            value={
              tagsList.find(tagItem => tagItem.displayText === tag).optionId
            }
            onChange={this.onChangingTag}
          >
            {tagsList.map(eachTab => (
              <option key={eachTab.optionId} value={eachTab.optionId}>
                {eachTab.displayText}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="add-task-button"
          onClick={this.onClickingAddTaskButton}
        >
          Add Task
        </button>
      </form>
    )
  }

  getTabs = () => {
    const {activeTabId} = this.state
    return (
      <ul className="tabs-ul-container">
        {tagsList.map(eachTab => (
          <TabItem
            tabDetails={eachTab}
            key={eachTab.optionId}
            isActive={activeTabId === eachTab.displayText}
            updateTab={this.updateTab}
          />
        ))}
      </ul>
    )
  }

  getTasksList = () => {
    const {tasksList, activeTabId} = this.state
    const filteredList =
      activeTabId === ''
        ? tasksList
        : tasksList.filter(eachItem => eachItem.tag === activeTabId)

    if (filteredList.length === 0) {
      return <p>No Tasks Added Yet</p>
    }

    return (
      <ul className="task-list">
        {filteredList.map(eachItem => (
          <li key={eachItem.id} className="task-list-item-container">
            <p className="task-heading">{eachItem.task}</p>
            <div className="tag-container">
              <p className="tag-text">{eachItem.tag}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="main-container">
        {this.getCreateTask()}
        <div className="task-display-container">
          <h1>Tags</h1>
          {this.getTabs()}
          <h1>Tasks</h1>
          {this.getTasksList()}
        </div>
      </div>
    )
  }
}

export default TaskPage
