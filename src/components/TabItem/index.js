import './index.css'

const TabItem = props => {
  const {tabDetails, updateTab, isActive} = props
  const {optionId, displayText} = tabDetails

  const updateActiveTab = () => {
    updateTab(displayText)
  }

  const classVal = isActive ? 'active' : ''
  return (
    <li
      className={`tabs-li-items ${classVal}`}
      key={optionId}
      onClick={updateActiveTab}
    >
      <button type="button" className="tab-btn">
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
