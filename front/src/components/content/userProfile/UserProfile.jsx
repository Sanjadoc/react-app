import 'cropperjs/dist/cropper.css'
import './UserProfile.scss'

import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { useCallback, useState } from 'react'

import Button from '@material-ui/core/Button'
import Cropper from 'react-cropper'
import SendIcon from '@material-ui/icons/Send';
import { sendAvatar } from '../../../containers/users/hooks/apiUser'
import useApi from '../../../containers/users/hooks/useApi'
import { useMutation } from 'react-query'

function UserProfile({user}) {

  const { callApi } = useApi();

  const userId =user?.id;

  console.log("user from jsx userProfile", user);

  const [image, setImage] = useState();
  const [cropper, setCropper] = useState();
  const [croppedImage, setCroppedImage] = useState();

  const updateProfile = ({ userId, sendData }) => {
    return callApi(
      {
        url: `/user/${userId}/update`,
        method: "PUT",
        data: {sendData}
      }
    );
  }

  const { mutate: editUser } = useMutation(updateProfile);
  const { mutate: updateAvatar } = useMutation(sendAvatar);

  const userSchema = Yup.object().shape({
    email: Yup.string()
      .min(10, 'Too Short!')
      .max(200, 'Too Long!')
      .required('Required, need add information'),
    password: Yup.string()
      .min(4, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required, need add information'),
    first_name: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required, need add information'),
    last_name: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required, need add information'),     
    age: Yup.number()
      .min(5, 'Too Short!')
      .max(150, 'Too Long!'),
    university: Yup.string()
      .min(1, 'Too Short!')
      .max(200, 'Too Long!'),
    phone_number: Yup.string()
      .min(1, 'Too Short!')
      .max(25, 'Too Long!'),
    work_place: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!'),
  })

  const onSubmit = useCallback(
    async (sendData) => {
      try {
        await editUser({ userId, sendData })
      } catch (error) {
        console.log(error)
      }
    },
    [editUser]
  )

  const onSaveImage = useCallback(
    async (sendData) => {
      try {
        await updateAvatar({ userId, sendData })
      } catch (error) {
        console.log(error)
      }
    },
    [updateAvatar]
  )

  const handleSaveImage = () => {
    onSaveImage({ avatar: croppedImage })
  }

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type.match('image.*') && file.size < 20000) {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        console.log('Error load!');
    }
  }

  const cropImage = () => {
    if (cropper !== 'undefined') {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL())
    }
  }

  const handleSubmit = (data) => {
    onSubmit({ ...data, avatar: croppedImage })
  }

  return (
    <div className='profile'>
      <h1>User profile page</h1>
      <div className='profile-edit'>

        <div className="profile-edit__avatar">
          <h2>Upload avatar:</h2>
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
          {croppedImage && (
            <Button variant='contained' color="primary" onClick={handleSaveImage}>
              Save
            </Button>
          )}
        </div>  

        <Formik
          validationSchema={userSchema}
          initialValues={{
            email: user?.email || "",
            password: user?.password || "",
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            age: user?.age || "",
            university:user?.university || "",
            phone_number: user?.phone_number || "",
            work_place: user?.work_place || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className='profile-edit__form'>
              <div>
                <label htmlFor='email'>Change email:</label>
                <Field id='email' type="email" name='email' placeholder='Enter new email...' />
                {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
              </div>

              <div>
                <label htmlFor='password'>Change password:</label>
                <Field
                  id='password'
                  name='password'
                  type="password"
                  placeholder='Enter new password...'
                />
                {errors.password && touched.password ? (<div className="error">{errors.password}</div>) : null}
              </div>

              <div>
                <label htmlFor='first_name'>Change name:</label>
                <Field id='first_name' name='first_name' placeholder='Enter new name...' />
                {errors.first_name && touched.first_name ? <div className="error">{errors.first_name}</div> : null}
              </div>

              <div>
                <label htmlFor='last_name'>Change surname:</label>
                <Field id='last_name' name='last_name' placeholder='Enter new surname...'
                />
                {errors.last_name && touched.last_name ? (<div className="error">{errors.last_name}</div>) : null}
              </div>
              
              <div>
                <label htmlFor='age'>Change age:</label>
                <Field id='age' name='age' placeholder='Enter age...'
                />
                {errors.age && touched.age ? (<div className="error">{errors.age}</div>) : null}
              </div>
              
              <div>
                <label htmlFor='university'>Change university:</label>
                <Field id='university' name='university' placeholder='Enter university...'
                />
                {errors.university && touched.university ? (<div className="error">{errors.university}</div>) : null}
              </div>
              
              <div>
                <label htmlFor='phone_number'>Change phone number:</label>
                <Field id='phone_number' name='phone_number' placeholder='Enter phone number...'
                />
                {errors.phone_number && touched.phone_number ? (<div className="error">{errors.phone_number}</div>) : null}
              </div>
              
              <div>
                <label htmlFor='work_place'>Change work place:</label>
                <Field id='work_place' name='work_place' placeholder='Enter work place...'
                />
                {errors.work_place && touched.work_place ? (<div className="error">{errors.work_place}</div>) : null}
              </div>            
              
              <Button variant="contained" color="primary" aria-label="Submit" type="submit" endIcon={<SendIcon />}>Submit</Button>
            </Form>
          )}
        </Formik>       
      </div>
    </div>
  )
}

export default UserProfile

