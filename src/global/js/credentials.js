import lsAdapter from './lsAdapter';

export const credentials = {
    get() {
        const username = lsAdapter.get('username');
        const email = lsAdapter.get('email');

        if (username) {
            return {
                username,
                email,
            };
        }

        return null;
    },
    set(username, email) {
        lsAdapter.set('username', username);
        lsAdapter.set('email', email);
    },
    reset() {
        lsAdapter.remove('username');
        lsAdapter.remove('email');
    },
    exists() {
        return !!this.get();
    },
};
