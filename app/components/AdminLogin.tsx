"use client";

import { useEffect, useState, type FormEvent } from "react";
import { isAuthenticated } from "../auth";
import styles from "./AdminLogin.module.css";

const REDIRECT_DELAY_MS = 1600;

const DEBUG_AUTH_SOURCE = `const AUTH_COOKIE_NAME = "authenticated";

function checkAuth(password) {
  const isValid = password === process.env.ADMIN_PASSWORD;

  document.cookie = \`\${AUTH_COOKIE_NAME}=\${isValid}; path=/; SameSite=Lax\`;
  return isValid;
}`;

export default function AdminLogin() {
  const [granted, setGranted] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!granted) return;

    const redirectTimer = window.setTimeout(() => {
      window.location.assign("/compass");
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(redirectTimer);
  }, [granted]);

  const attemptLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authenticated = isAuthenticated();
    console.log(`[debug] auth check\n${DEBUG_AUTH_SOURCE}`);
    if (authenticated) {
      console.log('[debug] cookie "authenticated" found - access granted');
    }

    setGranted(authenticated);
    setDenied(!authenticated);
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.note}>Note to self: don&apos;t forget to remove the debug logs before production.</p>

        <div className={styles.card}>
          <h1 className={styles.title}>Admin Login</h1>

          <form onSubmit={attemptLogin}>
            <label className={styles.field} htmlFor="password">
              Password
            </label>
            <input className={styles.input} id="password" name="password" type="password" autoComplete="off" />

            <button className={styles.button} type="submit">
              Login
            </button>
          </form>

          <p className={styles.status} role="status" aria-live="polite">
            {granted && <span className={styles.success}>200 OK - access granted</span>}
            {denied && <span className={styles.error}>Incorrect password. Please try again.</span>}
          </p>
        </div>
      </div>
    </main>
  );
}
