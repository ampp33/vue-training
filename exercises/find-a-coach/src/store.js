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
            context.commit('registerCoach', coach)
        },
        setCoaches(context, coaches) {
            context.commit('setCoaches', coaches)
        },
        addRequest(context, request) {
            // TODO post to firebase, and do dispatch in promise 'then'
            context.commit('addRequest', request)
        },
        setRequests(context, requests) {
            context.commit('setRequests', requests)
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