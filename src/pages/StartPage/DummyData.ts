interface User {
  username: string;
  password: string;
}

interface ResponseData {
  status: number;
  token: string;
}

export const mockLoginApi = (user: User): Promise<ResponseData> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.username === 'guest' && user.password === 'password') {
        resolve({ status: 200, token: '1234567890abcdef' });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 2000);
  });
