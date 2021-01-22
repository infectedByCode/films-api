import app from './index';

app.listen(process.env.PORT, () => {
  process.stdout.write(`Server running on ${process.env.PORT}`);
});
