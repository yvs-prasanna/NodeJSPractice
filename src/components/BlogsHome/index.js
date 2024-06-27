import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import BlogItem from '../BlogItem'

import {
  BlogHomeWholeCont,
  BlogCreateCont,
  EachInputCont,
  EachLabelEle,
  EachInputEle,
  AddBlogButton,
} from './styledComponents'

import './index.css'

let allblogs = JSON.parse(localStorage.getItem('blogs'))

class Home extends Component {
  state = {
    blogsList: allblogs,
    titleval: '',
    contentval: '',
    authorval: '',
  }
  onChangeTitle = event => {
    this.setState({titleval: event.target.value})
  }
  onChangeContent = event => {
    this.setState({contentval: event.target.value})
  }
  onChangeAuthor = event => {
    this.setState({authorval: event.target.value})
  }

  onClickAddButton = () => {
    const {titleval, contentval, authorval, blogsList} = this.state
    const newBlog = {
      id: uuidv4(),
      title: titleval,
      author: authorval,
      content: contentval,
    }

    this.setState(p => ({blogsList: [...p.blogsList, newBlog]}))
    localStorage.setItem('blogs', JSON.stringify([...blogsList, newBlog]))
    allblogs = JSON.parse(localStorage.getItem('blogs'))
    this.setState({titleval: '', authorval: '', contentval: ''})
  }
  onClickBlogItem = id => {
    const {blogsList} = this.state
    const updatedBlogsList = blogsList.filter(each => each.id !== id)
    this.setState({blogsList: updatedBlogsList})
    localStorage.setItem('blogs', JSON.stringify(updatedBlogsList))
    allblogs = JSON.parse(localStorage.getItem('blogs'))
  }
  render() {
    const {titleval, contentval, authorval} = this.state
    return (
      <BlogHomeWholeCont className="homewholecont">
        <h1 className="blogsvlog">Blogs Vlog</h1>
        <BlogCreateCont className="homeblogcreatecont">
          <EachInputCont>
            <EachLabelEle htmlFor="title">Title</EachLabelEle>
            <EachInputEle
              id="title"
              type="text"
              placeholder="TITLE"
              value={titleval}
              onChange={this.onChangeTitle}
            />
          </EachInputCont>
          <EachInputCont>
            <EachLabelEle htmlFor="content">Content</EachLabelEle>
            <textarea
              id="content"
              type="text"
              placeholder="CONTENT"
              value={contentval}
              onChange={this.onChangeContent}
              rows="6"
              column="40"
              className="textareaclassname"
            />
          </EachInputCont>
          <EachInputCont>
            <EachLabelEle htmlFor="author">Author</EachLabelEle>
            <EachInputEle
              id="author"
              type="text"
              placeholder="AUTHOR"
              value={authorval}
              onChange={this.onChangeAuthor}
            />
          </EachInputCont>
          <AddBlogButton
            className="addBlogbutton"
            type="button"
            onClick={this.onClickAddButton}
          >
            Add Blog
          </AddBlogButton>
        </BlogCreateCont>
        <div className="allblogItemscont">
          <h1 className="blogsheading">Blogs</h1>
          {allblogs.map(each => (
            <BlogItem
              key={each.id}
              details={each}
              onClickBlogItem={this.onClickBlogItem}
            />
          ))}
        </div>
      </BlogHomeWholeCont>
    )
  }
}

export default Home
