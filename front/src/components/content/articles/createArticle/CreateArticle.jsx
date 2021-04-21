import "./CreateArticle.scss";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

import { AccessArticles } from "../constants/AccessArticles";
import { Button } from "@material-ui/core";
import Cropper from "react-cropper";
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { PropTypes } from "prop-types";
import SendIcon from '@material-ui/icons/Send';
import { objectCreateArticle } from "../articlesType/articlesType";
import { useState } from "react";

function CreateArticle({ articleData, onSubmit, edit, isOpen, handleClose }) {
  const { title, text, access, userId } = articleData;

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

  const handleChange = e => {
      e.preventDefault();
      const file = e.target.files[0];
      if (file.type.match('image.*') && file.size < 20000) {
          const reader = new FileReader();
          reader.onload = () => {
              setImage(reader.result);
          };
          reader.readAsDataURL(file);
      } else {
          console.log('Error Load');
      }
  };

  const cropImage = () => {
      if (typeof cropper !== 'undefined') {
          setCroppedImage(cropper.getCroppedCanvas().toDataURL());
      }
  };

  const articleSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Too short!")
      .max(200, "Too long!")
      .required("Required, need add information"),
    text: Yup.string()
      .min(50, "Too short!")
      .max(1000, "Too long!")
      .required("Required, need add information"),
      access: Yup.string().oneOf([AccessArticles.ALL, AccessArticles.FRIENDS, AccessArticles.ME]),
  });

  const handleSubmit = (data) => {
    onSubmit(data);
     //setUser({...data, avatar: croppedImage});
    handleClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} maxWidth={'lg'} fullWidth={true}>
      <div className="create-article">
        <DialogTitle onClose={handleClose}>
          {edit ? 'Edit article' : 'Add article'}
        </DialogTitle>
        <DialogContent>
          
            <Formik
              initialValues={{ title: title, text: text, access: access, userId: userId }}
              validationSchema={articleSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form className="create-article__form">
                  <div>
                    <label htmlFor="title" className="create-article__form__label">Title:</label>
                    <Field id="title" className="styled" name="title" placeholder="Write title..." autoComplete="off" />
                    {errors.title && touched.title ? <div className="error">{errors.title}</div> : null}
                  </div>
                  <div>
                    <label htmlFor="text" className="create-article__form__label">Article text:</label>
                    <Field id="text" name="text">
                      {({ field }) => (<textarea type="text" {...field} placeholder="Write your text" />)}
                    </Field>     
                    {errors.text && touched.text ? <div className="error">{errors.text}</div> : null}
                  </div>

                  <div className="create-article__form__label" id="access-radio-group">Define access: </div>
                  <div className="create-article__form__label-list" role="group" aria-labelledby="access-radio-group">
                    <label>
                      <Field type="radio" name="access" value={AccessArticles.ALL} />
                      <div>All</div>
                    </label>
                    <label>
                      <Field type="radio" name="access" value={AccessArticles.FRIENDS} />
                      For my friends
                    </label>
                    <label>
                      <Field type="radio" name="access" value={AccessArticles.ME} />
                      Only for me
                    </label>
                  </div>

                  <div className="create-article__avatar">
                    <label>Upload avatar:</label>
                    {!croppedImage && (
                      <Button variant='contained' color="primary" component='label'>
                        Upload avatar
                        <input onChange={handleChange} hidden type='file' name='avatar' />
                      </Button>
                    )}
                    {image && !croppedImage && (
                      <Cropper
                        src={image}
                        initialAspectRatio={4 / 4}
                        onInitialized={(instance) => setCropper(instance)}
                      />
                    )}
                    {image && !croppedImage && (
                      <Button variant="contained" color="primary"onClick={cropImage}>
                        Crop
                      </Button>
            
                    )}
                    {croppedImage && <img src={croppedImage} alt='cropped' />}
                    {/* {croppedImage && (
                      <Button variant='contained' color="primary" >
                        Save
                      </Button>
                    )} */}
                  </div>

                  <Button variant="contained" color="primary" aria-label="Submit" type="submit" endIcon={<SendIcon />}>Submit</Button>
                </Form>
              )}
            </Formik>
 
        </DialogContent>
        </div>
      </Dialog> 
    </>
  );
}

CreateArticle.propTypes = {
  articleData: objectCreateArticle.isRequired,
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};

export default CreateArticle;