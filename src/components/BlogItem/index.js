import {Link} from 'react-router-dom'

import {RiCloseFill} from 'react-icons/ri'

import {
  EachBlogItemCont,
  EachBlogItemTitleandAuthorCont,
} from './styledComponents'

import './index.css'

const BlogItem = props => {
  const {details, onClickBlogItem} = props
  const {id, title, author, content} = details

  const onClickCloseButton = () => {
    onClickBlogItem(id)
  }

  return (
    <div className="forcancelicon">
      <EachBlogItemCont className="eachblogitemcont">
        <Link to={`/blogs/${id}`}>
          <h1 className="blogitemtitle">{title}</h1>
          <EachBlogItemTitleandAuthorCont>
            <p className="blogitemauthor">{author}</p>
            <p className="blogitemdate">content</p>
          </EachBlogItemTitleandAuthorCont>
        </Link>
      </EachBlogItemCont>

      <RiCloseFill className="cancelicon" onClick={onClickCloseButton} />
    </div>
  )
}

export default BlogItem
