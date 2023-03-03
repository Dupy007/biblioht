export default function admin({ next, router }) {
    let auth = JSON.parse(localStorage.auth);
    if (auth.type_account!=='admin') {
        return next({
            name: 'dashboard'
        })
    }

  
    return next();
  }