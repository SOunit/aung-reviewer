import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// 受け取った diff をログに出す（AI連携は後で）
app.post('/review', async (req, res) => {
  const { diff } = req.body;
  console.log('Received diff:\n', diff);

  // 仮のレビュー結果を返す
  res.json({ review: 'ここにAIのレビュー結果が入ります（ダミー）' });
});

app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
});
