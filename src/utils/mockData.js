export const sampleData = {
    'login': {
        path: '/login',
        method: 'post',
        requestBody: {
            username: 'sachin',
            password: '{hashedPassword}' //https://medium.com/boca-code/how-to-encrypt-password-in-your-react-app-before-you-send-it-to-the-api-6e10a06f0a8e
        },
        response: {
            status: 1, //1=success, 2=not verfied, 3=error
            user: {
                token: '13sdfxcv3',
                id: '2',
                name: 'John Jacob',
                role: 'instructor',
            },
            errorMsg: 'incorrect credentials', //use this message if status==2
        }
    },
    'registerUser': {
        path: '/user/register',
        method: 'POST',
        requestBody: {
            firstName: 'anurag',
            lastName: 'kumar',
            email: 'hey@gmail.com',
            password: 'kapoor',
            role: 'ADMIN', // ADMIN or STUDENT OR INSTRUCTOR
            bio: 'whatever',
        },
        response: {
            status: 1, // 1=success, 2=error
            errorMsg: 'asdf', //use this message if status==2
        }
    },
    'updateUser': {
        path: '/user/update',
        method: 'PUT',
        requestBody: {
            firstName: 'anurag',
            lastName: 'kumar',
            location: "MD, USA",
            githubUsername: "sachinvel",
            linkedInUsername: "sachin-velmurugan",
            bio: 'whatever',
            profileImage: '<file>'
        }
    },
    'getUser': {
        path: '/user/{userId}',
        method: 'get',
        response: {
            firstName: 'anurag',
            lastName: 'kumar',
            location: "MD, USA",
            bio: 'whatever',
            githubUsername: "sachinvel", //optional
            linkedInUsername: "sachin-velmurugan", //optional
            profileImage: "https://fastly.picsum.photos/id/826/200/300.jpg?hmac=OsVdvGZW1U_-FFoJfJrFVB-9hw0tx1H9ZyEqEaA1W10" // give me a link
        }
    },
    'getInstructor': {
        path: '/getCourseByInstructorId',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                id: '1',
                name: 'john'
            },
            {
                id: '2',
                name: 'alex'
            },
        ]
    },
    'getCourseTitleByInstructorId': {
        path: '/getCourseByInstructorId?id=1',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                title: 'DSA'
            },
            {
                title: 'DSA',
            }
        ]
    },
    'contact': {
        path: '/contact',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: [
            {
                senderId: 'DSA',
                receiverId: 'base64String',
                courseId: 'easy',
                title: 'Learn DSA fundamentals',
                message: 'Learn DSA fundamentals',
            }
        ]
    },
    'getCourse': {
        path: '/getCourse',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                id: 1,
                name: 'Data Structures',
                description: 'Introduction to problem solving using C and C++',
                difficultyLevel: 'easy',
                tags: ['Python', 'Java'],
                percentageCompleted: 4

            },
            {
                id: 2,
                name: 'Python Data Processing',
                description: 'Data processing using python Numpy and Pandas',
                difficultyLevel: 'easy',
                tags: ['Python', 'Java'],
                percentageCompleted: 20
            }
        ]
    },
    'getAllCourse': {
        path: '/getAllCourse',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                id: 1,
                name: 'Data Structures',
                description: 'Introduction to problem solving using C and C++',
                difficultyLevel: 'easy',
                instructor: "Saul Goodman",
                tags: ['Python', 'Java'],
                percentageCompleted: 4,
                totalModules: 15
            },
            {
                id: 1,
                name: 'Python Data Processing',
                description: 'Data processing using python Numpy and Pandas',
                difficultyLevel: 'easy',
                instructor: "Kim wexler",
                tags: ['Python', 'Java'],
                percentageCompleted: 20,
                totalModules: 15
            }
        ]
    },
    "getContactMessages": {
        path: '/getContactMessages',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                id: 1,
                student: { // same as user object
                    token: '13sdfxcv3',
                    id: '2',
                    name: 'John Jacob',
                    role: 'stduent',
                },
                course: { // courseObject
                    id: 123,
                    name: "DSA"
                },
                title: 'enroll me reg',
                message: "Saul Goodman",
                createdAt: 1711676512834,
            },
            {
                id: 2,
                student: { // same as user object
                    token: '13sdfxcv3',
                    id: '3',
                    name: 'Mohammed',
                    role: 'stduent',
                },
                course: { // courseObject
                    id: 455,
                    name: "AI"
                },
                title: 'Hi professor',
                message: "Kim Wexler Kim Wexler Kim Wexler Kim WexlerKim Wexler Kim Wexler Kim Wexler Kim Wexler Kim WexlerKim Wexler",
                createdAt: 1711676312834,
            }
        ]
    },
    'getCourseDetails': {
        path: '/getCourseDetails?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            id: 1,
            name: 'Full Stack Development',
            description: 'Introduction to full stack application development',
            difficultyLevel: 'easy',
            tags: ['Java','Software'],
            percentageCompleted: 4,
            modules: [
                {
                    name: "Elements and Structure",
                    pages : [
                        {name:"HTML content",type:"text",id:1},
                        {name:"CSS content",type:"quiz",id:2}
                    ]
                },
                {
                    name: "Backend",
                    pages : [
                        {name:"Basic Java",type:"coding",id:3},
                        {name:"Advanced Java",type:"text",id:4}
                    ]
                }
            ]

        }
    }


}
