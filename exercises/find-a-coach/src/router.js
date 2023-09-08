import ListCoaches from './components/ListCoaches.vue'
import CoachDetails from './components/CoachDetails.vue'
import RegisterCoach from './components/RegisterCoach.vue'
import RegisterCoach from './components/ContactCoach.vue'
import Requests from './components/Requests.vue'

export default {
    routes: [
        {
            path: '/coaches',
            component: ListCoaches
        },
        {
            path: '/coach/:id',
            component: CoachDetails,
            props: true
        },
        {
            path: 'register-coach',
            component: RegisterCoach
        },
        {
            path: 'contact-coach',
            component: ContactCoach
        },
        {
            path: 'requests',
            component: Requests
        }
    ]
}