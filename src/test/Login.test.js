import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import Login from '../component/pages/Login';

// const server = setupServer(
//   rest.post('http://localhost:3000/api/v1/login', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         logged_in: true,
//         user: {
//           user_id: 1,
//         },
//       })
//     );
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
//   cleanup();
// });
// afterAll(() => server.close());

// afterEach(() => cleanup());

// レンダリングできていることのテスト
describe('Rendering', () => {
  it('Should render all elements correctly', () => {
    render(<Login />);
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByPlaceholderText('email')).toBeTruthy();
    expect(screen.getByPlaceholderText('password')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
// フォームに入力できるかのテスト
describe('Input form onChange event', () => {
  it('Should update email input value correctly', () => {
    render(<Login />);
    const inputValue = screen.getByPlaceholderText('email');
    userEvent.type(inputValue, 'test');
    expect(inputValue.value).toBe('test');
  });
  it('Should update password input value correctly', () => {
    render(<Login />);
    const inputValue = screen.getByPlaceholderText('password');
    userEvent.type(inputValue, '1234');
    expect(inputValue.value).toBe('1234');
  });
});
// クライアント側のエラーが出るか
describe('Check for errors before fetch API', () => {
  it('Should email pattern error', () => {
    render(<Login />);
    const inputValue = screen.getByPlaceholderText('email');
    userEvent.type(inputValue, 'example1@example.com');
    expect(inputValue.value).toMatch(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  });
  it('Should password space error', async () => {
    render(<Login />);
    userEvent.click(screen.getByRole('button'));
    await expect(screen.findByText('パスワードは必須です')).toBeTruthy();
    await expect(screen.findByText('emailは必須です')).toBeTruthy();
  });
  it('Should password format error', async () => {
    render(<Login />);
    const inputPassword = screen.getByPlaceholderText('password');
    const inputEmail = screen.getByPlaceholderText('email');
    userEvent.type(inputPassword, '123');
    userEvent.type(inputEmail, 'aaaa@');
    userEvent.click(screen.getByRole('button'));
    expect(screen.findByText('パスワードは4文字以上です')).toBeTruthy();
    expect(screen.findByText('正しく入力して下さい')).toBeTruthy();
  });
});

// // apiに送信して、返ってきた値をlogin_userへ格納し、マイページへ遷移するか
// describe('Send to api and move to MyPage', () => {
//   it('Send to api and move to MyPage', () => {
//     render(<Login />);
//     const inputPassword = screen.getByPlaceholderText('password');
//     const inputEmail = screen.getByPlaceholderText('email');
//     userEvent.type(inputPassword, '1234');
//     userEvent.type(inputEmail, 'example1@example.com');
//     userEvent.click(screen.getByDisplayValue('ログイン'));
//   });
// });
