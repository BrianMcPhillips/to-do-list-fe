import React from 'react';
import { fetchtoDoList } from './toDoList-api.js';
import { Link } from 'react-router-dom';

class ListPage extends React.Component {
  state = {
    toDoList: [] 
  }

  componentDidMount = async () => {
    if (!this.props.token) {
      this.props.history.push('/login');
    } else {
      const data = await fetchtoDoList(this.props.token)
  
      this.setState({
        toDoList: data.body
      })
    }

  }

  render() {
    return (
      <div className="to-do-list">
          {
            this.state.toDoList.map((listItem) => {
              return <Link className="listItem" to={`/detail/${listItem.id}`} key={`${listItem.id}-${listItem.name}`}>
                <p>Name: {listItem.name}</p>
                <p>Completed: {listItem.completed}</p>
                <p>Importance: {listItem.importance}</p>
              </Link>
            })
          }
      </div>
    )
}
}

export default ListPage;