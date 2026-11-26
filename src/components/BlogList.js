import axios from "axios";
import { useEffect, useState, useCallback } from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from "prop-types";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const BlogList = ( {isAdmin} ) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  const [posts, setPosts] = useState([])
  const [loading, setLoaging] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const limit = 1

    useEffect(()=> {
      setNumberOfPages(Math.ceil(numberOfPosts/limit));
    }, [numberOfPosts]);

  
  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`)
    // getPosts(page);
  }

  const getPosts = useCallback((page = 1) => {
    let params = {
      _page: page,
      _limit: limit,
      _sort: 'id',
      _order:'desc',
    }

    if (!isAdmin) {
      params = { ...params, publish: true };
    }

    axios.get(`http://localhost:3001/posts?`, {
      params
    }).then((res)=> {
      setNumberOfPosts(res.headers['x-total-count']);
      setPosts(res.data)
      setLoaging(false);
    })
  }, [isAdmin])


  useEffect(()=> {

    console.log('1')
    setCurrentPage(parseInt(pageParam)||1);
    getPosts(parseInt(pageParam)||1);
  }, [pageParam, getPosts]);

  const delateBlog = (e, id) => {
    e.stopPropagation();
    
    axios.delete(`http://localhost:3001/posts/${id}`).then(()=> {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
    });
  }

  if (loading) {
    return (
      <LoadingSpinner />
    )
  }

  if(posts.length === 0) {
    return (<div>No blog posts found</div>)
  }
  const renderBlogList = () => {
    return posts.filter(post => {
      return isAdmin || post.publish
  }).map(post => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => history.push(`/blogs/${post.id}`)}
        >
          {isAdmin ? (<div>
            <button
              className="btn btn-danger"
              onClick={(e) => delateBlog(e, post.id)}
            >Delete</button>
            </div>) : null}
        </Card>
      )
    })
  }

  return (
    <div>
      {renderBlogList()}
      {numberOfPages > 1 && <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onClick={onClickPageButton}
      />}
    </div>
  )
}

BlogList.propTypes = {
  isAdmin: bool
};

BlogList.defaultProps = {
  isAdmin: false
};


export default BlogList;