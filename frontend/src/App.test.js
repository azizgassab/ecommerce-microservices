import { render, screen } from '@testing-library/react';
import App from './App';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (String(url).includes('/graphql')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify({ data: { users: [] } }))
      });
    }

    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(JSON.stringify([]))
    });
  });
});

afterEach(() => {
  global.fetch = originalFetch;
});

test('renders the frontend hero section', async () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /professional react frontend connected to api gateway/i
    })
  ).toBeInTheDocument();

  await screen.findByText(/no users returned/i);
  expect(screen.getAllByRole('link', { name: /products/i }).length).toBeGreaterThan(0);
});
