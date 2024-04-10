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
            role: 'STUDENT', // ADMIN or STUDENT OR INSTRUCTOR
            bio: 'whatever',
        },
        response: {
            status: 1, // 1=success, 2=error
            errorMsg: 'asdf', //use this message if status==2
        }
    },
    'getUsers': {
        path: '/getUsers',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            students: [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ],
            instructors: [
                { id: 1, name: 'Alice Johnson', email: 'alice@example.com', verified: true },
                { id: 2, name: 'Bob Williams', email: 'bob@example.com', verified: false }
            ]
        }
    },
    'deleteUser': {
        path: '/deleteUser?id=12',
        method: 'delete',
        token: '234sfsdafsg',
        response: {
            message: "success"
        }
    },
    'verifyInstructor': {
        path: '/verifyInstructor?id=12',
        method: 'put',
        token: '234sfsdafsg',
        response: {
            message: "success"
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
    'getInstructors': {
        path: '/getInstructors',
        method: 'post',
        token: '234sfsdafsg',
        response: [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', verified: true },
            { id: 2, name: 'Bob Williams', email: 'bob@example.com', verified: false }
        ]
    },
    'getCourseByInstructor': {
        path: '/getCourseByInstructor?insId=123234',
        method: 'post',
        token: '234sfsdafsg',
        response: {
            id: 1,
            name: 'Data Structures',
            description: 'Introduction to problem solving using C and C++',
            difficultyLevel: 'easy',
            tags: ['Python', 'Java'],
            percentageCompleted: 4

        }
    },
    'sendMessage': {
        path: '/sendMessage',
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
    'createCourse': {
        path: '/createCourse',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: [
            {
                name: 'Data Structures',
                description: 'Introduction to problem solving using C and C++',
                difficultyLevel: 'easy',
                tags: ['Python', 'Java']

            }
        ]
    },
    'getMyCourse': {
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
            tags: ['Java', 'Software'],
            percentageCompleted: 4,
            modules: [
                {
                    name: "Elements and Structure",
                    pages: [
                        { name: "HTML content", type: "text", id: 1 },
                        { name: "CSS content", type: "quiz", id: 2 }
                    ]
                },
                {
                    name: "Backend",
                    pages: [
                        { name: "Basic Java", type: "coding", id: 3 },
                        { name: "Advanced Java", type: "text", id: 4 }
                    ]
                }
            ]

        }
    },
    'createModule': {
        path: '/createModule',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            courseId: 1,
            name: "sdfsd"
        }
    },
    'createPage': {
        path: '/createPage',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            moduleId: 1,
            name: "sdfsd",
            isHintAllowed: true,
            pageType: 'Coding',
            Difficulty: "hard"
        }
    },
    'getCodingPage': {
        path: '/getCodingPage?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            id: 1,
            courseId: 123,
            name: 'HTML/CSS',
            isHintAvailable: true,
            content: {
                text: "",
                language: "python",
                code: ""
            }

        }
    },
    'postCodingContent': {
        path: '/postCodingContent?id=123',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            id: 1,
            courseId: 123,
            name: 'HTML/CSS',
            isHintAvailable: true,
            content: {
                text: "",
                language: "python",
                code: "",
                testCases: ""
            }

        }
    },
    'executeCoding': {
        path: '/executeCoding?id=123',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            language: "python",
            code: "",
            testCases: ""
        }
    },
    'getCurrentCoursePage': {
        path: '/getCurrentCoursePage?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            pageId: 1,
            type: "coding",
        }
    },
    'completePage': {
        path: '/completePage?id=123',
        method: 'post',
        token: '234sfsdafsg',
    },
    'getQuizPage': {
        path: '/getCurrentCoursePage?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            questions: [
                {
                    seq: 1,
                    question: "Is Java OOPS?",
                    options: [
                        { text: "Hello", isCorrect: true },
                        { text: "World", isCorrect: false },
                        { text: "Universe", isCorrect: false },
                    ]
                },
                {
                    seq: 2,
                    question: "Is Java OOPS?",
                    options: [
                        { text: "Hello", isCorrect: true },
                        { text: "World", isCorrect: false },
                        { text: "Universe", isCorrect: false },
                    ]
                },
                {
                    seq: 3,
                    question: "Is Java OOPS?",
                    options: [
                        { text: "Hello", isCorrect: true },
                        { text: "World", isCorrect: false },
                        { text: "Universe", isCorrect: false },
                    ]
                }
            ]
        }
    },
    'postQuizResult': {
        path: '/quizResult?id=123',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            totalQuiz: 10,
            correctCount: 5,
            timeTaken: 1000,//in seconds
        }
    },
    'postQuizContent': {
        path: '/quizContent?id=123',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            questions: [
                {
                    seq: 1,
                    question: "Is Java OOPS?",
                    options: [
                        { text: "Hello", isCorrect: true },
                        { text: "World", isCorrect: false },
                        { text: "Universe", isCorrect: false },
                    ]
                },
                {
                    seq: 2,
                    question: "Is Java OOPS?",
                    options: [
                        { text: "Hello", isCorrect: true },
                        { text: "World", isCorrect: false },
                        { text: "Universe", isCorrect: false },
                    ]
                },
                {
                    seq: 3,
                    question: "Is Java OOPS?",
                    options: [
                        { text: "Hello", isCorrect: true },
                        { text: "World", isCorrect: false },
                        { text: "Universe", isCorrect: false },
                    ]
                }
            ]
        }
    },
    'getTextPage': {
        path: '/getTextPage?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            content: ""
        }
    },
    'postTextContent': {
        path: '/postQuizContent?id=123',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            content: "asdfaf"
        }
    },
    'postTextResult': {
        path: '/postTextResult?id=123',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            timeTaken: 12324,//seconds
        }
    },
    'getNextPageId': {
        path: '/getNextPageId?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            id: 1
        }
    },
    'getPreviousPageId': {
        path: '/getPreviousPageId?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            id: 1
        }
    },
    'getCoursePerformance': {
        path: '/getCoursePerformance?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            totalModules: 30,
            students: [
                { studentId: 1, studentName: 'John Doe', modulesCompleted: 5, performanceScore: 80 },
                { studentId: 2, studentName: 'Jane Smith', modulesCompleted: 4, performanceScore: 75 },
                { studentId: 3, studentName: 'Alice Johnson', modulesCompleted: 6, performanceScore: 85 },
                { studentId: 4, studentName: 'Bob Williams', modulesCompleted: 3, performanceScore: 70 },
                { studentId: 5, studentName: 'Emma Davis', modulesCompleted: 7, performanceScore: 90 }
            ]
        }
    },
    'addStudentToCourse': {
        path: '/addStudentToCourse?id=123',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            studentId: 12324,
        }
    }





}
