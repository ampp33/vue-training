import dummyCoaches from './dummy-coaches'

export default {
    state() {
        return {
            coaches: [...dummyCoaches],
            requests: []
        }
    },
    mutations: {
        registerCoach(state, coach) {
            state.coaches.push(coach)
        },
        setCoaches(state, coaches) {
            state.coaches = coaches
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
        setRequests(state, requests) {
            state.requests = requests
        }
    },
    actions: {
        registerCoach(context, coach) {
            // TODO post to firebase, and do dispatch in promise 'then'
            context.dispatch('registerCoach', coach)
        },
        setCoaches(context, coaches) {
            context.dispatch('setCoaches', coaches)
        },
        addRequest(context, request) {
            // TODO post to firebase, and do dispatch in promise 'then'
            context.dispatch('addRequest', request)
        },
        setRequests(context, requests) {
            context.dispatch('setRequests', requests)
        }
    },
    getters: {
        getCoaches(state) {
            return state.coaches
        },
        getRequests(state) {
            return state.requests
        }
    }
}