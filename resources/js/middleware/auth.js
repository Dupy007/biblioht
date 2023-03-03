export default function auth({ next, router }) {
    if (!localStorage.getItem('auth')) {
        return next({
            name: 'login'
        })
      return router.push({ name: 'login' });
    }
    return next();
  }