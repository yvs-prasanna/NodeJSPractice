import {Component} from 'react'

import {EachInputCont, EachLabelEle, EachInputEle} from './styledComponents'

import './index.css'

const blogs = JSON.parse(localStorage.getItem('blogs'))
console.log(blogs)

class EditBlog extends Component {
  state = {blogDetails: {}, title: '', content: '', author: ''}

  onClickSubmit = () => {
    const {title, content, author} = this.state
    const {eachItemDetails} = this.props
    const {id} = eachItemDetails
    const newBlog = {id, title, author, content}
    const eliminatedBLogs = blogs.filter(each => each.id !== id)
    const newBlogsToStore = [...eliminatedBLogs, newBlog]
    localStorage.setItem('blogs', JSON.stringify(newBlogsToStore))
    this.setState({title: '', author: '', content: ''})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }
  onChangeAuthor = event => {
    this.setState({author: event.target.value})
  }
  onChangeContent = event => {
    this.setState({content: event.target.value})
  }

  render() {
    const {title, content, author} = this.state
    return (
      <form className="EditBlogWholeCOnt">
        <EachInputCont>
          <EachLabelEle htmlFor="title">Title</EachLabelEle>
          <EachInputEle
            id="title"
            type="text"
            placeholder="TITLE"
            value={title}
            onChange={this.onChangeTitle}
          />
        </EachInputCont>
        <EachInputCont>
          <EachLabelEle htmlFor="content">Content</EachLabelEle>
          <textarea
            id="content"
            type="text"
            placeholder="CONTENT"
            rows="6"
            column="40"
            className="textareaclassname"
            value={content}
            onChange={this.onChangeContent}
          />
        </EachInputCont>
        <EachInputCont>
          <EachLabelEle htmlFor="author">Author</EachLabelEle>
          <EachInputEle
            id="author"
            type="text"
            placeholder="AUTHOR"
            value={author}
            onChange={this.onChangeAuthor}
          />
        </EachInputCont>
        <button
          type="submit"
          className="editblogsubmitbutton"
          onClick={this.onClickSubmit}
        >
          Submit
        </button>
      </form>
    )
  }
}

export default EditBlog
