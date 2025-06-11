import app from './app';

const PORT = process.env.PORT || 5000; // ✅ Use env PORT for Render compatibility

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
