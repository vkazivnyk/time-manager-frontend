import day from 'dayjs';
import jwtDecode from 'jwt-decode';
import lsAdapter from './lsAdapter.js';

export const authToken = {
    get() {
        const token = lsAdapter.get('token');

        let decodedToken;

        try {
            decodedToken = jwtDecode(token);
        } catch {
            return null;
        }

        const { exp } = decodedToken;

        const expires = day.unix(exp);

        if (token && expires) {
            return {
                token,
                expires,
            };
        }

        return null;
    },
    set(token) {
        lsAdapter.set('token', token);
    },
    reset() {
        lsAdapter.remove('token');
    },
    exists() {
        return !!this.get();
    },
    valid() {
        if (!this.exists()) {
            return false;
        }

        const { exp } = jwtDecode(this.get().token);

        const expiryDate = day.unix(exp);

        return day().isBefore(day(expiryDate));
    },
};
