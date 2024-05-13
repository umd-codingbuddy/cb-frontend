export const sampleData = {
    'login': {
        path: '/api/v1/auth/login',
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
                role: 'INSTRUCTOR',
            },
            errorMsg: 'incorrect credentials', //use this message if status==2
        }
    },
    'registerUser': {
        path: '/api/v1/auth/register',
        method: 'POST',
        requestBody: {
            firstName: 'anurag',
            lastName: 'kumar',
            email: 'hey@gmail.com',
            password: 'kapoor',
            role: 'STUDENT', // ADMIN or STUDENT OR INSTRUCTOR
            bio: 'whatever',
            address: "",
            linkedin: "",
            github: "",
        },
        response: {
            status: 1, // 1=success, 2=error
            errorMsg: 'asdf', //use this message if status==2
        }
    },
    'getUsers': {
        path: '/api/v1/user/getUsers',
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
        path: '/api/v1/user/deleteUser/154',
        method: 'delete',
        token: '234sfsdafsg',
        response: {
            message: "success"
        }
    },
    'verifyInstructor': {
        path: '/api/v1/user/verifyInstructor/12',
        method: 'put',
        token: '234sfsdafsg',
        response: {
            message: "success"
        }
    },
    //TODO: in backend
    'updateUser': {
        path: '/api/v1/user/update/{userId}',
        method: 'PUT',
        requestBody: {
            firstName: 'anurag',
            lastName: 'kumar',
            location: "MD, USA",
            githubUsername: "sachinvel",
            linkedInUsername: "sachin-velmurugan",
            bio: 'whatever'
        }
    },
    'getUser': {
        path: '/api/v1/user/getUserCourse/{userId}',
        method: 'get',
        response: {
            firstName: 'anurag',
            lastName: 'kumar',
            location: "MD, USA",
            bio: 'whatever',
            githubUsername: "sachinvel", //optional
            linkedinUsername: "sachin-velmurugan", //optional
        }
    },
    'getInstructors': {
        path: '/api/v1/user/getInstructors',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', verified: true },
            { id: 3, name: 'Catherine Theresa', email: 'cathriene@example.com', verified: true },
            { id: 2, name: 'Bob Williams', email: 'bob@example.com', verified: false }
        ]
    },
    //TO DO: in backend
    'getCourseInstructor': {
        path: '/api/v1/course/getCourseInstructor/{courseId}',
        method: 'get',
        token: '234sfsdafsg',
        response: { id: 1, name: 'Alice Johnson', email: 'alice@example.com', verified: true }
    },
    //TO DO: in backend
    'getInstructorCourses': {
        path: '/api/v1/course/getinstructorcourses',
        method: 'get',
        token: '234sfsdafsg',
        response: [{
            id: 1,
            name: 'Data Structures',
            description: 'Introduction to problem solving using C and C++',
            difficultyLevel: 'easy',
            tags: ['Python', 'Java'],
            percentageCompleted: 4,
            isOwnCourse: true
        }]
    },
    //TO DO: in backend
    'sendMessage': {
        path: '/api/v1/message/sendMessage',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: [
            {
                senderId: '123',
                receiverId: '345',
                courseId: '123',
                title: 'Learn DSA fundamentals',
                message: 'Learn DSA fundamentals',
            }
        ]
    },
    'createCourse': {
        path: '/api/v1/course/createCourse',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: [
            {
                name: 'Data Structures',
                description: 'Introduction to problem solving using C and C++',
                difficultyLevel: 'EASY', //EASY, MEDIUM, HARD
                tags: ['Python', 'Java']

            }
        ]
    },
    //TO DO: in backend
    'getUserCourses': {
        path: '/api/v1/course/getUserCourses/{user.id}',
        method: 'get',
        token: '234sfsdafsg',
        response: [
            {
                id: 3,
                name: 'Data Structures',
                description: 'Introduction to problem solving using C and C++',
                difficultyLevel: 'easy',
                tags: ['Python', 'Java'],
                percentageCompleted: 4,
            }
        ]
    },
    "startCourse": {
        path: '/api/v1/academics/resumecourse/{courseId}',
        method: 'get',
        token: '234sfsdafsg',
    },
    //TO DO: in backend
    'getAllCourse': {
        path: '/api/v1/course/getallcourses',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            courses: [
                {
                    id: 1,
                    name: 'Data Structures',
                    description: 'Introduction to problem solving using C and C++',
                    difficultyLevel: 'easy',
                    instructor: "Saul Goodman",
                    tags: ['Java'],
                    percentageCompleted: 4,
                },
                {
                    id: 2,
                    name: 'Python Data Processing',
                    description: 'Data processing using python Numpy and Pandas',
                    difficultyLevel: 'easy',
                    instructor: "Kim wexler",
                    tags: ['Python'],
                    percentageCompleted: 20,
                },
                {
                    id: 3,
                    name: 'C++ Processing',
                    description: 'Data processing using python Numpy and Pandas',
                    difficultyLevel: 'easy',
                    instructor: "Kim wexler",
                    tags: ['C++'],
                    percentageCompleted: 20,
                },
                {
                    id: 4,
                    name: 'C++ Processing',
                    description: 'Data processing using python Numpy and Pandas',
                    difficultyLevel: 'easy',
                    instructor: "Kim wexler",
                    tags: ['C++'],
                    percentageCompleted: 20,
                },
                {
                    id: 5,
                    name: 'C++ Processing',
                    description: 'Data processing using python Numpy and Pandas',
                    difficultyLevel: 'easy',
                    instructor: "Kim wexler",
                    tags: ['C++'],
                    percentageCompleted: 20,
                }
            ]

        }
    },
    //TO DO: in backend
    "getContactMessages": {
        path: '/api/v1/message/getContactMessages',
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
            },
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
        ]
    },
    'getCourseDetails': {
        path: '/api/v1/academics/getcoursedetail/{id}',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            courseId: 1,
            // insId: 2,
            name: 'Full Stack Development',
            description: 'Introduction to full stack application development',
            difficultyLevel: 'easy',
            tags: ['Java', 'Software'],
            isOwnCourse: true,
            currentModule: 1,
            currentPage: 1,
            modules: [
                {
                    id: 1,
                    name: "Elements and Structure",
                    isCompleted: false,
                    sequenceNumber: 1,
                    pages: [
                        { name: "HTML content", pageType: "TEXT", sequenceNumber: 1, pageId: 1, hintAllowed: false, difficultyLevel: "EASY" }
                    ]
                }
            ]

        }
    },
    'createModule': {
        path: '/api/v1/course/createModule',
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
            igsHintAllowed: true,
            pageType: 'CODING',
            Difficulty: "HARD"
        }
    },
    'getContentPage': {
        path: '/api/v1/academics/getpagecontent/{1}',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            id: 1,
            courseId: 123,
            name: 'HTML/CSS',
            isHintAvailable: true,
            pageType: "Coding",
            content: {
                text: "",
                language: "python",
                code: ""
            }

        }
    },
    'addpagecontent': {
        path: '/api/v1/academics/addpagecontent',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            pageId: 1,
            pageContent: {
                text: "",
                language: "python",
                code: "",
                testCases: ""
            }

        }
    },
    //TODO : in backend
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
    //TODO : in backend
    //"status", 1, "page", fetchPageContent(pageId).get("page"), "pageId", pageId, "pageType", page.getPageType())
    //get current page where the student is currently in
    'getCurrentCoursePage': {
        path: '/api/v1/academics/getCurrentCoursePage/{courseId}',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            status: 1,
            page: {},
            pageId: "1",
            pageType: "CODING",
        }
    },
    //same as get
    'completePage': {
        path: '/completePage/{pageId}',
        method: 'post',
        token: '234sfsdafsg'
    },
    //same as getpagecontent
    'getQuizPage': {
        path: '/getQuizPage?id=123',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            isEditable: true,
            isHintAllowed: true,
            questions: [
                {
                    "seq": 1,
                    "question": "What is the capital of France?",
                    "options": [
                        { "text": "Paris", "isCorrect": true },
                        { "text": "Rome", "isCorrect": false },
                        { "text": "Berlin", "isCorrect": false },
                        { "text": "Madrid", "isCorrect": false }
                    ]
                },
                {
                    "seq": 2,
                    "question": "Which language runs in a web browser?",
                    "options": [
                        { "text": "Java", "isCorrect": false },
                        { "text": "C#", "isCorrect": false },
                        { "text": "JavaScript", "isCorrect": true },
                        { "text": "Swift", "isCorrect": false }
                    ]
                },
                {
                    "seq": 3,
                    "question": "What does HTML stand for?",
                    "options": [
                        { "text": "Hyper Trainer Marking Language", "isCorrect": false },
                        { "text": "Hyper Text Markup Language", "isCorrect": true },
                        { "text": "Hyper Texts Markup Language", "isCorrect": false },
                        { "text": "Hyper Text Mark Language", "isCorrect": false }
                    ]
                },
                {
                    "seq": 4,
                    "question": "Which planet is known as the Red Planet?",
                    "options": [
                        { "text": "Earth", "isCorrect": false },
                        { "text": "Mars", "isCorrect": true },
                        { "text": "Jupiter", "isCorrect": false },
                        { "text": "Venus", "isCorrect": false }
                    ]
                },
                {
                    "seq": 5,
                    "question": "What year was JavaScript created?",
                    "options": [
                        { "text": "1995", "isCorrect": true },
                        { "text": "1994", "isCorrect": false },
                        { "text": "1996", "isCorrect": false },
                        { "text": "1993", "isCorrect": false }
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
    //same as addpagecontent
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
            title: "Element Data Structure",
            content: "<h1>Welcome to the Element Data Structure Tutorial</h1>\n<p>In this tutorial, we will cover the basics of element data structures.</p>\n<h2>What is an Element?</h2>\n<p>An element is a fundamental unit of data in a data structure. It can be a single value or a composite value consisting of multiple attributes.</p>\n<h2>Types of Elements</h2>\n<ul>\n  <li>Primitive Elements: These are basic data types such as integers, floats, and characters.</li>\n  <li>Composite Elements: These are complex data types that consist of multiple attributes. Examples include arrays, objects, and lists.</li>\n</ul>\n<h2>Common Operations on Elements</h2>\n<p>Some common operations performed on elements include:</p>\n<ol>\n  <li>Accessing: Retrieving the value of an element from a data structure.</li>\n  <li>Inserting: Adding a new element to a data structure.</li>\n  <li>Updating: Modifying the value of an existing element in a data structure.</li>\n  <li>Deleting: Removing an element from a data structure.</li>\n</ol>"
        }

    },
    //same as addpagecontent
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
    //TODO : change in backend
    'getNextPageId': {
        path: '/api/v1/academics/getNextPage/{curPageId}',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            status: 1,
            page: 1,
            pageType: "CODING",
            courseCompleted: true
        }
    },
    // 'getPreviousPageId': {
    //     path: '/getPreviousPageId?id=123',
    //     method: 'get',
    //     token: '234sfsdafsg',
    //     response: {
    //         id: 1
    //     }
    // },
    'getCoursePerformance': {
        path: '/api/v1/academics/getstatements/{courseId}',
        method: 'get',
        token: '234sfsdafsg',
        response: {
            totalModules: 30,
            statements: [
                // { studentId: 1, studentName: 'John Doe', completedPercentage: 5, performanceScore: 80 },
            ]
        }
    },
    'addStudentToCourse': {
        path: '/api/v1/academics/addstudenttocourse',
        method: 'post',
        token: '234sfsdafsg',
        requestBody: {
            "courseId": "12",
            "email": "sdf.sdf"
        }
    }

}

// /api/v1/academics/calculateScore
// {
//     pageId:,
//     score:,
//     time
// }

