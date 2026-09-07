import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { bool } from 'prop-types';
import { isEditable } from '@testing-library/user-event/dist/utils';

const BlogForm = ({ editing }) => {
    const history = useHistory();
    const { id } = useParams();

    const [ title, setTitle ] = useState('');
    const [ originalTitle, setoriginalTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ originalBody, setoriginalBody ] = useState('');
    const [ publish, setPublish ] = useState(false); 
    const [ originalPublish, setoriginalPublish ] = useState(false); 

    useEffect(() => {
      if (editing) {
        axios.get(`http://localhost:3001/posts/${id}`).then(res => {
          setTitle(res.data.title)
          setoriginalTitle(res.data.title)
          setBody(res.data.body)
          setoriginalBody(res.data.body)          
          setPublish(res.data.publish)
          setoriginalPublish(res.data.publish)
        })
      }
    }, [editing, id]);

    const isEdited = () => {
      return title !== originalTitle 
      || body !== originalBody
      || publish !== originalPublish
    };

    const goBack = () => {
      if (editing) {
        history.push(`/blogs/${id}`);
      } else {
        history.push('/blogs');
      }
    };

    const onSubmit = () => {
      if (editing) {
        axios.patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
          publish,
        }).then(res => {
          console.log(res)
          history.push(`/blogs/${id}`)
        })
      } else {
        axios.post('http://localhost:3001/posts', {
          title,
          body,
          publish,
          createdAt: Date.now() 
        }).then(() => {
          history.push('/blogs')
        })
      }
    };

    const onChangePublish = (e) => {
      console.log(e.target.checked)
      setPublish(e.target.checked)
    };

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(e)=>{
            setBody(e.target.value);
          }}
          rows="10"
        />
      </div>
      <div className="form-check mb-3">
          <input 
            className="form-check-input"
            type="checkbox"
            checked={publish}
            onChange={onChangePublish}
            id="publish"
          />
          <label
            className="form-check-label"
            htmlFor="publish"
          >
            Publish
          </label>

      </div>

      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? 'Edit' : 'Post'}
      </button>
      <button
        className="btn btn-danger ms-2"
        onClick={goBack}
      >
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;