const state = {
    authToken: localStorage.getItem('x-auth-token') || null,
    userId: localStorage.userId || null
};

const getters = {
    authToken: (state) => state.authToken,
    userId: (state) => state.userId,
    signedIn: (state) => (state.authToken !== null && state.userId !== null)
};

const actions = {
    setAuthToken(context, token) {
        localStorage.setItem('x-auth-token', token)
        context.commit('setAuthToken', token);
    },
    setId(context, id) {
        localStorage.userId = id;
        context.commit('setId', id);
    },
    removeAuthToken(context) {
        localStorage.removeItem('x-auth-token');
        context.commit('removeAuthToken');
    },
    removeId(context) {
        localStorage.removeItem('userId');
        context.commit('removeId');
    }
};

const mutations = {
    setAuthToken: (state, token) => (state.authToken = token),
    removeAuthToken: (state) => (state.authToken = null),
    setId: (state, id) => (state.userId = id),
    removeId: (state) => (state.userId = null)
};

export default {
    state,
    getters,
    actions,
    mutations
}