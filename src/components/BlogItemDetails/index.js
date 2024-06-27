import {Component} from 'react'

import EditBlog from '../EditBlog'

import './index.css'

let blogs = []

class BlogItemDetails extends Component {
  state = {eachItemDetails: [], isEdit: false}
  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    blogs = JSON.parse(localStorage.getItem('blogs'))
    const requiredBlog = blogs.filter(each => each.id === id)
    this.setState({eachItemDetails: requiredBlog[0]})
  }

  onClickEditButton = () => {
    this.setState(p => ({isEdit: !p.isEdit}))
  }

  render() {
    const {eachItemDetails, isEdit} = this.state
    const {title, content, author} = eachItemDetails
    const buttonText = isEdit ? 'Show Blog' : 'Edit Blog'
    return (
      <div className="blogItemDetailswholecont">
        <h1 className="blogsitemdetailsheading">Blogs Vlog</h1>
        <div className="EditBlogcont">
          <button
            type="button"
            className="editblogButton"
            onClick={this.onClickEditButton}
          >
            {buttonText}
          </button>
        </div>
        <div className="blogsItemdetailscont">
          <h1 className="blogsItemdetailsTitle">{title}</h1>
          <p className="blogsItemdetailsauthor">{author}</p>
          <p className="blogsItemdetailsContent">{content}</p>
        </div>
        {isEdit && <EditBlog eachItemDetails={eachItemDetails} />}
      </div>
    )
  }
}

export default BlogItemDetails
