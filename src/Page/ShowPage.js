import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const ShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res)=> {
      setPost(res.data);
      setLoading(false);
    })
  };

  useEffect(() => {
    getPost(id)
  }, [id])

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1">{post.title}</h1>
        <div>
          <Link
            className="btn btn-primary"
            to={`/blogs/${id}/edit`}
          >
            edit
          </Link>
        </div>
      </div>
      <small className="text-muted">
        Created At: {printDate(post.createdAt)}
        <hr />
      </small>
      <p>{post.body}</p>
    </div>
  )
};

export default ShowPage;