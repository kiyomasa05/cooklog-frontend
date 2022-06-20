import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import useAuth from '../hooks/useAuth';
import Login from '../component/pages/Login';

// apiサーバー起動
const server = setupServer(
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        logged_in: true,
        user: {
          id: 1,
          email: 'example@example.com'
        },
      })
    );
  })
);
// const server = setupServer(
//   rest.post('http://localhost:3000/api/v1/login', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         status: 200,
//         logged_in: true,
//         user: {
//           id: 1,
//           email: 'example@example.com'
//         },
//       })
//     );
//   })
// );

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

afterEach(() => cleanup());

// Post送信するかどうか
describe('fetch API', () => {
  it('Post API', async () => {
    render(<Login />);
    const inputPassword = screen.getByPlaceholderText('password');
    const inputEmail = screen.getByPlaceholderText('email');
    act(() => {
      userEvent.type(inputPassword, '1234');
      userEvent.type(inputEmail, 'example@example.com');
      userEvent.click(screen.getByRole('button'));
    });
    await waitFor(() => {
      // eslint-disable-next-line jest/valid-expect
      expect(screen.findByText('ログインしました'));
    });
  });
});
// ページの遷移のテスト
// const history = createMemoryHistory();
// history.push("/login")
// DOC:http://www.code-magagine.com/?p=13581

// ダミーの関数
// const mockHistoryPush = jest.fn();

// jest.mock('react-router-dom', () => ({
//   useHistory: () => ({
//     push: mockHistoryPush, // pushメソッドをダミー関数で上書きする。
//   }),
//       const history = createMemoryHistory();
//     history.push("/login")
// }));
// describe('fetch API', () => {
//   it('Post API', async () => {
//     const { result } = renderHook(() => useAuth());
//     act(() => {
//       result.current.login(
//       example1.com
//             )})
//     const inputEmail = screen.
//   });
// });

