import "./CreateArticle.scss";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

import { AccessArticles } from "../constants/AccessArticles";
import Button from "../../../header/components/button/Button";
import { PropTypes } from "prop-types";
import { objectCreateArticle } from "../articlesType/articlesType";

function CreateArticle({ articleData, onSubmit, isEdit }) {
  const { title, text, access, userId } = articleData;

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
  };

  return (
    <>
      {isEdit ? <h1>Add article</h1> : <h1>Edit article</h1>}
      <div className="create-article">
        <Formik
          enableReinitialize
          initialValues={{ title: title, text: text, access: access, userId: userId }}
          validationSchema={articleSchema}
          onSubmit={handleSubmit}
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
              <Button title={"Submit"} typeBtn={"submit"} />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

CreateArticle.propTypes = {
  articleData: objectCreateArticle.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default CreateArticle;
