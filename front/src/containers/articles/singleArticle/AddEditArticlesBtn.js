import { Button } from '@material-ui/core';
import CreateArticleContainer from './CreateArticle';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { useState } from 'react'

function AddEditArticlesBtn({ isCreate,  id }) {
   const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  return (
    <>
      {isCreate ? <Button variant="contained" color="primary" aria-label="add" onClick={handleOpen}>Add article</Button>
      : <Button variant="outlined" color="primary" aria-label="edit" onClick={handleOpen} startIcon={<EditIcon />}>Edit</Button>
      } 

      {isOpen ? 
        <CreateArticleContainer articleId={id} isOpen={isOpen} handleClose={handleClose} />
      : null}
    </>
  )
}

AddEditArticlesBtn.propTypes = {
  isCreate: PropTypes.bool,
  id: PropTypes.number,
}
AddEditArticlesBtn.defaultProps = {
  isCreate: true
} 

export default AddEditArticlesBtn