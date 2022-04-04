import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'


const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
        likedImageUrl: 'https://img.icons8.com/fluency-systems-regular/60/fa314a/like--v1.png'
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/material-outlined/60/ffffff/speech--v1.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/60/ffffff/external-send-instagram-flatart-icons-outline-flatarticons.png',
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/external-bearicons-detailed-outline-bearicons/60/ffffff/external-Save-social-media-bearicons-detailed-outline-bearicons.png',
    },
]

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
        <Divider width={1} orientation='vertical' />
        <PostHeader post={post}/>
        <PostImage post={post}/>
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <PostFooter/>
            <Likes post={post}/>
            <Caption post={post}/>
            <CommentSection post={post} />
            <Comments post={post} />
        </View>
    </View>
  )
}

const PostHeader = ({ post }) => (
    <View 
        style={{ 
            flexDirection: 'row', 
            justifyContent: "space-between",
            margin: 5,
            alignItems: 'center'
        }}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Image 
            source={{ uri: post.profile_picture }}
            style={styles.story} 
            />
            <Text style={{ color: "white", marginLeft: 5, fontWeight: '700' }}>
                { post.user }
            </Text>
        </View>
        <Text style={{ color: "white", fontWeight: '900' }}>...</Text>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{
        width: '100%',
        height: 450
     }}>
        <Image 
            source={{uri: post.imageUrl}} 
            style={{ height: "100%", resizeMode: 'cover'}}
        />
    </View>
)

const PostFooter = () => (
    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
        <View style={styles.leftFooterIcons}>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
        </View>
        <View>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
        </View>
    </View>
)

const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
)

const Likes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4}}>
        <Text style={{ color: 'white', fontWeight: '600' }}>
            {post.likes.toLocaleString('en')} likes
        </Text>
    </View>
)

const Caption = ({post}) => (
    <View style={{ marginTop: 5}}>
        <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: '600' }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
    {
        !!post.comments.length && (
            <Text style={{ color: 'grey'}}>
                View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} { ''}
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )
    }
    </View>
)

const Comments = ({post}) => (
    <>
        {
            post.comments.map((comment, index) => (
                <View key={index} style={{ flexDirection: 'row', marginTop: 5}}>
                    <Text style={{ color: 'white'}}>
                        <Text style={{ fontWeight: '600' }}>{comment.user}</Text>
                        {' '}{comment.comment}
                    </Text>
                </View>
            ))
        }
    </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    footerIcon: {
        width: 33,
        height: 33
    },
    leftFooterIcons:{
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'
    }
})

export default Post