import { writable } from 'svelte/store';

const AUTH_KEY = 'portfolio_admin_auth';
const ADMIN_PASSWORD = 'Alexander123!.'; // Simple password - change in production

function createAuthStore() {
    // Check if already authenticated in session
    const isBrowser = typeof window !== 'undefined';
    let initialAuth = false;
    if (isBrowser) {
        initialAuth = sessionStorage.getItem(AUTH_KEY) === 'true';
    }

    const { subscribe, set } = writable<boolean>(initialAuth);

    return {
        subscribe,
        login: (password: string): boolean => {
            if (password === ADMIN_PASSWORD) {
                if (isBrowser) {
                    sessionStorage.setItem(AUTH_KEY, 'true');
                }
                set(true);
                return true;
            }
            return false;
        },
        logout: () => {
            if (isBrowser) {
                sessionStorage.removeItem(AUTH_KEY);
            }
            set(false);
        },
        isAuthenticated: (): boolean => {
            if (isBrowser) {
                return sessionStorage.getItem(AUTH_KEY) === 'true';
            }
            return false;
        }
    };
}

export const authStore = createAuthStore();
