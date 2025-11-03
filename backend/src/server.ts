import app from './app';
import { env } from './env';

const port = env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
});

