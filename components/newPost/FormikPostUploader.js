import { View, Text, TextInput, Image, Button } from 'react-native'
import React, {useState, useEffect, Fragment} from 'react'
import * as Yup  from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import {db, firebase} from '../../firebase'

const PLACEHOLDER_IMG = 'https://via.placeholder.com/150'

const uploadPostSchema  =  Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db
        .collection('users')
        .where('owner_uid', '==', user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                  username: doc.data().username,
                  profilePicture: doc.data().profile_picture
                })
            })
        )
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .add({
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profilePicture: currentLoggedInUser.profilePicture,
            owner_uid: firebase.auth().currentUser.uid,
            owner_email: firebase.auth().currentUser.email,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0,
            likes_by_users: [],
            comments: []
        })
        .then(() => navigation.goBack())

        return unsubscribe
    }

  return (
    <Formik
        initialValues={{caption: '', imageUrl: ''}}
        onSubmit={(values) => {
            uploadPostToFirebase(values.imageUrl, values.caption)
        }}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
    >
        {({handleBlur, handleChange, handleSubmit, isValid, values, errors, touched}) => (
            <Fragment>
                <View style={{ margin:20, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Image 
                    source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}  
                    style={{ width: 100, height: 100 }}
                    />
                        <View style={{ flex: 1, marginLeft: 12, marginTop: 20}}>
                            <TextInput 
                                style={{ color: 'white', fontSize: 20 }}
                                placeholder='Write a caption...' 
                                placeholderTextColor='grey'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <Divider width={0.2} orientation="vertical"/>
                    <TextInput 
                        onChange={e => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: 'white', fontSize: 18, marginTop: 10 }}
                        placeholder='Enter Image Url' 
                        placeholderTextColor='grey'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red'}}>
                            {errors.imageUrl}
                        </Text>
                    )}
                    <Button onPress={handleSubmit} title='Share' disabled={!isValid }/>
            </Fragment>
        )}

    </Formik>
  )
}

export default FormikPostUploader