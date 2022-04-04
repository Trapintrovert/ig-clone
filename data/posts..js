import { USERS } from "./users";
export const POST = [
    {
        imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        user: USERS[0].user,
        likes: 7870,
        caption: 'Train Ride to Hogwarts, Train Ride to HogwartsTrain Ride to HogwartsTrain Ride to HogwartsTrain Ride to Hogwarts',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'theqzman',
                comment: 'Wow! This build looks fire. Super excited about this',
            },
            {
                user: 'amaanath.dev',
                comment: 'Once i wake up, i\'ll be able to see this build',
            }
        ],
    },
    {
        imageUrl: 'https://images.pexels.com/photos/5474037/pexels-photo-5474037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        user: USERS[1].user,
        likes: 170,
        caption: 'Another one',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'theqzman',
                comment: 'Awesome job bro',
            },

        ],
    },
    {
        imageUrl: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        user: USERS[1].user,
        likes: 3800,
        caption: 'Another one',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'theqzman',
                comment: 'Awesome job bro',
            },

        ],
    }
]