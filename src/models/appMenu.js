export default {
    namespace: 'appMenu',

    state: {
        currentMenu: false,
    },


    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
