export const sampleData = {
    'registerUser': {
        path: '/user/register',
        method: 'POST',
        requestBody: {
            firstName: 'anurag',
            lastName: 'kumar',
            email: 'hey@gmail.com',
            username: 'kareena',
            password: 'kapoor',
            role: 'ADMIN', // ADMIN or STUDENT OR INSTRUCTOR
            bio: 'whatever',
        }
    },
    'updateUser': {
        path: '/user/update',
        method: 'PUT',
        requestBody: {
            firstName: 'anurag',
            lastName: 'kumar',
            email: 'hey@gmail.com',
            username: 'kareena',
            password: 'kapoor',
            role: 'ADMIN', // ADMIN or STUDENT OR INSTRUCTOR
            bio: 'whatever',
        }
    },
    'deleteUser': {
        path: '/delete/{userId}',
        method: 'DELETE'
    },
    'validateUserName': {
        path: '/validate-username?username=anuragKumar',
        method: 'GET'
    },
    'login': {
        path: '/login',
        method: 'post',
        requestBody: {
            username: 'sachin',
            password: '{hashedPassword}' //https://medium.com/boca-code/how-to-encrypt-password-in-your-react-app-before-you-send-it-to-the-api-6e10a06f0a8e
        },
        response: {
            status: '1', //1=success, 2=error
            token: '13sdfxcv3', //this token should have expiry date and userId mapping. FrontEnd will send this token in all other request. Backend should get userId from this token
            errorMsg: 'incorrect credentials', //use this message if status==2
        }
    },
    'getUserCourse': {
        path: '/getusercourse',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                title: 'DSA',
                image: 'base64String', 
                difficulty: 'easy', 
                Description: 'Learn DSA fundamentals', 
            },
            {
                title: 'DSA',
                image: 'base64String', 
                difficulty: 'easy', 
                Description: 'Learn DSA fundamentals', 
            }
        ]
    },
    'getAllCourse': {
        path: '/getAllcourse',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                title: 'DSA',
                image: 'base64String', 
                difficulty: 'easy', 
                Description: 'Learn DSA fundamentals', 
            },
            {
                title: 'DSA',
                image: 'base64String', 
                difficulty: 'easy', 
                Description: 'Learn DSA fundamentals', 
            }
        ]
    },
    'deleteCourse': {
        path: '/getusercourse',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                title: 'DSA',
                image: 'base64String', 
                difficulty: 'easy', 
                Description: 'Learn DSA fundamentals', 
            },
            {
                title: 'DSA',
                image: 'base64String', 
                difficulty: 'easy', 
                Description: 'Learn DSA fundamentals', 
            }
        ]
    }

}
